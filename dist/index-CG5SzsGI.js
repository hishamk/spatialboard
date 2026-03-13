var Fa = Object.defineProperty;
var Na = (t, e, o) => e in t ? Fa(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var vt = (t, e, o) => Na(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as Ba, defaultBlockSpecs as Ha, BlockNoteEditor as Oa } from "@blocknote/core";
import { jsxs as v, jsx as u, Fragment as ut } from "react/jsx-runtime";
import Xa, { memo as ce, useRef as ct, useState as tt, useEffect as mt, useCallback as it, Component as Ya, useMemo as qt, useLayoutEffect as ui, useContext as Ar, createContext as fi, Suspense as Ga, lazy as ja } from "react";
import { useCreateBlockNote as Va } from "@blocknote/react";
import { BlockNoteView as Za } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as fo, flushSync as Ua } from "react-dom";
const qa = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let At = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += qa[o[t] & 63];
  return e;
};
const Ka = {
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
}, Qa = {
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
}, Ja = {
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
}, $a = {
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
}, _a = {
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
}, tl = {
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
}, el = {
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
}, ol = {
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
}, rl = {
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
}, nl = {
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
}, sl = {
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
}, il = {
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
}, pi = [
  Ka,
  Qa,
  Ja,
  $a,
  _a,
  tl,
  el,
  ol,
  rl,
  nl,
  sl,
  il
];
class al {
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
const yi = 4, ll = 8, cl = 24;
function lo(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, l = Math.cos(i), a = Math.sin(i), c = e - n, h = o - s;
  return [n + c * l - h * a, s + c * a + h * l];
}
function vr(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function dl(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, h) => h.z - c.z);
  let l = null, a = null;
  for (const c of i)
    if (c.type === "draw") {
      if (An(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (Lr(c, e, o, r)) return c;
      if (!a && c.data.label) {
        const h = c.h === "auto" ? 100 : c.h, [f, d] = lo(c, e, o, h), p = gi(c, h);
        p && f >= p.lx && f <= p.rx && d >= p.ly && d <= p.ry && (a = c);
      }
    } else if (s && s.has(c.type)) {
      const h = vr(c, n);
      mi(c, e, o, r, h) && (l || (l = c));
    } else {
      const h = vr(c, n), f = yi / r, [d, p] = lo(c, e, o, h);
      d >= c.x - f && d <= c.x + c.w + f && p >= c.y - f && p <= c.y + h + f && (a || (a = c));
    }
  return a ?? l;
}
function mi(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, l] = lo(t, e, o, s), a = ll / r;
  if (t.data.label && i >= t.x && i <= t.x + t.w && l >= t.y - cl && l <= t.y)
    return !0;
  if (i < t.x - a || i > t.x + t.w + a || l < t.y - a || l > t.y + s + a)
    return !1;
  const h = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), d = Math.abs(l - t.y), p = Math.abs(l - (t.y + s)), m = i >= t.x - a && i <= t.x + t.w + a;
  return l >= t.y - a && l <= t.y + s + a && (h <= a || f <= a) || m && (d <= a || p <= a);
}
function bi(t, e, o, r, n, s) {
  const i = n - o, l = s - r, a = i * i + l * l;
  if (a === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / a)), h = o + c * i, f = r + c * l;
  return (t - h) ** 2 + (e - f) ** 2;
}
function gi(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, l = t.w - 12 * 2, a = o.label.split(`
`);
  let c = 0;
  for (const m of a) {
    const y = m.length * s;
    c += Math.max(1, Math.ceil(y / Math.max(l, 1)));
  }
  const h = c * n, f = Math.min(l, Math.max(...a.map((m) => m.length)) * s), d = t.x + t.w / 2, p = t.y + e / 2;
  return {
    lx: d - f / 2 - 4,
    ly: p - h / 2 - 4,
    rx: d + f / 2 + 4,
    ry: p + h / 2 + 4
  };
}
function Lr(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, l] = lo(t, e, o, s), a = t.data, h = (a.strokeWidth ?? 2) / 2 / r, f = !!a.fill || !!n;
  switch (a.shape) {
    case "rect": {
      if (f)
        return i >= t.x - h && i <= t.x + t.w + h && l >= t.y - h && l <= t.y + s + h;
      const d = Math.abs(i - t.x), p = Math.abs(i - (t.x + t.w)), m = Math.abs(l - t.y), y = Math.abs(l - (t.y + s)), b = i >= t.x - h && i <= t.x + t.w + h;
      return l >= t.y - h && l <= t.y + s + h && (d <= h || p <= h) || b && (m <= h || y <= h);
    }
    case "ellipse": {
      const d = t.x + t.w / 2, p = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const b = (i - d) / m, g = (l - p) / y, x = b * b + g * g;
      if (f) {
        const I = ((m + h) / m) ** 2;
        return x <= I;
      }
      const z = h / Math.min(m, y);
      return Math.abs(Math.sqrt(x) - 1) <= z;
    }
    case "diamond": {
      const d = t.x + t.w / 2, p = t.y + s / 2, m = t.w / 2, y = s / 2;
      if (m === 0 || y === 0) return !1;
      const b = Math.abs(i - d) / m, g = Math.abs(l - p) / y, x = b + g;
      if (f) {
        const I = h / Math.min(m, y);
        return x <= 1 + I;
      }
      const z = h / Math.min(m, y);
      return Math.abs(x - 1) <= z;
    }
    case "line":
    case "arrow": {
      const d = a.startPoint ?? [0, 0], p = a.endPoint ?? [t.w, s], m = t.x + d[0], y = t.y + d[1], b = t.x + p[0], g = t.y + p[1];
      return bi(i, l, m, y, b, g) <= h * h;
    }
    default:
      return i >= t.x - h && i <= t.x + t.w + h && l >= t.y - h && l <= t.y + s + h;
  }
}
function hl(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], l = o[n][1], a = o[s][0], c = o[s][1];
    l > e != c > e && t < (a - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
function An(t, e, o, r) {
  const s = t.data.strokeWidth / 2 / r, i = s * s, l = t.h === "auto" ? 100 : t.h, [a, c] = lo(t, e, o, l);
  if (a < t.x - s || a > t.x + t.w + s || c < t.y - s || c > t.y + l + s)
    return !1;
  const h = t.data.points;
  if (!h || h.length === 0) return !1;
  const f = a - t.x, d = c - t.y;
  if (h.length === 1) {
    const p = f - h[0][0], m = d - h[0][1];
    return p * p + m * m <= i;
  }
  if (t.data.fill && h.length >= 3 && hl(f, d, h))
    return !0;
  for (let p = 0; p < h.length - 1; p++)
    if (bi(f, d, h[p][0], h[p][1], h[p + 1][0], h[p + 1][1]) <= i)
      return !0;
  return !1;
}
function ul(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, h) => h.z - c.z), l = [], a = [];
  for (const c of i)
    if (c.type === "draw")
      An(c, e, o, r) && l.push(c);
    else if (c.type === "shape") {
      if (Lr(c, e, o, r))
        l.push(c);
      else if (c.data.label) {
        const h = c.h === "auto" ? 100 : c.h, [f, d] = lo(c, e, o, h), p = gi(c, h);
        p && f >= p.lx && f <= p.rx && d >= p.ly && d <= p.ry && a.push(c);
      }
    } else if (s && s.has(c.type)) {
      const h = vr(c, n);
      mi(c, e, o, r, h) && a.push(c);
    } else {
      const h = vr(c, n), f = yi / r, [d, p] = lo(c, e, o, h);
      d >= c.x - f && d <= c.x + c.w + f && p >= c.y - f && p <= c.y + h + f && a.push(c);
    }
  return [...l, ...a];
}
function hr(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, l = Math.abs(Math.cos(i)), a = Math.abs(Math.sin(i)), c = n * l + s * a, h = n * a + s * l;
  return {
    x: o - c,
    y: r - h,
    w: c * 2,
    h: h * 2
  };
}
const Ie = class Ie {
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
    this.nodes[0] = new Ie({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Ie({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Ie({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Ie({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const n = hr(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Ie.MAX_OBJECTS && this.level < Ie.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], l = this.resolveH(i), a = hr(i, l), c = this.getIndex(a);
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
      const r = this.resolveH(e), n = this.getIndex(hr(e, r));
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
      const s = this.resolveH(n), i = hr(n, s);
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
vt(Ie, "MAX_OBJECTS", 10), // Max depth of the tree
vt(Ie, "MAX_LEVELS", 8);
let fn = Ie;
function To(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function Ro(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function fl(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function pl(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = To(t.zoom * n, 0.1, 5), i = Ro(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
function yl(t, e, o, r) {
  const n = To(t.zoom * e, 0.1, 5), s = Ro(t, o, r);
  return {
    x: o - s.x * n,
    y: r - s.y * n,
    zoom: n
  };
}
const Ln = Ba.create({
  blockSpecs: {
    ...Ha
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let Ur = null;
function Dn() {
  return Ur || (Ur = Oa.create({ schema: Ln })), Ur;
}
async function ml(t) {
  return await Dn().blocksToMarkdownLossy(t);
}
async function En(t) {
  return await Dn().tryParseMarkdownToBlocks(t);
}
function xi(t) {
  return Dn().tryParseHTMLToBlocks(t);
}
function bl(t, e, o) {
  const [r, n] = t, [s, i] = e, [l, a] = o, c = l - s, h = a - i, f = c * c + h * h;
  if (f === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let d = ((r - s) * c + (n - i) * h) / f;
  d = Math.max(0, Math.min(1, d));
  const p = s + d * c, m = i + d * h;
  return (r - p) ** 2 + (n - m) ** 2;
}
function pn(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let a = 1; a < t.length - 1; a++) {
    const c = bl(t[a], n, s);
    c > o && (o = c, r = a);
  }
  if (o <= e)
    return [n, s];
  const i = pn(t.slice(0, r + 1), e), l = pn(t.slice(r), e);
  return [...i.slice(0, -1), ...l];
}
async function gl(t, e) {
  const o = [], r = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && r.push(`background="${e.background}"`), e != null && e.originView) {
    const d = e.originView;
    r.push(`originView="${d.x},${d.y},${d.zoom}"`);
  }
  o.push(`<!--@meta ${r.join(" ")} -->`), o.push("");
  const n = t.filter((d) => d.type === "frame").sort((d, p) => d.z - p.z || d.y - p.y || d.x - p.x);
  for (const d of n) {
    const p = d.h === "auto" ? "auto" : Math.round(d.h), m = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${p}"`,
      `z="${d.z}"`
    ];
    d.data.label && m.push(`label="${d.data.label.replace(/"/g, "&quot;")}"`), d.data.backgroundColor && m.push(`backgroundColor="${d.data.backgroundColor}"`), d.data.borderColor && m.push(`borderColor="${d.data.borderColor}"`), d.data.borderWidth != null && m.push(`borderWidth="${d.data.borderWidth}"`), d.data.borderStyle && d.data.borderStyle !== "solid" && m.push(`borderStyle="${d.data.borderStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && m.push(`opacity="${d.data.opacity}"`), d.data.slideOrder != null && m.push(`slideOrder="${d.data.slideOrder}"`), d.data.transition && d.data.transition !== "pan" && m.push(`transition="${d.data.transition}"`), d.data.transitionDuration != null && m.push(`transitionDuration="${d.data.transitionDuration}"`), d.rotation && m.push(`rotation="${d.rotation}"`), d.locked && m.push('locked="true"'), d.groupId && m.push(`group="${d.groupId}"`), o.push(`<!--@frame ${m.join(" ")} -->`), o.push("");
  }
  const s = t.filter((d) => d.type === "content").sort((d, p) => d.z - p.z || d.y - p.y || d.x - p.x);
  for (const d of s) {
    const p = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${d.h}"`,
      `z="${d.z}"`
    ];
    d.rotation && p.push(`rotation="${d.rotation}"`), d.locked && p.push('locked="true"'), d.groupId && p.push(`group="${d.groupId}"`), d.data.borderColor && p.push(`borderColor="${d.data.borderColor}"`), d.data.borderWidth != null && p.push(`borderWidth="${d.data.borderWidth}"`), d.data.borderStyle && d.data.borderStyle !== "solid" && p.push(`borderStyle="${d.data.borderStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && p.push(`opacity="${d.data.opacity}"`), o.push(`<!--@block ${p.join(" ")} -->`);
    const m = d.data.blocks.length > 0 ? await ml(d.data.blocks) : "";
    o.push(m), o.push("");
  }
  const i = t.filter((d) => d.type === "draw");
  for (const d of i) {
    const p = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `z="${d.z}"`,
      `tool="${d.data.tool}"`,
      `color="${d.data.color}"`,
      `width="${d.data.strokeWidth}"`
    ];
    d.data.opacity !== void 0 && d.data.opacity !== 1 && p.push(`opacity="${d.data.opacity}"`), d.data.fill && p.push(`fill="${d.data.fill}"`), d.data.fillStyle && d.data.fillStyle !== "hachure" && p.push(`fillStyle="${d.data.fillStyle}"`), d.rotation && p.push(`rotation="${d.rotation}"`), d.locked && p.push('locked="true"'), d.groupId && p.push(`group="${d.groupId}"`), o.push(`<!--@draw ${p.join(" ")} -->`);
    const y = pn([...d.data.points], 1).map(
      ([b, g, x]) => `${(b + d.x).toFixed(1)},${(g + d.y).toFixed(1)},${x.toFixed(2)}`
    ).join(" ");
    o.push(y), o.push("");
  }
  const l = t.filter((d) => d.type === "shape");
  for (const d of l) {
    const p = d.h === "auto" ? "auto" : Math.round(d.h), m = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${p}"`,
      `z="${d.z}"`,
      'tool="shape"',
      `shape="${d.data.shape}"`,
      `color="${d.data.stroke}"`,
      `stroke="${d.data.strokeWidth}"`,
      `roughness="${d.data.roughness}"`
    ];
    d.data.fill && m.push(`fill="${d.data.fill}"`), d.data.fillStyle && d.data.fillStyle !== "hachure" && m.push(`fillStyle="${d.data.fillStyle}"`), d.data.strokeStyle && d.data.strokeStyle !== "solid" && m.push(`strokeStyle="${d.data.strokeStyle}"`), d.data.edgeStyle && d.data.edgeStyle !== "sharp" && m.push(`edgeStyle="${d.data.edgeStyle}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && m.push(`opacity="${d.data.opacity}"`), d.data.startPoint && m.push(`startPt="${d.data.startPoint[0].toFixed(1)},${d.data.startPoint[1].toFixed(1)}"`), d.data.endPoint && m.push(`endPt="${d.data.endPoint[0].toFixed(1)},${d.data.endPoint[1].toFixed(1)}"`), d.data.label && m.push(`label="${d.data.label.replace(/"/g, "&quot;")}"`), d.data.labelFontSize && m.push(`labelFontSize="${d.data.labelFontSize}"`), d.data.labelFontFamily && d.data.labelFontFamily !== "Excalifont" && m.push(`labelFontFamily="${d.data.labelFontFamily}"`), d.data.labelAlign && d.data.labelAlign !== "center" && m.push(`labelAlign="${d.data.labelAlign}"`), d.rotation && m.push(`rotation="${d.rotation}"`), d.locked && m.push('locked="true"'), d.groupId && m.push(`group="${d.groupId}"`), o.push(`<!--@draw ${m.join(" ")} -->`), o.push("");
  }
  const a = t.filter((d) => d.type === "text");
  for (const d of a) {
    const p = [
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
    d.data.opacity !== void 0 && d.data.opacity !== 1 && p.push(`opacity="${d.data.opacity}"`), d.rotation && p.push(`rotation="${d.rotation}"`), d.locked && p.push('locked="true"'), d.groupId && p.push(`group="${d.groupId}"`), o.push(`<!--@text ${p.join(" ")} -->`), o.push(d.data.text), o.push("");
  }
  const c = t.filter((d) => d.type === "image");
  for (const d of c) {
    const p = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${Math.round(d.h)}"`,
      `z="${d.z}"`,
      `src="${d.data.src.replace(/"/g, "&quot;")}"`
    ];
    d.rotation && p.push(`rotation="${d.rotation}"`), d.locked && p.push('locked="true"'), d.groupId && p.push(`group="${d.groupId}"`), d.data.alt && p.push(`alt="${d.data.alt.replace(/"/g, "&quot;")}"`), d.data.opacity != null && d.data.opacity !== 1 && p.push(`opacity="${d.data.opacity}"`), d.data.borderColor && p.push(`borderColor="${d.data.borderColor}"`), d.data.borderWidth != null && p.push(`borderWidth="${d.data.borderWidth}"`), d.data.borderStyle && d.data.borderStyle !== "solid" && p.push(`borderStyle="${d.data.borderStyle}"`), o.push(`<!--@image ${p.join(" ")} -->`), o.push("");
  }
  const h = t.filter((d) => d.type === "edge");
  for (const d of h) {
    const p = [
      `id="${d.id}"`,
      `from="${d.data.fromId}"`,
      `to="${d.data.toId}"`,
      `style="${d.data.style}"`,
      `color="${d.data.color}"`
    ];
    d.data.label && p.push(`label="${d.data.label}"`), d.data.strokeWidth && d.data.strokeWidth !== 1 && p.push(`strokeWidth="${d.data.strokeWidth}"`), d.data.arrowHead && d.data.arrowHead !== "none" && p.push(`arrowHead="${d.data.arrowHead}"`), d.data.arrowTail && d.data.arrowTail !== "none" && p.push(`arrowTail="${d.data.arrowTail}"`), d.data.arrowHeadSize && p.push(`arrowHeadSize="${d.data.arrowHeadSize}"`), d.data.arrowTailSize && p.push(`arrowTailSize="${d.data.arrowTailSize}"`), d.data.edgeType && d.data.edgeType !== "bezier" && p.push(`edgeType="${d.data.edgeType}"`), d.data.animated && p.push('animated="true"'), d.data.animatedDirection && d.data.animatedDirection !== "forward" && p.push(`animatedDirection="${d.data.animatedDirection}"`), d.data.sourceHandle && p.push(`sourceHandle="${d.data.sourceHandle}"`), d.data.targetHandle && p.push(`targetHandle="${d.data.targetHandle}"`), d.data.midpointOffset != null && d.data.midpointOffset !== 0.5 && p.push(`midpointOffset="${d.data.midpointOffset}"`), d.data.curveOffset && (d.data.curveOffset[0] !== 0 || d.data.curveOffset[1] !== 0) && p.push(`curveOffset="${d.data.curveOffset[0]},${d.data.curveOffset[1]}"`), d.locked && p.push('locked="true"'), d.groupId && p.push(`group="${d.groupId}"`), o.push(`<!--@edge ${p.join(" ")} -->`), o.push("");
  }
  const f = t.filter((d) => d.type === "sticky");
  for (const d of f) {
    const p = [
      `id="${d.id}"`,
      `x="${Math.round(d.x)}"`,
      `y="${Math.round(d.y)}"`,
      `w="${Math.round(d.w)}"`,
      `h="${d.h}"`,
      `z="${d.z}"`,
      `color="${d.data.color}"`
    ];
    d.data.fontSize && d.data.fontSize !== 16 && p.push(`fontSize="${d.data.fontSize}"`), d.data.opacity !== void 0 && d.data.opacity !== 1 && p.push(`opacity="${d.data.opacity}"`), d.rotation && p.push(`rotation="${d.rotation}"`), d.locked && p.push('locked="true"'), d.groupId && p.push(`group="${d.groupId}"`), o.push(`<!--@sticky ${p.join(" ")} -->`), o.push(d.data.text), o.push("");
  }
  return o.join(`
`);
}
const wi = "data:font/woff2;base64,d09GMgABAAAAAMxIAA8AAAAC7dgAAMvmAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGoNAG4GOSByFAgZgAIgKEQgKiYBshtchC5IoAAE2AiQDkiQEIAXzAQegB1veTnIjbLdbehFQ3gC47dfXFsVcELftCZam59bDSCQlLWHbtB4C3QGiXtrfl/3//2cnlSGzDSwpgJ2bql7d/x9TQiFTowtFdwpj9GGzW++z007NWri0WGcTyTgrkbRte+ZmE5LFyWoXu652KxrVJmbBjm84B2zLuzuCh1LPfXV9eV9A1jU0Rne9+oXFL5CuvzOzpZv1BmbxeTE7i+9ELDk9i1ZAHKr9wce3oxeFRPjjf+nfjnV4wMf6ChCHkFiyA9VNFPaH/okkgU/9ZWBsjLR+RHTUrhNPVHyH5+fW+/9vf1F/UWzANsaoGNEumtrG6JIQWrAABRXjCCvAqDPrjOjz1LP6jDq9UwPZdWvlxQXhQf4p1vjP07dnN4AKETSDC7utbwMKWFgCFRVWBPzGltsPV5qmUuYUkYN/nr4O9nb/WeBBGCQUWOMJ5xElnHAgCWTd/7q0VP/Zo2j/3vZ7sjPrzNwVNtgmweBwZI5TgADFIDGSMCHVdNtvUXT7+g0ACGnOXB6bkRFifrpTqAQAS6z3/sU5rb9w6sqO0/KAwcwTSEtUKozH4fLzw+g5HF04nNtko+fx9m6fdRRRwNEoEIion35b//dFK9bAeGZQRxywdpF21yi2sLZgW29wq335lZ89Ma9brm5hJUl+A1Q8kXJ1q44ncIHz+eCWvfl8mckkk0wyySSTJL9a+9y1sxX3geCAobvfAW3FETsd4YGEBRoIqEBrIAtQmecTIxqcW1uOVzMYnBd62ynCxhguT54KwaERHAAown/92tvVif3wJggyyqOTpyIT213THaRFdMsK39Suz6dTcy/b3etmKHFgTrfMzbA4UQmWrdtf/1+lO0cmUIkcmuOUSJX+L1UrYI/E2z0xKHSWLbmtnuwwKdjjTYEkJiRNDNc5VV2rrr/qAyiQVCgAJEFJbotBwanblOTUuYDakOYrnX3d167dW3VVt1oBUGgFgoOEMJrBEwgOMz92mLF/YkOKcDVXSSgTlFqBYCMQIEAOBNvgXF31w2nfff8vp1XV21vV29sHQcOCbDXM3IDOe7it29udJQ9lAcC+OldBSTIERJaceCDUQIMYWFyzoyQtj4weCzUh/4XKMZi2UpSTkiIe7Ty2b+F7iJQWkP6fzbRdnS+MFWDpovVLB02Tplt9SQezBt2Y9kYGaWVco0Z3gdmEBSboQlwx7KxlmD3TbnBl3AvqgjpXAaYuTWmsnKJLmTJlyjyXvsppsW2Tmv236fdiy79g/1T+EUkHJDRB5MwdH1lHV4NXlrU4peH6rj3z5Fd2UVphvAGUAAYC83ked3GLst4i+s5trS3LQj21SxAmweTvl6ZU73527tZV33UFXda18IpSOkAJIdLblq93f+RIbtJaI5emyFVKlzNzX9qbk5TW5YNpsMEg61wrS+mElA5LAyQBrAJiwwSQBNEQmgkE4TQAx6+W32zICovF6BTL48zO6+7p/X8v5CxUz+zlpCArhdMI4fdOnUWCVctlOVKUOEth5cBtE3WISjfFBvIs+Y2T7/+3H62iFjeSKU2l1d1ZFUffe7PyB3XLJEnBpHEIjZTuIJagbSREiPRGiIRKxH9+v1KdpAQ2skBGVy1MKlRthScgBQDvvxf4f/Het/QnwK5AqAgVkw4RuN0t4LkzRfe3QKq2LnWVrCJkhawxFXLlyrQqrZpJ2SGpxMgavYUAp81+m9wzLQ4n8ljVtfIzZcyhxlLI1oFDIiT+sUikQGK2V78sCMnuaEizO8HE767/9Z2I5cuB5P/XspQSymFCF4zxhKcJo9MHEUoIxoSYVqrec2ty2rl0YXE4rBl6wowoil6XxzcxZ4ltSamPV3LFLCYsRhhjhBDDMGfuZz/Na2vS7uS++rVGBl6iIoK8xxAHs7csV53Mmj1eokCBQOszpQIJsgv/8L+pdWZOVDBPIGWi/+MeXtkNAAD9Pgb+/pwNAgCAB4/zlQAAHr6uY0BgdAC6NDNnDlgcJiYcuVgQnVyQBg1w2vWBDJgLssBa7NHvldHWOtEeAIAgEBFAKFBoCDcMZrc5Wd6HHE0Y6RRqyFCnDw10aDKEVmNo8z1MQocebJiCDzOpYRY7zJOGIUVYrgor9WG9NWy2DVsdwg6nsNs97PcOh2jhOCNcIsNVbrjOD7ck4Z4i3FeHR9rwRB/eWeGjHT6L8AMjXRMMIwAKhVEARYaFoHzzBRVUMLiQQsCFFg1KkwaSLj0kY0YQHABgAEA/4O8AFXF6m3FMKhgy5kkBUrejpFeokcWSlVgB96jHBClxesGkW+L9Es1PJOqVzEpiQR4Gfv0oak7nNPKKF2lJON+4OBG/6qSTkjCqiBKs2l4MiEjIKLQfCAQNHQNGxleYOAZJ0uQpU6vFeD1mmmcZGBGs14Wv5HHo+EagN3Tz690q/7DlbZ6y1W3vUfn+Le/wg63u+KzKK7Z80LN3f9hzCb7gI36GwkCPuiYAbseHgDZ79JNikLBoIR6HEzlvgSCck1Q8UcywfQwI64wARHy+Bhnh7fBIKFi4RoD30u1Fs9kXeBjwK40ZfZtfHkb/y2Ir4PGaZo49YoN6+CXYFr1AaN0mq0eBVwgyBAWEAcYEY8GJA8n7gxLnDMk1yW0r0MCjDb6QDz61Uh4FG2AcECGYGMINTA6lAAsGCwELh6NLAgMjMhMGCxI7MgeyNFTZaIoRVYC1JV27DqjOhE3XBzaQsAUWIliaBEOGkS3HsAHZVmR7ofZDHYA6iOAQ2GFkR8COgR1HdgLsNLKzyC5juIrhBtgtsNtgfyG7A3a3kweJHIAHD8BDAOAhATBJZICMpyqhPJE8Z3nhiiJkIqWiZGJUFSuvWFGlVLWiOqkmeS1SHWXWu5mMUtPd9EPZgMxsmWXyVkitVfR7+e5oOxTtU3RA6rDUEXnHpM6XGnCUKLnJG24Iq3HzYPLssS6LxvgbO7oVDZ/UyHw2wqMGDIALNgAcYgByxNjESTCJU2Eqp8E0TofpnAEzUMMMz/ArKIUZA7nIFLIxC1iIo2hJMbI0E4tvn6dQQ50SpWMfY7QJ8l33ApeWYj3n/c6H3gY0j1HBXjBwqqHWOEohTvsKvv73Uv5dYV/jJhF3UcBiqREtSsudGxBtkec5NPy5uLsSDhiAo3iQD5DZ+kGa+7fo8VsIw2ZEHDEjxrVFj6ILfqDJ3bCkDONngWdg6a7WolcKoVALtLI3CjqnKwBiFzsZxeweq0rX8PeW3H7EmSPl89fauU64K+VvmsUsw+oPXDwxQRsj3JIqSTeV3EV2FWspZ8tOMtmbRjS5oedzkVIvDkY7DZrC54vys6eklUQehmYSVcIShG5GDqWD3myH8LAdxY4yiWGLPblWbrGNdN5dWaXRg6KyvmMfD1ybTYsxHOQh0mQKTGtFtOlSq3tjcYCCYNti7W56cwsxtKX43PvV760UHrzz9Z/p4csOzRG4/ViV8SOcOaF4OVa7d2bR/PqBrVu+/aKbi/u93aL23onFw++y/WyAvg5AWmGaaLzTXvwrj8NnV3jsitWg7+Nxa1wd3U9tHd59uth+jci8Iiotfq4UP0B3pj0jZbgm/jApknPYxA6JsBrVsW6RNS8kyVGyBc6BssRAGCznHcIoo8/z9To0jHicskzkmmsLFY4vq7q9C0RS66rCFoqgnQYS6LpgAhqL3HktBzMEwqFxIrXOBsLAoNXt/IoEuCC4Zp8KA461CbB4qCSdXAYosjQQPAC8UV0YD2hyzJIzFHBFBvOai2JNbCvdeqQHAi7iuxiQ9sAoKWXpMkasLOWJz2SpzkivZXBXa+Q6qtSUz0Mi9ZrVebI5YSofjRIKeSo1RTLF23KD3CUPmJxyEiDm9u1Eg51TajpDT73CEhURJUYgwetcg5bLXJd+2jvUpkyXXCXKXHgUyzf1XlGDdIXEpyvoXe1WU4B1hypMRMQCW0ieEKvL1BK6vqhkSNaz9lakengG8dnmiGyxViq3b1Nu4GS/8c0vqE5y75JC+sk0r3sYU34QPQEcDWx3jL9UwQa0K3koRPaSByLWFOhtVn1Ui0a6nlPwgMqnRmzC2IsWolUYQIiCTzPNsCPArIGMWvenZzyW/gQzifrVZcXL1mm62TodYxx4wn9eAQbijsuaO3vCqFExEQdkl5idjQo/8rvs9+VogWxcwbUBwArBqI3aR6rOLEBIIw6mM96jHQnKAyRUoYiozp2JAj7l9Opo8ZTby+eO1gDuO5oEMc0Bo2CbqDhS7NiXywiLgQIpoWcvL8KJGPvHzh6QVws3vtnTTcX5zNaEOLWbe8R9iIfuEwJCbVH/OC3KlJimf+oU2SmeilMA51CgLyPj29MEnXrtEsc0wrXWuluGB+o3YkYe5blD4m5JUBp2w7iO3m3LcV73x/P9+f7+LSpKtBixdPSMTMwSJEpml8IhVaYs2XIUqtCgQ6cuE03Srdc0080w02/6DBg0y2xzzDXP/ErnxIsstsRSsYxPd4WVVlltjbXWWW+DjTbZ3MyR32OfP/DP3yFHHHPCKaedcdY5511w0SWXXXHVNdc98sQzL7zy2htv/eOdDz765LOvvvnhPz9ZA2ggHISHUIgAESESRIYoEBWiQXSIAWEyckQYoApKyipUVXVNW7bpWgwWR9uOXR1dfUN3vvgqV+IqNeFE6mmGNTgb3fuORKExWByZSmdzuDy+QK5QqtQavcFottrZOzg5u7h7+1KoNDoDRjGcZHO4fIFQodJodXqL3eGy3LaH+4RfSvjPAByMwDgYD6MwASbCJJgK02A6zICxWLHjxI0XP0HCnBIVmLKQQovMCBLIE8yACkaG4QEAcgsA0CQ2FmQbACBwvhlbRrRURsNPZ5IdquQLXQALWCENcqAIKqAWmka1S2fUG00PDTw9fP0/MLeRvknXwNrZO2DzxI7Voi5e8t+qf2JBRIgOcRCMZotlxyCxE5ejWx/liZtkE0/iYMlMvlRttHX29Ac4L/GpDDZP4pfW/BkOAPiqAMDXBuDrJE6WZ/6FFJUqQwnZyyivkkYC8GtraWxdTWlms1rQUKtaD8AfBuBPdqBjnelSN7oDwD8B4F8B8B/61PcFyOUIFWGtYF0A5FbrvYGgKQEANCX7xXPVPuHhAA+vgzFHOtXFnfYt6w1XN72/N+Hc/RaZsL3Pw/dhOBGIxO55qBUnvaLHqGrLqdebDaspzUNC1P4zgRbFMlcKTuYdAB9oBY0E3tskFs0NdfNd5xe2gYfXQlHAopiEJCpIk6G74DQAiPbWKZ70/mviOptUo0YloV9hwjwRgEUwT+ZJIrgy90U5GTFz7DwcRqE9hjFARHXSWDtv7HO+4t+bXJVYsrtM/wBay1dEkeMAAOXmWZpIOhWd8pyIo146MPXJEJUs4SRNirKyKMd41KpZPWvEBmib+e7Z85j984eZxZgu2Vfh1vw5twd4QE+MK8ra58l/zH/z//x8JgqTYYph/aYyLWYmt20EuU+cBq93LkwMDZMkDlkKlKnWYLTxJunVZ45FoHo0Tua8UGxjJs6B8FbkSC7C+Wd+cfHbhvkm0EWsEgwrnVgMB/RJHDktKVttnh1zYC7N9bknDcqCYrgyrAUQSKk+AChnkhSZkoZiKiIWwe7C45uBerX2kukK0m3/PBHnwNzLNyid4fC0zNSCVOA2n66Pjbbb65ATzrnilnseA8aeAQCYu90/IAAQRZfe7qNs9/cBYDFgYwE+Dp+Fz8Hn4avwNfgO/Ah+Ab+L/8XoHwIwrAWNySAZnd3it+rlowGaZlRsCvUbMLsYf7Aqk4kC/Rx76nRlo93SEDTbWbqtemYf0IaVjT8YKNZ7ZYUVKdtItnAvOHShBbrnLhuCXKBAjgqtCHdmGb/t9HHqJQT/5xRmffCZrMmZ3Mn7uBOFkige0hUzUmTNgHAyrdM27TNmxs64GT8TpmMmtWKKoVkfd39dF8zCWTSLZ4lF8Wpp0ECkdtRWEgq+gkWII5pKazrse7hA8caFANmMPJNyrMTxSaTCWv2LL56yGTl102YaXMEFfNMw9JaE9rYrxcmCFwie/KkLvnHtezHu6Nd+wv+3+3O+H2DcCOj0E4jEEqlMridElARpchSpUKdFl/5CRUuULlexSvVadcsUlaNIhTotuuQqmx9//Tc6ubh5ePn4GzNjyYY9J648ePNjYNysZZv2nbr26N2vwdyeE1cevPlxmJkhb0Jicmp6ZnZuoBDhosRKkCxNphz5AocMHzV2wuRpM+fMHxyZIFmaTDnyJUFC4LwgyYqq6T4RKQU1HSMLOxcv/6LSiuq6xpb2rt6aUh0jCzsXL11cMeRQUjTDcnwYhsTgSVQGmweAY8lMvlRttHvBcJ5EZbB5hNkXO0vfhsbm1vbO7t5CJcpVqdWgWZtOPfoVLlm+au2Gzdt27tm/uLJBszadevRrAgDHD4BgBMVwHggUAhoOEQUdCxd/UGhEdFxiSnpWbkwoDhEFHQsXTs327Lv/cGllbWNrZ3/YmEkz5i1Z9dmwbc/A8LGTZ85funrj9r2D8XlLVm3Ytmcx3jzuvXDx8tXrN2/fPeiI404564LLrrnpjvsOPvL4U8++8PJrb77z/sMnSC5YtmbTjn3LEGg9iOIkzfJeSFRCWk5RRV1LV//Q6MT03OLK+tbuzGhOUUVdS1dewVqqx2nZjuv5Y5lSozdZHW6fIJ4tN/vT9fH+DeJ5m1Q1tPWMBH4ycAwyA2PwGGKGjOHJ8GeEMKIYKoaBkcCwMzIYeYwSxkhGHaOFMZbRxZjCmMmYxVjAGGKsYqxnbGXsZhxgHGOcwZ4iBLwHANajgJDF5+Lho9e9ugY3QDGA+lhfbf89peAfeBYsvRJ17FS2NxsHz1UxBaiJmj481bC+2NTGU3HLnJr5wZPBr2gQ8fbGPK1hAU0CkBb1WQP+BWCySpz3s7ctrj8kbpaNAKFRJCZEwQ7TkqCeUwTUI1EsQSboFJCBEFC/iL4T3Qqb1ORPaL1UZSCPX/sd4tYyluTf/aKWQK7opxrqGeV+pcu6VKrqE7z2zcPxlfuxNFWp09ZFL6Tc/mCest9za3/WVuTNeJ/roONj2unZQHi+vxcO7JX9OEUt3lN45E5Onni59fMSFNz+YBG33eHZ3pFzG7vd5/TcmWe3W8e0m6yPHK67Gw4akGVJ2JhdzYY0Vfs+IQTbx9mZmXPL9YznOwKpw27lkwOAiXk62vVqzYKwtTaJACTU3ks+WHddimtIUIBHSmDSdLaqRzZOOrAK4mCzE72U3qurdleVNByO55n+WTBmNKr9lvdxd2CSsh/IVAtgIF6rUMp4cFqqTkptDLnzyXnOPIoroxr4QSksqD3ttEJDdN2eQL46EIzFI2ABnK2sD/tqk9fgBbWvEfgy4n6KPClfbLCLeGSa2k5LRiifIPWLDtlWGxcjDZuMD7kVuD2AWXrXSKx/UpL8jP+UlSTWHHEfUEQJSiUwlNqjXCBhm7N0uu814F/tdVxJZ1Ba2e6/5pWTINMNDxdDZ9o6pEv7kv1QmASBCs5RZInKWNfLUgqzGIhA8/Bikw+jnwxngJzOhLMQFs9srJCVsxrYmXe2P65gF0uflpXQPyeif1O/HskY+23z9P35bhvphjseeu6tTzaWAGAcgGAExXAeCBQCGg4RBR0LF39QaER0XGJKelZuTCgOEQUdCxdOZbYHw0SYDnNyOmX4669vwUUUly5L1tLKqaiKamuqvY56mt5A81rSita1uZ3t70inutC1bne/p73uQ9/6uTiEjGDLW/HK1nP9N2SjVrWGTTg8KumP32s+2k4H2TzgXj6ISGuaeIxedaROx8yVAEKb8K4igXAeykewo/lNeKfzL/LbtGoiY2Sr8WSPzMd1KBDJHc9RvLKVQZ1DQcnp2I7qYNFjQS1KZT5M2IxBoNFoC8SX77lwgZyTESfCCX8WfHJUggSEPFGGDMvbTSh0mQo77T2xwKA5nN/cpaSWWcvDepsF2GanEHsdFOGc6+I89IrJG2/YLevTTYnreMtsWFFKj0eN2uenXkd9XKVo18usqXpg79U7ut13o4rt9rcAjaDeOg2dmMKBK95g+0RVblLjWplJYBWdgN2inLi6ztO3cMwi4QJSdAl137eN0gdD5+UP5JCfN0G0SxqwnusQT2WZh3EEaBwosz8oDTOCI5LjOE1G4KUTqkNGJJr2GJN4lwQwp1KRD34Qq26FYpzU4Dvi7yS/cRlv/hM3caKLLErMkbthknbdAmxRy3lLaA9pIP4Q6Ff1Eyt30oK86OwrFG2UsvNQ9hZJyCUnUT6vbuFOw66QIwPBLSCfmNSmXrpiNyo2wBBSxpOlWa2SFWsyN7WwSpNTue+RKRHmszD44hcs5V2hXAQDNBl2Ngk0YIIkcEAWFIwqA0C1bDirdi+PL2z1YmrBDg+88ub8RRjl3dUs96/QYab5Mwh3GcRzQ898xhrxFtA3J+DICXiQRz48XSV7chTcIt7PiA7VkiR0PxwCfeXLakYUr1RFS3wdCy6OeI0uJYm7HGsNMQDxFjCE4QAm+OSEBLxKeVwo+F/Bc1MTqwwFKdIeIdPmWq3WwbZuge10G7nz0+KSQd3AIeM23YGGZIAtiIbovTSTcm8+AIRdxO1xEz0xEztxoZmGO7wRjpMgs8+iYJELkHw9EjSwgHrie3uyjxq1dosuQ0BwJIs/ke4FOR2YWm/EQPjywexZCIdHOS5fCDsmBwjKofOaD7lYJHEosW/4pf1rc7D4rlGp6WmFTl8umI4dLsf0wSPWWwYA4l9pAD0b9/1unHsI/MeHARanrLvtQnKI5L8w0nLRC/y2TMvNgKWQgi7h+BJEnvaTxLclAGaO83czbh4DIIMKnsB4v9tid8LHPONnYH7ZWXj7O9ndxSFUxHPHb+9O38Ed3jV7cW8e+Ufx0Xz0H38eL45/btJdfpQoJIGSKMn6hieVSf1lrB/wLwGQGLLBdnsTOQkzMP8lQPVPdKslTigAkyaeubN3+a47GYB7/tFw9B23jofH25t0lB8k7AtEMnaY+QMq2V/g13Wpw68Ue7RLKxQtNxF5BcewimaAn5f//+x1O+2yCP+9pPu6pQMB+P/0aGCrAODBr/ZgPPDg8MD9IwAAAkAaAEYaL3YOmQCao7bpVUAUKT4PykuVzVyuQqWR6l5JvQaNSZrksQLQ08c+KZFhCgAAtNpgO6jtrGtnfBfg6pm8FIBvEeCWpbfKPUU+YbrT9WPr0Mjgf9QYOjcgYbjr8E8nqfpFX7W0a3HuyMbBxcM/JwIi6XzW6tmlZNzIG6C3ePPh2wYtA4c7Cxn6ijOCipqGti1aGgbfIr45WiRJzsrWIk1pn1tuo3R5rjz5ChRuG6UTdJpo2if64RdaYJElFltq2HLLWqKHrrZK/M58vY173mS7bXbYWZla4WaAb6nefNXX14+p/JOldAAAowBZQ6AMvisAvRVY6/iHO9FWbYro0H1QWYdqrgKi3Ti/hQSRhUUp8XZYWwCwJwEAfIc88xKRyz8BoKEuSfMw1iRjdOsy2RRT9TR+fxaA6WaZLf/mVdRjVBPt6EavMaYxjAYA0CmZX4YfD/ob3DsA3EOBI08Bf79/9NUFpwqHz+T9NAJ6nIO9I7F27+GHyHrHuGooMArnR0llwAj0yDlcuiPLfCWepzjqdDF8Dlo8hVI7JM9q4AoEFW7jESJ5L9B8s7sE3Tqow1VFx2G9GNcj9/jaSufSOopD6CS1pa+rYd2w8FEuo8twh9BTn1yMZe9xMRjz8jkOQUGcx1Si8RWC4V6XNXGKBeyho6eaekk7UloJP4R62HR9GafLCmEQKqgvuEVHkFiUdWkinL5sYN15RzR30rVUTvjh6yffCWZGShjpfF5vLUb1YlZVcOsqXL/dko/auGgghGpZq4K7ffQoF4kTKTf1i5vF2To+jbqPV4X6brltvzs9DnsfVpNnQe3GNKmNNOz2hDo6v/CJLKlzde5DsZFqZdzR7ezw+DaYXdpLG+V6ib+4jEByUsMqfbs7btBM6RtZSgw4OxcqUkl0m14379Xz3qS7lY1EGoksEnkkOpEIJBJx8tfU0w3dsA3fAIlpzGIeAwlrK6dQp4U6K9R5oT49hoDcSOleSEMW8hDIhLXFwEbURsxG3EaOjYDYCCeXYnZBdYHpAtcFILpAKCkTToAsBd+hVcyqmFexU8VAqrgC1BSRRS1mcQtIwGb54L8Ul20k3yRYEiC+RHtT5rIpd/kUXJgqruIXlR4WwtpM2MiyTlsBRP8CH5sqiuGMX/AzuICnR+1CW3Of40cPYoc4sUzkGAj8CEYM8sFpYZfwKVd5pM21LlNZV1O1LlZxV1CFB+MV89lK87WV4it7pUJdlqu43RygjUUZlKniP/kWsu+Yy95prvZOcZVTNmKnfMRfX58qIyXeHCu3+Me3oWM5oWzJIVgQ4qSFkyHKWCjzfP2BH/MJD/gEyDM2Y89gBs+UmbL8laWWTMxKadYzRcROtZF2rN1qKnAFACdLDspQxh0ZAAhOooyiVUq1LJHzAJEowAbWEEOhDn040OU8fOtuprV5tsa4FEf7VKdWEnemu1teHveb8O0qiIH0gRA945EJ0UkjX57Krkk0K+ENJjrN6Z4+bAWZXI8kqkliNLa/G58NPtWBNIBkcqRBBuTT1WxDN0DetNj5aRwDOT1P32YuIubTNhxGYsrJbyn5m18OfR+is8frfvvpcXsZOBo/fOGlSka2Kh5kD7KmjfRiCiRnN11Hd16rBaY98KFYa6TcnaDxTer2wJ7cKBkifVv8dtbL176m37bUHxw2HRHZ+SOpO4nDxAOTtWgAh3viUaIg5uG79OfzcW9bFVTsyy35ex2FYoj8s39tOZA/0GP6gR2zD0COgUxoQLcbJahTkGileaZls9m8lPmDD8pPCe3ZOLWSSuK+B8KcnxP5XD04ZYyU1fKhjXSBVLEV5OsT5ducw1wAXC6nDwYPPczJfGOkZ89iErmo5CaW567y7DjK8vaNyIstvO5f5yK31QzPxMQvpGDAFIhmPOcSOpULJwiE44D0gfAk1IticdJ07uw4qq2iPsOU8pFizC1zVI6w00co1VgSAH77qY/+i40vIMY+q/BUsHNlZTqSRi6O4nE9p8tAP743TDJ1DVWTISnhGdA6S6cRuXLL95INKzjqp+uuYmWld3Pfg8sx97BqdTAVholIKZZjzWReqG76QGNoOtR9EeeNBKoh+dN0UxrF3DnQAQqJEC4MdiKHXgW0IZDJPNSIMsXEOb5RiQkMfDKdUkMy3DAtmWNybUNVHel6tGLGrg09tMWtSXwZmULzGXsiFaIpVC1sGVva8SwEZFssoiIVQhCtpNMxkW6Jrk6qIUISoLKvGmagfd23aN5otths+lzpsTh5DABB5EuFnq8v2/zL10qhKMJ4P8PvYdn6WAbMyGEDxVDjlpcUvX50DG+Yws3JLeE/+iDF5Gri+ciVYOAVSAag3dEQdbiV+XktmVlZdpcrnzWna3Y/U6LJdhp4IdA2WFP22NgBM10ZIIQ7JALRu6mhO2IsXmyKN2DX9JKi6KkScm1Eth9wNXuBaO0F2STdntidf55Sd5exT/GkukBxgG8lQ8loI+s727PpUzk49ltn1mtRIq9rfeA6rWAbP7nrBJEugHTzpqiG4jRaygXo5Go13l/jfXefBVbBLRMw+o6kCv0fstnspW9SBbYBMoEJzRprylCez5nuaCdSRlTOCsYEg/Q5+tB6S1h85EBSTeBf8aav3kNTaBpeDJ9lG+ECd4sXwOqxdCMNLenN9b5Q9plRSkSRqZXS9uRGLq1XevbBtq8XRovJsDmXTYrcXUf9+UradKMe8gRieS8NSDRUFMaZJJaIfkPxLX/CyVXvZO60ICx4XpnoIoUDKbCUR++uOYdBePQyC1yWyKXlS1LgoygIoDJ00+XqiCf1Zznjz9U93hDrZDE5W6qGKL5Pd6XAc4HRWCf7vSGPUsa4ks0Z8zFhLuMcSBQpgwFxmozl39oJPOqPA0Os7iPQjLgQxW7xIpbEBNQOqQKd/Z4OpJ4ezhPnSZENMZzo6xCWyv7vvrYHMDGf8bKnXM1GQgJl+yRoNNGC7aW3MTbk5ptU37ZeUyzwpbW4XgB8C/TjD4xmtPHMmQd0au+1wChcg7RjqEi++WGeIZaWKQ8P/Z3H1eSlT5+4+xiZivkVrfm0/CIrtL6+0AyDWtd7DQ/ZHO+hj/32rcs7zydZZT+vrcBUdRxEOhPQh87e7QeX988DhUQvJc25dSHY/tIKjggsohPbn7ySRJB1FGuHVFrtwt15Rmvne4F5CfOe+hkzscUi0DulR8efiqxFEUVlHxlT1GsjFXhndS+i4njRFZPd04NXG1LQrj+sEJjEJt+K42R3am1qJtSoXo88rku9y/VK2ZK5KB3NZY9F/Dw2kMyCaYD0sCpCNZEKxKiWN7TmeF3XA7ZQvU62YQkJ4G0pkAYu0oYLDFaCjAi5JkQSbK1O0XRSCn6Top0OF4V4tPt0ctGKrJ/QqWGtq6M6OhYYGHr3zRW6HLNCVKHYxQhi7q8VgeJrs1BStIhPwxuaniNnczcDoL0AkmPiLH4+znfv7z65azsNmbC0N/aoxzozZxG89J9PipQRl6cdnyFD+/0XZ0D64PiNzQtGG7weV3GbuaqUNuUhpSQIVr20xDNxd16/Rm8P79xc1efoGNOen5jL/ieQ8aE2pgojAgP3I9g98LnpN643bFG0ISBSs+px/5EU3NGaYdIQR/MscGa9PYblCZUSlX27jd34KK7iaqNAfmw5LU4eXxBtz1BVhJ4YLtr1FSPFfGQuqyRzUUOyWUL1OQeNWyQVYmKLno/vcKQAYjXlhYKgEuRBMNCHbpc5/PcnYD84zvOczr6ODlnikTNnduh1kZ0IZIeMOFzBWuoWMqxWssuyVu6rnAA+bBYsm3THo3odLxkUFkBBYN2STd5OIJALCgCZFZPtUfSS5A3mXUztuC5tcU4kwsR2kpIRr06AtJ+qfJfx2JQnAfTMoxRfIdZAIvkR3Tfax0NR6yG/5yLYb+/6mUtkghruamAFJhDeCG93hH0sd4KBydKN02v5N9c4i6/dvCn8R1IVKu8GVuX5nuDJ5PxlPf7NSsqfQl67NcdtsM+Rgb4pN4hFuJFCe59gxd7xz0/Owuwtks0oTVPH9WzxdVewOMCJLDJLqD7+TIJwBbVZl7Uylb0XCXwDUPmpwmySVlT76veuEUvKtrNgEWor6PveZMMKns4zo5S3E6XtzC7rDJ8a2yYDcfvRfmBMh4J2ne/DmLopwyfvYrYrMurKtkzEFwUXDS38gN0ohZGgIWN+HB58VLXFUyAD8vOUERbVJDp+kPXdHQWxFHwlyMEUgo3fMiRH67JM1CGF2pj4tEBUgaN7AFeQ8d0x/5EbQ7a185ZLVyhXG7xhNWHVwNbqCed/sNQQRRJgIpTU5ryYGIA/4N3qqKq4seK2XSBwRCCkBsxgFKW1hrbVDGjmb7yuQSllHsSrFfbo1cCU5lX5cDGZ2Ge2HSpoi2iQxOKwGLhNNIOs/kG9t3JLSc9pgEXBFgkszjDGqwWfu8SJsUfHz6TgDUanjqk7J92exK56vMoe5jmThSzEt7yJEHZSMNYdilwjYp28DpZguGAhciYs5UwUC9Bfm+rRKIL1I700Edd2fasRyc30jDdd5pYtrtdLu+lQQGItEYv/etEtCpCpTe2tsoK5JtEbN3wL7DPyJ7v0ZKqUihBDWyq4iIYSgdVWigDqsHT4PjLFlSXZ9WC94gnm3eoTjBddEGJXa4Dn17EKyRMoCcg+rJpkBlzGmJpTDgd4JIU+2FNHWtMEwp6KuTdsqb7BGQMliywAHBMfnJ5C6FBriCTv+cWPd+/PWPwZRP1IK2RkiwFelWhJGaYqhlUHFxdvCnABhg6QFAEIXK/52D5UVism65z54K8hnVLXY7Qxt1MlDtgPLRAsbSQb9u3p+daq7uTH+b3gU2h4y56ZsLh1DkkpGubcriq6RYECJEzELj4pGoLtJWy8LRF1lFSFZALFjA4MlW2Pu4dlPm65gWWmZWloSWLLz0LhAgApyCSldeE/H83Spk7ovjoZIRARJ0mKWJ2cQLGWTKBjOEBrPLriZ/PHFFuSAjsqFohSt+z7md97mHd5Lc5ED+txHCI0N4dKHgTjsaKPwQvHlCRf5Kwam6TQjvIq8gVAX6O9kq7M78dgZXV8+vuHcmaRrEQ09CxjryP8AhdYE3aM14/alUtXZL276G4rUvBplasxOubxL7wWuIK9CfaSY+uFzbVTLJk0IaRflZ4i48tyH2BgE/YDUy9lnh3TP1Axnq1Z4AycsTMWhfjAzH9q93OcHNiDic/C0b1H8P3OPyefi2fHKLarWIAWJckHjEKzVo6lzz3bYxY9ptDFiHp4BiSbzCaBkJmCiCVAql0Xy0VYIO8uTih8v4MapZvbFFGHpA6KIqG5fQL70WPUhD4tQyPoRQTpjUjJv0a2xRTFFCZxlDRskcJai4jI8IEp8y3zhqltlPMphgt2weKZKKwec3THcJFxRZ6LYllp6sUxtdAjBNOxXWINRXZA+NLw1c75CsO07O6o2TOJEEiS8IrJxATeDuqAbKZ7tfQR2mYTgszUMir+Q0aNEtb90MuYX9j+J0YnG2ICzWjNCOdyy3nvixeKLe3RyanAz8ASl5Vj6y4+t0IxGB4vrg70Y77JmB0jRUMl6sNTyi/ABPznIrPIhgZGE4fENx6fV+AtYWJtjohkYODuw4ypWB/gGBe5D1vSlAZYLQDJ6YDIHv//R+hMoo8OKdj0CsII3+Thx2hIPV0W+QjoObg/A/IXXFBAJJLdxeKQZAP4McenVBgTwN5hyVWRLCSeibic8YFRbk0FBkE4lyGBTXCa2eI+Q8dfDWn4XYmUKM8YuxfjF92unz/pPpWpQE0Uw0RUXdhixxkc0dixbViJTGxV3LijqEv/QDytcvGqkI+qvcERcL7Sg+6cQOdOTGx/rVbj3OqdTIoG4A+NpOiYT1s8C4nQ0Qy3mfrAEVFUyrR5LfKqBO/q0Kru7msuW+bW50TWiIcBBNPqKjloAk3FyYNTseA3nTGJPg71qGSIUkzLI0eicqQJ8DD6NC0Vu26B3Yp5tfA5MwU7C4lsgJCE9JHHOsoyM26KI5ZuuxwL0qv1gI2Xc/eNLlMow7CFqaPYsGB70in8zJq9e9xJgDB2KzERFKIYBkhuHLQk08QsJDYA1oYWIcPQBC4fEszrPUe6I+ruUofM7VFX2ecHOMHGai0i7rCFbWc428VQAs6OoBkTiRSEQdB1uC75+qmuQd1d3rtd1e/gyF+IwY4cijWBGzhm00pRePxxLzgdckoQlP2xA8+O+ZnP1LlCl3lZ7ViqMhHj4dvSSDMRIO2nUhCEgERpuD4cWqJpaPaDkMx/O0ay1kSq09DQGjXWDesjgPapWL65bad7VdDVnzygCNpS2U1Cg+PHYoKzVjv30I/vVnwedYxAQw5ZHNgj4niBAiqkHDQcoszRK12q87IFl7UojWZU5ihFtKV3xcHjUzkMJXUfGbZAzFtn5Ww+n+kQJxAp0Nne++9Bv/Zz3UUV39Uve6rFyU/rqTCls5XL3qNUPNC62PUX67y+EaJYYh6hkezQDFxSwyE+IoF4cUxLyRjzT76MswFoxGqlooxMmBACY5YWpUanzdinA7ag0R2zkSh5I4WW9zsZvkONO7/9qrm8XZYoUlQ8+SBBJkl2F7s4+I0e2hKRQJfWmJNScc/YVOiMmE/z43Ck4PHU6ZlpwoLPsrBVEFxF/+mx0W2hsePJwyDA5lcBScGv8ydy/GAM8QNV+LksRr4kRt5qilUAnTUl8Fe8hvyel9Q/UGfM5F32hPg5ITo2PBJ4oiyrKAukQ3yssj51SBquy1Zncis5uI8hhKM67uldRSqKNUzCfgLxAyBdVEOoJaKgfLwrMmNXPY6CST0y1K109dn8ozxdwaGzv2oP90cG83Mppcz7inmtRGJXTCTDefw80N2J7Qy3tSHNltXzLmO+gSRCahgeS4ent9gZH1K5tGf2Xtx+wGLZweJqmLUCyCoRdZHcg/H7YVJIMLyb2KovGoKJsc5ayiNVXOv0iS03XvZfxnI2Z8X4lioOMBxsErGrOs2aoNOnC6peGRoPK2ZjLvGxFraAmipWDLbZ1xaNTDw1g1tkWgu8txpwZ/bc5P5aNpfJzsfoBTNmpEQCklSxsaGzvqvurbL9+spCq0mC4rz0PSrzUauDu9zumr2f5gnscmsiChAnJGsgCMgmpVFWoSnRTNEooD1pCqsXuKZoKtDnFB3aMknmrz6VtNY4XdWawjxr+DnOds6x0ALOFWePqXuHJU6AviSQCERyNt1fXgEIyYZs+QSIvVPsuJeM1OodIhmKt58Y+WCeBfaoo6zpK4vA0QQIHJU8cqOYe2ydOnaod0Uux3EYmhTFBRF7wCIDCt2zB4sMoRTTNah9jNKSq3odcSh8Lb74XBTgWzo8RJLSgWMZEzIpJltICkb8A5VSdOzdvw21ESbXQJZLrH+we1Mj3XRV77towzzgQdmhKKLUIVt45CpOt4YPH54wFXtxJRbRRn91nMPziEh+eqdgoWbiQOuPlyKbRHu5Zyn2jR17HsxnMpTkYpcyB/qz68S25ZDbcF0leFTM0m05Yp5tNqSAQiSFLcGdEsKlXSzaAoI+dsicNAqogYvB4KN87jjxJyPOA6bsq5PQm3pQnHICKpQeSp9F2zIVYpVx0BerYAXMrZHkTUVCQzB/MRMqS7JEsqm4Bt5YroEvu4ph6pA8WsjlkKMg2q0VY6vlPI7V3dAuvA2KIiFUemdvD/cu+XKRT8wTIPvLYsAQdPL3Tc6YR+bSqKFSEWrIMbkSZKbCNzD5HpJihCqF0kWGfGKf7mdA5EH8gGIyO6ZTFUK4qodS/yEfszI8nz7UwltHseSP9Wi0eM7c7vs0Vww/le7O3RdtoOpH1r+agqE6mmGx0K4lKG/N2Bguc0PmVE6POTxYO0g8mDufHHDAvsAaVcbBSyMIbdiURTYwwfCLnzjtrnpVlIpVFCmB7mOeT2fF7kHxAZCKeUop6tACKXUT/2TBqxu9zL9OkJ0mO3kOkMEjO1R4aHM7OZ2fhuWTmVuWlTtCGrIOCSnXcoW/MJtruHlsIAtbvJhd1GNXJ84+5CEsWuUlhyMjourjsZbzHSg/puzFTTiyPr0DnQGrlTIVWtlxTmmtiR5QtJ6e84E30ostxl39REXVEXc6IqqhVsTi5R7vKw6EVIEDJ4HxwqmrEwSdpWn4fLTMRV91lSvxcxWP7YIXw+wChUTmr+I2Y+U5iKBfAA6HnP0FWY+dQFDLDrPKSWxuROvbzhLNSeSiUUw1zblAR+kSILRW3FA7rOZ4KkkS3JWFvJa/YArexNu4XPDAifwd76ufYhgCe4qLCbyPTJG5ht5O2evqgNq014UdEsAwqrbiynf02R0JCMv2fYZAbAm/5KdDSHyyUnZZSeQjNbbuAbyH+jeP0B5v9k3FPA+1wPCxES3unCs9IHEgQXBTD487WG+zFVcDIyjmDKNoXzQhg0q8xuQaJANjBb5WyvvljE9YZD3nvQanHXTsMdU6CfW1XcbUxFULhvV7AmH/WADSWt1PVLtqZ2ZEEAisgGDI5DZZZzyQ947pUMSaBkeGFq/0oLgUtzr5vPng2h1Pr/9FBHvV3arSEzG0PE3IcFDEsLHAe9eCOwNXWLgCloHRYLErXok1AUOf1tNDV67MWTm6lDGvdQpiQ7KtmGxY1QXgREb8/95BF6KgMxxYPROfMJ4BsYg6eUD33dtm2bY/SIzd7EqKhiXOpLDpwe37dmfhwohwvltaSEHFS2v7V8QHQSqyt3400jT5QzaZTg2R5AN4OBhPBE1H3V7HyIl6WhWhUGszA0qsrT2rJwNVeDkk5xK9jkjuwrcMbx8pV/dlOvNc3m9xFhKrVpCs1U/fbjA0pbyxznTpujR0S+tAQDjpi5jIzq3A8abPQ87fM8E+OKwJGRdbbXCD8xGr3LvABjqp37K9Q1qdEoHRCtucVz7WedZ31TqZCnSUrfu08ukoklAaaHq8rnfjS9H6uaK22rtsOXnVEEU1FMX2/8RNVNJlWTskVhvncJcT+jkmKOKpwJqaCo0Od/Q0mJ3t7hY6YSATj+TJCBA+6CG8Fbi6A1WoKLpd2vKv9ZYaKYerYXPqkLzP62gJ+np2Gt0s8UQkGaiCrzoer7B0NFZNCYHj4sWaZQZnhbkzVbDNTSn43SuKXIpek0YqYaS4vb7WdccyExHEdffIj9mocwa5jCGTnmXtkIxjjKK9Xl+VTcBLWr7XqaCmAIXh+qX7cmI/cqDsT0p74w67aWGDzcLohQbtYcYY83afnL2lRkl9Qq6L469so7ReVFXIJ9U6M2KcW7BpCVXM5+HOsT8xz6O4AX1yOv2LNOfAPjxW/Mgjktf9rKsVAdvxo9DJy4gRZ93KlzoX1yRFCKwfOoJO2hPdnZc1klpoqX+3Ym6nYVa7Q+30o7KMn/gXX2txIYE565rgTII2VCEDfWdViPme8XVuiwOuhOX5LFyXaFUK/jVKJ1luRj6a/zKNBvZbXU0aFhiYyCWwegMtWAhR2A6RxqEoJFXUC6t3VGOpYZ3Z2+MC95TG7PjURrccTnjMaDgKlyjxESfil0idG4XROoSMa2NykfD5jgTVjCYuY8zgHJWgW4yxzJYXt4KjiSKaBPsBhlIaiE3ep2iWrA7X2B65biOoX0DgbvELoLqWy/kobIFw29XZ9SfMmqBvU70CU6mCyxGP+x6P8OVWGuoc5lbRmV1seYWHBX0zqSyTmPWxTls1WGBVNiV6WmdAXa1LoHpYdCZVgTAdZ0Tg6UPZlGexnPF1rN/ltQyf+DnXHtjBPjThCvXnU3R8s0EZWirHUsojN3d7bA4ZEGMgaSBJDU0OlWag11om61AwBiA5Bvhsk0rg7y5XFhbqrwcIBJth6LjHiTQUGDhF0mvJRb6anH9yR9Dna4vMM/oHoXs6IbOsNi6jaG1ub5Sg74A29JdZUcRdrToidKf3OXNQGJV8Tk5fxpFCJ+gtZPuftcKK3UQejjtTsqZQa9Z6PmaPq814MAgfOzvrOv8vMbcbMYYpX1uVh+WdpiFa16rez2tdrzgKEFjB8ol+wQ58PkOX3aXu1otfsX6UY7uMW4x1bmTVBS7GGa9Sjbld8hkQCLBaZdYSYLuGDYZoaVt655XsaMTG003nM9YNkNkhOB4jhLMWJ/Ky1dohG1ZTVIvIvAa1iF7rUUxL0hB/VUhsZzOWN4nQftdmlbtdFLlK9e2crLyL0ub87rOtycFFsX1yxxrZGVUm0p8ueSBQJhRmTLAAU/ySxz0Jz9w4DRvHQKrpTYk5jOOZ/2IH4sRGnG9L1rHHU1hEk4E4+HzMPG68MfnPpDe3Q9vs9r4p1+eMeDbyqihM7nnvDziZLQqtCzW7wHw5xIU++YU8IVf2tatNxCM7SPY9J47DX2v7lhBg8jNBYUst/kV5NH8SwZ5WKBFr9+5OQk5Mn9kfMCQFe2n9UlULTLdMDAtL9YBq7aRO1TDE+oDvpA4b+LUIhR/z+ERNnD3/SzE1EwYWtrwrObfubRMv810aej/0RhIH14C7fW8kfaKbirDvdI7+GjqebjquD6edDuhAHcraMn2hemuOu5hzPKNF1A90NaCpVJuQFaO67Ja9o099LKneqnGrHrdn+ry78fSLOEaIxf40P4aULsd7plsneIH51V251CKNXRDGxgNqW3jS4Q/HF+sU4Uwztslj+oMRxzorCQ9t9GAstSPBV8zpOOji2R0FXQbpib/Md+e1cUA+Hhus7mdLP/BsiXLhqILbmO3SJhkj7UXPVmfsmXq8skjLwA0/i5+iAULW1IGAwJzT2gEqYHdnBCiW1pP0PgxYL1F7n9QrlcZ0I+z9FTdCHq2HLtZjCb5GCsBTdVobn73TaIsAx+st56sRkkJnC2vw1TBUAqAUlVj/mMiGYj1P+/YYzfkIMO8NOAJoG1xcDHVuznqf9JVHuehjwFBilHjk7gNeNB5c7eIncIuXl3OgkZD40h8dffiSFKG6AFxwdu2h1ozi+CV4CkGgQ2L/Xd+7akeHE+XlF90erjrHgwCuSt0d07D/35Fx4SWlMz4tS9TyRiJB16ORC4LPRRm7lAK0tAY73LCtM/UekK2HmG9+rJN2vxifsYtuXW7SxDXg0psPp32n6NR2kUwNfVhJsR/1zP8C1jf03AwW+kcFHrw5BNK3ixHxBojxOFFHcj9ywtjU5xkhEmQmsMFqXlx7acQEPlccf2pvKpbASzoV3ANNIehwetfFKRZdsWG9AH/AmZfmR2l5qAgPrXvGiu2H3RiAuxPLIojw+qCzQoDRPXJDiNV8A3HtdBV7ZjqjPBJ599nsAuyq27vqU2gz5ZcmnlVmkLSwlcC1CnBHbm6SbU/DZsUI2dK8DIrbeCNS2GnltNLJX05AsnSks56rZskMfv6ycm+xWjebyFklaKiSTs70lQOW2Afyv+OhQSfIny517p21+pyO7HjCGOYNEVGjaEi6aFrki933wwK46v6p9h1fytm2+rzxzrXnJm+iRHq6KaMu7uHZiChuiZ1+QlEEyTIdpzL8wtBbUKOPW739VsvY430Vd9u1w/Y5bdeq+bVsjZqpojk/iemTEu2Z5CCqmI0cpYR7ioO+b4qim3miHEsjeCEmr8TXsVW1PJOh7RcyTRq7WAxuDTRj4luGTf22rQ4lfgOUOGFeGH86YogdE/rWmJfxUELUh05lWdvyDUeSVD7yiXqClBhGHwdCCsuHnSls4GY/zBWXul/6UBFWHIJ9MpjyyDnru/xxn9B/asg8WivnQzh/wqJmm5A7N8K7GjXQAHOcxzgpJioBNVQfCdHrl9WRtjrgaM2zR0aHm7QtwHGTbIJhGQwLy+fgYYH1zeUDyuOHD5iOiqe18IbeHXFCKwYJef/ZeMPmqgnJU5ObbifZkuM0OJ6ZTO2woTdnzO1SeaiQwId+nFlaXi3Sr5uT0fqZYzna8Wf+UyJvjhDVcf5iFc4sZoyYg6D85Tvg1g9J8O54NMUKMzJ50J6FuZn+SRsW5ig9qd3qt9k6NywOTDMCyTIq6di4Q709ipxyiG9DhC2GGyjq7Yr3GcadFWe3OhoQiKzpMNorBmIf/Kd9gr/HtYRF61SRXeNTVGIHYzwPUvQQLAVQ4jw3Gr+eNIx3yV+z5R5FflYJksaG7BkIjLeW18Lpz4L6EM46kb09Wv7lCLSHPJYrn2enu53ZZb7l84bQPxLvVv9QkT+Wm8cf3dGYaj3kxpLur1UWnaNgFfbrpRUeFAUEVtdXs8kfVzwNPq6zImkVcxwdP+IJEiXHWpLLY7BZIyyI7KZ3Rl55+dkTOk4DTHrdrhq4OGgxPYETirSnZuE0cD8wnXRV/MnhtnpendfxNjZxf0jZIyLBvtI8lthRnWY/FK8twuCVvwwHQhIcCURD5cCrRmUrZqyGf0k7sDZsEv+bcQARtWDiVkubI/VKEU2kwKdnIbWi7DHTyz+9t88TTUbNUV/Xtqq2T0fKkc/Rn774Nf0j7UhTmZNf/HvLNd5ORME5DI7n/qtzAvfde2+tPecJEbfnKhpHACkfUNRTJ8cv++fNxhtLzdbf1dZWwVLc2fMNwEQt0/+oFAyqox9MIIAaOvpPUWCgaA4XYt2R/oP9D/0po9PTXMyf6PEojdx1LMFU1qqSBROYcxW4Raw9fx6ze6oA3og5ikPrEnwxLO1ucYTH2e5AG36BsVAEe5DoTntkizj4OqspVvbByD5X/reh38/yDbZHVL2egSUbVOU03PIV0jvilVsOy6rfapsS/JfwQ1YjuiwN4nUEG0Ae+ZZuA8dTQg8FC8pEGabNG+yUfCW9d0v1FEhzQteQ7KBSQybUb8BLTJqgqfekj6Pd+4Upfy0t3aoF1e0Lyjt6OBEHf29vZvGIJYzmwVkbvKVJajptxVfH9Nim8U/EG9avainqd8qOW7Uw8qGCfn7vma/YT6rOpS43fy0B4fAXHpBNiN2Nv51LutfNiDM+Xvk1pIoPp3WsnD7s2Z/xTaX4Jyi48kFOfjQ3GMkxmCh7859Xpquskcmvtxv5Sf4m/8FAl2oCzhhfwc/6Ozs6+MEGFV8yB//5PV2KNP9Omh9bginFBob5kND4EB1cyRh32f+M4LLadez5WO/teWdAIilnsIZXWvOT8jSrACmz7EPaWUblrYp9m1Yn3Lk+t0jLqldr2YGivtiUL0iA0HbPrQNVmYXo1U1XMHmNPS408+97lW6AAn0OmHbO2ybRTz6REjCrITr4InidxU+0ny79EDUwxe7ibclQuuW6RmGbwwFcCPS3/OavTjwGhNqyO7rWK5wnHVJ5kLHi1pKGtRAQSKJAHiHp8R/Vs4Z4ttSB7xcf0Gh/71i/Mi/D/nH+YRm+yHslvt0DWhXRKJDinc+QcwyFK55axN9YFXHhZAiHnDGJQoe80fW70qXjU4ET6PtTd3QhJnpaO4yamVPIp2f+wxYbtM3FELh7CJu6S/esd9jnbIwq8lFl/AmFF6hd3/18KgROmwoGstwx+aJAJm2GNsETcOnkQZp/j61NUJleXw2lnnh/sfJPskgPWvNPsZCTWNqw16RaNWLHq0BpNSc6Gim93ErpNSg0jj8WlUfThmH2Gr2tjTlrm0THb6M7Wnx1RlhLC8DLurYFQaY+9uqqLXXDUEaWGaxEzSxHWTqb4pflRqBWifdoO1+qvdysodjA7pEO6jJgsqnfKklyNXXk8uJIuwG+IxmzkwEx0R772I4ijX6lzfP6+fqy1gLnX8xLJGHRWLtSJA2AutmOu+bvAkdx9kJB8JLcpLf7penE0hXgpRJSlzPigIic4BSnLXak70ls8O656VrS8nM54gFhr8ukb9gssW5mDHxEXG98TROFfBu7LnN+Ps6ohKfC2wQfVWBX2W92CSOk/KDshC3N8cLs0AhGlMDn/x/6SMci2FA2nbVHjFJslbUqsgEsLaCKoieNvxXweDNZmCZlCrqLrFOWRDdZxa7O+jfcRgX2ysaRK36m+5ThaOUh52AWE6kFfqhOINj06IIhx8Pd+6KSS37PPr3nXXHUkXJerM2DFr4r9wWUss0aPtPgj1K6BcqC8ATpKhsCmmT4Rd3afBEIDmm943u7oBbEAnqhLooFhPMxF7fyS95IbNIG4J8SqS/QEY3lq5/rKo5GZhKVaaEZGlHd9Bdu/iTpamH5uwmshWE0mHiSM98HQ00rZ00IbFOKq0wO2kkbXtYZ4zcV37DMliTQ07nZjzldR9MvPp51Te6wTat6pzZY+PnTezY0GFS66Z/KNNXlOnW9Ku97SXaCUDAJBpkuq92o12XOtAPxAn9YX31t8jT1k8myLPuqrqvPip9DSfTrCEVY3fSPI1inQCihSfOFfR9hQTQMLsGaqD84HpKor/4QNpX1KQ/ludJPKZ0aCt4T6QczrcSfsnqAT4ztssBLNQlCxSNFBJV8W96RdN/X3CwTMnnGO4/peBQztu4yvlCs3BeoPdaDm/bMhPs4PiW+ypCHifhDH19bB3TrHSRQph+cne02Eh+oyI6XjjJdHzpLUWmW7mQ78Y6M4uBmPNMbpMUcNtb4g1nmPCQK0CcPWPPdIxZpXCtthiOrO2J8bzF1ohdJDy7JQMLqDE8GwOqyTq4QvJ+JB/y9FZYbq2zQIIFXatTZYOf0I+VB1an+c2OLUhHqbj1zNx85aqTzlcN8j9MlFHceP7aNcP3tdgd18a1X8oXYePNxvZlHmVQ9aF0N2CzQbOioKPaZqkUF6SojzLJmj+6JH07jrizNTnKJLeOlPzkWYQnGVzX16c5+/iFklUDdLH3M8PqRDhd1/V9DFYTljbDApGER65l0/Iw0eZg2I4mWn7Fu1+fLmFRFg1WqBU7UPOOh2OHw/1NDneKFgrjswPV5Ktj7PLxuw9D10TzjRs7YUtzjB2Ly0JZbRFiokUcpnb3mkU/ajspU8XAshqNL/4wx00uyUyQCT6RpAonWPjBzMbR5j0nvn0DfQr3YNKplQiTTjt8pQ2MSnTNvY2bqgIXbjC98KhuzzqSl/1EBHw96bL2wUJjBA0ZP/H2uR7Cl+AFlJmCKlcAJ4ykbi+IARbVA/6++vwYkycTJjK677GpLZ0uJAG5ymi3nzsQyqzUHOAlhtIeAEHJHR0N9kcArjPJF7KxWWmNJpqX/OlAXkzWrMHcDOuevDXPtczRDxULwXelYPLNHariTrdrVv4M8a8xSuYFVTD4pBBVVyG26A5MRRXMA1I0p1kg+Se94YIjTzKFjO3m+UA7bHqtFJPe8uZaFmM/EB5wtLHWk5dAGZRx7esbRBnNFysh/fIbe7wzqQfeiFIkGXDsj65x0Gs/ludZiDC/ZAhpTNCknJS+81YGYECccALkK/Pm8uYN0mdaPAjTavtKT1ZBwFrbPKIXXUz1N9bS5IujHZt4dDBCiPT6HhROx30kppt8zd5jX4rhUhG3dYYtox56e2xsdezCO+nftel48lU0pZUu+dXRS1iiIqzOifZuNlij/GlHez17JBaudc0cQyrNQCxzYpP0IGq0VoMxEtbEqX6cPoyaVMG2gu8mx8Iqi43h6rgdrg5kjPzp52xBIb+yZhhOghMXOD+gJhTFbxUyJKA0PKY8xC/yEjf2Kxi5ebHH8T/ZW2O4+14RwVS+KnWtQKNQg6PNMc4M20r1mT+l0O51Jj+Ida/kqZq7Dy3uQ9dUZzsEcj0n1qPDyl1164mPJfvfVMWMFmVoRxQPnbqb3q8LM8N5qdb7iKQkggzpJtUQn++vSijB91dNZYzKBYMDCFsMjTyO42r8KBrQu28EZxm5n4gxe0sljwxR9i20j2qTUx5qZTLt694PtetOWi8Xdz/rn4SGlBjy1tl+3PhlPDtdvModkTGkg8yArl1fMG3bHdtWeoWAN37Is1tkrSRROoDlMXB0fIEaNrz5Udjq6ydVrsc5qTfom4WC+//4+F0XxVC4YW48QIc/FDhqO7d8S2WQinpIv3g8Z/6N0kgE47Qh9I4RxG8Y4RzLPywvBuWmEmkxgDA1ZuYESZ0eOtZif6x0tKNzrMWhMOP2oMDH6OHmimhtImCZXjceHh/OjoVwFcnE2JkGQrJGg2r2NxWtJXxWfOF0v9U6nDYHvcDQaU2FZmu7kis2bJdTK+c6Ld3GP9+tp/sAwsRQP1waN2wxFBP5fcSPGF3xXoHFMTVIIAmkuXQo4Hncmf1m/vT434T8nYaaRLLtdz0DWaJQSWE9dYRzqIc1XsZ+xRa+rPEJsnXzTHWotV0UKmzfA/wRqCi6Mbr0ol8jU4IYtAs6hJJIXS1lU3BNP4dqyO3V3mbu089YZURPGV0Tzy9aSXDEzwgDxPPipdcVYJAsNggBNY+HbHX8iExiMy1pJQ/oE9716ka29sdtCba2yt/jOQyq/a2/tQuwoILhK8vcWE9toINCFSgRB4eTp++jhtPGyuOwyrYPRSMKcBj60RosdvjlzSuidTTVsAQ2HcvY1tmQp98HelreA2FA34Ml0GVHUCmwNTXshjt4mZmPw5Xp0zpU8yfGJs6f5fI9143b273ls+kyRi9K4LQ2E6kEIhat478XMlFOqpD5wbg6bcSg+5sucoVV+3mptGFgGTfxs+3SSyQ4IWVibosiCydzWgCf9Bd4yY/1Aq7Wau7KZprNoPprL9d8UW+mDctxnL/gndi/9gQMq8OQZW+mWLpW1x/paLC2vvGsp7jGPJj7wjQOyxLT1Ac4u6gxbHkgEVgBqDTJGBCFcSh4ajjzYSLaSU1HY29PybPjQQJXlWsAh9ONzh0w7P6vRaCSjAwbULQ4OOpMDbo48iepDKuRaE7vo2+rML0rCxz+61Bp9KUHsHBUG6IKp7zV3tT5xsa7qetEaSPVatdaxL8mnr763bjefGOcW+cyQPn/93C1LZ452O9U0BBhoJvFJ2Dav1/eu6PHsUOpX1h+IbHiRgt2jZ+04drkB3BVCkXpr682cHe6t7905pNQ3h6VQURSG4x4S+UxuOSmVZv0GtyDZvXYTdt+WIqZORrakgEgn8ZoNjgxDrL4UImVE94dXOa134nmGSuyzfkJOYqRgvyddxth01bP1ZZdqBPRqK0UNudQw1OxI0Zs5vFmBsdQ1VCsN/Rfn1mCrZaEckbIDlCqmwgoQSC86HZdOkALrpyIUQCx2leFpnmbmJ0prvBTt+NiYJlMs+ECxMIOjahqeyjasEbnWU8ZRz88FlOyRH5lRmm2JLs5bHxt2sxUXTrnWBkPKTKXCcAwTe812ieIkwu2fIM1qwEXGBDnoJy51N0zEgcD2ibxrxy1sGUUUCTbLsg1drNZdxQb5omBAcxleNWl7WqsERIq1LfTDdamCjDA6NdychDjTy5Txg/d1vE0+K7j1I2oOeVzGmBbsmspW6m7yipvokNik9iqDhMwo1csBLe+b1hx7+/1ihSoIxvTA3nRuarl5MoZ55VYsGvaWpt/7YN/+jYozVh/uwYapc0Wje0PmoubwmVh3yuF2lx06XY/izfjUSk7AZIyaplO3Z1rem0zfomPqUS0uWByXciZYzG4wSg+V7n1PvDIpXIle9XaW0SjrEDRH7r6asUvW4z2l43rP6anYPbXtmcnxBchkOnQcLszxhrVJyBA2zweUmBbSjbHhsHTZ7YHaZcjeaHFB9UjCpAbwBFe0MumAEVAYasLBhISLlFMNSw04tKzEZXSVrVV6KM/2qKNNgbHL3C2S4dCWC9h/mDlcytfwArh7HANOD7tAVqVTb0L6cvvTw72ZbJUvK6oIE8e6KIhTmYgD83x7x7uiVlatz6sLW7CFHkHvbsIVB/VrhTJ312NYX/hMvfVzZQfmD3NPt3zmcKPyzkqrWgoEmSEWZIp23P5TyDoI5IqIk8BgAsg0qxBD+nPn395kPYlW1kk6XWFXO2t3m+LqEFB28NwMrHY+lXn6YHxORwepVlZSYW2+IaXo0s/jF2OAh14Tpw8w7R1o1/HAp0qIYYx57hi9lz56t/MS/o415ake80TlbSIWbsdpiq/GmZ/r89fUTcskc9mcd9gOwy/n/jMX/iS0l69vWnn9E9WOgo1PNl6zd23m6a3vNZT6xmR4Y0zp0LZ3B1tn/h1tKHB+YWYCZmmg9pvmyFl7YMdtG3GpPrjTdTxDG4yGP5zPP09kWkOTnQsNU5tQP/J1riYXS+LNbsVh5Auw4CzX62f6Mcy+3oLMIy+A4Ckhf3vutiKlydkdR43mTq937D9oBqmpDRLArGhVYZtOL95l7qWp9K7xYRwMs+JM8y0oWj066qy3Dd2zIZKbj2f24xO3XKdfWPjbAaNfHmWssHj/dIb/0T5LzOKl9VLGmMn90g50K4ZIrVeIXhSuNog3mnSO/yCQ4WBWlnKXsf7lA2Zi7+jA7kzo6OgCTz05HIpPZabttrtxSvDsWUlqRq89Lbq7QMtH4Bbpaj1tolLlnSaL3icF7DQ18lhRudE2BVK9luVdrRAk3uHL6TPrvsOniz04mKxnTCUyGquTmkSklkhEfD4cqWXG0vblXGDuQ5KdySLnknQoaUCfw96bbnUKW3ZwVAoOoD2iYz4bu9eWMYwXQAxMGlYsdrgvIK/TlUrrF3xRxt0k49NTX0Ayq0XQwNFhzGhapIeUPlewVeGT7ge7rgUt+isx1/b97EVeIi2R288E8HzjyWAtLCU6KtaK1C1rzzRJu8uaTqSooflr6bbztj6lSq/eGcQKp6jDZ8wECHHT7annjk/pxKHah1Qg8pACR9ego4Vx2sXGaFb6zF+s4xc4a2Gml04i3Rbotfjq6Ck5+t1xe6gd4Q5ZZHyPmylVkTeyyVELuSZWhW5MW504Y63gd7oia0GH5HP0ofyErpzzF1vgebxgCIRp6XrW6shit7jJ0t9zNpix5PoUj0iUGS84MmvcUAk/4KpdpXU8vSjEopq9GPvM8ldMNbG3NJMVwYCQhSuId4d3H9XLFwg3HceuxlOgqdThnEsN6oh4AD2TW2u+rb+07VH61stEMhSdRgYFR14yhcy0dN0v08j0yZOpLN5u2jS3Lc/mqmMvOE0F8pfJfRqCaoYz0nzqpAL3vQUVHJaRZ5zt6skF41VVFXvxAUHEYtUobwX9rKfbMUfXmMuU8qUzeyZF+n4Q7dQcP96yDIX2ms1hfauEtYZhYRCwbcdfomycXGtJES9IRxrHkfNWr9bEG6aqxcuMl6xSq7coJq/DICMyW7ljoOmbIzaKtQGrSXj8cdfDZjvVedPdeXYeCrtqJlM8dxGckHt+0BMb2CFSYHO0L6p2c1HTjTkCRqJmsEjUA7lQi835WsejfVDRhQvarotUMkymYqNn12l5fmMtZDgo8bXNGltT20l9Qix6Lec6D7Iqec/XzDaP22vYEDJOCNu27GOmGI7l2S712jG1f022rGe7AikeQAjaPVlAKW6RvfCotwI1kp3KNJ6GjD5fd2+bmE/oJG0InB8Fsp2bxNSOW9qNb3lybocQqQmZ4KXOhzkJ0k0o/kmXfLGMqjDci6HbVuC003dxo/MmnhPgdbDxYz5DTDE/W+r6Wb2V8XkNXmMkgIyFbO4qgGSpM3wbKCsyCvMIR1G2YAjPR7l+75mr6Dwk3XlfZw5xQpVjpvciRouXopafNJJN4atiuWWq2vmGzRWGm86qIdzsdoimI5lX4uyWHf9h1mtXmYuYfhRYOQZtTYZTkTbYCw8jiB+hfc3R01XHsZ21pWBtahShQHqhA9knZsE25p5FultDRl8c+x9PD5xySnl/yxNY8Oc8cGCvDU4T5BpCZOUq0Mzy6L5AHWaD3RlxhO5QrYCMINX0VTBbYo6unxq5aB5ChbV8QOSaLjrJ7sYHQMxKeb4KPN3bEjUaGrzK4qSV1FXQVOBfD+Slw7qU95VmA7Fr8XyI9yfP5vi7tKYqVv59GTxxj0fvjbDLa5RvzA6k00F7EJeFRLxtw5JYjShIQOLPkfCgmPzcRSeBF5oLr8Ma48pbD2wBEx4rPkNvTDFsWnV9zK3JKInl/DK/cgUwj/tuYeUZ4vvFvXI9scF48I1rMeqT2qbsfDAz++yDS6GpJktR2t/SeqbJHRtYYuP/xd51iA8szxiWyCZGBprXGTPi+DEmhmVfhuHmVvbncYlKulNWobjluHqM1Nm9O3cIQcWTyTwIVJ4o8Y6XvZXH4o/4Xuyfwv1NtQt9Mmx28raaulX/tZpjG+1EEISlWM+zLwTcKVzYagByWS1NZWB5hpbpwiVU2TO5FpJhVCcNG2zva5YEFeRw9O3CGpQ5a/XBYRnR02OHa9lywR2O7eUTC4byX+M/3Tp1XyuPUZfz0OQ0Q5n87jaddm3SuVfVOfejf3d198liZ2160dDYmLExuReV4/Fcppt0DdA4KDrCXr0Mt79a46d1gKueRma2ByYUJd1jkvDhZsIKq+zNCEPFcvvnC8gK46Kanw+S/xZVqSfrhh0BTKin7eRSwjpc83CGuh/i8oF42v8n8FLOmIQxRu1Mt/SmrJv1OdZEO5zp9O59AKoz2bEkVN8AwbYrDN4A4fG19rXfqzgWZSJ16JKa07x9bYgo3t/5fsT4LdiNislFsmCWa2cWeCDWg7RDyMA+orqLK6GvCjOKiSyyEA/A6ibZ+r9rQgw7cxZAuAnb79bTUuZayWxhbIkGhlp1ZHVXZZp9lduTHmMLL/5CNgnX53zA118Al3AqQTgMhoZI8qOblEe+XeTPNRNwXBLWyyJr4UwErdRgGBBDaWQHK4ZXZI57CQQ3iA2kB0sepZQjx8j29D6xM9i6hgbLuBRkyOozrXg5RSeK8eWVt4xu1POThr3rdDUmgVMpLbqDjmSazArLoONc0w/bHvwhs+9zsyiLMxlW4izL7hVOoJ3/OjxOtiB+H9RlRI95/pux/N6vjeyQ5LoEbmTo3dWBwWNm3VjQEeqgmET+BtMeC+bP/Ey4ccVjxreeIyhge/w2fnnUn6Q0IF/vHXYLFaNpxB7nTBVHHpIGBNan8H0Crq87OzRo7NrC6jMkl0w5p5s0NGR6JFsxcYz3bokPMmQNBE/x1C3X86WUckULNuWBcW5tSfJjgbXoCxpvWpzvCgrEBa+JUFMgCEqY6+DdYX8GJhxHXVmgUWnGcs0/D559JbI37ulHM4npCzGU+tHp17ShO3IYRZBmNpalI1/DNP+wPdjY5JawZSGZct8cj8jEZ+PrAyCGPd4AAoP9fTBnr8JKveuQm+Q9aNVdsbh2/GdZaTf3j+kJ0/x12973CGCVImVhc81NJMeoqHyrr+xz2FynQ0Xxhhxa8eFTJb4Gww+VZc/dFXDG8FKTIeaOkLtnYroMgE0cwqmHtVk/A0su233PPylvDxkVG/Vq4OpwiG9yMb/MGvIqGfJXLBmIeeFGdtsz+iFflh9HbwPCCbDC8FGlh58336JhukndnSviC3O3miND1VQKqisbwEbhxFPLy8/tepsZcCoU0Tnt121EaEQYD+KYvI0SOBm9mLvI+ZWuMjLM/z2u0tTOMBAfYDZ/MLTpDgu/q2ax9qyahLZ8OlBpx78Tm64at+sXXdU2B9tPfZM9gtSnE/R/fmYZH9Mtip8g7XMVA7A5+WVZeNPkLzPLm74/ywWPm0u8Kz3vIzFUe+uHsWhxYkaoqPi0c5rPvJO6YOuTetpa1j3ycn9q4+kokM7LfSl8c+ZtX51DzR7YhdKx++Vp1a+Upopot7DZw6N7k60CFO83u+yCeuh+wIArRNGHce6hEFegp3lDooUhofifNlofkvE6O8FAPtzGMa/dZtLIVZwmq54OB7nz62/Vz3fQzF+6EEspSyNyrfkTjyeLrucrq1bcUfcnQOTa7NMYluctl+c8s5x8cRuHezPnjfdf/PfREEtGk+354/PRJAC8HikDO0+lvy3zCnb6SkSW09hCCJc+JoDRGt539Qg/ETe0dRK6lf5Q8IJYaDv8+NCD6jvu5DB8MseP0khqYgiRXGch3DbFeeRUH07d8a1974do3G11dHIuOYGFjmPwETMzMZWyZrh/LD4NKn5k8Eef6lizBZRKnJXPeRd4nd+Jb5Qc0SRTkT6s337lBcFZ5iPscSuWOcpCNW5tZFUmWdY5cTwNhnAoz7154kNSKtm9sCWQhntYpps8Lz6sDp+MY92UtVJXkJ9ccx9Fdh0MY84aKAshgnE9rK3MMHLa+jHpLPFIiOfL+d0SaS4q2D7NUAfhpu4A/aJWYf1gr+eFxJPON8izvZd1MTucvmegsJNEBcg33aeKeThWGX4+g6CNEf3GFhRF310uw0QcsWipkJ0mzCjzBvuYH6IuOrPrmc1UGYQJkHqv8p/3O468HZS5uoi1TvE6+NtcvE/4wi9HtwQOMTy8S77Eo5qtV5VE6nAGOvwwxZ9vYkMVg4VOoGmOEnF8js0nOkhe5RZcBS4S3Y0WSxLSWLnQNvC1luZd5NUp3+LfXcjqKCIWbV0jwl0oAuuiiMlUckPT4eedTQSOyae6id7ttxjspwQsPE8+/UCvtEDxI8N6/hfCJIB0/ah1arN43FngzbUREOaUivZ70r9q3SNYowIROp7ibkrTnuMx4TypjdKw3C+xeVqW+k/BCidOfRkp7H8mmelZbVDqDC0t/+2saisgea4b2FXfIKBzWXgf4V9vv99bmISGgCCrorOaZ+XG5N8ELRpuuHzKRaoDJIgZrXwQ1rKnsPtvoRoNXo72c8m/dU43cR/zLidEzHQdacguNhOGBjdxLm2MYE+65MLA+2RH1aTPuj49pP3R0GV2DU3tQ4i3TUwsyc1hkC5xfLTxxjkMgl5g7thbXyWbNeW4otE+ZQPBXJ0qKitsC//r01yLzrT/FpjvfMrPsRub1lzn9Taxet0PF89bgfKSFXsDJ1TmtJXiSl9JPhp87vsF36f9LPVchYf2jUSTPHM775T+aPrGv1r4nRjc/xlNTCdh/apGR4V7TPF7eN1Cei5iENy+YDp77HIoumWnnrfBcxopFlScpo6SkCGspZpXSgrW+sCIMMffr0rZcxMkndT8+dQ050sqOZ7ZM2K/PWmu2t2dmdcVi8RyTGm6pvzqPXH6aSQNrUC38vNm7EjCOWzO8UlTqZ1g1EnCZ5RNhIy9kHzJyAdrRMMEDXOha1p9Wu8fuv8AE/t7jxCgtZXQqNvKXGddtbRYOIeU4RywfoujHHxDg6TsIOuEEtgjv28TB7fumjN6uuv4gHxe2lx1sHjrf2JR/NxZNLNLEH4nvpmS6d1F2EixS9Bbx3RnL2glsrVMdTDeyhsY3ZXmGAMCucAphlAmU3rSZalID43MUQ3XL7M/dKbeQcK2bu3oRdEcN/e0SJiKwGXIdOb9d8xl1z67XzDmu/9yVpSgdGMFq4W4Gxj++yIjIp4xwpyoiQn4IDGOwvaIcPWkHWuM5SKenDqM3bgMygmvmKQCGKi8xlywzplv+sjnfN1MeFgwtKzoaOaDso4BXoFH3ykdmObesaRGxouH2oqfKgaTKfn5R4Hfqm0HBLnrJ+OW5vXDTjow/UCmcyjT1PBhcCPF9u3GVPd076hmQ2/1kYisS4HBRICKvySa77qNzI2ZQiHzs31bx4TP01CYqiaHHnIn4u3u1l8G6U2pzWfipkXKou2OXNf4S2CN17CTLCDg1Jxtszoiegl5BMdfP44CAZP9CtJBh1zgNA8K6lM+Q+fvM7GR2Dy069/OON+UrSnF30sG8eTQwAHCXYINl0xBjpvbcGAGcc7bdO6GMMNOeFbf8ilg1rT/1DOevhMNr1p8eiDHDeJB7pBSYlerQva5BxQ2RF9Jk0Te3/Hi+JfSzHGFMXu9/7n9Th3RWovvn5Ptwn7KCK7tww3isRMzBwycYloC3GADfjCixxWlVfIeFCHu6Ii0KUVdGbJHNo5ZGHgqP0JzcZmZUKi390YNl1MbqkUW+V/iWhNSJLRsjPN/8DG24MXggw8cM3UZNYtcubciOkIvKDpEaXilb33YUkn0SdPqncB0t+Cbyl8P+VRfSvWIlUPJnPPNfVlOBAB1hpXkTFkz/eHh6cGqfSMScvHDDGrq5uK+RhiCIAxFAr7iGvHDjR6SfDSZ5SJLucGN2CnnlAjNczetxpYeug5j8AyFgtfr44PygsAbKXtVsUC3E1lxI7JkqJD56//Sd9Syq/T6lBQxMc1t9B/v9JZvo1v5wpNXU2MY6n9xAm+4mEJNxOHgvC03mdS5y5LIJk1F1dduoT2F88pTtttmxntguFIa/k+PGIa6DrOQhEVN8+O3Su8UdaVwQdGTgIxUV7sziOZqoEm6r185U/8Q27I79HFBZfq0zrlBHtFmkRsJv36Ta2lQVrUqjZvy6XAgRa62uzXFvHW+5mVosQRnQrdm7Xuje2Xzaj6+mRtu226k2JTXgBsP7JWcAEJfTdlb584T+Zh0+Ki3mMHI7CxHZ7knZsSOSMEUcnerp/8EMsuD+j1rrw4X7JIKO5DDaw83kLY4B/B3RpWddbfPZEe7B1k+zuZmMDyrEQM0GRkLdAJnnSbcwYW1zcmp94GBbclZMS271lgiie4kb7n5fjm7blj8TIw0rXDfiI+7o8gMCNTAUcu56tRg/p3TXWp5coGZcJE1Wm/gQIThdYEy+7PsjkMz4ITg1t5B3JJ/2P7ZAS8IdTklTtePMQeWQXfgMloZId5TWjVLNO8P8ItdMAZqd75PgjRVIWDPypLQ78Obt+eIGORG8oXeLAuWWkHeK5tuIRDRi9PgagjlfcExLYbiGy07c1T7P/xwhiorJIDQ6xmcBMljPdnpYAyxa54w93VHNEZ7WUzwgfRtML3bJXizd4LIZTVDsZ20ngR1Gm91qHgg8ASKD8OjbEr6EgE06WmRL9HRxa5f0XW7IZDG+S97flzengXKoE8aQulXXyUsQYBXOFb8Km2ANY65CkyFDq1yg5jpuV4ZHulWef7RRbTmit13YCYhM3szeeqS/BD5lKmp+r8/jMe/Vt36P/dPncuRiDLCWmCtRD8ucWK7n3zcBLXS5JxopSra5iJC3k7fGrQZK4DqxnCxB3maG1dGLbz+lweMu4a7iPJ5pSzEnYfMDEkFXYTlrysH2XjmJJrNtvpjcuhtEu0vU4gdvp4qC057VLdYg8pbiotgjDI3d6CjrK91/jRxWUlEauJtm/aZ7IfmIth8rbGR4rqdSj69SdZ9ulvWzEw3t67n2nVUmu/wjkEMhlAi39SzQ0ZtonmONxi+VeEjzu3duzdftw8twctclH/SrxK2TpyqG+/eCVE5zlN4vB8zLIPg2XltIqdTUtMVwpr1xnnRlakU2Zd4av3GIq0qy6MWjHraJ8B/ewCFGI6tqnuUmdDwKTYhycen5oXr5jojetD/FsP4vgrFR6AoKYBK+TqCsco3PKuW41/iPDDKITXzHOwBylGx41QCvb5jkPZeR2N5fCPn+8AzcrvGOgVd2BbS93761COLv3HRlOMD52wWn6ExV4BQSdvxqslMvSwmz0mFZumm8OZzKNRHaPDekpLV2Bo3tvVqXvqX5uFPS/z02n85OVAXNKpuM2cfIFQy3FxQCIKLnObTYVb/0cnuEAVa+zRQmcg044kO9oLTK9HPaJ1E03hze0mgP0j3/1eqvROYWbcYaIFGlaBDCXq8Stpcl3DmYAyPNL0NOUI/REFmAAOutsSVe42MsIj3+49p/fBK+J46HrIGN9DasthG18/VDlQ30ZyjdsEUTA1rb4Rj4e46nQZvpWF5nQOeb+XBXExbxmlrNSIy0kIhtiBCzClBxli+dsKD9sBjduGIyVxDc3bU9xFNJIoJ/hPMhmK6PS/v1qQu4VZmD2iy1OLyRgkKt2A4+JFU/612gse4U8nwQacKLRMD0NXt+grHtNzLTHLO63++6LPmJVlD1LXiQYDY0VkIm25IbROOtnXEC4BZ+p64p6fk2lZ4s7Xevm0bimc2f88qJxtgMp94xEg6BgG3BL7VY2vkXRFl+TetZIqCPsWWarAb3FR78v803r/yZ8Hxh2rXEuZ0hrzV8GbMUnJZXDDLkErA24Is6cU92bVigi5sP6SOg7JwGra51qIgpewHQ1TOr9QbK9AZsYRMopZIyEzNVz7Eq3QK0k7MeJn7Ys32wSMbe5yG3MPmzJ13AT8i/OSyIPcto3AG/gotb/v/pYTyujIvXyRPrGNsJm8+pD16vjzstn087mYzP1nkbnfb3WnCXSusV8GuVhQraUbxSYiDce15XPvqvpmMywWnM5d31NhAM7YsgYPmUg//sKAHV0otLXaC5Mo2hmAlf0x69I1jW3evdlh7aBcMxTPhrvnnRiSWkArYBSS4xtlNR6AIw4RBr58V0Otv90jdkQIm4UkqmneWINqwBqR6FZ58z3ROVHlNEWeD5uqwRH1RRI29vKplpGljjE2O1uuecsjLk2BC0/7vk7371zjpinJxJlWKjhnay601yzThR0E+rhivBjvkLvvroMApU1MJAw7EMaCTTCAzKxVmC9HzX7A5rYtkdUcKzBp8u/ycgcwhoqpLjSMq5NwufIWPwDoak+XEZQRQMiE7fAhhr8C+CKsbiHSSUeoC6SDabhZRwwX/+ovHISZ+QHalVR5eIuT9fhJC4PRRIiiZTtKLvJLZTVslIFMYPra/XOjwW8Pco2fUm57QiTpyE525PTGEGOJTOCGBC7C0ui1LfIcdQZf67gvM9+zXy923vkPZiFMwgmkxBNJBXZJXdUQVioNPWatpTGjgSOg6gmdv4e0GDj4QCcRzi1znAG8wcXY6JyBH/kGl/pBamuLir8PqjjwviQsuVtdET+dIpqjdyQRPIh5bDzuYekhSCCXgioOWLRERvE1uC0OYTBaEmWAN2+/QJVI9a5KnOwXXxOfg29hEM1issB65uebu6AvMHerkGJXHFPSWZukV+1JnWLQeXkGej0+ARuhaJlqnjOA7sk0bp74N6XwboF8rjE8jPD9iHclRCBonvtn4SCY/i9NmpKXE/8D6pOt8l3JbrvZj4BtG6qFvKSX2m3D+b8yB8qzQ0VxLkE+eLxHNh17M9aOwl9Msq15nfPLKFbNJmbUv5VIoC00fsk+zjwNMUdl4ElLlD86YLj86a7F+jVjHLpzvR0hrAgQvpEPH1+fXNmbI1GEBURCJkSayxgzLDGCv9DRyI7iA2zmnbTgp3i2FyNXlaNmDBx5RCNeNU07AY+XucY+RhnWu6dlz0QxeHQ/gGvqHsRX6XSQVBLZ0EarCl/JweGM0SPATjX/TO0KQBY+GiQGDk32OuWotVWbr14mQ0RLCbaL+Vsh9mMBtUYyb11Sg0JzKYpsPsjLiuDOJ0149iJ0Jc40IPpHY4jZu+p7YhfkDDxX6y3ufzZRfkDXaeuDeq7x9WSQF3uK2DURDuYP5WKJHj4/D2VQ0ussbyuV1DGbyxKhW56+C/Imz3YTxMlNZbqKf3dWSQVfoLxQ+GM0PuiDSXfZJT+prcwqsU1RBq9ambU705S4ekagIWFHe1nHoIyhj5/pBGnKWRTQz4Smc4rmnLSIi1Im2I3VRKroIrWEXyX/zMeRxt8WDdMO3R6cFJaM08hlKQUI0H0ho6Ij4fhhsmcJqZD5SfT7awu8GFGCwxWxiygcCluPUD0Ld7gOqUxFMFoHX08Wr/IO1hw8+BghO8ulyKt3LffXmkwz1G/8KP1RaVkE0h1duLXHP5AkjdzqCJ3mm8kxjlJUFlFVF7uqUbwjb13bsFeuj9fIHUxmzvlCO8OZ4bApgGb4MFIVWnNUu2eF20jMvOu/5aboLQL2De9aohGtTK9NLgS47JRyMhYjXQ+88rUi1NiYYvrOlx3/OlV6J4Eou/aQNu68LGOd9xzdEzWK/j8qgkmpxK2F8fKhEwuZ+RH4vJDcTN8HGfZBOxmE0pqr/wXkVKneUxeOtblZ8p1uWX6ox9E8xY/22f19OCabc1uA70YyeOKsxVjefBUGSsg485qUvBUK4EU6SrV6X7Yb5P1DMDYLWfVKoIAvpZd/cFH1Qao3HmBjGzcWb662B0Bhk9/1pHUbQMPBdc3h2UY+Kgu/rgXMgK7sicOPYkB2JYjJ6eGG8a2Nf6Iik7rzP6piaUrBFqFWWQkl4Nu60Pz0n0KrDkqHx9S6/ujouI8b5e5HX3BR+DkGFL+1GhuowfB3ZBD2w4HxQg9SVCM3H6obrqCupbLzqkQr/kpAOLhHJpAXLEMEE2T7sOPBHxUeSBOKD7KwCtLcGca9TIF5hyt5/Dn1pCeJqvt0lEchWV0uPe+2Ls16y54PUsNrRZWX3vH5b7jbOwoeTvdlM+BAyzwtXP9VLSE/1L/D1/K15xufyqXTt1hb+DiB2Kpm8wzx6WnBb/1b55NGiV7bwwK+d3wq27zcch2TrZKUjXdIunK4YXXjIJZFnMdMewzsmfPiwF071DY1fty9n93rECnsq/wdzKO5x08xs5/BKXCkvt9LF50uRThfy7xd6dajQGmKQFKwzu08KNKTsSp+xtF/Amnb2gBuzPCGwhfzu+Qjjt2fH5MnzaDCkhFDw8H8+l9YUSvTsLzs000NoEhkiTG7x4aRHl75o04tsujFTFIVJuMmBEZaEGW/PngV+ldDqbhfZvoyKGSxc28KvQanQdg//+0seMqXMB27DoWRqs9ZOcxZ5khLkslbIMd4rL+zjJLrAFli74KLslPA7sj1NWfWLtumo9ELEUrPfBpW8uIENvw3hjZq8Qyn3zHV1dWOBOzGUmkqMzc3mgfJLTKabFqxyWXvCcimcG+/OY+oZFIRcOFdII1kdXgfqj9O7dTHBGrVH0q+Be1/o7+2nT65dV8bxR5r35bMrdl4FB81Im7h+4N8pmG6DrI55zv5wJs1Cy4mty9j3R2ozdHiQlLpENs6puH1WEMo+tLl4kC4h15EfNnSM6LOtOs/Eo7SC0pHv5talxHSXDS5uHO/oVPR0t9W6fdc4mFrC0UI9jKfUFG75hv/wnuZ67UW/V/diPph6sniqAmdU3dLWmFU90/RZJdhmOuod9jSq4piAvWGWctfwN7H2Yz00H/CizQ2v2UtWvtry9DOUImk5jdFD86jH25LqSgLMAqgkFliPfZBn0UbevRxicu3aKC1E8KfKoe6DW8/g0nUrU66qH0H6BrJx90NQgYIgMAfAEMwDaxqDwhJYn1Ivl5+bvFuDfrthNWWdnvpQgn+iCSgSZWv3nF8SRw1iujxZ8oR8b9AW7OfzaDfwq6K2MfnnlFAgXkGR3r/8UXWlk27C4+NLXZbD4VgUNdmCeVFS8THwZ9h8qRL9mEg7hVeAUZcUq14XarTEgCkFxApR7rLdNypBWXBpcLGtgACOoI/UAsWMkbeSU7nekLd+j2+JrN/ESCYwKxdEnMvJnslP4suyBTPoybgfAO9TtMZwVB6ylqf20NY7NLnMm9DYUhMymhBiwSkHM7bV4SqdAJlSYvSy+JNyoJRxqEPEfUvjjrzDnEsWv8MzJosZ0xFrh/y5i2mBq79VFlE3dW5CSFBmGnay/dRJB9P46eUSX3ky6aDhXupZZhbIoR1ysn0oxv76jhpqf+vi5Xs8V52Ull0e4X7yEHLlc+SV2S/633uG7IM10Ss+Bv9IhLZW4RtCCILRuWAVK+j07Y3/orZYAil5YnsS9YHFMw4hIG0ENJBXksTC8uCY3e/sorkhwOpOrZK7JspVhQHpYpHK4vIqlMCpeSusrWUYzUdPhqyo2yHlf033jZ3NHYaNJEepEnikHZOXjYyzJQg+FB+qt41Q4GyZCI+rrL53mr66KGEiu/PkX9oGdxnnYY+VZ0vGabx0blkvW/GNn9VkZzjlsXJmPZdzNrh8GGwh93+b3OXVzmVpO9pXZ3InuLlifVHboCqe0NYrCNnWONhghcesmrjuKwtfHbTl/j+Fx+RDKVBLYFRoAy2JaLpywjyW/fXq3Dgf8JEr0nKHFHxhCxFPjBBPoBDuJAJOC9sQnlWzUCVMKuSz9ukGvsoQcLuLlJjHwtngmWFB0ZOjTOTQjIqvSeFGgKcEUvCtO/XW/z9UGWS66GjzurK9zL/kEg0n35XYshhZ3SMHoohFya6V9FZJycI7vs/Bey5Rcc2ngc/QPt/nVRVirqBRb1D4U2QAwdEClIFwPAvJhnn0/7zY+AhNf8FmCPy6gHeagPs4glBoyKqzK3k8qYnjmrFUnOENhbP09eC3ww//dZaQV3UVsplW+2zVlOB2tzYokpnOnCw4twLQnEUEKyGD4OT8QnH8Irdm1FU/oiwAggO8RoKNS9QGn6D8OVaeq9KhXndIID9Z0yTAuiAt2+tYYlJwZpLJtodH786gQbqwYNcd0zy+0JW0HLppPf3b/QXKgBsCXvKrLLBa9Gexfro68OkqKhMtR1DDtyNN1qMTweuTsQVZZucjGy6P19M1t+EWj8ISmfduCCaicG7QDV/9yck/kSpPFrGN4ByKVEMG8szAnXI8nIxWume7QctMoJPNP3kPGiegEciUU04w5YJvG0/sCk/AI0YyzY+2hzDbDCF6yabltPaToB2sKJAvgT9G8aj92fmhi348yvDa/ZkT3siOTXlwa9MsyyFiJpR+0Hmhgtp6xPGrdn2v31i4mBSUohvNXJy8WJnwZhC+MyKd0ggHgbAEZf40sA0mC1ll5Sx1jmKjiS9DiVJ1eKid7Z9UP6zb72qmzHbGJyIkTPtOcnSkDz0c0m697pY2yu22Srp8ZF/VVhdjKsuGHIacXkoqwB2cd+UB8w9c5Ujvyo1qz3kjLFNGnFQaNoyoGSf+XFoXKIn3TOOZIwwU9VA5JHP4+7oe38t09OuIHj4UiFzzbmsVWNRQV3c77Q+mh5G8mgjKnCB7Dkk34d1ptp5GGGx2CTT9Tx3/tjZOdtseshhHgnukhJFRJQPzw+YciBFxzSaDY6P7F0o8Y+k4ejtYUPQ8fkc2NYvWiCQfT+LvgD0b9kGFKaNd8baIduYzuEt5Lz2BwGajFJgwitQDb48UxhEjHoOzfz5I0/wPiXC4mB+wATfKB6aawwbBb26DdB0Hv0VG5StlNGj5EH/l9OyufA6e5DTDxKGuMY6bSma794IGHm16ZPTKB5dj6YgZ4cE6oNazr7tHBL9yXrFFRRGfGQxt8VuSqEl1Uocaiq6I0JpnOfIUPCxF3gdt07WYuPZuvO3d9uYfN691f/1nW+r7jHBN3kMCs146fjzgRFzOdr+y050yRsExpWmP3CI5byn66742kp1BPRRRvruCt8LfA6krcw+6vUV9eeXvoLPwqwHbws81MCLIyZucfpaGBH60blNP0rdWjjXimjkbD12+a1MVjAlPtNZLxoPbVJQQpZ76fEKpwA7HjWlzlazY2hOqXNMvgPSUVBrq/4UtC+o0IhJ/WO4eFWC/WOR5lOS831ImtnhGnN9AQHAFy+nSAB9FBC6WZvzwHysT3CMwj+45HZErtG5q5Tt3AhkkBXLrZxCMaIVVkyfvXvLx0X8yQfrQYqcb2deepqDztkhwhxIYhPsR6tE6hz53evhd9SpmiVQbqEYJ4AQdkVCuah5UzO0epYyGFsGogsb0kTHTOwgtTEeu8zgDfra3Nj1e3VD2UIGYtdJ41IflfNy/dFFQytbIx9DS1PeFqr6NxvoQi0wTZ7jwgNsqskdVAFPscPKCKlxlfFdymSZiVub70rT7g3681jQirn4Qm/J7TEqhChlqsmsitbPnjONex5h2iZ4VBiGwt25lWXasSs/lmSKYbZKia8rvvk7/HrJ1zfotU/MSI8O8473aVMFfAeBeo2S2u5SaFzlzfezAlVuGSKmw+Loou1pdSDbxOzyZXzuMqM87pIDua7zUPv/+zfT/IpPLcbqYGSljBWJZYntcfchbOMq9TrA5bkNweBQpzs2JDNT8T0pS1JbwUT1TflSsIs8vE3deSH3nKDSe0/QdRvrW5dNaKJ+eDkIxX/y69OrX83JFP/VmBOL/WMFucHmHKTIFUXnXDaRjiAS+ikiQx3HEjyxgv/8w/FZBpzuFFX/v4fu3jgw6NHohfeu3+lmHOZPmeKIef9VhC59fX/eYaX9iHp77mfLigkrMCchWOAKtQ0UXLk99s1+H2OKGvz39Kcv03pb461SA8VBK4n4EhrynPQdTjzfQPMhYJFEoGA9X4xzk2VxiLn5jHH+d5MY1lJjKL5VyJrEhJygVds4k8VE0lfUgM5nHtvzpBjIuBtWidtdQzHtsqH+4XydB/0ybr6wIH+HuG+5jL8WNCTnfWC+azD39N0NITxeCBRffDMzyT7kaXSa88Z8O2+pu0YzbYZg4TRs7Bg3xqLptaxV8Nfva013AnF2+fI+FobtvUwgTb546u16KCr6TXH+xjhVFFW78/7/pD+5e/jBA5P5VW7W+/mERwPkpofYqoK3ytirGX3TabFkkxvsQnJ2gsdUQfuSuNAa7a2AGPrgNp19y6H2jY1vDmgkpR4F0IeZfQPVW7TCP8GEjGWXT7c5kRiWGF26jOrczUVoCm0+cd5L4UjKF4PQcWptDIkyRVP+zp+Vh92EXxnEawSOQmH6l/pcrB16B5/G3QIefHgA1fIy3d/gdpoUE3ZstvMeZuRMlJ9R5tmmwjWQWzHGbQXWVYsFQcJOMRyA6fm/XUfBQNSyeBrctRazneaX2aaUaYgYzOurD/NGLnxNcAvTMgiMNtzTO0r8mr9LW42z0tDkBbj4I1Xx7BbI9nckYjyG/Q69cs6DJki7nI4ck76F6aHMrjSw9sp4ijAk9EAqYbhBwUkCGTaDw6C1b3ycwAubhxaxnGlgHaUkGDqo91MRQuiBU6AO0nLNQPXnrohFpDTWBM1yRCrfflfOtTQ4Y6dtMR/HGJ7APgilVYaix5x2NiIxd7+6SDO/bcxXMMQl+RHqxiaiSQGSRulksFlo/ieUSibr+ppXzBfPEXLmiksdW+DOwCup+nt5jrZIJjnuRgAoky+Q5+JytYNWTjtjSwHXuLI/dKMGuhqF3R5510mlkTTeP4vivdQqH5blrdwabpgzpOxcJ5MNGsLFNOBnMwyduyJYlyqK7OQX0JUO0RqF15PEU0awETemzXGluREwmr4qi0C0slmrwo3mO8jGuKcR6H2ruljwXJNOE12R1++xamTx54pN8t7DQCXsJpKgHNrrTXHIyZ5EL3HSNZeXEDN9/FFsWL2gOBtod9m/ujSH1V7nuPV6yVu3CLuldURccNO0gxg5VZRQx/yYRfqfVNi2LPJpOQYppLeR/yLzpt5e7iWuK73t2ZTcpQiAO6qthizLQoulMoPT6vZGUZQ4ySd5EARa9EZrye7YuuPVn9/PrDe8GmS6fmW/eGI194M0XCtMT+f4u6CGU5vsuhgDN57CvhDDMAAM8JbRqtP5iAnLqSiis4qYn2MqqmPrJnoXkjnetMP5hCP72N4Ctm7zufHgESqItXP4qI2zMNEAUwSLC7yjwb5FI7VBwU5AbipKLz61LoaG2CFu9Yi93Leh3xYI0HIQKV7tXY/+ak/ihShcGKHkRPWPE+G8HYsrgFELDwAyqARlengqlLttaG9R0W1AuSmiuSJZyAxyFLlWBeqKJOaZuuJZsRIutsqwwyD5zUbBe92oCsYveyHf5c1DzycS9fujh3Wuf0sPPhLk4SxBJjTYmloBOEBxILpmGD3UHWy7TdrvhyZHNjW6fCbTrQg0J30KUTRQMd1hxHSSwe/4SjIkC8LgLvWKGSs01zqn4oy0uJE4qZiO7qT19Jfiro0R6QgeRiYi4/mZcOR5NJXkwYh9RoMZCKCBNRWZkMUhYCMu+zQbq+y+wudVUl32uKAeiHecz6utg9w35mK90azihnEsnW8CfW4fr8NHQhAcFGls1PqWikhnORKABuVwT+sAcsHpHoARE8u133V09CMgZjriZGJsZoGETk93G/rEsddv7DAh2qcBZELh/GwEawQiMeefFTa3C5zij59md44h4mDl7tmyYFcjeHVXGx+Jh5K1TRhYM26HxVKwGh4ZxUlktzDkgG9UEUXlaT2elXLt79RZw+kmYpE0yexAP/U2Wjvy6aFp5iCB1/tWh+EFedlRS2nvYSoAnrgF/b99eHIlQ0uO7CRcZrEnMHjmoY/4jzuR6GdW/DVP2v19KeycJiJ/s4WvxJRq4ZCuDyzVPWP9XGGUAHOGjn3fN52ACSkLmgKV8Gl9Iu3HlctpbFuxX5k1pPd7zjEfnytpK7zc8xheElhlqvyJ+XE92SJBNwGUc4qR7O7QFNTCC7HNk+ZHlPolUXxqjWvVvZ4ZHAp10fv67v9YXKmMyotUOkJlMT1WhkqiueaNTy9CUlCl/x5g+gidSZhTzkJSPd8AhR/ZhfSoI19XL18bn6pjYXCW06HnUxc8TNp9u5sQgu3dy3TA81cSmEPEA39Ym8WFBJbPhQ3OohPpu7Xnl/AB7lA0/qApFBS/lnaohhktXAs3CoZgwsfDa+t+30pOdIphoJRleDhFC//lI/SLVcnB5rmn1IFNJ1uioIuA2IPRRZHPOm9nGXK1XpSpr5XZSn3TyrjUbM+HW3BSfWwm2AAd1Hj2SBimm/bka7qxFBd9ITjYQ3He08xXzSxmfSek90vhI/ohGXnl5Xv39LVN+jvGNTiqSWQlBgRyBvq90WKfUYEeLTo2bIsFF/FM0qegq1Cmx875mKg+PHA3r2YrCZo6TCG7aH7f5bjvD1CccbbWRNqDzvvbtRLuFmjeL3169SyFWLip0xdcEaeO3ELecy80IH+XulfkxjGrBhRIJBcuBnpVgphtKpm/J4WVmJIH1YQ2bRJZEoj6mKJ4aOUxhJ4YTXaZ6bXTH975dzi/3YJjcQ/DNKQiu6Oiz3VkkxnzCPqXomeDS8fnvCxoHHlGzv3VXWGHuXJynstWt8McsydrM1e5jUyQoveM5BiZJ9HVHojjcW8w0M6Fpa8eAr1A0tsRqu8R3I3NyJTvF58aC2ByuK42ewbh/KtoCJowCMH1LSGJPRB5nuxNOdjUdfQxklKGeQJCno6Jph08bTh979pSo9hWju0FuLUBXGy+L9hrF20rw9ZL7zLlzpu5PuAyn51d6Vxfjx8LF8CVns+P3/Qk8S2ZM9VxFgv+D3FmptQKYlKxIxtVDuGdujv0lkOkIKlJBnQ23zXAcaOEm/HwpJa0R7JGosEOX/QOzIdVxpuEUW3HokXjMVvlv5QGdio2fkI9jIJ88M87Jl48XtH7Sk68i3/5mFJSvpu2ff6/zpCA5yN/+apNCVGAV/dHtpEjClv5sXVKksR7wrgN1nV7kVtZDf4J1+ko+jJaH+KbB+BotWswdDXvmk9q3j0Z26gySGqo4mv6+GZoLCxBlMhAs1gMuOSKguBfygakDDFMky7OqR4FWy85eP3xAq+ZuGlX/RYPW98f65yX9txSSZ1VuuZ2VLXsRrCEimCRQBil3MyCJk4paufaLLn8fEUYQfUjmeXvqORsh+tQjVJFqS4FgAsGrc+LQxp8C5tNqoZzLBDcfSTNvwQSkCtydUrbVs0ABE8hnPoDtHYkl4W4d0zT3dGf2JDH3tEjZLKxZgMvPmq1yzuVRB5Oan0nmbpj9ZvBIR7fhQaiwWqk11xbu8wJ5rI7lJ5/wZm6c3j1P4KrPEyYLcmnLVqqh63jOJDZkI8ZsWVBrscodwsSI/w1lHV9TUdZFck24Zg26h9q8dpAhV8tzndbXgIWzV5wbbsgSWF9/oJXjUI3S057WQjKVFX8tu9A9MMqzCaPgpYDr+UVJ4IiQLvqOLlIezh8GE2A3mli0oqAzeM3LI5c2k2uXZ9PSnAO0hSO2e9cDHlXFX0b/1wA9c7JxxPeSyF75howchzsEh8eIMTLoXUxlUGPEf5DIVx2srpMbc8oDrAJW8UFE5UvK9PNbUpzCdMYnGm0yWBXbW2wnV1fgTVRj2+hosQZrCtx9+aRbkCYrnPsnFySyJGiNo00+ro8viimRlcQX5XK54IETzXjykfkMK5dt/+6rXvVHnJCf7fFbLHfkWMew7tIV+GvR/pAboSQb6erZXkhT48OzUdA0fvQvWVqwdfJvEJtYT0AFvFU5k+RL+EejE3Zt7C9YFfGkfc0CJY5fdLlPQIm0vmbWyQdLhrRvjw7FUGyaxHY11nVGvVu2MEKwRF/QvQRlUqyfgnw8xm34p/xBEffeQYxTTPczncXUd3a4rj/YRKyJtiTwcVJziZFD1nhWftzyKwCqpKwu0RZ+HDr5Q9YgF8IfehxcphqxivM2GEWL7bzQFgTN3dOKSb1srkUrzDI4dCDtqzk6r7UV3ebsRp64O2jmBC5nT0rqEMgREpjmXYpDvVu7d9t7DX6MWnG7nxUmRXh217XefpDgsWsgVK0Lb6AXTVU3Dx1rUK/RkqnCPfleV+tM9ALxVnYeV3S+WVxYr1Ve4evs40PzoXI/1Neu+vRxbvbcQVdwZf8pKAi7SGLYif/3qyC4homyvfSfTbsgjI+puDfbgZ6wOiOfyxFda0MRqCjHIlEHDjkJSahSkufRRlX/1uC485nhnRwP2LXF7qLF1+qlNNYgLIUMq5fB/SdCDMz+mciJ77LfPzW/+oP1/Ft7obvfzgoOuL1xPpKJhYxlY4APuI8RWMuy/pKlOlK+tWjMQ9dax+gVzmdJp5yvpfyh/hT8v8ujx7JSyn8K7du/Vrn+vRUEaYifffDWf8Ntrqln/p2TWbwm6AVkjFnRwFe4SYujcrNXv5RuL1UizOyP27MudF3WbwvPolScAnhBzp7DeNVOCOPTlJVTsC7scVB6kPJQ+L4QSnduTJGed6ZJ9YpqTK1g/VTJGOFukhX76YIvh0404VUoTRb0JzUbXDoEYI+0Eu/x1wGQJlVkPf2QvQOQ71Fxii+eMALQ4bj+6+dVz5oofXiYHsFgdlFD8uGJZOByepYXsS+VGQlpDKNnr/L0NBNHEwrO9mnSTRs9hb6HSSi0A4beH3s5lc2mWWZirQSm9DxTj7kLdm9ZPrZMb/eEiDBVhPP2IYLhXvRnFIGaxaBN8fHMD3LMXjVHoce3brjbW7GLQEHHoXZffaLf0jDfzJIPQfdmnft0quEh8193zjfnNwSPrIg4RW8qve5DWVvfyT6KJfgfaq30e08WQnMb4A1BniozBcztINUhfeAt4dHxqwkHu+Fktmc62YeUH0CgJbA8zp+X8rzXVl/hxHug7saKRQUITrWs5IzUy51lPhhYcsdB2T4lGuHImjpniJhhy6bf7BVmWFvXnB5nC+8WVot2Lh1lbJZo3kR3x2at6nuHqMqxr7xyb2o8vsOTzi/pU2JMCMYcaOzcK9f+cPsyusw7xSSvmnr1OvW0lz1UZjG6HYRzfGsFptQdy7DYrHg7SQ0eSUy4SvUklF1HKBBaGF6EPIFRrCRDJsi0h4zCPw/YqG5EgnxW4Wwo07SAEVDtj8Q/ogKIVagj1CFFBLySxOMX07Bdk/0du/Bcw/W+cQnsECtpo/Fu6lmmE9BXSdq2lIAfta0c6wPmmFPxm0SJhF+i9bnSaY3OuSoe809QkU93Hc/YM+LHegU7g87KnHBObd4iiCI5LN9HswsvL70qMZV2TT9eVvbUNp14IgK7N0odE5TlChvhxTii010InI5Tff68xZSwpRtrj1MRujAa+Gyk1z6CO2QSO+/KykW/ocgcj3eQZog6eU+fe5vSi1/4kTmibv1QC/7WBrYs4LC9XioIhTb40OHPeBaDrN0lIOuTfsVrhjMePgSpwzCp3IMie3I87n+SPy/j68C2zdfQgnjjyZeSXUIyY77jl1b9ecZcbbjl51hLLOLAnKpXCyWtrWfm/1gt8ZFkB6zAyGuT/jwjYzRR0T+fbxu3QV0a8RZpgpPN2StuxPq/rfTCHT2sBdGQG1tSCq7hl/3wxUMcUp7urmg2zMOT1XsjH59AJ5098pPX/fVWEMZ6b6zINwO1+7wDQFTcfeM5Q5KvCWiVT6fmNOQvLyeyFT5rvw7T/9SWpXdhHC7EblfHzYKWwpyp3eVEvL3tyKdsNstaYDH3pU3O2uaGK58yEOQdMF6Oynis5M2nvboTVfPcVSdOFUzjjQ8EwVXRGiRk6vFeSvgBj30Om4pUSCHCJNTp96ZDbEP4hQZNoiXoT1vzdSrEvvUHlIWCJdyOK66g4UJFEA4SKWW/CCwVWSv7Suf8+jMWIpJxEE8SmVijLxs/+q4dwkc50UoIybkVPveo8zDFKmYQvoeyXWgDGbuR6xC+U3OIZBqhV53TNMw79jlNfj91Cttl+gI9FUTYaY+R3ptNpAGcC80yjaYBwu0kOtUL/IoI86eaqEMALzx5HoL3gkjIBWsoKRWJl2jZGRpCi2vILBnxAF1YVRIBayGtzl7xJny9iNAyphGZaf3F4RC/ujfOunBtqEQKXHrUnfWCMiz6rGNfE6K+651HNeVbquDElzBvD4z97+o44RsfxzT72UlaML5Axi3HfDW3u3uDtTx3eqMLqB0xLExWW9DcV0ojuFxwamXMwRdmGXDsTtwPXDcedmI7jnKHzA2e5wSUGwxfZIzP5Egjaw9bOj5hkMFZyH4vW08+1MbDBRFQPZOh1eOCeOcMea5zsLH1TrPTOd0z4JyG2Rr9ww7zAHPG7DIIVyg0VHgm6/HDB9Bijfy0o8cgW+taZQ0fe+TOEDZTJOV/hpORmETCzOnDlyQLB8hoyco9uXWur8BQeITGel7mVeab3F1BfZIXlVpfo1MM5Tul+uT1RVkuYmFewfQz+RH0+tTKoMrpex2x5fxXBv17bQn0aLkqaFJXrre3Ir3VW8728dcWli8nlDgwHR9H3A+JifDoNgN/dmy8gpWDQXZEDcA4tPn5ZmemXTqHGa8nTMcpeSE9qDtZ2N+jQYWSNQ4mcdBuXZQapCq9LEfDVwZybUPSCm/NuUGDQoPi4XZUJEJrfjSxH8MA5//nNchl6M91frrrhnLP/e1iVQnfUGtuLCRih82RSASPu2j4uGaQXpEUdttw4xBG/LPapQZj7wgqg9ktI87GrC6n5ioM8ruZh933rjjcr/FwZP14DQ0MFBh17PTViFt5yOLZzKoDNXRlePqyVzH/Z7dOcZ40dEuteZSgV4qTUoYR+q+Rhd42UUJYCz9kYqBh/IR9wHz3Y0+HbsCr3BPE23dAQrHxH9G6TRNmOYSJ2sYyX7IlTupEGtJZpKah3B6RaBd/kcT7/W3q3rK5D7te7O98Y+TgCPiaeAg4iYdT7Ohn2ALlRz80SzO5aVtH6lJSTPVNdsD81K6znGRyU2P3wHHc056487FHFmdbbBS3fprC4ppiShfHJZLqDwIrBp8XLT0MSg6S36qw61zVIXG8X5FnmmAhmuix2O0CMPkrRDsW6QpDdns4mXOHlkXHr6LXiy6Szcvah0cxU66Rh6y6Fq07vzLkeGsIPt+ax1y2EZhPrh8FDd1z6w5xRi7Xzls23BFByovy2i/3KWRd+R4PNw9A9OWTWMKAdV79ddOnYt/jlep1xOeHENDaSd1N35a75U1a8ejK33mUS+Mbleu3ryeB3HL/eSUqjeMfG7zGRm2WBf8uQk50jKE0HWgB36P8Ztkm6cunTFMNv3xzxhX98INnQc0iZy/2Rdo2dh+l39b7b2j5DRtB1cdzw0NhsID96+INrG/4uA760Iyzw/krguwph1ffR7oK2L0R57sJR0mkBcNGWVpj782p0GgQqHtXNaqeNAY5WteB4bevJyqIoVrZd4otxlnmOVjFrseqSWPrikwYEUm8+LM05BHuQ/vpyI9y1eW7KlvXKFM6JhkfMW697LfwmZkEDOvwgtAaMnyycd360wxM8pYdLJHhEJXr151mbqmhuxgC32ZkWh/DHEJ8lBFYFiS7cr0hQ7SSsX4dbebOCraLPepdmg9LEisW86huqdgK5tJ8pcdxTcUqWw6mJJSx39IQWN5OS7IQ+gNCfOrVuSpinnx+zrWKcfKBhE1SegpETDt7hREaC/XNTvnoFO0WitqeWGOT9ztNvLojq0W4XyjgJZ1fEYuzBG3Nf+k2cBYg9RCIF/KAs5/cWd2h2YB79JnQCVWZg6LDqmdzkeZxa5y2dAgQow7fcVj2qQmb0Im0GxGg4WNZYuQKXd7utaWn44UsGJ5IDJjo43nrSwFZDeVQJ7EIfZf0s8w63cBTTnNw0CtFKs4Q4Sjcyqrq7Y2ZfTxS2hU3cwtr196BagdV53bRmPfMmyCbVNazN2ZGkxDLzwqab0ZoIWw4/AXhbleUA3/6hKvhGjf4ZrfrQx/4GueDxgVbfQvg5REaXh1Efco2grbo6qEPVGZXCGnEjC6vfWlbgGMDq2f9Kkqq31XdzyVzW6kNzVXFbbXL7sj/SCiZdX39kTjq+mj7BTtNFVbsV9UdBxEWHafV0HC3TdyEo1gkRjpHf1IcTV2qq+mdUyH/QZhrS0vEEWc0Z66Mgttw6mtXCo6tOrXZGytO8VqxAQdP4OajUs7+xb/zgfkCmM1yG0dGKVrNYRgd/V0JEUPgmFzcWwmsHutc90u/ubyKy3OquYkPVsPQ4cE9pRgzFpDrGKGXMna35p13E21CaKrTZd2PEm4B7C0Be1G21aVPzLbXRXaPRRXr4sc4M8cNrVX8dz2QRID08ENIswn7nARGuXbP9I1b8JTfFYX337a2KBOQ2e59S8ODVsJ4UH4fxIali06UL1hQvOUUgydQkVMT48FscdW8VNoNI/NRGIMcXh5OX+Ej6bRoXIw1yQ3dloYfWyQlMp6ay5957I/s669E85JlULXb2gZFwETrsdP/UsyK+ZTQPHgmJGzKcFToP3rO1I7judYYff21xaFeARmSb3rOVPUkp37ODb5vK9YR6JuRJfBNOlhfFVkmi1ulK/Qw41dKO7pDpNVZtOEsQidR4QUGWIhx6EXBoDlOQihzWYCYNnm5il1Irome1VA270IRhsbjeIuZn2Xz1p3l/sJUIs1PnlChmqDor0iIzw4ojylYyoO/0bjYg3RAvKGldjlxmZszKei2VLw6hdL3f4//2gIydIjZ6Bw0koeMIqXQ/kBt9KZrW4PlGQSkZNFwtxB7smI1HiPdS0a0Fd5ZPDFVQnxfHBVeLBoVVdW6P0+nCgoDGVeaCjJ8GAsjf1OJEVclVcRmWwv867kNPvqQYZsTfC86WK6UVjhPmldKwbcVm2pwt0fsdSBvkRkNLAjDnWXO/CJ1WraFuccxt3hWJy6AoeeFo6Bu0XaRt6ROtAI3fKOb3Bq+UdX+S/XRmb77CHNl/YCHHbf5N1iayglsJDKQYUcq3AA8Dox22Am4JxD+ux7vqWxCryDI1hm6aepWu/N7Kw2TDg2vwjlFQWfsx8tEoF0WhXXO8qNwHPq5CcKx/8uQ+neFzhy5cM0VyqHwubRxQy6II1NY7xkT2AdQehl5PpTMnIRaob2kCegbIQRDfAGX+T0+ZjLEeUL14LnNHi1dlcBLhLM7ZFwxNxbFptJARQWOBC/PCCL2cRaTRxBjO3Zfn96+PsXuMiZb6uL4y1glQptHKPcdiZopNaE80W6OlyWcGcKk5PGvbvDdz9wyYFrtKaT/t31o3IiFdwzK1UnwM4qKlAf5/8bFx5P8+YeEtBulWAZcd5VdEkMAGAq48a0JjS1OEkYV5GSEa3xjjeIsQqE/zzFv+ngxGc8QNmQtErIDg4oj1ZS8AkV7LiFB33N0ZeCcw2GsMpA9Ul5GqKdXS7iIhxrBnR7MWOhZFnBEEK8u0JUGZorSPI3FeNPI6swy67Dr1RIVJtSNMf48KixgWkXHRR6xoaNZzt7P4itpbV6zc+vrBBP3tmHEEF45FIfpFcXmFNzBHh9WYXHI21dMJy2P0YUS8hMiYhuJ7V4EV7zY26flWGlzLlYdlnc1rQsCLVg/eS8cotsvauRPC4/VMLSR0wscW+8bwssVoUeHiz3XYQqmSTG+1TD4e/tRN/sW3GB4sjxL4NrwZlbwr2Yy+yi7ILTVzYkfd+DrdFOW/apm8+vvrgXgNTO9NU4fZ1ZMgWwN5emEB+XenffH1DONGeGVY6XLNX7aiO9bCM6fQlwvcg3xHmtLLfxQAzo6Nxh75Iptf6kXFxFJLJAFiRlcuEoo5xGtqIRNk2pGo66mCcIMHop485Tr1Vj8AjK5AHZ3qaKSSVmC4KfylWxPbqNYmxzvLjb97aKGi6NTIhidpDyO91KaILmR+MhwJb2om5omPtN4UAfasCVQHsExKZErG3AiFNIRGlVUM+RB1Td2R2FLPwfpQwTsq9jCpzUyY8XsZEkLSbUPREhtB68UtiolQn81mRYvqfewaLSLCnkPSL/SCmJ8VQ0WUY5LSg4+BW9uqT26rSF6h7/4gFD4Mp3CryeXYJoNlX4xWeGuGv8cj3PTjDNSnJJKseIDRVcDnUckyZP1IlIm+NAUG8etcu0iliWC2PjT9/RzBPGZA+TfetfJtJVe5jD5upnY0TCUwwwPzIgri5vjMsrwF/A7qLXnJ7KOpB8VBRFPlF1MH8mwZYWqPeN0L+wL2PREpvdWW1BXatShSIxxKCpJVt6pK10xoySqzGZ1Lo5gp9hCBCx/VaIMrhPVbpFScqwtwPzJ2MAQhZeTKpM4xaLpXK7WOTQ2YmJW/P/NZ9J5Tbih+T+NNZsLpwO/L+e9BVGopo9ZnWzOrgiqCqUaTinUNE1wotfb4xZ2vby3/0Pff7QxcEbrD3644u03dbOkCuK74iZPclFStl1lQ/6YYenPSrkucWrv3G3yaXaTVymrOJScn3jJont5fRZs56t+3UT7ChuCV0qPtItQs4UtWPdzzh9r6O895AeJ8ZGNsKD5ZzrX1DkxDz+BM/EBKoFzBtMHLcA8Cx1h+JsaBAeh/BQzt6GE3V9F3pdUPCM6QfItbfqcOUs1hzmenIML9jzFCpMmL71BHDF49XQ2vOu7Lo9aexN45ocOdHWNcc4nHnqsn+a0jo8L+yesYKdY0xoWdXa6tPTqEBf2J+VKElhqfrZBSb5UtGjne0l/GIg2Ob8MITkYjSy+C3tDlQtOZ1zodoV3NiQdrFkcejm2QhwVpWla8Y1spKF+c4UqLr3W9meIdPTg1kD/ZKpRe95P0K5yRxk3BH+CP9gUsctqXc5s59xZ8iQU9eWdnPcnUzvXr1mYpNwwv3djxJZnK6MvZpHZjTf2LYU88SMy+p+QQPwfITHhPk/f4hI28QK95RRDVnrczCPJEzipfjXWLo8BbRDl4u5GW8cOu8Eju4PMtQg8lFQ/ujdUPZKwQtfXn4CVGzlJnmVKbjoj0J9p6sCsxtve4CkhvionzhDTMSE9JTqC0B2ZFRHqKG6LCEqJbk4Ikr6V9XMYvz50zk3lidlyO3COY+42TlHTQo2ZjH2qZen+D5ctdsmtBbRWlm02s1X6t/s6V8w9NTKSnWv/w9k472Qnb0lU/SgfJbfJuxcnt9JKOj0mEdk9QKUWHJR99R/HUG0uOJzulFA1zm5q60qMn0CeQT/NmskiGHJPaVcedgoaYQ0ICjb6lAP7+sD1fGo8I1IaqXV9HJiIaHHly8Z0KP28vdCPSHCd6u0budMWQ3VImMoSyqQBOLFcnR1SkBqXbfZy947/Snu3PEY5qipBn85kCoGaAeMh5sQGLEaXaJrXnmVzlAIombpl/2duqrcimdDkXP3EmltSOBqGGV3stNljIneAy8zdsdlC1r3D76WxewT5pAgGgWs0onZzbbCbm/jqshAo0kDIAPZ6GaTH6VkV3gbB0TiLu9H9yigBsWbhkSpXqp28ZJm1eLn1mAN30yUFGV2tEOnotctw6vjxD56QnaqRMjDqT+eko//x1pQEfZQwhTMiqz7GOt/0G+mtufxs7bqQKZ+aT8f+aCXcv7OE5bzuMt/eQtBnelnKPMobU2c71dJ40uCvVVhJSE4hkvnssPF3IA8jUvEEJ77v3GtlPbnkCvf0LZxc7kuEbGLA4pk5TPK13ioWlUsJQSb5NJ0yldLqeatz6/OJQy+CGbnRce5LRQlJ/41nmZgpSzudG7qwxE15HDd0Ajc/LdndsxbfDJawnMbZ1rgTcl16uWo2KxtzNsr7yQVuow8XS42QTzwWX5rEkV0JR3Lcq8JDTRPKw3dCRweFM8my5UyhwRRITm/fnult8hWsdJh5A4CXWE/gQja93Wx7/hNwpnNIBsd9O85QBYY4bUa0/bpICUhsDgB3vwS1e0lEssfBd/s1bNcPaTMFCbuNJpA4/7JlpThZUo0FjHZz5+o3EDd/Op9AYMt39LN5jSO8CGY6Em5qmZihEew5W40QzK7k62c/34lltz3YoCMcojupRRz62CddNhueOUisN69B1kzEAhRUM5IRUZQ69MvQJz9hLV5y1f31KfM61vLAqX2h4hQux+jd9PXu/a4M7fOpxa3Vxo/z7hfW568vFrOWObvYBTf5WDrlIVpBu3Rge3nedj1Flce4hP9Axsog9uFjz4mwLZgahlRC5bBIHpLVnhy+qlvIbf7dLk+cmu4J5YNCUINP+D/LBswbdXuh3DdBx1BDcxV3HGs88pW+JKErUY7EzbvenpJOOVQQxHcXLtoES6eGPX36m4WpUoHKVifz0MmCQqoeLmTu/U7H4cPkzcErpSuhApeiw+04GSzdTDbm5Wtdw5KYLC3nqCr432a3xSFS1O/IpumjFls24pQuo3fgbIRnXFVB0jSv1DcGvwLC5f0bRznlxQIzAjqhXX11FCyE7TESTcWn/p7JzWnsSghXyVWm3YeuKatPx2a7xItnYR2Ysn2aG6SCPIeOX5p1xAm/gS32gv4E7RfGbSsXKq9OzRjn8hEXBINu0DiiFRdZi4O2ZiXjBKoKTJYQJ3QhMsQQzgY/gOFJGCpsj3KjYXg94gc5oMA+Vyt9Ym0NNfl/q05ZHkWo8z55jOgO1AjlZDMaZVBoKoik+9BIKvf6p2sHL7xfHU4HTsIh3bLEcq1adel3Hk+yPSoeq/dMl42Z7s07cI3vvNnX54AUPF+PeNiIEX5Vc3iJ2Bx9Rl6pI6uf/7rzGcdLJv65hrSDJaImcSYIqJrEWS6QCv28cntavUEZ1bI3iLSM3iPxbIItpUEI+2Q1Ll3A9sqd8EgWFIzOEZJ3vuCwAFe4Z7pf4rS0qLohhnFTRuD1K9bHSzbyXCoa84q3/1RO1bgTjSx9imaiervk+gn8Hfu8lMn+I9e72No70q8tGolbOQPftEWkSOQsIPUw/IRQfhjLm5Of/ukX421ACj2puNFc9Q/A/QO1Eq8z959x4tDY4mwokQNaxYT85tpGVqmNPbEZzvMW8Dmj/kj82Fe2IkDjkg0VTEl+fgUrzutnbXe4q8dzMVVg8+IgDluR5XOhqAxSuVJMVDHvFlGiOCfjfSpW5uFwVckEl4ZyJsPOnHQdy+fSkwRqqC0p1pS+YKTBpmfXNTlsfuVQpNlp1+25k51H4v9CLuMyB37Jfzq9jKDkz5mQA5lD/LE/hG9RC8WKWWtjM50tbz5JwGuGMNarqiiYuEJJOa147C1w9tpSEDJQujJAw9/qMgk/EZ8bnyspHeRy4qBM6UiBkoORLBEv+Vgjk+0dnGc/Aad9KzZNPwnfMT8+Zdp85bm0yx6X2OHblLgrHZHXR82ZuXGrdXJaBGihRvuPHbwZfmB60VomF3LEiHDMOn5UWNubqbaQK79/vvgxwyVzrEzjQzxzYNICt/rAgYWMJ08IYLY5MrNc+vxKvBvfzJzGHu1Wpi1r6tZo/UkAUSiSUAv9DHSgm1J/xoD5J0wxGgSmS5I+JhdxpGyHXIvGbC53iK6rhN60jBLyVGa++8YmVnZWio6UQG9lpcIHimjaw6NLUrVpPvFwhctbmjCyomRmGE+COhf18FMBhDudWiZoM8nLao8+b2Tc3fvhjVKBxjH4w3Mdq1Ic91GjsxMxjQqui9M4fogq3JsrPV2HUs4JJNxHjkCsHSpnXiyKjaOB8sq+tGwITTYYgZ5HnoiWAIIGb2bsp4rtOSUGyKFDlsSEKb6PoM/dF2w67fiRlO4CV7B4ztnjwA1GLLyY2IaPD3JphVPQt69aJDdz651vBBLc0+HMZfU5Ng8NXg+LRr+NmDqIuxAqEsAtEDW/0gNM56qcuLEEbAEFJgC9qD5nS69j7UHpdZQkvIWAghmCn5wZU1Gyg8fg2ZyEOKKFHP4bJ4bPbRqPDhIS8CMByQkg+AaggdEkOAvVafnyCc2H2pBUqL6D1bl8Ei4VsYGlOwdKV/prIKoKUgG1jH6kfxx0hdX2QMbmAJCaGk5GR0prYG6g0JvJScCCEMF8sQiUgKSAXUtmTudexNe3ZidCBAu+9uGUMFADoFS8TjXohyEeKECZy2W21uWQyuT8DGckNRuJXGa/hHv6fYxXWpa/nFXMRDsbNeUhlSx8lrjLCUsjxULWefVMevoCz7AsU/raWd8+whpHUSJ+k10njA8yP+IoIr2vdIHVPI9NEgsEzXJiAJqwjvejLon4/ObgjI9HuIXjlnqqRBQSucfDdsTDJG50D6zjHE37YetJNXPj4DJ2PqH8o/zI39iQGZ+Ypsv2I4/MyNaqn7wOjFmhaiGMDPMbV/vi6hVc0LK0EDng+kBZTo5kTxJ5jZiyRDLNLeE0d5yoaYgugjCdbEEc6M4yQ4lqvr89Oyni2x2Jy449Dl5InVNXj/uzpdVDgWxckAWxxQEGNbDS53axTPdIWS3x0NTm8g3UkUiJdWGhZVGlPlfgUvS+L3zAPs7dYVIditRL3oPl4dcN9aWsnLDa9KoUvds8OBmN9zJEp+RMCPv22BRTogDOxjR7wBORyERNQuZUBPc/NXhWzNNRDny0qDymUEbBQC6UvmXxw10ZiA7Sc6lsbM13b8p6AW5MOuoxr5nlwjV76SbidKSd6Ryoq6AaBK6Jbh+hDJSO0qTP9B0bjbhWqkta45Nok9IUOYcOCTu9wNVwnBoyIVbnQQNaJkjnzgkGn+PjXZXhxeTfqvL6aT1jhUVVNKlcH6+fFpFDddtayGScYcD0XkSSDWuc3PFaQhYGdzMjC+bvsfI33F2pVE//VPZ/WomEl3qWcUyOIg2TdMZP6X5XOO3EDTfu+LCEOE8mHocIIc21IojHDjBEmIBYPrsZSiydh9vU13vRNVbK1AQRyfD0RCF0XXoz5UzlgbruaFfbyLSmO9B2I8UGdv7uB4a3E73kKo3CNThRKRUkO7knthT0F4dIPCg6sIDiWUSoDBtJEGVQLfZQ3+stx0p8n2WKKGNKPR+vEFZe2EbFhTUVX+7ECBhs/OrmDGooMnkpmoxygcqb2kKARhqCFrKZcvKw+KEFuD4LdSaxEFPD5ngSVmhd9pVc4YOymQJZlqMN+C7kxGGIvycLS0GnnCg6l08kJpI0iRu8IiT5FGbjRa/lzknr8d4wf1nmvlil5XsmlIZYD1JYaF3Ddls+3Zp7OPPCH1xTuMVBu8Lj6V6wSy7PYqeOW1+8uNyfKveQBuf/JqomJHsxdwZMWKBsuXIzaDGoUY5JXT3xCqGzNYDyYt3r5lEP+YkzpzERWs4RlvOIkuujFtWBVmecinVMlryo2LV4RMHZtGVgJXYokctxz7+vvm8GnfJY6MA7Gwo1Sj5Xop2GmWPCGZWtyFxb9jPvUsFsfjHpg8qjhpJ8oXRYm5yVQ9SrwnGaBVYwXhBBqyWus1f3+wjQhpmehh9lAtFTIWUMMQC5i0rEQWPxichY4/fZ0Zp3f0Wd9hpP53c21HMl8WzxDznJfAM27VrOGAczKIE/LsXBzVQ1BZquCZlbf7N3zt6/68wsWxhmeVM6rSbxeFH7ulkTFWC0DSKATA1SUDRJnUwyJR4ZFlrinTGXF3+ZzVv+u229m0Qfv3Ku3Za7+M2/B8ETSQQhi6OHDAzfAwmmEnPgKHxNNN0km8kgO/ALoUS4JGLTancq1/z+pidbZBh421NzOCU2N5rJzbNzYagQGoejFjRS2eVglVdAmCQzRWiGu1wDfJz9nMMxzkqWP+bPJEAIBsnYnvNgGWqjdK6mBfqLiCT8lA9qcjJF4SxB34ppPmMsFDppBrMbF47gQrIgPDfFyIu/zNBYpHbxRjNah0CFNPpNr0XMseyKcyAVTGf4ky7iUQi2MFzQ3AVY5oSmiqxc5SpNMFwFUK43Xo8GWXj0dw1SUcvvvnwc6eVknGqZ6HjqtEcG/yiYQ0zVqd0aE0cDC8cwXoF8sf3zCpyyKyKoWcxkZt1VLetOuN4H5IxdkSV2QOuZzzHGDvo0WKdJlP02IZBAObKLOIGcF4uvRrlx29MEWDlZNUKlpaAF1N+LXhmDsRVmDMl1gQq0EkgaY5CkZQ64YgsBNa4ENYKzMqFngrPjR9JBNc7qusIN8gA6O6ftpzP/+8jlusq54OEaaKEBj7wFBGeSe0Ttymf9CHQmalwn33QzghoX2lpy/CxEWxVTIhQwJjPEeERm7NWwJjCdlsdGWsfKpmhdcZqM6f90iO6HuhKc57gwYRNJ9L4OM1aITz4BKqOpkEArImFuZAbAXxHsfrNNpIcshWc7E1YehmjTV8yN1q5GTmOofDfaf96DiBUkz7KPzID9ZURwJMJAnEYvoOMsuBISjCOzs2d8G4ImzPcmkkRQymnvm5iIebaKGbiQ+5FIduNTJ3Ggbk50CnR5Kg2GIKEHJILb/ceiJCZzl0QEISCeXmL00vsQMzFKR0uAyo81mlUK9+xwoXMOFnup5FmmBa9LvYgkndWiDpFnzXncsP2wu9UeTCqqwZXrQBSABCq76/i3NI5gouTkSoaCwMyJS/FaZ04eZWHQJ3R+YG2/f46OSO4yCVYhb+UmLs5GzCPjtOD02UOL/KNCQo1ammeFCQAKWZ3mPP+7E8UXKgobw344S0Fx8eT8oU3H6b1TDMXWEOW4smNLy+I+hRo9xRF2BwD7wIjcSh4huLgKT9AKZqG3p/7Fej9roPsYQ+9Ujx1hicokdhQQO5RBMQk9pYhomf/EL+GgtZ05VVYeVGpr6FQdKGyI1XfNrEUN//5VhBVvuQxGM9nlqUQuopFDr0oJEDRC2+6W9m/PeHkQnhZCCh6OJ7iZ6okZbn02fH1VOFIrNu11KMsTKK2VbRCJjhahIiVrEk2jyrq2qze22oLCovFeglXSz/HjSsV5FLbGE3TOXa7isYMtS9RWuEdFSXRN08z1SibMpjEP02LIa+nSOd0/nHBXg+PcZmGVntcSAuiv8zm1CN66H/euLaDAhohehoKrPa7LOmQx43GxcVIJicVT/3qpbd1oF6YhHMcLY7yIwXIfV4RRiIgxL68hWt9QeMC6rHBS8GTZ78wxZUDxdaL/Mp9SpCXGN0jZQQSovVziIzuC1RucGNu7B2a9h/6a+pI3SagkVOEbgwm4rNwRpMtbNpObSumBlosDQomqTQ8TOc7u3PbSieLLjmKhqaEWX1NPZAlm5uit5tCQkaX7dgf8kivTnV1PSa3gLMCTY23iFpIgNY8Lifa37tjhbVls0VbrEbiYzBMLSyllDqWyRLHUbgZZU8+/EHeIAY38om5qOK8ANULBurfKxnVhfDfaucoWHNZAg2Vc8RrjxOGSe6ma5lyxfLK2fqiWvTnPXLGFpQRpgt22h7YnRK7K15NvvOhwq1ZAKeOSHZeuNWHEkt3GaDzuttMoMusKXOxA98/p2pJBMEC6WDKEWAqp8TC2rZYsAr7LjUCpRm53ndKETyXyar6xgKHSR0mU5yyKOW2p3nYeX3waILut0g19Emkqmo97vA/b7Mw3XzvTIobeuBpjxwUHVNDuQvwa6EiOfvFMfCZixcv/SA0MkFxfF6zbot+eQhmCNudNfWXdS/8/tPzOGkKxIbAHYrqBecrRYWYSHgqYX7c5dPl1KGx+6H7r9ilZVDvP7PUKBqkkaVqB0ecq4XEr0032ozWfBAXM3xPg3x6izMHeKLoYO0/XRjHcnEddBRAGM6EP1EfewqBYzN1YilCVeCyhAqOTCfkEJM8TsOCwWTd6PjY6xOmkeOCDFGVnEbFgnh9+4ZplRng8+gBaTNe5sWwAzYG786HkEd3lybjRwqw2kkDVla0FRmgZd2uQ3NsaUUsoQUpiMwK86upcnThS2xNrbYfc9NvRF5PvpqGSIi267GE7I6WjlQ5gXjx+bOSUouIsPXFa0baRcXuvdNXLjh/rCPo/dFs6ouHF7bs8evNsDHUpWBI1jW65mhTcvWzqlu000YCsviwsZYSYda7paKBDjB772OODEb5FZ7w8ZSQpxsqwVp7yZ68ZOfmE6QkcutuVHgGn3/tHENX1ZPpqJHtsHtkRAzRS/9hyQaHNwOofWO4EeTd4HoNXldkgtvOOqwuQd6lofzpR/NcrjDgRj4V9k7VxFxxhbFeomx24zdTxrstdSMjduwR8MOmerJHkAV8GlM3Gv1HIk40MlQWR1JCdWBBSQAQbr3T8huv40xMcoTlG0sDNyKXNsk+XaRD2kEQ6NI22OR23mQ5mbrpf6IdVbI0MFZJVHN8TRyeaSDe53pDWY/8G02rTomceusZ+4hcEaiqZcAOPQMgBSACehOfnxwOa9POloPt7gv2unI/ua8Fx0kJmBR4FpGJYqQSXXgf68aORVui5Z086M+9DRDPTiiv1TJz2+FTqQgahiJLG6f4b3GbmAKGxqh0m+43ipm67DQJ6hhZLqe5O+Z6G1H9RxTofAv60TxfBeCmIM22epwdDkQXBmNvYVhrxOy7nD6HTb6LoD8Ax7q9oN7KSdwaKdKm6NL0stY7wLSQI2rMGZmNakuGOcURR/yTaQ3FQSgUG/xaNI1r8hCQYHxvFLJOlSu1qawHOM9MVvJ14jpKBKFJls7DtQMwiboDWCUzoIIWCljClz55BT3czw7eSWCQ/PMSndOnZZ7zZaHLlJVkZHhXcf8fa8gj3THpG9YweKB2dBadBEA6GIWgSh9nkUQJoiz2sAtukV3XZKMnCGwfD/TEH6l5cCJj1Y8sRWkxkqj9nXOiSLa6H1v/XPFVY/K4KHn8QB9VOQf9PnLac4lSWqnSi9EYHI9AICHGNbrzLR6j4PluDQ/m2WMzf+ZApnAOtZXlvxPUI7XjjsQZNINtljITmvPzZINlIHnn4/z7ABI/mwrhrx5aLrjnZ1mfVQQRsptJw75DSMWIqm6HkCOJYi4JaVoeZcCQC3DImyLpsxQo3r3ow6MkbMd153qi+1RQ+wTCqKUTIQDRX9jSuTqakL9zsEmZZcOjiwW1x1hMhYBix4U2uWYFuieS/2aJsjHWxbd33PLooi4kxX9N456b0ZniPyv7jnUfxtUnnPdPWHTsNHQXBu5uw5H8nD5tb1OciBK0YWHlHSBMwoDBiNbBp6QIhmkHbYbvEozkxcLsxt8dClXuZYzgb1fD6zg3Gj/qZQQRkit/u72AUmhqhoI0O44ZOtmkwFvVCLI6bImL/ipKP9mYoapxi3BN5KEYwzos/ZvbIzLwgKF3FcxPk+x4mMDppCKQ2+SIW15wM/PQKykheoBUOftw1p2KFeJxHi5ddYOGjXInf16HcLNQkPMUM0RP1sxZN2celiyd5kWySj54+vgt736483oUxHQQiK4lAMhB/i2SgfNzMBVJpxVqi5PLH6Q1vWSxhdiPj9dm1t599ZtAKiBPCAG0TVIqfg72zEj5ZVf+HsGXuihz6IPQkaOidy4hVbzhjKc8pnfmsKynuY7NhnDfNaSw4jFt2evvcWWd3Dy0/shW/XItXhxGWSSc7crVtkTP1WnNnxKg0sp6yxHOuPTF9erp4I5EOsnrDTLQuZaNeL484zfrSXtLw19tpoNrV5bBsrXpuxvuqMYwX5xksYyr3pCAPNYv7KJVkK11cjWFwiQlaDYHfBNQOFhwPLHai0oXxTACy5uwZ8ydyrSz9QY5QGvliSLMaR2NP1hrCL40WoVa1mBM1huQ8kOWksyWWgHXAH3dba1kpLTSIvq+UHMVr3N4PVdPB/h0f/aCRIKe1f7HXjE1dqB70NZwosaIp/0Rc2sK29d3f9skpM6SXO1Buzh+u2oOAeTEJzSRjQITEfsGQRwbWNi3u+VxXe9COz7ta338ado8NyWnyUs0nw5kXB/pTIqiPW55gmRHxinH9pXWLhn3cggJuzTs6uyOiF+j+o5TXoVNDwD/XJXobY1inRIb+Soj03sGfduJBFmXNVbohTk+RW5FxnMzpkv45WA0q1jBGqs2tTZ6jlA+dkega+vNc8SRekOTBQL+5wzd7X6HqzaE/toBXWJgenoELTTgkLVd9l4JMKtfuJP1X8lY9JKuqJ8LaAtyr2oRIPM+bAiMGFLC68TcKCD6cdGh4SdqJnf4r/NPCw5ShXv83ekwY/feJVV8U6gmuA8kvzK2d6+E9rO2DvkMCtXzkrDjj63WuyeB3QhjE/LQ3sJjEL0MoDlYDmx/HPTYKphYXpPD2yVVgzsxQy6Z/BHPqxzPLY/nO6xvCsJqHf4ZI2gaPCIztRzOuKIIElepgIt5ITMDqJvYacQxRonswEgtcCOSl+51v8rDrqBefGO9nEPniQ+PKLKU4n+fhzAX1QP0nirzmjS/vP8f8nUhBnv/z7o+zF8fMl0ckAIjgE+ufALb4Mlaio/+r2LIEfvwW0b8Y8eQAb/u77wHcp5F+GMC5y3g7xKMLAtxmyB6+M8AzGnBOwWUgoJiF2MOiaRBc88TM73jtx6uAMDO3RpLUwTV/cGO51ixgiEAdbz4pBKbgmkL0XEHZWIGtAOB/o9SMv1RA66jgZvNa6q9uLJ+kXIpErpR/rmj9xGk0Ub/gtZd6AHDrPktrkTYT1G3+WfGWJaYm8kL4rQp7bgkrEYD+zGN+UrQEuQy7q6LIR+h8IymXV0KieX/+Wx8+hQv1CTamcxuXnwdCmismOogsQ2BC4Yl4zCJBufLMC5RcUDRAawe/kjFiCS6GdL7JjI/kSghbzGVkhPOCXyeQ6xM8PlKbYdxkiZtVxE3l3Hb0evHK0JJFYlPwKMO2TuTmFLcynKgrXiSr33mXsi3hNyehSKuVDtyBmBGxMmBRysYN4FkqlmIF7eAAD7NSsHyqrRJTrOBciMranSGyPM6DWzF82r86hOh70Sd/rDDwiw4iChK49XEU+FUKnP8ot8oig6AihIz+CqBdpYK6sXWgAflDBiztfjkvLCivO6PFasgnULE4bhV+TrJ5GNXA413v014xaH9ojy+4YtDO1DXFwPhHBtEDyCH6YJ0H+xkHErWF6BNf3AJA7yS1D1mtPPix+DYiykrDBMdevJ2HnkKunUHzj4t9hqwHGtCD6AN1yBRw5gMt6vaAHkL/YsGCdro+Ri9VHNfMPRjXyBZyiWxUlILoSkYgbTN8JsoCLIYnsBIyIXfULADshm2QCrnQAovhCYyDlTALyuAGnIhnxlvLQYGji83p0vOHP3fYcMzmmNA8fZNgbIi5cfzOPbGX8RfGEOqwGMm8Fm69ZXOuG4g7P4eLPYaFugV1r+KU0iPQdnCPOn+qoGn4MDTikHOPy1wSMX68gkHw1uo0wmMFcp78l2U2kS5fmxm95s1kgOh5RBSGOndBc4MigcDSuUQEnrOQbzgQOH+D5zuViXznKXK53NouaPzOq09hPY740NKRCxMXNf5tOM2ynxmU68R8nwceAOR1fHsON6WvapoaRJQvAlfuLVTI/BdgbEJ9zh+NWoffcVtbgDgVZEOb8XE+t4h83DaZ39KAegTT6W4CL1dY46jbS7rV/OqgyIrbxgoJAuosj2e84PNioqYImf99FvV3wTw3sxyjFOo6Y1aEPHAbI2btvEDKhUyWwIw4yHwXM//xaoaYhsKMafDtEzr/7zeRwJ7xyJsiLv0c+NYZV758Y0ZhZOJQdigwesQvYlACSkHvtIJAzGJwdSChsOQUF+LFRsPYcnaLqZ80CW98OMWrcUbEhZJdXyrbqk9bHcDd1bhDAQa/7dY/AmYRXdYzhPKA3LlEBll9hJDjjTou/DIWj/nBZcbK6mn4POEOF6IDBxjbLq13cHqQ7Xpyvr2C1GTHYiFk5pw/Y93KkKT4+HKz4DATaWRW4s4q6s7LpXhgplpe5nsx4e9DvaknxgKApiMGdUmGm1Bvw6oLoFWjavMtn552VTZM7dSEkO0zYQQ3TAR3yCYOawwmnuvMF2hM+9sk8ExnEqWNyCRJWxKTgn+sFlRo/5i0a39Fsdykc7rvahNDvu+3tmci3PevABH9IGWrgWsTwrHShNGdMBHe7pk48pGYeHGTKVCr7TEJrPlgEq1vjUmyfhpMCv+jVVChHTRpN3+3RDDpQu5bb2I49z3y48tEv+9PwZuvG9VPWtSNxVkxx9Xj1RPMJ/TuC9aKUrNxiU7b4vFkXgv+AC7OLMqsGqLSeqaYIzzR+3v3ciUieSxH0GAb8YXL76qeeLpzpaQlh6C0CHlCjnidH1rGkmgFlSZkkOnx+8/CazfZha+dig8iTsT/BF7ta1er79cA/VKCkUBvSaLtG3FAPd6KnS1MfZNI4jJKqySPDrDa8nxO8EPYQfp87NqpbwxeLlc4u1ytns+tRVxoi0CxIREMwQLZXC2UvHNAnNArVeW9GnMVsaKlYAjqldI1Yw9HyKkaNEZjiiS2ntN2PUlHsaDNPLsVut5bO3+NV/8dgcuF/3seNHEBcMVDU3onXZ7qrL7zWXQFhegmKpdJbAOLD3GT+pb6CplolFocWbBcDqYnnN0KXYt2/hqv/umiw57/bfgJL9AVD+xOspyomSVHPaV08TtwngB4hoiJ6CX96kJry0DPW4rl8LgT0Z+WSsdZ+QdZmpMbggSLv5IRkIhqoLEKAK8PxbYi8YaCy5zVHLNr4Hq2zX5KOp26Q/X4UMKsp8Hkjm4GBb4LRG21pBAVa28XIqb88UGrxhnFJB2s2FNrpfanc5AIiDlvZ5pHIRtLIHN2bm4+sa8Ase3NpljTq9/Tcphalvo7/fxFtA3g4tlbXOwB/dOjFz6NwnT2N0/8ssQ7mXGxAdSzaRPHR3pgq6VWMf6sPlf3x3CMPeewDjxSMnlLraxOa24y2czigjPzbufI/WCVzLrBu3RxSw0sn9uSH3hA8NPPHM59N69bGcart+Rhmq1xULvHzdFNrzHccTC2pwKmIaF+WrG6QumKPV+T3QBPeFV9AOSWFRs66KdfktMkc9SFYi8GddoHKSTihT4zcZTtZxTmJ1VyCq8TYMGePS2GCCBtg4vWAKumbWm0mXRsmH1yO2B4Y9KulIHCk46P86mvW6xkHrP/sAf/S422BAFEqjIVKUhyyBQDfzMWKdew8MSHpU6JWoYywNY2SFGPgz6zA/Ez5adk9wgXnRWqc2Citdd3R5H7iepOyu6DSAvQMlWpk6gWHjA47u1BlVOoS9FqGJtJzpJyAXQHymmyTVVROYLxPE9KCwMilN8p5cNaEISliwZBGQ2mtPMm5VbY9RIEhHPC+pv7BSS/FwxYWo3SiCNAfgVSUcVUQEROgUiLnr3GmkQQLoQB7EWW4NRHDyT1mrw6xkbkPFKBefUtNHDF4LPo2faD1TjzZuwl6rJ/KpEwU5VYIIJ8wZzUkOqmwmQZIRypvBhmY5QyKtnZQFMFfAaF/XcZBz+c0qAoZ38p/Npb+a8IVM1JLBQCxQf5MVQCzbZsjO69hO9wF9h7AW00e6N7DOSkz4t2rqMmv1ei89ykFGJ7JGMvyinERVKX3xegURichoEL98bei2I2DGb2ZUN+6tfYr6ED8NC5FRaQo+jwwfRehPSmatyFwaEz/jkoPnNwI5ZuMUso26NKAOvYWs/WxA47DkjNSEhSHZHMe/VLTZIbhRchdtvZex2kxvOH3GstbUnjXY8zysIdplSa7LQAjtsnBwqurfS8C5JVmaehE13tKhgV7F+S0sIrR5nsS2shh+V3AwIKVQfyxE6SSEYvIDDOxkp2kjH+GqggckGZRxSMxJSekBmmqXKQqWnSaCA/uDLDClfi/OGY0l73jqV7ChRCvcv39Gp7O+l9LM/KY7p5L2OvDDNDLki+IbUdkSmHH+3A3osPfsgTGMz4ZzDgz7mQ0NGGumjluVJizarzqaW+kZdM1FeEdHZBp7HTjkNe7/gjlVsImw9ugSk2/drWM5uQewLl/nCi9xntOjdH0tsgYcRVEl9UECPWa1uOTqhbvwjLhOtMp68PKR8oa6vu6KpRF9JQ6SvkPviXk155RX/DWCFp0J3tgezkeZ0vLuLuopVxrYZQVKSOUzhfwrxJt7elNNKjpK0KBi1BJq9C8vut5u2O5E7aqhGO/6Ra3IU+44MqcQPD4eCSHMqom7ZASIDbYAqSceI3Gibb1TI8ZlHJAq3RcPQmucdtCy3mlhyV8/in7y3XdY26al8Q+b5cynnzB9BHYCUTsX/vh4lJYoTjbHFPuNi+GTe3f+JltsTnWMyz/ZjmaUD587gOY0f14u1qqLHFmvoax7ugap2rLoxcxVx1HZv+cgpdY0iO+8RGrK9l6ccQxMIGgwEl9N53Eg1HMGNIHFULP+JuexwqJmNqnvKMlHc34NAoKUhn7CMxpz52k24SFTHvsxP3nTtsMBQIUrT3bcB7my44ZTfP/RNPL87JQce5tnV88INXarIaL4+DQq7jEn7D2oFdrC0KsQkT4D1HzuQ1wkylx4xRKaKwxjan2426T7l9D2ZYg07WfMz8fe3uTfJLd22P4l5gxEzghs9TDRKuHVqD8/pgnnn4tI3dNrkJhGo+7oMKEFA7gALohzrApiiAMVeazQuKQIFsEh1Yqa1NK7AqVN4vrrz+X7C9lfhKOJLGPExxtPXYqf4/HYqd+JKmfUiFcULTOeBiPX9dJcfknApu5sr1IWS0cyGHndd7m8CJeqMDAxD+8d6rjU3J0G0/eOPEd6QIa00fRLf+0d7s4n7Wk5B+VZze7OG6vTIcS59jB/e5dyico9d1AeWuh8V7W8/C/rDDLgZJHet1yAd8RIPBnLn+ox2uc02hGet7EMdTkj9Mo4yRUEL1hJRDSZbNPvCBs/axQH2gCF9Cir4dBgeBCrx5kxVZ8UKXLceo2ghUd4kqpL9sYx7ysiOrQ5m0qWDqXfBmt2+cZlHa2VwpF7mpyHh7TcvnkcDwBwi+LKNRmDB1e+vJD+5ToI5pl4CCUOQlcHGXtVd2d+qRLAwdtZeoza5DtezKH4FIK+4iyE907RggsXOQQcnRw7Th/JYVN/vx0j7VVFJ2Fn0XlA/Mc7V4ucmChnUOGKQ1AOp0Y4ndmcrGMID8eJvkIxWlWS+lBdGb1dZ7kBkzK4BARR4VdlyBCZ+r3DMFlohULG3Oypg2cyAO856CeIPreUDOk3zNmPOSLNeYXe4LoN898UjUPccZA9VlIPEDsmm0o3ANNX9ElUgGDkkfNFVlr7NSFdmUkZAaUvFz5xhunZvbsH0FKGeEKfSgES2vl7FoG4D/SNsZhH3g6IVmuCdm8hjcreICV88IHgFz4o559ltOYs85rAMP0gY3nsCbiafhRpxF22COKS8s2ies6Ab5Z1TIwxjClxw5v8pnWHge60sEuRJt8VQRRVw4DwHLIH+xrGfxYJQRhbwvWNMBKgZKAY4w0cCvUwb5NrI6gF6NOAsmkXKf5YLOIKGmom2AAmRpSSRXERIRi1Rki/EikiFUpzUnSgNjIzFyyASocyBKshUIJ02nDDyK8i1Sk3qxkoYRZdqo6lAJD8iyDUQf7/KiXI7DlxSoiQulkWUv3PJK1Hh8pVjtgSQSrBoJqlBBi4eCAlyN8MYak3Mz6DmjWph5zo1avZULk/Abqmk5ISx4S80FJjHj64jg1FdKMsROMcmD+56gjhCQUQhM4l6n0gLvmMCjSFh9x8/Cr3XV3l/x2QgJG6IxozGUzFUhVTth348uLjLzcCPxhBeRygYqw6BRstM1Qalg1MLkGel0JswKQyhbI4BCXwhxADImDb+kEGW3ouQRj3chF7JWUOtGDe2iw8xd9hrU+HrNvopIYBgmo0G8M8oMlNy8tKtF9s+LQPS0sMoIrWVG0jNlFUWlKd2sncKvhkGM371Y6IDUofQrEqEGq+Ai1aRhgHlpX4h+iX42D69HaO+4T4ZVOEf60hcmBIU7BeweVWVCRL0wWWH0PC9dL5qb53GDqUreKIJVwmuubAynBtHKY4MThsdZY25Fu/7sP4m7gGFRhzAYm7rzqcf6AFwVszKVAIu3TOgmwe0amKhA4UscgJonoxLoQkc3awQXdM7Tc3ASCc97VRSQn4IaGmcdnVXaS/DyFTB6K6lEOsZ4BKYBM2DY8rJxRCpdWk4JK8qUKThtFOpWfOMORwt0kpQGTZsLVtv6FwArR+Unprikzca2XSr2o/egtgMekAHRNIL7Z+oJZnwY1HXZkiwdX8ZaQCYeNuBTEh0nW5DlAd8beUVMoMoLGXDokRzjy0G1cj9JK/m2MEEzu5KQaSDAQxxwmJocHMfhae7QCiNvgqabuPPw/hJepqbEzDKRL4DJ7aTCPj9UGbK5OwG1FNbRVYCmQoj1GCqlIkGSEaGeTzoNRUipLFqDSoMSgzcGGkEiH7HV+AeNJDUPOEOrsH0+wrhYdjppDTTLIEtMo97S6mrNdZruFzsFMzQFPtG6WIisprycUNpwdxR3DkrrvpDkrJ0ozj+thQROedSkTBgOhPCi+IYvhSkUtRziWVML3PxmbrrE6jatmeCMeXEgbX66KegzFFRXj/In5/EEnwFxgCRfcGGNtr/CU/JQ2O76IPAuWAt5F5iqkHs3Z/gNnRBugqBlUCLolKgaY61xtGZGu7UScKrfWgKc2acg3Xvfink12K1JL/b/6iTLnl+p4UO6ZFvsZDa8wxQfCaFH9TfDwOXSHcVPRt0K1V0GWDUDuh2HeWdSv3FtC2BtlyFhWfoTKAF4D8RqlydhtaRP7IYwCv1wi8KdpHZPgbXH43ccnT6qTtK0wxzSnSVQ7TTwISSnBjGMjCSSDG3RJVrheJhXpMtcWHsY+Eq1U1AQckq7Jjp8y7UmbmIXCX0rxB47y3CuLT3FE6nDxupJ6dTmu6k0JYQO7YnxxLvJVi6nGZxvpkPSHMLb5YQDt5r7Yb1Jqqfpm3tSg+AXUx8tQ29QN+bjlGYWuwVk32k5XhiwB45sgsj1uZ7Dj8Ndgjn7Xf8yUv6J4pDgxw079ZdxzTBak09+8I3w4//nELirwrPlrDvm53huZvsnF1sbGPS6baJBM0xx1D1LrPPZJ18ss8FpJ21UpFifEmeVOuWMi2w7Fl8oc5VuR68Qm8zu3ul3wzXXVSDKpzPVSJWq1KhWa8go9b/YSzdq5h9Ci1YvjdauzRjjjLXbsAnG69Dptbf2Au/YAP73E3nHemCdX6B3EGSJrAgkQhKRl+8zQXv3cSkoKmHKFBWcSlNVU9fQ7NsQg4cwRdiy0uWh8LhZG9v8OpR9J0MjjnXnh5+VbWVtmD3flWuBQyebI0+PlTv7rjb/XEhlbr3x1jvvfSBIkWpgXSekjw6OWnAtRwqhpPMbPo9jNrI2NTO3MrbE6FEZKkU9gdPjm+YJRBKZQqXRGUwWVw8PM8X9ZXQ9sq2Or4ec0GeIjdDOkkfIHhb/jPU1PQho1H9Ye+zNZAEIRoB7JIQlPctGolGeyuQKJRYNF71H34PRZLZYbQA+ak+r9rUcTBrPU7L+MsDD4aMiLo3qKD6srk+3H6IcZeeBPLrJPO2djy32y7+AAjvN3AH0cUNY4UV0n/77u+hiii2uEalSp0mbzlbb7LTLMdvtcFyXydVn8LsTDjhYY6bMptdivn8ccrjxJZRYUslZs2UvJUeppZVeRplllV1OudZY6ncZesjm+RybnK5vgCwhZmfRyRXnTyG7iyYmUNU0Fp19c3+9UXnUVab9PrqYFqtNOe2c4e1MFHdr0C3YOSq/xBZRWs87eZ79K8KlJ3hFeY6McCc/DILkDgLXcv6lqncBUmtlN1L7kV55kfZb/eyPVJqLyT7nNWm62+jbps8LFFZJftgR0i9EYuFL8WXkX0XiTl+5r9wF/pdKe0hdAcuOvcD2Llyj502yEkGMRXsxCcppT9qrwfAIVU46pp1XKOSilgxukTOczHVBUSxQMhLqXzZqjrHi9Rh6Pnar5gzGvqlaRwwaUcTXQhtM9hOmqpNUmNGUSXtZV3pgYeOZpflgW5nJgYxBZmLoQybxUR+Gz3WbxaRlKCnLLz0UcPXN63GqvlMmg+9jJx4q6n2JUx6M46WTYTwNrkWm562eKsq/XnnjtukMOSdV7+eS4iN7j9H7qTzWH/vrk4/k7/R5uqRtkxQ3gymX5r4Q/rnOy6px2mwpCvlSvblcsWjzn/UlY4Z0vi8aNl6fSnryn68Iz96UvhoPTKSZUnBdNdmOiYqaono9dm6e+yMgS2i53YQdGwYmP3rJ+3UaYwHSZsiSlxW4Nk2UnzFgQ5pzdBiicIjeCvL1F9FRxHEzQSKqgeOUHRSC+fjYRNNN+Hw0jfF9135jND+nWKRrhke1yZuiejsOiyMimJ3bdQ6yL5XEo2M/WFxYW4iTaIMM+WauSA7RvSAVp26si2Dt1iKYiFmWweqtotH3QaVyzYjovRTGmlFZ1DKMqNCn4rEndk19WwMQYYKkuOkMJovNkY+G3wAAAAAAAAAAAIAQQgghhBBCCCFECCGEEEIIIYQQwhhjjDHGGGOMMSYIgiAIgiAIgiAIgtDpF6nrmqIo3cNK1/uaXR7aiKS46ZylB99cLgyOL4o3DZcYZ+Wbaj4rx7HBdzvl05tFp2SbzCkCTE4fnR2n2SzhS+d5svN+QfZcvjE9Zd77+efa4ZpH+zTMW0fksKta8t/+IrbMbiXfdKXafwSrm1Va3TDIadcoWSgUvWfsOM3kDr9TbHXlwz243Hqee6dD9lWZ4Pj/76eHFvG1+7PhMzSUW9/ff3VW84R3LvSrbAWy45pbP8gA", Ve = "Excalifont", xr = [
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
], ki = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), xl = /* @__PURE__ */ new Set(["Excalifont"]), wl = /* @__PURE__ */ new Set([...ki, ...xl]);
function kl(t) {
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
function Ze(t) {
  return ki.has(t) ? t : `'${t}', sans-serif`;
}
let ys = !1;
function vl(t = document) {
  if (ys) return;
  ys = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${wi}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = xr.filter((n) => !wl.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function Be(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
const Sl = {
  default: "dot-grid",
  "cutting-board": "blueprint",
  // Removed grid-as-paper types → nearest color equivalent
  "graph-paper": "plain-white",
  "college-ruled": "plain-white",
  isometric: "plain-white"
};
async function Ml(t) {
  var s, i;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const l = r[n].trim();
    if (l.startsWith("<!--@meta")) {
      const a = Be(l);
      if (a.background) {
        const c = Sl[a.background] ?? a.background;
        o.background = c;
      }
      if (a.originView) {
        const c = a.originView.split(",").map(Number);
        c.length === 3 && c.every((h) => !isNaN(h)) && (o.originView = { x: c[0], y: c[1], zoom: c[2] });
      }
      n++;
      continue;
    }
    if (l.startsWith("<!--@frame")) {
      const a = Be(l);
      for (n++; n < r.length && r[n].trim() === ""; ) n++;
      e.push({
        id: a.id || At(10),
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
      const a = Be(l);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      const h = c.join(`
`), f = h.trim().length > 0 ? await En(h) : [];
      e.push({
        id: a.id || At(10),
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
          blocks: f,
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
      const a = Be(l);
      if (n++, a.tool === "shape")
        for (e.push({
          id: a.id || At(10),
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
        let c = "";
        n < r.length && !r[n].trim().startsWith("<!--@") && (c = r[n].trim(), n++);
        const h = c ? c.split(" ").filter(Boolean).map((b) => {
          const g = b.split(",").map(Number);
          return [
            g[0] || 0,
            g[1] || 0,
            g[2] || 0.5
          ];
        }) : [];
        let f = 1 / 0, d = 1 / 0, p = -1 / 0, m = -1 / 0;
        for (const [b, g] of h)
          b < f && (f = b), g < d && (d = g), b > p && (p = b), g > m && (m = g);
        isFinite(f) || (f = parseFloat(a.x || "0"), d = parseFloat(a.y || "0"), p = f, m = d);
        const y = h.map(
          ([b, g, x]) => [b - f, g - d, x]
        );
        for (e.push({
          id: a.id || At(10),
          type: "draw",
          x: f,
          y: d,
          w: p - f,
          h: m - d,
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
        }); n < r.length && r[n].trim() === ""; ) n++;
      }
      continue;
    }
    if (l.startsWith("<!--@image")) {
      const a = Be(l);
      n++, e.push({
        id: a.id || At(10),
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
      const a = Be(l);
      for (n++, e.push({
        id: a.id || At(10),
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
      }); n < r.length && r[n].trim() === ""; ) n++;
      continue;
    }
    if (l.startsWith("<!--@text")) {
      const a = Be(l);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: a.id || At(10),
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
          fontFamily: a.fontFamily || Ve,
          color: a.color || "#1e1e2e",
          align: a.align || "left",
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (l.startsWith("<!--@sticky")) {
      const a = Be(l);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      e.push({
        id: a.id || At(10),
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
    n++;
  }
  return { nodes: e, meta: o };
}
function co(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const Cl = 14;
function _o(t, e, o, r, n) {
  const s = e.find((d) => d.id === o);
  if (!s) return null;
  const i = co(t, n), l = Cl / r, a = e.filter((d) => d.direction === s.direction), c = a.indexOf(s);
  if (c < 0) return null;
  const h = t.y + i / (a.length + 1) * (c + 1), f = s.direction === "input" ? t.x - l : t.x + t.w + l;
  if (t.rotation) {
    const d = t.x + t.w / 2, p = t.y + i / 2, m = t.rotation * Math.PI / 180, y = Math.cos(m), b = Math.sin(m), g = f - d, x = h - p;
    return { x: d + g * y - x * b, y: p + g * b + x * y };
  }
  return { x: f, y: h };
}
function ms(t, e, o, r, n, s, i, l) {
  const a = i - n, c = l - s;
  if (a === 0 && c === 0) return { x: n, y: s, side: "right" };
  let h = 1 / 0, f = n, d = s, p = "right";
  if (a !== 0) {
    const m = (t + o - n) / a;
    if (m > 0 && m < h) {
      const y = s + m * c;
      y >= e && y <= e + r && (h = m, f = t + o, d = y, p = "right");
    }
  }
  if (a !== 0) {
    const m = (t - n) / a;
    if (m > 0 && m < h) {
      const y = s + m * c;
      y >= e && y <= e + r && (h = m, f = t, d = y, p = "left");
    }
  }
  if (c !== 0) {
    const m = (e + r - s) / c;
    if (m > 0 && m < h) {
      const y = n + m * a;
      y >= t && y <= t + o && (h = m, f = y, d = e + r, p = "bottom");
    }
  }
  if (c !== 0) {
    const m = (e - s) / c;
    if (m > 0 && m < h) {
      const y = n + m * a;
      y >= t && y <= t + o && (h = m, f = y, d = e, p = "top");
    }
  }
  return { x: f, y: d, side: p };
}
function ho(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), l = t - o, a = e - r;
  return [o + l * s - a * i, r + l * i + a * s];
}
function Il(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return ms(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [l, a] = ho(o, r, n, s, i), c = ms(t.x, t.y, t.w, e, n, s, l, a), [h, f] = ho(c.x, c.y, n, s, -i);
  return { x: h, y: f, side: c.side };
}
function vi(t, e, o, r) {
  return Math.abs(t) / o >= Math.abs(e) / r ? t >= 0 ? "right" : "left" : e >= 0 ? "bottom" : "top";
}
function zl(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, h] = t.rotation ? ho(o, r, n, s, a) : [o, r], f = c - n, d = h - s;
  if (f === 0 && d === 0)
    return { x: n + i, y: s, side: "right" };
  const p = 1 / Math.sqrt((f / i) ** 2 + (d / l) ** 2);
  let m = n + f * p, y = s + d * p;
  const b = vi(f, d, i, l);
  return t.rotation && ([m, y] = ho(m, y, n, s, -a)), { x: m, y, side: b };
}
function Tl(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2, i = t.w / 2, l = e / 2, a = t.rotation ? -t.rotation * Math.PI / 180 : 0, [c, h] = t.rotation ? ho(o, r, n, s, a) : [o, r], f = c - n, d = h - s;
  if (f === 0 && d === 0)
    return { x: n + i, y: s, side: "right" };
  const p = 1 / (Math.abs(f) / i + Math.abs(d) / l);
  let m = n + f * p, y = s + d * p;
  const b = vi(f, d, i, l);
  return t.rotation && ([m, y] = ho(m, y, n, s, -a)), { x: m, y, side: b };
}
function yn(t, e, o, r) {
  var n;
  if (t.type === "shape") {
    const s = (n = t.data) == null ? void 0 : n.shape;
    if (s === "ellipse") return zl(t, e, o, r);
    if (s === "diamond") return Tl(t, e, o, r);
  }
  return Il(t, e, o, r);
}
function mn(t, e, o, r) {
  const n = yn(t, e, o, r);
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
  const l = t.rotation * Math.PI / 180, [a, c] = ho(s, i, r, n, l);
  return { x: a, y: c };
}
function Do(t) {
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
function bs(t) {
  var o;
  if (t.type !== "shape") return !1;
  const e = (o = t.data) == null ? void 0 : o.shape;
  return e === "ellipse" || e === "diamond";
}
function Ge(t, e, o = "bezier", r, n, s, i, l, a, c) {
  const h = co(t, r), f = co(e, r), d = t.x + t.w / 2, p = t.y + h / 2, m = e.x + e.w / 2, y = e.y + f / 2;
  let b, g, x, z;
  if (a)
    b = a.x, g = a.y, x = n ?? "right";
  else if (n) {
    const N = bn(t, h, n);
    b = N.x, g = N.y, x = n;
  } else {
    const N = yn(t, h, m, y);
    if (b = N.x, g = N.y, x = N.side, bs(t)) {
      const _ = Math.hypot(m - d, y - p);
      _ > 0 && (z = { dx: (m - d) / _, dy: (y - p) / _ });
    }
  }
  let I, M, j, X;
  if (c)
    I = c.x, M = c.y, j = s ?? "left";
  else if (s) {
    const N = bn(e, f, s);
    I = N.x, M = N.y, j = s;
  } else {
    const N = yn(e, f, d, p);
    if (I = N.x, M = N.y, j = N.side, bs(e)) {
      const _ = Math.hypot(d - m, p - y);
      _ > 0 && (X = { dx: (d - m) / _, dy: (p - y) / _ });
    }
  }
  switch (o) {
    case "straight":
      return Pl(b, g, I, M, x, j);
    case "bezier":
      return Rl(b, g, I, M, x, j, l, z, X);
    case "smoothstep":
      return Al(b, g, I, M, x, j, i);
    case "step":
      return Ll(b, g, I, M, x, j, i);
  }
}
function Pl(t, e, o, r, n, s) {
  const i = Math.min(t, o), l = Math.min(e, r), a = Math.abs(o - t), c = Math.abs(r - e);
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
    bounds: { x: i, y: l, w: a, h: c }
  };
}
function Rl(t, e, o, r, n, s, i, l, a) {
  const c = Math.hypot(o - t, r - e), h = Math.min(c * 0.5, Math.max(50, c * 0.25)), f = l ?? Do(n), d = a ?? Do(s), p = i ? i[0] * (4 / 3) : 0, m = i ? i[1] * (4 / 3) : 0, y = t + f.dx * h + p, b = e + f.dy * h + m, g = o + d.dx * h + p, x = r + d.dy * h + m, z = 0.125 * t + 0.375 * y + 0.375 * g + 0.125 * o, I = 0.125 * e + 0.375 * b + 0.375 * x + 0.125 * r, M = Math.atan2(r - x, o - g), j = Math.atan2(e - b, t - y), X = {
    x: z,
    y: I,
    axis: "xy",
    min: 0,
    max: 0
  }, N = Math.min(t, o, y, g), _ = Math.min(e, r, b, x), J = Math.max(t, o, y, g), dt = Math.max(e, r, b, x);
  return {
    path: `M${t},${e} C${y},${b} ${g},${x} ${o},${r}`,
    labelX: z,
    labelY: I,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: M,
    tailAngle: j,
    sourceSide: n,
    targetSide: s,
    kinkHandle: X,
    bounds: { x: N, y: _, w: J - N, h: dt - _ }
  };
}
function Al(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: h } = Wn(t, e, o, r, n, s, 20, i), f = Dl(c, 8), d = Math.floor(c.length / 2), p = (c[d - 1][0] + c[d][0]) / 2, m = (c[d - 1][1] + c[d][1]) / 2, y = c[c.length - 1], b = c[c.length - 2], g = Math.atan2(y[1] - b[1], y[0] - b[0]), x = c[0], z = c[1], I = Math.atan2(x[1] - z[1], x[0] - z[0]);
  let M = 1 / 0, j = 1 / 0, X = -1 / 0, N = -1 / 0;
  for (const [_, J] of c)
    _ < M && (M = _), J < j && (j = J), _ > X && (X = _), J > N && (N = J);
  return {
    path: f,
    labelX: p,
    labelY: m,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: g,
    tailAngle: I,
    sourceSide: n,
    targetSide: s,
    kinkHandle: h,
    bounds: { x: M, y: j, w: X - M, h: N - j }
  };
}
function Ll(t, e, o, r, n, s, i) {
  const { points: a, kinkHandle: c } = Wn(t, e, o, r, n, s, 20, i), h = [`M${a[0][0]},${a[0][1]}`];
  for (let N = 1; N < a.length; N++)
    h.push(`L${a[N][0]},${a[N][1]}`);
  const f = Math.floor(a.length / 2), d = (a[f - 1][0] + a[f][0]) / 2, p = (a[f - 1][1] + a[f][1]) / 2, m = a[a.length - 1], y = a[a.length - 2], b = Math.atan2(m[1] - y[1], m[0] - y[0]), g = a[0], x = a[1], z = Math.atan2(g[1] - x[1], g[0] - x[0]);
  let I = 1 / 0, M = 1 / 0, j = -1 / 0, X = -1 / 0;
  for (const [N, _] of a)
    N < I && (I = N), _ < M && (M = _), N > j && (j = N), _ > X && (X = _);
  return {
    path: h.join(" "),
    labelX: d,
    labelY: p,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: b,
    tailAngle: z,
    sourceSide: n,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: I, y: M, w: j - I, h: X - M }
  };
}
function Wn(t, e, o, r, n, s, i, l) {
  const a = Do(n), c = Do(s), h = t + a.dx * i, f = e + a.dy * i, d = o + c.dx * i, p = r + c.dy * i, m = n === "left" || n === "right", y = s === "left" || s === "right", b = [[t, e], [h, f]], g = l ?? 0.5;
  let x;
  if (m && y) {
    const z = h + (d - h) * g;
    b.push([z, f], [z, p]);
    const I = Math.min(h, d), M = Math.max(h, d);
    x = { x: z, y: (f + p) / 2, axis: "x", min: I, max: M };
  } else if (!m && !y) {
    const z = f + (p - f) * g;
    b.push([h, z], [d, z]);
    const I = Math.min(f, p), M = Math.max(f, p);
    x = { x: (h + d) / 2, y: z, axis: "y", min: I, max: M };
  } else m && !y ? b.push([d, f]) : b.push([h, p]);
  return b.push([d, p], [o, r]), { points: b, kinkHandle: x };
}
function Dl(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], l = t[n + 1], a = i[0] - s[0], c = i[1] - s[1], h = l[0] - i[0], f = l[1] - i[1], d = Math.hypot(a, c), p = Math.hypot(h, f);
    if (d === 0 || p === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const m = Math.min(e, d / 2, p / 2), y = i[0] - a / d * m, b = i[1] - c / d * m, g = i[0] + h / p * m, x = i[1] + f / p * m;
    o.push(`L${y},${b}`), o.push(`Q${i[0]},${i[1]} ${g},${x}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function El(t, e, o, r, n, s, i, l, a) {
  const c = 1 - a, h = c * c, f = h * c, d = a * a, p = d * a;
  return [
    f * t + 3 * h * a * o + 3 * c * d * n + p * i,
    f * e + 3 * h * a * r + 3 * c * d * s + p * l
  ];
}
function Wl(t, e, o, r, n, s, i, l, a, c, h = 24) {
  let f = 1 / 0, d = o, p = r;
  for (let m = 1; m <= h; m++) {
    const y = m / h, [b, g] = El(o, r, n, s, i, l, a, c, y), x = Fn(t, e, d, p, b, g);
    x < f && (f = x), d = b, p = g;
  }
  return f;
}
function Fl(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = Fn(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function Si(t, e, o, r, n, s, i, l) {
  const a = n.data.edgeType || "bezier", c = Ge(
    o,
    r,
    a,
    s,
    n.data.sourceHandle,
    n.data.targetHandle,
    n.data.midpointOffset,
    n.data.curveOffset,
    i,
    l
  ), { x1: h, y1: f, x2: d, y2: p } = c;
  if (a === "straight")
    return Fn(t, e, h, f, d, p);
  if (a === "bezier") {
    const b = Math.hypot(d - h, p - f), g = Math.min(b * 0.5, Math.max(50, b * 0.25)), x = Do(c.sourceSide), z = Do(c.targetSide), I = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, M = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, j = h + x.dx * g + I, X = f + x.dy * g + M, N = d + z.dx * g + I, _ = p + z.dy * g + M;
    return Wl(t, e, h, f, j, X, N, _, d, p);
  }
  const m = 20, { points: y } = Wn(h, f, d, p, c.sourceSide, c.targetSide, m, n.data.midpointOffset);
  return Fl(t, e, y);
}
function qr(t, e, o) {
  const r = co(t, o), n = co(e, o), s = t.x + t.w / 2, i = t.y + r / 2, l = e.x + e.w / 2, a = e.y + n / 2, c = mn(t, r, l, a), h = mn(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: h.x, y2: h.y };
}
function Kr(t, e, o, r) {
  const n = co(t, r);
  return mn(t, n, e, o);
}
function Fn(t, e, o, r, n, s) {
  const i = n - o, l = s - r, a = i * i + l * l;
  if (a === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / a)), h = o + c * i, f = r + c * l;
  return Math.hypot(t - h, e - f);
}
function Nl(t, e, o, r, n) {
  const s = (l, a) => l >= n.x && l <= n.x + n.w && a >= n.y && a <= n.y + n.h;
  if (s(t, e) || s(o, r)) return !0;
  const i = [
    [n.x, n.y, n.x + n.w, n.y],
    // top
    [n.x, n.y + n.h, n.x + n.w, n.y + n.h],
    // bottom
    [n.x, n.y, n.x, n.y + n.h],
    // left
    [n.x + n.w, n.y, n.x + n.w, n.y + n.h]
    // right
  ];
  for (const [l, a, c, h] of i)
    if (Bl(t, e, o, r, l, a, c, h)) return !0;
  return !1;
}
function Bl(t, e, o, r, n, s, i, l) {
  const a = o - t, c = r - e, h = i - n, f = l - s, d = a * f - c * h;
  if (Math.abs(d) < 1e-10) return !1;
  const p = n - t, m = s - e, y = (p * f - m * h) / d, b = (p * c - m * a) / d;
  return y >= 0 && y <= 1 && b >= 0 && b <= 1;
}
function Po(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, a = r / 2, c = t + n * a, h = e + s * a, f = t - n * a, d = e - s * a, p = r * 0.4;
  return `M${f + i * p},${d + l * p} L${c},${h} L${f - i * p},${d - l * p}`;
}
function Sr(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, a = r / 2, c = t + n * a, h = e + s * a, f = t - n * a, d = e - s * a, p = r * 0.4;
  return `M${c},${h} L${f + i * p},${d + l * p} L${f - i * p},${d - l * p} Z`;
}
function Ao(t, e) {
  const o = co(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = bn(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function ur(t, e, o, r) {
  const n = Ao(t, r);
  let s = n[0], i = 1 / 0;
  for (const l of n) {
    const a = Math.hypot(l.x - e, l.y - o);
    a < i && (i = a, s = l);
  }
  return s.side;
}
function Hl(t, e, o, r, n, s) {
  const i = 8 / r, l = [];
  for (const a of t.values()) {
    if (a.type !== "edge") continue;
    const c = a, h = t.get(c.data.fromId), f = t.get(c.data.toId);
    if (!h || !f) continue;
    const d = s == null ? void 0 : s(c, h, f);
    Si(e, o, h, f, c, n, d == null ? void 0 : d.sourcePortPos, d == null ? void 0 : d.targetPortPos) < i && l.push(a);
  }
  return l;
}
function Ol(t, e, o, r, n, s) {
  const i = 8 / r;
  let l = null, a = i;
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const h = c, f = t.get(h.data.fromId), d = t.get(h.data.toId);
    if (!f || !d) continue;
    const p = s == null ? void 0 : s(h, f, d), m = Si(e, o, f, d, h, n, p == null ? void 0 : p.sourcePortPos, p == null ? void 0 : p.targetPortPos);
    m < a && (a = m, l = c);
  }
  return l;
}
function Xl(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, l = t.y + t.h / 2, a = t.y + t.h, c = [r, n, s], h = [i, l, a];
  let f = 1 / 0, d = 1 / 0;
  const p = [];
  for (const y of e) {
    const b = y.x, g = y.x + y.w / 2, x = y.x + y.w, z = y.y, I = y.y + y.h / 2, M = y.y + y.h, j = [b, g, x], X = [z, I, M];
    for (const N of c)
      for (const _ of j) {
        const J = _ - N;
        Math.abs(J) <= o && (Math.abs(J) < Math.abs(f) && (f = J), p.push({
          axis: "x",
          position: _,
          start: Math.min(t.y, t.y + t.h, y.y, y.y + y.h),
          end: Math.max(t.y, t.y + t.h, y.y, y.y + y.h)
        }));
      }
    for (const N of h)
      for (const _ of X) {
        const J = _ - N;
        Math.abs(J) <= o && (Math.abs(J) < Math.abs(d) && (d = J), p.push({
          axis: "y",
          position: _,
          start: Math.min(t.x, t.x + t.w, y.x, y.x + y.w),
          end: Math.max(t.x, t.x + t.w, y.x, y.x + y.w)
        }));
      }
  }
  const m = /* @__PURE__ */ new Map();
  for (const y of p) {
    const b = `${y.axis}:${y.position.toFixed(1)}`, g = m.get(b);
    g ? (g.start = Math.min(g.start, y.start), g.end = Math.max(g.end, y.end)) : m.set(b, { ...y });
  }
  return {
    guides: Array.from(m.values()),
    snapDx: Math.abs(f) <= o ? f : 0,
    snapDy: Math.abs(d) <= o ? d : 0
  };
}
class Yl {
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
      width: 2.5,
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
    vt(this, "history", new al());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vt(this, "listeners", {});
    vt(this, "_suppressEvents", !1);
    vt(this, "_collabMode", !1);
    vt(this, "clipboard", []);
    vt(this, "pasteCount", 0);
    vt(this, "nextZValue", 1);
    vt(this, "_minZ", 0);
    vt(this, "quadTree", new fn({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    vt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    vt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    vt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    vt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    vt(this, "_measuredHeights", {});
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
  // --- Grid Snapping ---
  toggleSnapToGrid() {
    this.snapToGrid = !this.snapToGrid;
  }
  toggleSmartGuides() {
    this.smartGuides = !this.smartGuides;
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
    const o = e.filter((a) => a.order != null).sort((a, c) => a.order - c.order), r = e.filter((a) => a.order == null), n = 100;
    r.sort((a, c) => a.y - c.y);
    const s = [];
    for (const a of r) {
      const c = s[s.length - 1];
      c && Math.abs(a.y - c[0].y) < n ? c.push(a) : s.push([a]);
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
    const o = this.presentationSlides[e], r = this.nodes.get(o);
    if (!r) {
      this.exitPresentation();
      return;
    }
    const n = this.presentationIndex;
    this.presentationIndex = e, this.emit("presentation"), this._presentationAnimId != null && (cancelAnimationFrame(this._presentationAnimId), this._presentationAnimId = null), this._transitionOverlay = null;
    const s = this._computeSlideViewport(r), i = r.data, l = i.transition ?? "pan", a = i.transitionDuration, c = e >= n ? 1 : -1;
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
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, l = o + r * 2, a = this._containerWidth, c = this._containerHeight, h = To(Math.min(a / i, c / l), 0.1, 5);
    return {
      x: (a - i * h) / 2 - n * h,
      y: (c - l * h) / 2 - s * h,
      zoom: h
    };
  }
  /** Pan transition: smooth viewport interpolation (default). */
  _transitionPan(e, o) {
    const r = o ?? 400, n = performance.now(), s = { ...this.viewport }, i = (l) => {
      const a = Math.min((l - n) / r, 1), c = 1 - Math.pow(1 - a, 3);
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
    const r = (o ?? 500) / 2, n = performance.now(), s = (i) => {
      const l = Math.min((i - n) / r, 1);
      if (this._transitionOverlay = { type: "fade", phase: "out", progress: l }, this.emit("presentation"), l < 1)
        this._presentationAnimId = requestAnimationFrame(s);
      else {
        this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport");
        const a = performance.now(), c = (h) => {
          const f = Math.min((h - a) / r, 1);
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
      const a = Math.min((l - n) / r, 1);
      a < 0.5 ? this._transitionOverlay = { type: "dissolve", phase: "out", progress: a * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "dissolve", phase: "in", progress: (a - 0.5) * 2 }), this.emit("presentation"), a < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Zoom transition: zoom out from current, zoom into target. */
  _transitionZoom(e, o) {
    const r = o ?? 600, n = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), l = (s.x + e.x) / 2, a = (s.y + e.y) / 2, c = (h) => {
      const f = Math.min((h - n) / r, 1);
      if (f < 0.5) {
        const d = f * 2, p = 1 - Math.pow(1 - d, 3);
        this.viewport.x = s.x + (l - s.x) * p, this.viewport.y = s.y + (a - s.y) * p, this.viewport.zoom = s.zoom + (i - s.zoom) * p;
      } else {
        const d = (f - 0.5) * 2, p = 1 - Math.pow(1 - d, 3);
        this.viewport.x = l + (e.x - l) * p, this.viewport.y = a + (e.y - a) * p, this.viewport.zoom = i + (e.zoom - i) * p;
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
      const a = Math.min((l - n) / r, 1);
      a < 0.5 ? this._transitionOverlay = { type: "fold", phase: "out", progress: a * 2 } : (s || (this.viewport.x = e.x, this.viewport.y = e.y, this.viewport.zoom = e.zoom, this.emit("viewport"), s = !0), this._transitionOverlay = { type: "fold", phase: "in", progress: (a - 0.5) * 2 }), this.emit("presentation"), a < 1 ? this._presentationAnimId = requestAnimationFrame(i) : (this._transitionOverlay = null, this._presentationAnimId = null, this.emit("presentation"));
    };
    this._presentationAnimId = requestAnimationFrame(i);
  }
  /** Cube transition: zoom out → 3D rotate → zoom in, snap viewport at midpoint. */
  _transitionCube(e, o, r = 1) {
    const n = o ?? 1200, s = performance.now();
    let i = !1;
    const l = (a) => {
      const c = Math.min((a - s) / n, 1);
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
   * Compute smart guide alignment + grid snap for a drag operation.
   * Sets `this.alignGuides` and emits `guides` event.
   * Returns the adjusted delta to apply.
   */
  computeDragSnap(e, o, r, n, s) {
    const i = this.snapToGrid && !s, l = this.smartGuides && !s;
    let a = r, c = n, h = [];
    const f = o instanceof Set ? o : new Set(o);
    if (l) {
      let d = 1 / 0, p = 1 / 0, m = -1 / 0, y = -1 / 0;
      for (const N of e) {
        const _ = this.getNode(N.id);
        if (!_) continue;
        const J = N.x + r, dt = N.y + n, H = this.resolveHeight(_);
        d = Math.min(d, J), p = Math.min(p, dt), m = Math.max(m, J + _.w), y = Math.max(y, dt + H);
      }
      const b = { x: d, y: p, w: m - d, h: y - p }, g = -this.viewport.x / this.viewport.zoom, x = -this.viewport.y / this.viewport.zoom, z = this._containerWidth / this.viewport.zoom, I = this._containerHeight / this.viewport.zoom, M = [], j = this.quadTree.retrieve([], { x: g, y: x, w: z, h: I });
      for (const N of j) {
        if (N.type === "edge" || f.has(N.id)) continue;
        const _ = this.resolveHeight(N);
        M.push({ x: N.x, y: N.y, w: N.w, h: _ });
      }
      const X = Xl(b, M, 5);
      if (h = X.guides, i) {
        const N = e[0].x + r, _ = e[0].y + n, J = this.snap(N, _), dt = J.x - N, H = J.y - _, rt = X.snapDx !== 0 && Math.abs(X.snapDx) <= Math.abs(dt), Q = X.snapDy !== 0 && Math.abs(X.snapDy) <= Math.abs(H);
        a = r + (rt ? X.snapDx : dt), c = n + (Q ? X.snapDy : H), rt || (h = h.filter((q) => q.axis !== "x")), Q || (h = h.filter((q) => q.axis !== "y"));
      } else
        a = r + X.snapDx, c = n + X.snapDy;
    } else if (i) {
      const d = this.snap(e[0].x + r, e[0].y + n);
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
  zoomByWheel(e, o, r) {
    this.viewport = pl(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomByFactor(e, o, r) {
    this.viewport = yl(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = To(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = Ro(this.viewport, n, s);
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
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, l = this.getWindow(), a = l.innerWidth, c = l.innerHeight, h = To(o, 0.2, 5);
    this.viewport = {
      x: a / 2 - s * h,
      y: c / 2 - i * h,
      zoom: h
    }, this.emit("viewport");
  }
  fitToContent() {
    if (this.nodes.size === 0) return;
    let e = 1 / 0, o = 1 / 0, r = -1 / 0, n = -1 / 0;
    for (const f of this.nodes.values()) {
      const d = f.h === "auto" ? 100 : f.h;
      f.x < e && (e = f.x), f.y < o && (o = f.y), f.x + f.w > r && (r = f.x + f.w), f.y + d > n && (n = f.y + d);
    }
    const s = 50;
    e -= s, o -= s, r += s, n += s;
    const i = r - e, l = n - o, a = this._containerWidth, c = this._containerHeight, h = To(
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
    return Ro(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return fl(this.viewport, e, o);
  }
  // --- Node CRUD ---
  addNode(e) {
    var o, r, n;
    if (this.history.pushSnapshot(this.nodes, this.groupParent), this.nodes.set(e.id, e), this.quadTree.insert(e), e.z < this._minZ && (this._minZ = e.z), e.type === "edge") {
      const s = e, { fromId: i, toId: l } = s.data;
      this.adjacency.has(i) || this.adjacency.set(i, /* @__PURE__ */ new Set()), this.adjacency.has(l) || this.adjacency.set(l, /* @__PURE__ */ new Set()), this.adjacency.get(i).add(e.id), this.adjacency.get(l).add(e.id);
    }
    e.type !== "edge" && this.updateFrameMembership([e.id]), (n = (r = (o = this.registry) == null ? void 0 : o.get(e.type)) == null ? void 0 : r.onCreate) == null || n.call(r, e, this), this.emit("node:create", e), this.emit("change"), this.emit("history");
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
    o.length > 0 && this.updateFrameMembership(o), this.emit("change"), this.emit("history");
  }
  updateNode(e, o) {
    var s, i, l, a, c, h, f, d, p;
    const r = this.nodes.get(e);
    if (!r) return;
    const n = { ...r, ...o };
    if (o.data && typeof o.data == "object" && r.data && typeof r.data == "object" && (n.data = {
      ...r.data,
      ...o.data
    }), this.nodes.set(e, n), (r.x !== n.x || r.y !== n.y || r.w !== n.w || r.h !== n.h || (r.rotation ?? 0) !== (n.rotation ?? 0)) && (this.quadTree.remove(r), this.quadTree.insert(n), this.updateConnectedEdges(e)), r.x !== n.x || r.y !== n.y) {
      const m = n.x - r.x, y = n.y - r.y;
      (l = (i = (s = this.registry) == null ? void 0 : s.get(n.type)) == null ? void 0 : i.onMove) == null || l.call(i, n, m, y, this), this.emit("node:move", n, m, y);
    }
    if (r.w !== n.w || r.h !== n.h) {
      const m = r.w !== 0 ? n.w / r.w : 1, y = r.h === "auto" ? 0 : r.h, b = n.h === "auto" ? 0 : n.h, g = y !== 0 ? b / y : 1;
      this.emit("node:resize", n, m, g);
    }
    (r.rotation ?? 0) !== (n.rotation ?? 0) && ((h = (c = (a = this.registry) == null ? void 0 : a.get(n.type)) == null ? void 0 : c.onRotate) == null || h.call(c, n, n.rotation ?? 0, this), this.emit("node:rotate", n, n.rotation ?? 0)), o.data && r.data !== n.data && ((p = (d = (f = this.registry) == null ? void 0 : f.get(n.type)) == null ? void 0 : d.onDataChange) == null || p.call(d, n, r.data, n.data, this), this.emit("node:data", n, r.data, n.data)), this.emit("change");
  }
  /**
   * Batch update multiple nodes with a single change emit.
   * Use during drag/resize to avoid N re-renders per frame.
   */
  updateMany(e) {
    let o = !1;
    for (const { id: r, patch: n } of e) {
      const s = this.nodes.get(r);
      if (!s) continue;
      const i = { ...s, ...n };
      n.data && typeof n.data == "object" && s.data && typeof s.data == "object" && (i.data = {
        ...s.data,
        ...n.data
      }), this.nodes.set(r, i), (s.x !== i.x || s.y !== i.y || s.w !== i.w || s.h !== i.h || (s.rotation ?? 0) !== (i.rotation ?? 0)) && (this.quadTree.remove(s), this.quadTree.insert(i), this.updateConnectedEdges(r)), o = !0;
    }
    o && this.emit("change");
  }
  updateConnectedEdges(e) {
    const o = this.adjacency.get(e);
    if (o)
      for (const r of o) {
        const n = this.nodes.get(r);
        if (!n || n.type !== "edge") continue;
        const s = n, i = this.nodes.get(s.data.fromId), l = this.nodes.get(s.data.toId);
        if (i && l) {
          const a = Ge(
            i,
            l,
            s.data.edgeType,
            void 0,
            s.data.sourceHandle,
            s.data.targetHandle,
            s.data.midpointOffset,
            s.data.curveOffset
          ), c = { ...s, ...a.bounds };
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
    var r, n, s, i, l;
    if (!this.nodes.has(e) || (r = this.nodes.get(e)) != null && r.locked) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = this.nodes.get(e);
    o && ((i = (s = (n = this.registry) == null ? void 0 : n.get(o.type)) == null ? void 0 : s.onDelete) == null || i.call(s, o, this), this.emit("node:delete", o), this.quadTree.remove(o)), this.nodes.delete(e), this.selection.delete(e), this.adjacency.delete(e), this.frameChildren.delete(e);
    for (const a of this.frameChildren.values()) a.delete(e);
    for (const [a, c] of this.nodes)
      if (c.type === "edge") {
        const h = c.data;
        if (h.fromId === e || h.toId === e) {
          const f = this.nodes.get(a);
          f && this.quadTree.remove(f), this.nodes.delete(a), this.selection.delete(a);
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
    for (const o of e) {
      const r = this.nodes.get(o);
      if (!r || r.type === "edge") continue;
      const n = this.resolveHeight(r);
      for (const [c, h] of this.frameChildren) {
        if (!h.has(o)) continue;
        const f = this.nodes.get(c);
        if (!f) {
          h.delete(o);
          continue;
        }
        const d = this.resolveHeight(f);
        r.x >= f.x && r.y >= f.y && r.x + r.w <= f.x + f.w && r.y + n <= f.y + d || h.delete(o);
      }
      let s;
      this._containerTypes.has(r.type) && (s = this.getFrameDescendantIds(o));
      let i = null, l = 1 / 0;
      const a = this.quadTree.retrieve([], { x: r.x, y: r.y, w: r.w, h: n });
      for (const c of a) {
        if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
        const h = this.resolveHeight(c);
        if (r.x >= c.x && r.y >= c.y && r.x + r.w <= c.x + c.w && r.y + n <= c.y + h) {
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
        for (const h of this.nodes.values())
          h.id !== o && (n ? h.type === "edge" : h.type !== "edge") && h.z >= r.z && this._nodesOverlap(r, h) && s.push(h);
        if (s.length === 0) continue;
        s.sort((h, f) => h.z - f.z);
        const i = s[0], l = this.nodes.get(i.id), a = r.z, c = l.z;
        a === c ? this.nodes.set(o, { ...r, z: c + 1 }) : (this.nodes.set(o, { ...r, z: c }), this.nodes.set(i.id, { ...l, z: a }));
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
        for (const h of this.nodes.values())
          h.id !== o && (n ? h.type === "edge" : h.type !== "edge") && h.z <= r.z && this._nodesOverlap(r, h) && s.push(h);
        if (s.length === 0) continue;
        s.sort((h, f) => f.z - h.z);
        const i = s[0], l = this.nodes.get(i.id), a = r.z, c = l.z;
        a === c ? this.nodes.set(o, { ...r, z: c - 1 }) : (this.nodes.set(o, { ...r, z: c }), this.nodes.set(i.id, { ...l, z: a }));
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
    const s = this.quadTree.retrieve([], {
      x: e - 50,
      y: o - 50,
      w: 100,
      h: 100
    }), i = /* @__PURE__ */ new Map();
    for (const l of s) i.set(l.id, l);
    return dl(i, e, o, this.viewport.zoom, r, this._containerTypes);
  }
  /** Returns all nodes at a point, sorted highest-z first */
  hitTestAll(e, o, r) {
    const s = this.quadTree.retrieve([], {
      x: e - 50,
      y: o - 50,
      w: 100,
      h: 100
    }), i = /* @__PURE__ */ new Map();
    for (const l of s) i.set(l.id, l);
    return ul(i, e, o, this.viewport.zoom, r, this._containerTypes);
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
    for (const a of this.selection) {
      const c = this.nodes.get(a);
      c && ((n = (r = (o = this.registry) == null ? void 0 : o.get(c.type)) == null ? void 0 : r.onDeselect) == null || n.call(r, c, this), this.emit("node:deselect", c));
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
        var l;
        return !((l = this.nodes.get(i)) != null && l.locked);
      })
    );
    if (e.size === 0) return;
    this.activeGroupId && this.getGroupMembers(this.activeGroupId).filter((l) => !e.has(l.id)).length === 0 && (this.activeGroupId = null, this.emit("group:exit")), this.history.pushSnapshot(this.nodes, this.groupParent);
    const o = e;
    for (const i of e) {
      const l = this.nodes.get(i);
      l && ((s = (n = (r = this.registry) == null ? void 0 : r.get(l.type)) == null ? void 0 : n.onDelete) == null || s.call(n, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i));
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
      const l = this.nodes.get(i);
      if (l) {
        (s = (n = (r = this.registry) == null ? void 0 : r.get(l.type)) == null ? void 0 : n.onDelete) == null || s.call(n, l, this), this.emit("node:delete", l), this.quadTree.remove(l), this.nodes.delete(i), this.frameChildren.delete(i);
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
            const a = l.data.points.map(
              ([c, h, f]) => [l.w - c, h, f]
            );
            s = { ...l, data: { ...l.data, points: a } };
          } else {
            const a = l.h === "auto" ? 0 : l.h, c = l.data.points.map(
              ([h, f, d]) => [h, a - f, d]
            );
            s = { ...l, data: { ...l.data, points: c } };
          }
        } else if (n.type === "shape") {
          const l = n;
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
  // --- Grouping ---
  groupSelected() {
    if (this.selection.size < 2 || this.activeGroupId) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = At(10), o = /* @__PURE__ */ new Set();
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
    if (this.selection.size === 0) return;
    this.history.pushSnapshot(this.nodes, this.groupParent);
    const e = 20, o = /* @__PURE__ */ new Map(), r = [];
    for (const s of this.selection) {
      const i = this.nodes.get(s);
      if (!i) continue;
      const l = At();
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
      s.groupId && (n.has(s.groupId) || n.set(s.groupId, At(10)), s.groupId = n.get(s.groupId));
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
    for (const g of this.clipboard) {
      const x = g.h === "auto" ? 100 : g.h;
      g.x < r && (r = g.x), g.y < n && (n = g.y), g.x + g.w > s && (s = g.x + g.w), g.y + x > i && (i = g.y + x);
    }
    const l = (r + s) / 2, a = (n + i) / 2;
    let c, h;
    if (e !== void 0 && o !== void 0)
      c = e, h = o;
    else {
      const g = this.getWindow(), x = g.innerWidth / 2, z = g.innerHeight / 2, I = Ro(this.viewport, x, z);
      c = I.x, h = I.y;
    }
    const f = this.pasteCount * 20, d = c - l + f, p = h - a + f, m = /* @__PURE__ */ new Map(), y = this.clipboard.map((g) => {
      const x = At();
      return m.set(g.id, x), {
        ...structuredClone(g),
        id: x,
        x: g.x + d,
        y: g.y + p,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const g of y)
      if (g.type === "edge" && g.data) {
        const x = g.data;
        m.has(x.fromId) && (x.fromId = m.get(x.fromId)), m.has(x.toId) && (x.toId = m.get(x.toId));
      }
    const b = /* @__PURE__ */ new Map();
    for (const g of y)
      g.groupId && (b.has(g.groupId) || b.set(g.groupId, At(10)), g.groupId = b.get(g.groupId));
    for (const [g, x] of this.groupParent)
      b.has(g) && b.has(x) && this.linkGroupParent(b.get(g), b.get(x));
    this.addNodes(y), this.selectMultiple(y.map((g) => g.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = pi.find((p) => p.id === e);
    if (!n) return;
    const s = structuredClone(n.nodes), i = /* @__PURE__ */ new Map();
    for (const p of s) {
      const m = At(10);
      i.set(p.id, m), p.id = m;
    }
    for (const p of s) {
      if (p.type === "edge" && p.data) {
        const m = p.data;
        i.has(m.fromId) && (m.fromId = i.get(m.fromId)), i.has(m.toId) && (m.toId = i.get(m.toId));
      }
      p.groupId && i.has(p.groupId) && (p.groupId = i.get(p.groupId));
    }
    let l = 1 / 0, a = 1 / 0, c = -1 / 0, h = -1 / 0;
    for (const p of s) {
      if (p.type === "edge") continue;
      const m = p.h === "auto" ? 100 : p.h;
      l = Math.min(l, p.x), a = Math.min(a, p.y), c = Math.max(c, p.x + p.w), h = Math.max(h, p.y + m);
    }
    const f = o - (l + c) / 2, d = r - (a + h) / 2;
    for (const p of s)
      p.type !== "edge" && (p.x += f, p.y += d), p.z = this.nextZValue++;
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
      const o = e, { fromId: r, toId: n } = o.data;
      this.adjacency.has(r) || this.adjacency.set(r, /* @__PURE__ */ new Set()), this.adjacency.has(n) || this.adjacency.set(n, /* @__PURE__ */ new Set()), this.adjacency.get(r).add(e.id), this.adjacency.get(n).add(e.id);
    }
    e.z >= this.nextZValue && (this.nextZValue = e.z + 1), e.z < this._minZ && (this._minZ = e.z), this._suppressEvents = !1;
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
            const a = i.fromId === e ? i.toId : i.fromId;
            (r = this.adjacency.get(a)) == null || r.delete(n);
          }
        }
    }
    this._suppressEvents = !1;
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
      }), this.nodes.set(e, n), (r.x !== n.x || r.y !== n.y || r.w !== n.w || r.h !== n.h) && (this.quadTree.remove(r), this.quadTree.insert(n), this.updateConnectedEdges(e)), n.z >= this.nextZValue && (this.nextZValue = n.z + 1);
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
    return gl(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await Ml(e);
    r.background && (this.boardBackground = r.background, this.emit("background")), r.originView ? this.originView = r.originView : this.originView = null;
    let n = 0, s = 0;
    for (const i of o)
      this.nodes.set(i.id, i), i.z > n && (n = i.z), i.z < s && (s = i.z);
    this.rebuildQuadTree(), this.rebuildFrameChildren(), this.nextZValue = n + 1, this._minZ = s, this.selection.clear(), this.goToOriginView(), this.emit("change"), this.emit("selection"), this.emit("history");
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
class Gl {
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
const gs = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], jl = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function Dr(t, e) {
  const o = gs.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return jl[gs[s]];
}
class Vl extends Ya {
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
function xs({ markdown: t }) {
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
const Zl = 0, Ul = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function ql(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function Kl({
  node: t,
  isSelected: e,
  multiSelected: o,
  engine: r,
  schema: n,
  interactive: s,
  zoom: i,
  onMeasuredHeight: l,
  autoEdit: a
}) {
  const c = ct(null), h = ct(a === !0), f = ct(!1), d = ct(!1), p = ct(!1), m = ct(!1), y = ct(t.data.blocks), [b, g] = tt(!1), [x, z] = tt(!1), I = ct(null), M = Va({ schema: n }), j = ct(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  mt(() => {
    const R = j.current;
    if (!R) return;
    j.current = null;
    const B = requestAnimationFrame(() => {
      try {
        M.replaceBlocks(M.document, R);
        return;
      } catch {
      }
      try {
        const $ = M.blocksToHTMLLossy(R);
        M._tiptapEditor.commands.setContent($);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), z(!0);
    });
    return () => cancelAnimationFrame(B);
  }, [M]), mt(() => {
    (!e || o) && g(!1);
  }, [e, o]), mt(() => {
    h.current && (h.current = !1, f.current = !0, g(!0));
  }, [M]), mt(() => {
    if (!b || !f.current && !I.current) return;
    const R = I.current;
    I.current = null, f.current = !1;
    const B = requestAnimationFrame(() => {
      if (M.focus(), R)
        try {
          const $ = M._tiptapEditor, V = $.view.posAtCoords({ left: R.x, top: R.y });
          V && $.commands.setTextSelection(V.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(B);
  }, [b, M]);
  const X = it(() => {
    if (d.current || p.current) return;
    const R = r.getNode(t.id), B = M.document;
    y.current = B, r.updateNode(t.id, {
      data: { ...R == null ? void 0 : R.data, blocks: B }
    });
  }, [M, r, t.id]);
  mt(() => {
    if (!M) return;
    const R = () => {
      var nt, ot;
      if (d.current || p.current || m.current) return;
      const Y = M.document.length, V = r.getNode(t.id), O = ((ot = (nt = V == null ? void 0 : V.data) == null ? void 0 : nt.blocks) == null ? void 0 : ot.length) ?? 0;
      if (Y < O) return;
      const K = setTimeout(X, 100);
      return () => clearTimeout(K);
    };
    let B;
    const $ = M.onChange(() => {
      B == null || B(), B = R();
    });
    return () => {
      $ == null || $(), B == null || B();
    };
  }, [M, X]), mt(() => {
    const R = c.current;
    if (!R) return;
    const B = ($) => {
      const Y = $.relatedTarget;
      Y && R.contains(Y) || X();
    };
    return R.addEventListener("focusout", B), () => R.removeEventListener("focusout", B);
  }, [X]), mt(() => {
    if (b || t.data.blocks === y.current) return;
    const R = JSON.stringify(t.data.blocks), B = JSON.stringify(y.current);
    if (R !== B) {
      if (t.data.blocks.length > 0 && M.document.length > 0) {
        m.current = !0;
        try {
          M.replaceBlocks(M.document, t.data.blocks);
        } catch {
          try {
            const $ = M.blocksToHTMLLossy(t.data.blocks);
            M._tiptapEditor.commands.setContent($);
          } catch {
          }
        }
        m.current = !1;
      }
      y.current = t.data.blocks;
    }
  }, [t.data.blocks, b, M]), mt(() => {
    if (t.h !== "auto" || !l) return;
    const R = c.current;
    if (!R) return;
    const B = () => {
      const Y = R.offsetHeight;
      Y > 0 && l(t.id, Y);
    };
    B();
    const $ = new ResizeObserver(B);
    return $.observe(R), () => $.disconnect();
  }, [t.id, t.h, l]);
  const N = it(() => {
    const R = r.getNode(t.id);
    if (!R || R.h === "auto" || !M || !c.current)
      return;
    const B = R.h - Zl, $ = c.current.querySelector(".bn-editor");
    if (!$) return;
    const Y = M.document;
    if (Y.length === 0) return;
    let V = 0;
    for (let ot = Y.length - 1; ot >= 1 && ql(Y[ot]); ot--)
      V++;
    const O = $.scrollHeight, K = Y.length > 0 ? O / Y.length : 36;
    if (d.current = !0, O < B) {
      const ot = B - O, yt = Math.max(0, Math.floor(ot / K));
      if (yt > 0) {
        const ft = Y[Y.length - 1];
        M.insertBlocks(
          Array.from({ length: yt }, () => ({
            type: "paragraph",
            content: []
          })),
          ft,
          "after"
        );
      }
    } else if (O > B && V > 0) {
      const ot = O - B, yt = Math.min(V, Math.ceil(ot / K));
      if (yt > 0) {
        const ft = Y.slice(Y.length - yt);
        M.removeBlocks(ft);
      }
    }
    const nt = r.getNode(t.id);
    nt && r.updateNode(t.id, {
      data: { ...nt.data, blocks: M.document }
    }), d.current = !1;
  }, [M, r, t.id]), _ = ct(N);
  _.current = N, mt(() => {
    if (t.h === "auto") return;
    const R = setTimeout(() => _.current(), 60);
    return () => clearTimeout(R);
  }, []);
  const J = it(
    (R) => {
      const B = R.currentTarget.ownerDocument;
      if (R.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: bt, y: ht } = r.screenToCanvas(R.clientX, R.clientY);
        for (const Dt of r.selection) {
          const It = r.getNode(Dt);
          if (!It) continue;
          const Pt = It.h === "auto" ? 100 : It.h;
          if (bt >= It.x && bt <= It.x + It.w && ht >= It.y && ht <= It.y + Pt)
            return;
        }
      }
      R.stopPropagation(), R.preventDefault(), R.currentTarget.setPointerCapture(R.pointerId), R.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const $ = R.clientX, Y = R.clientY, V = Array.from(r.selection), O = V.map((bt) => {
        const ht = r.getNode(bt);
        return { id: bt, x: ht.x, y: ht.y };
      });
      let K = !1, nt = null, ot = $, yt = Y, ft = !1;
      const et = () => {
        nt = null;
        const bt = (ot - $) / r.viewport.zoom, ht = (yt - Y) / r.viewport.zoom, { finalDx: Dt, finalDy: It } = r.computeDragSnap(
          O,
          V,
          bt,
          ht,
          ft
        ), Pt = O.map((Kt) => ({
          id: Kt.id,
          patch: { x: Kt.x + Dt, y: Kt.y + It }
        }));
        r.updateMany(Pt);
      }, Tt = (bt) => {
        const ht = (bt.clientX - $) / r.viewport.zoom, Dt = (bt.clientY - Y) / r.viewport.zoom;
        if (!K)
          if (Math.abs(ht) > 2 || Math.abs(Dt) > 2)
            K = !0, p.current = !0, r.pushHistorySnapshot();
          else
            return;
        ot = bt.clientX, yt = bt.clientY, ft = bt.metaKey || bt.ctrlKey, nt === null && (nt = requestAnimationFrame(et));
      }, Ct = () => {
        p.current = !1, nt !== null && (cancelAnimationFrame(nt), et()), r.clearAlignGuides(), B.removeEventListener("pointermove", Tt), B.removeEventListener("pointerup", Ct);
      };
      B.addEventListener("pointermove", Tt), B.addEventListener("pointerup", Ct);
    },
    [r, t.id]
  ), dt = it(
    (R) => {
      var et;
      const B = R.currentTarget.ownerDocument;
      R.stopPropagation(), R.preventDefault();
      const $ = t.h === "auto" ? (((et = c.current) == null ? void 0 : et.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, Y = t.x + t.w / 2, V = t.y + $ / 2, O = t.rotation || 0, { x: K, y: nt } = r.screenToCanvas(
        R.clientX,
        R.clientY
      ), ot = Math.atan2(nt - V, K - Y);
      r.pushHistorySnapshot();
      const yt = (Tt) => {
        const { x: Ct, y: bt } = r.screenToCanvas(Tt.clientX, Tt.clientY), ht = Math.atan2(bt - V, Ct - Y);
        let Dt = O + (ht - ot) * (180 / Math.PI);
        (Tt.shiftKey || r.snapToGrid) && !(Tt.metaKey || Tt.ctrlKey) && (Dt = Math.round(Dt / 15) * 15), r.updateNode(t.id, { rotation: Dt });
      }, ft = () => {
        B.removeEventListener("pointermove", yt), B.removeEventListener("pointerup", ft);
      };
      B.addEventListener("pointermove", yt), B.addEventListener("pointerup", ft);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), H = it(
    (R, B) => {
      var et;
      const $ = B.currentTarget.ownerDocument;
      B.stopPropagation(), B.preventDefault();
      const Y = B.clientX, V = B.clientY, O = t.x, K = t.y, nt = t.w, ot = t.h === "auto" ? (((et = c.current) == null ? void 0 : et.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      r.pushHistorySnapshot();
      const yt = (Tt) => {
        const Ct = (Tt.clientX - Y) / r.viewport.zoom, bt = (Tt.clientY - V) / r.viewport.zoom;
        let ht = O, Dt = K, It = nt, Pt = ot;
        if ((R === "nw" || R === "w" || R === "sw") && (ht = O + Ct, It = nt - Ct), (R === "ne" || R === "e" || R === "se") && (It = nt + Ct), (R === "nw" || R === "n" || R === "ne") && (Dt = K + bt, Pt = ot - bt), (R === "sw" || R === "s" || R === "se") && (Pt = ot + bt), r.snapToGrid && !(Tt.metaKey || Tt.ctrlKey)) {
          const Kt = r.gridSize, Qt = (Zt) => Math.round(Zt / Kt) * Kt;
          (R === "nw" || R === "w" || R === "sw") && (ht = Qt(ht), It = O + nt - ht), (R === "ne" || R === "e" || R === "se") && (It = Qt(ht + It) - ht), (R === "nw" || R === "n" || R === "ne") && (Dt = Qt(Dt), Pt = K + ot - Dt), (R === "sw" || R === "s" || R === "se") && (Pt = Qt(Dt + Pt) - Dt);
        }
        It < 100 && (It = 100, (R === "nw" || R === "w" || R === "sw") && (ht = O + nt - 100)), Pt < 60 && (Pt = 60, (R === "nw" || R === "n" || R === "ne") && (Dt = K + ot - 60)), r.updateNode(t.id, { x: ht, y: Dt, w: It, h: Pt });
      }, ft = () => {
        $.removeEventListener("pointermove", yt), $.removeEventListener("pointerup", ft), requestAnimationFrame(() => _.current());
      };
      $.addEventListener("pointermove", yt), $.addEventListener("pointerup", ft);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), rt = it(
    (R) => {
      if (!R.altKey) {
        if (b) {
          R.stopPropagation();
          return;
        }
        if (e) {
          J(R);
          return;
        }
        J(R);
      }
    },
    [b, e, J, r, t.id]
  ), Q = it(
    (R) => {
      if (R.stopPropagation(), !b) {
        if (t.groupId) {
          const B = [];
          let $ = t.groupId;
          for (; $; )
            B.push($), $ = r.groupParent.get($);
          if (!r.activeGroupId) {
            r.enterGroup(B[B.length - 1]), r.select(t.id);
            return;
          }
          const Y = B.indexOf(r.activeGroupId);
          if (Y > 0) {
            r.enterGroup(B[Y - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), I.current = { x: R.clientX, y: R.clientY }, g(!0);
      }
    },
    [b, r, t.id, t.groupId, M]
  ), q = e && !o;
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
                onPointerDown: rt,
                onKeyDown: b ? (R) => {
                  R.key === "Escape" && (R.stopPropagation(), g(!1));
                } : void 0,
                style: b ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: x ? /* @__PURE__ */ u(xs, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ u(Vl, { fallback: /* @__PURE__ */ u(xs, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ u(
                  Za,
                  {
                    editor: M,
                    theme: "light",
                    editable: s && b
                  }
                ) })
              }
            )
          }
        ),
        q && Ul.map(({ pos: R, top: B, left: $ }) => {
          const Y = 8 / i;
          return /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: (V) => H(R, V),
              style: {
                position: "absolute",
                top: B,
                left: $,
                width: Y,
                height: Y,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: Dr(R, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            R
          );
        }),
        q && (() => {
          const R = 25 / i, B = 10 / i;
          return /* @__PURE__ */ v(ut, { children: [
            /* @__PURE__ */ u(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -R,
                  left: "50%",
                  width: 1.5 / i,
                  height: R,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ u(
              "div",
              {
                onPointerDown: dt,
                style: {
                  position: "absolute",
                  top: -(R + B / 2),
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
const Mi = ce(Kl);
function Ql(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    Mi,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: Ln,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const Jl = {
  type: "content",
  component: Ql,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: $l } = Math, tr = $l + 1e-4, ws = 0.5, ks = [1, 1];
function vs(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: Qr } = Math;
function Ci(t, e, o) {
  let r = Qr(1, e / o);
  return Qr(1, t + (Qr(1, 1 - r) - t) * (r * 0.275));
}
function _l(t) {
  return [-t[0], -t[1]];
}
function ze(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function Ss(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function je(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function gn(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function Ye(t, e) {
  return [t[0] * e, t[1] * e];
}
function Jr(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function tc(t, e) {
  return [t[0] / e, t[1] / e];
}
function Ii(t) {
  return [t[1], -t[0]];
}
function $r(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function Ms(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function ec(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function oc(t) {
  return Math.hypot(t[0], t[1]);
}
function Cs(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function zi(t) {
  return tc(t, oc(t));
}
function rc(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function Nn(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], l = s * n - i * r, a = s * r + i * n;
  return [l + e[0], a + e[1]];
}
function Is(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], l = e[1] - o[1], a = i * s - l * n, c = i * n + l * s;
  return t[0] = a + o[0], t[1] = c + o[1], t;
}
function zs(t, e, o) {
  return ze(t, Ye(je(e, t), o));
}
function nc(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function Ti(t, e, o) {
  return ze(t, Ye(e, o));
}
const ie = [0, 0], He = [0, 0], Oe = [0, 0];
function sc(t, e) {
  let o = Ti(t, zi(Ii(je(t, ze(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(Nn(o, t, tr * 2 * s));
  return r;
}
function ic(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(Nn(e, t, tr * s));
  return r;
}
function ac(t, e, o) {
  let r = je(e, o), n = Ye(r, 0.5), s = Ye(r, 0.51);
  return [je(t, n), je(t, s), ze(t, s), ze(t, n)];
}
function lc(t, e, o, r) {
  let n = [], s = Ti(t, e, o), i = 1 / r;
  for (let l = i; l < 1; l += i) n.push(Nn(s, t, tr * 3 * l));
  return n;
}
function cc(t, e, o) {
  return [ze(t, Ye(e, o)), ze(t, Ye(e, o * 0.99)), je(t, Ye(e, o * 0.99)), je(t, Ye(e, o))];
}
function Ts(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function dc(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = Ci(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function hc(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (B) => B, start: l = {}, end: a = {}, last: c = !1 } = e, { cap: h = !0, easing: f = (B) => B * (2 - B) } = l, { cap: d = !0, easing: p = (B) => --B * B * B + 1 } = a;
  if (t.length === 0 || o <= 0) return [];
  let m = t[t.length - 1].runningLength, y = Ts(l.taper, o, m), b = Ts(a.taper, o, m), g = (o * r) ** 2, x = [], z = [], I = dc(t, s, o), M = vs(o, n, t[t.length - 1].pressure, i), j, X = t[0].vector, N = t[0].point, _ = N, J = N, dt = _, H = !1;
  for (let B = 0; B < t.length; B++) {
    let { pressure: $ } = t[B], { point: Y, vector: V, distance: O, runningLength: K } = t[B], nt = B === t.length - 1;
    if (!nt && m - K < 3) continue;
    n ? (s && ($ = Ci(I, O, o)), M = vs(o, n, $, i)) : M = o / 2, j === void 0 && (j = M);
    let ot = K < y ? f(K / y) : 1, yt = m - K < b ? p((m - K) / b) : 1;
    M = Math.max(0.01, M * Math.min(ot, yt));
    let ft = (nt ? t[B] : t[B + 1]).vector, et = nt ? 1 : Ms(V, ft), Tt = Ms(V, X) < 0 && !H, Ct = et !== null && et < 0;
    if (Tt || Ct) {
      $r(ie, X), Jr(ie, ie, M);
      for (let bt = 0; bt <= 1; bt += 0.07692307692307693) gn(He, Y, ie), Is(He, He, Y, tr * bt), J = [He[0], He[1]], x.push(J), Ss(Oe, Y, ie), Is(Oe, Oe, Y, tr * -bt), dt = [Oe[0], Oe[1]], z.push(dt);
      N = J, _ = dt, Ct && (H = !0);
      continue;
    }
    if (H = !1, nt) {
      $r(ie, V), Jr(ie, ie, M), x.push(je(Y, ie)), z.push(ze(Y, ie));
      continue;
    }
    nc(ie, ft, V, et), $r(ie, ie), Jr(ie, ie, M), gn(He, Y, ie), J = [He[0], He[1]], (B <= 1 || Cs(N, J) > g) && (x.push(J), N = J), Ss(Oe, Y, ie), dt = [Oe[0], Oe[1]], (B <= 1 || Cs(_, dt) > g) && (z.push(dt), _ = dt), I = $, X = V;
  }
  let rt = [t[0].point[0], t[0].point[1]], Q = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : ze(t[0].point, [1, 1]), q = [], R = [];
  if (t.length === 1) {
    if (!(y || b) || c) return sc(rt, j || M);
  } else {
    y || b && t.length === 1 || (h ? q.push(...ic(rt, z[0], 13)) : q.push(...ac(rt, x[0], z[0])));
    let B = Ii(_l(t[t.length - 1].vector));
    b || y && t.length === 1 ? R.push(Q) : d ? R.push(...lc(Q, B, M, 29)) : R.push(...cc(Q, B, M));
  }
  return x.concat(R, z.reverse(), q);
}
const Ps = [0, 0];
function Rs(t) {
  return t != null && t >= 0;
}
function uc(t, e = {}) {
  var d;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: p, y: m, pressure: y = ws }) => [p, m, y]);
  if (i.length === 2) {
    let p = i[1];
    i = i.slice(0, -1);
    for (let m = 1; m < 5; m++) i.push(zs(i[0], p, m / 4));
  }
  i.length === 1 && (i = [...i, [...ze(i[0], ks), ...i[0].slice(2)]]);
  let l = [{ point: [i[0][0], i[0][1]], pressure: Rs(i[0][2]) ? i[0][2] : 0.25, vector: [...ks], distance: 0, runningLength: 0 }], a = !1, c = 0, h = l[0], f = i.length - 1;
  for (let p = 1; p < i.length; p++) {
    let m = n && p === f ? [i[p][0], i[p][1]] : zs(h.point, i[p], s);
    if (ec(h.point, m)) continue;
    let y = rc(m, h.point);
    if (c += y, p < f && !a) {
      if (c < r) continue;
      a = !0;
    }
    gn(Ps, h.point, m), h = { point: m, pressure: Rs(i[p][2]) ? i[p][2] : ws, vector: zi(Ps), distance: y, runningLength: c }, l.push(h);
  }
  return l[0].vector = ((d = l[1]) == null ? void 0 : d.vector) || [0, 0], l;
}
function fc(t, e = {}) {
  return hc(uc(t, e), e);
}
var pc = fc;
function Bn(t, e = {}) {
  const o = pc(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return yc(o);
}
function yc(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [l, a] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + l) / 2, (i + a) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function Pi(t, e = 0.5) {
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
function mc(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = Pi(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, l] = o[s], [a, c] = o[(s + 1) % r];
    n.push("Q", i, l, (i + a) / 2, (l + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function bc(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], l = r[1] - o[1], a = n * l - s * i;
  if (Math.abs(a) < 1e-10) return null;
  const c = ((o[0] - t[0]) * l - (o[1] - t[1]) * i) / a, h = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / a;
  return c <= 0 || c >= 1 || h <= 0 || h >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function gc(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function As(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function xc(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let l = i + 2; l < e - 1; l++) {
      const a = bc(
        t[i],
        t[i + 1],
        t[l],
        t[l + 1]
      );
      if (!a) continue;
      const c = [a];
      for (let h = i + 1; h <= l; h++)
        c.push(t[h]);
      As(c) < 100 || o.push({
        pathD: gc(c),
        points: c.map((h) => [h[0], h[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => As(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, l) => r[l] >= s);
}
function _r(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), l = Math.sin(s);
    for (const a of t) {
      const [c, h] = a;
      a[0] = (c - r) * i - (h - n) * l + r, a[1] = (c - r) * l + (h - n) * i + n;
    }
  }
}
function wc(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function kc(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, l = [0, 0];
  if (n) for (const c of i) _r(c, l, n);
  const a = function(c, h, f) {
    const d = [];
    for (const x of c) {
      const z = [...x];
      wc(z[0], z[z.length - 1]) || z.push([z[0][0], z[0][1]]), z.length > 2 && d.push(z);
    }
    const p = [];
    h = Math.max(h, 0.1);
    const m = [];
    for (const x of d) for (let z = 0; z < x.length - 1; z++) {
      const I = x[z], M = x[z + 1];
      if (I[1] !== M[1]) {
        const j = Math.min(I[1], M[1]);
        m.push({ ymin: j, ymax: Math.max(I[1], M[1]), x: j === I[1] ? I[0] : M[0], islope: (M[0] - I[0]) / (M[1] - I[1]) });
      }
    }
    if (m.sort((x, z) => x.ymin < z.ymin ? -1 : x.ymin > z.ymin ? 1 : x.x < z.x ? -1 : x.x > z.x ? 1 : x.ymax === z.ymax ? 0 : (x.ymax - z.ymax) / Math.abs(x.ymax - z.ymax)), !m.length) return p;
    let y = [], b = m[0].ymin, g = 0;
    for (; y.length || m.length; ) {
      if (m.length) {
        let x = -1;
        for (let z = 0; z < m.length && !(m[z].ymin > b); z++) x = z;
        m.splice(0, x + 1).forEach((z) => {
          y.push({ s: b, edge: z });
        });
      }
      if (y = y.filter((x) => !(x.edge.ymax <= b)), y.sort((x, z) => x.edge.x === z.edge.x ? 0 : (x.edge.x - z.edge.x) / Math.abs(x.edge.x - z.edge.x)), (f !== 1 || g % h == 0) && y.length > 1) for (let x = 0; x < y.length; x += 2) {
        const z = x + 1;
        if (z >= y.length) break;
        const I = y[x].edge, M = y[z].edge;
        p.push([[Math.round(I.x), b], [Math.round(M.x), b]]);
      }
      b += f, y.forEach((x) => {
        x.edge.x = x.edge.x + f * x.edge.islope;
      }), g++;
    }
    return p;
  }(i, s, r);
  if (n) {
    for (const c of i) _r(c, l, -n);
    (function(c, h, f) {
      const d = [];
      c.forEach((p) => d.push(...p)), _r(d, h, f);
    })(a, l, -n);
  }
  return a;
}
function er(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), kc(t, n, r, s || 1);
}
class Hn {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = er(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
}
function Er(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class vc extends Hn {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = er(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], l = 0.5 * r * Math.cos(s), a = 0.5 * r * Math.sin(s);
    for (const [c, h] of n) Er([c, h]) && i.push([[c[0] - l, c[1] + a], [...h]], [[c[0] + l, c[1] - a], [...h]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class Sc extends Hn {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
}
class Mc {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = er(e, o = Object.assign({}, o, { hachureAngle: 0 }));
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
      const a = Er(l), c = a / n, h = Math.ceil(c) - 1, f = a - h * n, d = (l[0][0] + l[1][0]) / 2 - n / 4, p = Math.min(l[0][1], l[1][1]);
      for (let m = 0; m < h; m++) {
        const y = p + f + m * n, b = d - i + 2 * Math.random() * i, g = y - i + 2 * Math.random() * i, x = this.helper.ellipse(b, g, s, s, o);
        r.push(...x.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
class Cc {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = er(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const l = Er(i), a = Math.floor(l / (r + n)), c = (l + n - a * (r + n)) / 2;
      let h = i[0], f = i[1];
      h[0] > f[0] && (h = i[1], f = i[0]);
      const d = Math.atan((f[1] - h[1]) / (f[0] - h[0]));
      for (let p = 0; p < a; p++) {
        const m = p * (r + n), y = m + r, b = [h[0] + m * Math.cos(d) + c * Math.cos(d), h[1] + m * Math.sin(d) + c * Math.sin(d)], g = [h[0] + y * Math.cos(d) + c * Math.cos(d), h[1] + y * Math.sin(d) + c * Math.sin(d)];
        s.push(...this.helper.doubleLineOps(b[0], b[1], g[0], g[1], o));
      }
    }), s;
  }
}
class Ic {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = er(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = Er(s), l = Math.round(i / (2 * o));
      let a = s[0], c = s[1];
      a[0] > c[0] && (a = s[1], c = s[0]);
      const h = Math.atan((c[1] - a[1]) / (c[0] - a[0]));
      for (let f = 0; f < l; f++) {
        const d = 2 * f * o, p = 2 * (f + 1) * o, m = Math.sqrt(2 * Math.pow(o, 2)), y = [a[0] + d * Math.cos(h), a[1] + d * Math.sin(h)], b = [a[0] + p * Math.cos(h), a[1] + p * Math.sin(h)], g = [y[0] + m * Math.cos(h + Math.PI / 4), y[1] + m * Math.sin(h + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(y[0], y[1], g[0], g[1], r), ...this.helper.doubleLineOps(g[0], g[1], b[0], b[1], r));
      }
    }), n;
  }
}
const de = {};
class zc {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const Tc = 0, tn = 1, Ls = 2, fr = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function en(t, e) {
  return t.type === e;
}
function On(t) {
  const e = [], o = function(i) {
    const l = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) l[l.length] = { type: Tc, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      l[l.length] = { type: tn, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return l[l.length] = { type: Ls, text: "" }, l;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !en(s, Ls); ) {
    let i = 0;
    const l = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return On("M0,0" + t);
      n++, i = fr[s.text], r = s.text;
    } else en(s, tn) ? i = fr[r] : (n++, i = fr[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let a = n; a < n + i; a++) {
      const c = o[a];
      if (!en(c, tn)) throw new Error("Param not a number: " + r + "," + c.text);
      l[l.length] = +c.text;
    }
    if (typeof fr[r] != "number") throw new Error("Bad segment: " + r);
    {
      const a = { key: r, data: l };
      e.push(a), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function Ri(t) {
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
      s.push({ key: "Z", data: [] }), e = r, o = n;
  }
  return s;
}
function Ai(t) {
  const e = [];
  let o = "", r = 0, n = 0, s = 0, i = 0, l = 0, a = 0;
  for (const { key: c, data: h } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...h] }), [r, n] = h, [s, i] = h;
        break;
      case "C":
        e.push({ key: "C", data: [...h] }), r = h[4], n = h[5], l = h[2], a = h[3];
        break;
      case "L":
        e.push({ key: "L", data: [...h] }), [r, n] = h;
        break;
      case "H":
        r = h[0], e.push({ key: "L", data: [r, n] });
        break;
      case "V":
        n = h[0], e.push({ key: "L", data: [r, n] });
        break;
      case "S": {
        let f = 0, d = 0;
        o === "C" || o === "S" ? (f = r + (r - l), d = n + (n - a)) : (f = r, d = n), e.push({ key: "C", data: [f, d, ...h] }), l = h[0], a = h[1], r = h[2], n = h[3];
        break;
      }
      case "T": {
        const [f, d] = h;
        let p = 0, m = 0;
        o === "Q" || o === "T" ? (p = r + (r - l), m = n + (n - a)) : (p = r, m = n);
        const y = r + 2 * (p - r) / 3, b = n + 2 * (m - n) / 3, g = f + 2 * (p - f) / 3, x = d + 2 * (m - d) / 3;
        e.push({ key: "C", data: [y, b, g, x, f, d] }), l = p, a = m, r = f, n = d;
        break;
      }
      case "Q": {
        const [f, d, p, m] = h, y = r + 2 * (f - r) / 3, b = n + 2 * (d - n) / 3, g = p + 2 * (f - p) / 3, x = m + 2 * (d - m) / 3;
        e.push({ key: "C", data: [y, b, g, x, p, m] }), l = f, a = d, r = p, n = m;
        break;
      }
      case "A": {
        const f = Math.abs(h[0]), d = Math.abs(h[1]), p = h[2], m = h[3], y = h[4], b = h[5], g = h[6];
        f === 0 || d === 0 ? (e.push({ key: "C", data: [r, n, b, g, b, g] }), r = b, n = g) : (r !== b || n !== g) && (Li(r, n, b, g, f, d, p, m, y).forEach(function(x) {
          e.push({ key: "C", data: x });
        }), r = b, n = g);
        break;
      }
      case "Z":
        e.push({ key: "Z", data: [] }), r = s, n = i;
    }
    o = c;
  }
  return e;
}
function Zo(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function Li(t, e, o, r, n, s, i, l, a, c) {
  const h = (f = i, Math.PI * f / 180);
  var f;
  let d = [], p = 0, m = 0, y = 0, b = 0;
  if (c) [p, m, y, b] = c;
  else {
    [t, e] = Zo(t, e, -h), [o, r] = Zo(o, r, -h);
    const rt = (t - o) / 2, Q = (e - r) / 2;
    let q = rt * rt / (n * n) + Q * Q / (s * s);
    q > 1 && (q = Math.sqrt(q), n *= q, s *= q);
    const R = n * n, B = s * s, $ = R * B - R * Q * Q - B * rt * rt, Y = R * Q * Q + B * rt * rt, V = (l === a ? -1 : 1) * Math.sqrt(Math.abs($ / Y));
    y = V * n * Q / s + (t + o) / 2, b = V * -s * rt / n + (e + r) / 2, p = Math.asin(parseFloat(((e - b) / s).toFixed(9))), m = Math.asin(parseFloat(((r - b) / s).toFixed(9))), t < y && (p = Math.PI - p), o < y && (m = Math.PI - m), p < 0 && (p = 2 * Math.PI + p), m < 0 && (m = 2 * Math.PI + m), a && p > m && (p -= 2 * Math.PI), !a && m > p && (m -= 2 * Math.PI);
  }
  let g = m - p;
  if (Math.abs(g) > 120 * Math.PI / 180) {
    const rt = m, Q = o, q = r;
    m = a && m > p ? p + 120 * Math.PI / 180 * 1 : p + 120 * Math.PI / 180 * -1, d = Li(o = y + n * Math.cos(m), r = b + s * Math.sin(m), Q, q, n, s, i, 0, a, [m, rt, y, b]);
  }
  g = m - p;
  const x = Math.cos(p), z = Math.sin(p), I = Math.cos(m), M = Math.sin(m), j = Math.tan(g / 4), X = 4 / 3 * n * j, N = 4 / 3 * s * j, _ = [t, e], J = [t + X * z, e - N * x], dt = [o + X * M, r - N * I], H = [o, r];
  if (J[0] = 2 * _[0] - J[0], J[1] = 2 * _[1] - J[1], c) return [J, dt, H].concat(d);
  {
    d = [J, dt, H].concat(d);
    const rt = [];
    for (let Q = 0; Q < d.length; Q += 3) {
      const q = Zo(d[Q][0], d[Q][1], h), R = Zo(d[Q + 1][0], d[Q + 1][1], h), B = Zo(d[Q + 2][0], d[Q + 2][1], h);
      rt.push([q[0], q[1], R[0], R[1], B[0], B[1]]);
    }
    return rt;
  }
}
const Pc = { randOffset: function(t, e) {
  return Rt(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return Mr(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = Ei(o, r, n);
  return xn(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return Ue(t, e, o, r, n, !0);
} };
function Di(t, e, o, r, n) {
  return { type: "path", ops: Ue(t, e, o, r, n) };
}
function wr(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...Ue(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...Ue(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? Di(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function Rc(t, e, o, r, n) {
  return function(s, i) {
    return wr(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function Ds(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = pr(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : pr(o[0], 1.5 * (1 + 0.22 * e.roughness), Fs(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const l = pr(i, 1 * (1 + 0.2 * e.roughness), e), a = e.disableMultiStroke ? [] : pr(i, 1.5 * (1 + 0.22 * e.roughness), Fs(e));
        for (const c of l) c.op !== "move" && r.push(c);
        for (const c of a) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function Ei(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), l = Math.abs(e / 2);
  const a = 1 - o.curveFitting;
  return i += Rt(i * a, o), l += Rt(l * a, o), { increment: s, rx: i, ry: l };
}
function xn(t, e, o, r) {
  const [n, s] = Ns(r.increment, t, e, r.rx, r.ry, 1, r.increment * Mr(0.1, Mr(0.4, 1, o), o), o);
  let i = Cr(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [l] = Ns(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), a = Cr(l, null, o);
    i = i.concat(a);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function Es(t, e, o, r, n, s, i, l, a) {
  const c = t, h = e;
  let f = Math.abs(o / 2), d = Math.abs(r / 2);
  f += Rt(0.01 * f, a), d += Rt(0.01 * d, a);
  let p = n, m = s;
  for (; p < 0; ) p += 2 * Math.PI, m += 2 * Math.PI;
  m - p > 2 * Math.PI && (p = 0, m = 2 * Math.PI);
  const y = 2 * Math.PI / a.curveStepCount, b = Math.min(y / 2, (m - p) / 2), g = Bs(b, c, h, f, d, p, m, 1, a);
  if (!a.disableMultiStroke) {
    const x = Bs(b, c, h, f, d, p, m, 1.5, a);
    g.push(...x);
  }
  return i && (l ? g.push(...Ue(c, h, c + f * Math.cos(p), h + d * Math.sin(p), a), ...Ue(c, h, c + f * Math.cos(m), h + d * Math.sin(m), a)) : g.push({ op: "lineTo", data: [c, h] }, { op: "lineTo", data: [c + f * Math.cos(p), h + d * Math.sin(p)] })), { type: "path", ops: g };
}
function Ws(t, e) {
  const o = Ai(Ri(On(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: l } of o) switch (i) {
    case "M":
      s = [l[0], l[1]], n = [l[0], l[1]];
      break;
    case "L":
      r.push(...Ue(s[0], s[1], l[0], l[1], e)), s = [l[0], l[1]];
      break;
    case "C": {
      const [a, c, h, f, d, p] = l;
      r.push(...Ac(a, c, h, f, d, p, s, e)), s = [d, p];
      break;
    }
    case "Z":
      r.push(...Ue(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function on(t, e) {
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
function wo(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!de[n]) switch (n) {
      case "zigzag":
        de[n] || (de[n] = new vc(r));
        break;
      case "cross-hatch":
        de[n] || (de[n] = new Sc(r));
        break;
      case "dots":
        de[n] || (de[n] = new Mc(r));
        break;
      case "dashed":
        de[n] || (de[n] = new Cc(r));
        break;
      case "zigzag-line":
        de[n] || (de[n] = new Ic(r));
        break;
      default:
        n = "hachure", de[n] || (de[n] = new Hn(r));
    }
    return de[n];
  }(e, Pc).fillPolygons(t, e);
}
function Fs(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function Wi(t) {
  return t.randomizer || (t.randomizer = new zc(t.seed || 0)), t.randomizer.next();
}
function Mr(t, e, o, r = 1) {
  return o.roughness * r * (Wi(o) * (e - t) + t);
}
function Rt(t, e, o = 1) {
  return Mr(-t, t, e, o);
}
function Ue(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, l = wn(t, e, o, r, n, !0, !1);
  if (i) return l;
  const a = wn(t, e, o, r, n, !0, !0);
  return l.concat(a);
}
function wn(t, e, o, r, n, s, i) {
  const l = Math.pow(t - o, 2) + Math.pow(e - r, 2), a = Math.sqrt(l);
  let c = 1;
  c = a < 200 ? 1 : a > 500 ? 0.4 : -16668e-7 * a + 1.233334;
  let h = n.maxRandomnessOffset || 0;
  h * h * 100 > l && (h = a / 10);
  const f = h / 2, d = 0.2 + 0.2 * Wi(n);
  let p = n.bowing * n.maxRandomnessOffset * (r - e) / 200, m = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  p = Rt(p, n, c), m = Rt(m, n, c);
  const y = [], b = () => Rt(f, n, c), g = () => Rt(h, n, c), x = n.preserveVertices;
  return i ? y.push({ op: "move", data: [t + (x ? 0 : b()), e + (x ? 0 : b())] }) : y.push({ op: "move", data: [t + (x ? 0 : Rt(h, n, c)), e + (x ? 0 : Rt(h, n, c))] }), i ? y.push({ op: "bcurveTo", data: [p + t + (o - t) * d + b(), m + e + (r - e) * d + b(), p + t + 2 * (o - t) * d + b(), m + e + 2 * (r - e) * d + b(), o + (x ? 0 : b()), r + (x ? 0 : b())] }) : y.push({ op: "bcurveTo", data: [p + t + (o - t) * d + g(), m + e + (r - e) * d + g(), p + t + 2 * (o - t) * d + g(), m + e + 2 * (r - e) * d + g(), o + (x ? 0 : g()), r + (x ? 0 : g())] }), y;
}
function pr(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + Rt(e, o), t[0][1] + Rt(e, o)]), r.push([t[0][0] + Rt(e, o), t[0][1] + Rt(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + Rt(e, o), t[n][1] + Rt(e, o)]), n === t.length - 1 && r.push([t[n][0] + Rt(e, o), t[n][1] + Rt(e, o)]);
  return Cr(r, null, o);
}
function Cr(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let l = 1; l + 2 < r; l++) {
      const a = t[l];
      s[0] = [a[0], a[1]], s[1] = [a[0] + (i * t[l + 1][0] - i * t[l - 1][0]) / 6, a[1] + (i * t[l + 1][1] - i * t[l - 1][1]) / 6], s[2] = [t[l + 1][0] + (i * t[l][0] - i * t[l + 2][0]) / 6, t[l + 1][1] + (i * t[l][1] - i * t[l + 2][1]) / 6], s[3] = [t[l + 1][0], t[l + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...wn(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function Ns(t, e, o, r, n, s, i, l) {
  const a = [], c = [];
  if (l.roughness === 0) {
    t /= 4, c.push([e + r * Math.cos(-t), o + n * Math.sin(-t)]);
    for (let h = 0; h <= 2 * Math.PI; h += t) {
      const f = [e + r * Math.cos(h), o + n * Math.sin(h)];
      a.push(f), c.push(f);
    }
    c.push([e + r * Math.cos(0), o + n * Math.sin(0)]), c.push([e + r * Math.cos(t), o + n * Math.sin(t)]);
  } else {
    const h = Rt(0.5, l) - Math.PI / 2;
    c.push([Rt(s, l) + e + 0.9 * r * Math.cos(h - t), Rt(s, l) + o + 0.9 * n * Math.sin(h - t)]);
    const f = 2 * Math.PI + h - 0.01;
    for (let d = h; d < f; d += t) {
      const p = [Rt(s, l) + e + r * Math.cos(d), Rt(s, l) + o + n * Math.sin(d)];
      a.push(p), c.push(p);
    }
    c.push([Rt(s, l) + e + r * Math.cos(h + 2 * Math.PI + 0.5 * i), Rt(s, l) + o + n * Math.sin(h + 2 * Math.PI + 0.5 * i)]), c.push([Rt(s, l) + e + 0.98 * r * Math.cos(h + i), Rt(s, l) + o + 0.98 * n * Math.sin(h + i)]), c.push([Rt(s, l) + e + 0.9 * r * Math.cos(h + 0.5 * i), Rt(s, l) + o + 0.9 * n * Math.sin(h + 0.5 * i)]);
  }
  return [c, a];
}
function Bs(t, e, o, r, n, s, i, l, a) {
  const c = s + Rt(0.1, a), h = [];
  h.push([Rt(l, a) + e + 0.9 * r * Math.cos(c - t), Rt(l, a) + o + 0.9 * n * Math.sin(c - t)]);
  for (let f = c; f <= i; f += t) h.push([Rt(l, a) + e + r * Math.cos(f), Rt(l, a) + o + n * Math.sin(f)]);
  return h.push([e + r * Math.cos(i), o + n * Math.sin(i)]), h.push([e + r * Math.cos(i), o + n * Math.sin(i)]), Cr(h, null, a);
}
function Ac(t, e, o, r, n, s, i, l) {
  const a = [], c = [l.maxRandomnessOffset || 1, (l.maxRandomnessOffset || 1) + 0.3];
  let h = [0, 0];
  const f = l.disableMultiStroke ? 1 : 2, d = l.preserveVertices;
  for (let p = 0; p < f; p++) p === 0 ? a.push({ op: "move", data: [i[0], i[1]] }) : a.push({ op: "move", data: [i[0] + (d ? 0 : Rt(c[0], l)), i[1] + (d ? 0 : Rt(c[0], l))] }), h = d ? [n, s] : [n + Rt(c[p], l), s + Rt(c[p], l)], a.push({ op: "bcurveTo", data: [t + Rt(c[p], l), e + Rt(c[p], l), o + Rt(c[p], l), r + Rt(c[p], l), h[0], h[1]] });
  return a;
}
function Uo(t) {
  return [...t];
}
function Hs(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const r = [];
  if (o === 3) r.push(Uo(t[0]), Uo(t[1]), Uo(t[2]), Uo(t[2]));
  else {
    const n = [];
    n.push(t[0], t[0]);
    for (let l = 1; l < t.length; l++) n.push(t[l]), l === t.length - 1 && n.push(t[l]);
    const s = [], i = 1 - e;
    r.push(Uo(n[0]));
    for (let l = 1; l + 2 < n.length; l++) {
      const a = n[l];
      s[0] = [a[0], a[1]], s[1] = [a[0] + (i * n[l + 1][0] - i * n[l - 1][0]) / 6, a[1] + (i * n[l + 1][1] - i * n[l - 1][1]) / 6], s[2] = [n[l + 1][0] + (i * n[l][0] - i * n[l + 2][0]) / 6, n[l + 1][1] + (i * n[l][1] - i * n[l + 2][1]) / 6], s[3] = [n[l + 1][0], n[l + 1][1]], r.push(s[1], s[2], s[3]);
    }
  }
  return r;
}
function kr(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function Lc(t, e, o) {
  const r = kr(e, o);
  if (r === 0) return kr(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), kr(t, ao(e, o, n));
}
function ao(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function kn(t, e, o, r) {
  const n = r || [];
  if (function(l, a) {
    const c = l[a + 0], h = l[a + 1], f = l[a + 2], d = l[a + 3];
    let p = 3 * h[0] - 2 * c[0] - d[0];
    p *= p;
    let m = 3 * h[1] - 2 * c[1] - d[1];
    m *= m;
    let y = 3 * f[0] - 2 * d[0] - c[0];
    y *= y;
    let b = 3 * f[1] - 2 * d[1] - c[1];
    return b *= b, p < y && (p = y), m < b && (m = b), p + m;
  }(t, e) < o) {
    const l = t[e + 0];
    n.length ? (s = n[n.length - 1], i = l, Math.sqrt(kr(s, i)) > 1 && n.push(l)) : n.push(l), n.push(t[e + 3]);
  } else {
    const a = t[e + 0], c = t[e + 1], h = t[e + 2], f = t[e + 3], d = ao(a, c, 0.5), p = ao(c, h, 0.5), m = ao(h, f, 0.5), y = ao(d, p, 0.5), b = ao(p, m, 0.5), g = ao(y, b, 0.5);
    kn([a, d, y, g], 0, o, n), kn([g, b, m, f], 0, o, n);
  }
  var s, i;
  return n;
}
function Dc(t, e) {
  return Ir(t, 0, t.length, e);
}
function Ir(t, e, o, r, n) {
  const s = n || [], i = t[e], l = t[o - 1];
  let a = 0, c = 1;
  for (let h = e + 1; h < o - 1; ++h) {
    const f = Lc(t[h], i, l);
    f > a && (a = f, c = h);
  }
  return Math.sqrt(a) > r ? (Ir(t, e, c + 1, r, s), Ir(t, c, o, r, s)) : (s.length || s.push(i), s.push(l)), s;
}
function rn(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    kn(t, 3 * s, e, r);
  return o && o > 0 ? Ir(r, 0, r.length, o) : r;
}
const pe = "none";
class zr {
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
    return this._d("line", [Di(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), l = [], a = Rc(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? l.push(on([c], i)) : l.push(wo([c], i));
    }
    return i.stroke !== pe && l.push(a), this._d("rectangle", l, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), l = [], a = Ei(r, n, i), c = xn(e, o, i, a);
    if (i.fill) if (i.fillStyle === "solid") {
      const h = xn(e, o, i, a).opset;
      h.type = "fillPath", l.push(h);
    } else l.push(wo([c.estimatedPoints], i));
    return i.stroke !== pe && l.push(c.opset), this._d("ellipse", l, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [wr(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, l = !1, a) {
    const c = this._o(a), h = [], f = Es(e, o, r, n, s, i, l, !0, c);
    if (l && c.fill) if (c.fillStyle === "solid") {
      const d = Object.assign({}, c);
      d.disableMultiStroke = !0;
      const p = Es(e, o, r, n, s, i, !0, !1, d);
      p.type = "fillPath", h.push(p);
    } else h.push(function(d, p, m, y, b, g, x) {
      const z = d, I = p;
      let M = Math.abs(m / 2), j = Math.abs(y / 2);
      M += Rt(0.01 * M, x), j += Rt(0.01 * j, x);
      let X = b, N = g;
      for (; X < 0; ) X += 2 * Math.PI, N += 2 * Math.PI;
      N - X > 2 * Math.PI && (X = 0, N = 2 * Math.PI);
      const _ = (N - X) / x.curveStepCount, J = [];
      for (let dt = X; dt <= N; dt += _) J.push([z + M * Math.cos(dt), I + j * Math.sin(dt)]);
      return J.push([z + M * Math.cos(N), I + j * Math.sin(N)]), J.push([z, I]), wo([J], x);
    }(e, o, r, n, s, i, c));
    return c.stroke !== pe && h.push(f), this._d("arc", h, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = Ds(e, r);
    if (r.fill && r.fill !== pe) if (r.fillStyle === "solid") {
      const i = Ds(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], l = e;
      if (l.length) {
        const a = typeof l[0][0] == "number" ? [l] : l;
        for (const c of a) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...rn(Hs([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...rn(Hs(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(wo([i], r));
    }
    return r.stroke !== pe && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = wr(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(on([e], r)) : n.push(wo([e], r))), r.stroke !== pe && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== pe, i = r.stroke !== pe, l = !!(r.simplification && r.simplification < 1), a = function(h, f, d) {
      const p = Ai(Ri(On(h))), m = [];
      let y = [], b = [0, 0], g = [];
      const x = () => {
        g.length >= 4 && y.push(...rn(g, f)), g = [];
      }, z = () => {
        x(), y.length && (m.push(y), y = []);
      };
      for (const { key: M, data: j } of p) switch (M) {
        case "M":
          z(), b = [j[0], j[1]], y.push(b);
          break;
        case "L":
          x(), y.push([j[0], j[1]]);
          break;
        case "C":
          if (!g.length) {
            const X = y.length ? y[y.length - 1] : b;
            g.push([X[0], X[1]]);
          }
          g.push([j[0], j[1]]), g.push([j[2], j[3]]), g.push([j[4], j[5]]);
          break;
        case "Z":
          x(), y.push([b[0], b[1]]);
      }
      if (z(), !d) return m;
      const I = [];
      for (const M of m) {
        const j = Dc(M, d);
        j.length && I.push(j);
      }
      return I;
    }(e, 1, l ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = Ws(e, r);
    if (s) if (r.fillStyle === "solid") if (a.length === 1) {
      const h = Ws(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(h.ops) });
    } else n.push(on(a, r));
    else n.push(wo(a, r));
    return i && (l ? a.forEach((h) => {
      n.push(wr(h, !1, r));
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
          i = { d: this.opsToPath(s), stroke: r.stroke, strokeWidth: r.strokeWidth, fill: pe };
          break;
        case "fillPath":
          i = { d: this.opsToPath(s), stroke: pe, strokeWidth: 0, fill: r.fill || pe };
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
    return r < 0 && (r = o.strokeWidth / 2), { d: this.opsToPath(e), stroke: o.fill || pe, strokeWidth: r, fill: pe };
  }
  _mergedShape(e) {
    return e.filter((o, r) => r === 0 || o.op !== "move");
  }
}
class Ec {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new zr(o);
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
  arc(e, o, r, n, s, i, l = !1, a) {
    const c = this.gen.arc(e, o, r, n, s, i, l, a);
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
const yr = "http://www.w3.org/2000/svg";
class Wc {
  constructor(e, o) {
    this.svg = e, this.gen = new zr(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(yr, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const l of o) {
      let a = null;
      switch (l.type) {
        case "path":
          a = n.createElementNS(yr, "path"), a.setAttribute("d", this.opsToPath(l, i)), a.setAttribute("stroke", r.stroke), a.setAttribute("stroke-width", r.strokeWidth + ""), a.setAttribute("fill", "none"), r.strokeLineDash && a.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && a.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          a = n.createElementNS(yr, "path"), a.setAttribute("d", this.opsToPath(l, i)), a.setAttribute("stroke", "none"), a.setAttribute("stroke-width", "0"), a.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || a.setAttribute("fill-rule", "evenodd");
          break;
        case "fillSketch":
          a = this.fillSketch(n, l, r);
      }
      a && s.appendChild(a);
    }
    return s;
  }
  fillSketch(e, o, r) {
    let n = r.fillWeight;
    n < 0 && (n = r.strokeWidth / 2);
    const s = e.createElementNS(yr, "path");
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
  arc(e, o, r, n, s, i, l = !1, a) {
    const c = this.gen.arc(e, o, r, n, s, i, l, a);
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
var Fc = { canvas: (t, e) => new Ec(t, e), svg: (t, e) => new Wc(t, e), generator: (t) => new zr(t), newSeed: () => zr.newSeed() };
const We = Fc.generator();
function Nc(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e = (e << 5) - e + r, e |= 0;
  }
  return Math.abs(e);
}
function qe(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? Nc(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function Ke(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return We.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function Bo(t, e) {
  return Math.min(t, e) * 0.25;
}
function Bc(t, e, o, r, n) {
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
function Tr(t, e, o, r, n, s) {
  if (s) {
    const i = Bo(o, r);
    return Ke(We.path(Bc(t, e, o, r, i), qe(n)));
  }
  return Ke(We.rectangle(t, e, o, r, qe(n)));
}
function Xn(t, e, o, r, n) {
  return Ke(We.ellipse(t, e, o, r, qe(n)));
}
function Hc(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, l = [s, e], a = [t + o, i], c = [s, e + r], h = [t, i], f = Math.hypot(o / 2, r / 2), d = Math.min(n, f / 2) / f, p = (j, X, N) => [
    j[0] + N * (X[0] - j[0]),
    j[1] + N * (X[1] - j[1])
  ], m = p(h, l, 1 - d), y = p(l, a, d), b = p(l, a, 1 - d), g = p(a, c, d), x = p(a, c, 1 - d), z = p(c, h, d), I = p(c, h, 1 - d), M = p(h, l, d);
  return [
    `M${y[0]},${y[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${a[0]},${a[1]} ${g[0]},${g[1]}`,
    `L${x[0]},${x[1]}`,
    `Q${c[0]},${c[1]} ${z[0]},${z[1]}`,
    `L${I[0]},${I[1]}`,
    `Q${h[0]},${h[1]} ${M[0]},${M[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${l[0]},${l[1]} ${y[0]},${y[1]}`,
    "Z"
  ].join(" ");
}
function Yn(t, e, o, r, n, s) {
  if (s) {
    const l = Bo(o, r);
    return Ke(We.path(Hc(t, e, o, r, l), qe(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return Ke(We.polygon(i, qe(n)));
}
function Lo(t, e, o, r, n) {
  return Ke(We.line(t, e, o, r, qe(n)));
}
function Gn(t, e, o, r, n) {
  const s = Lo(t, e, o, r, n), i = Math.atan2(r - e, o - t), l = Math.max(12, n.strokeWidth * 4), a = Math.PI / 6, c = o - l * Math.cos(i - a), h = r - l * Math.sin(i - a), f = o - l * Math.cos(i + a), d = r - l * Math.sin(i + a), p = Lo(o, r, c, h, n), m = Lo(o, r, f, d, n);
  return [...s, ...p, ...m];
}
function Os(t, e) {
  const o = {
    ...qe(e),
    stroke: "none"
  };
  return Ke(We.polygon(t, o));
}
function nn(t, e) {
  return Ke(We.path(t, qe(e)));
}
function Qe(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function Oc(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function Xc({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ u(Gc, { node: o }) : /* @__PURE__ */ u(Yc, { node: o });
  }
  return /* @__PURE__ */ u(jc, { node: t, editingLabel: e });
}
const Pr = ce(Xc), Yc = ce(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = Qe(e.data.strokeStyle), n = qt(
    () => o ? null : Bn(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = qt(() => {
    const h = e.data.points;
    if (!h || h.length === 0) return "";
    if (h.length === 1) return `M${h[0][0]},${h[0][1]}L${h[0][0]},${h[0][1]}`;
    const f = [`M${h[0][0]},${h[0][1]}`];
    for (let d = 1; d < h.length; d++)
      f.push(`L${h[d][0]},${h[d][1]}`);
    return f.join("");
  }, [e.data.points]), i = qt(() => {
    if (!o) return null;
    const h = e.data.points;
    if (h.length < 2) return "";
    const f = ["M", h[0][0], h[0][1]];
    for (let p = 1; p < h.length; p++) {
      const [m, y] = h[p], [b, g] = h[p - 1];
      f.push("Q", b, g, (b + m) / 2, (g + y) / 2);
    }
    const d = h[h.length - 1];
    return f.push("L", d[0], d[1]), f.join(" ");
  }, [e.data.points, o]), l = qt(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const h = e.data.points.map((I) => [I[0], I[1]]), f = Pi(h), d = f[0], p = f[f.length - 1], m = Math.hypot(d[0] - p[0], d[1] - p[1]);
    let y = 0;
    for (let I = 1; I < f.length; I++)
      y += Math.hypot(f[I][0] - f[I - 1][0], f[I][1] - f[I - 1][1]);
    const b = y >= 1 && m <= Math.max(e.data.strokeWidth * 4, 20) && m <= y * 0.1, g = e.data.fillStyle || "solid";
    if (b) {
      const I = mc(f, 0);
      return g === "solid" ? { kind: "solid", d: I, fill: e.data.fill } : { kind: "rough", paths: Os(f, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: g,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const x = xc(f);
    if (x.length === 0) return null;
    if (g === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: x
      };
    const z = [];
    for (const { points: I } of x)
      I.length >= 3 && z.push(
        ...Os(I, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: g,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: z, regions: x };
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
          children: /* @__PURE__ */ v("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (l == null ? void 0 : l.kind) === "solid" && (l.regions ? l.regions.map((h, f) => /* @__PURE__ */ u(
              "path",
              {
                d: h.pathD,
                fill: l.fill,
                stroke: "none"
              },
              f
            )) : /* @__PURE__ */ u("path", { d: l.d, fill: l.fill, stroke: "none" })),
            (l == null ? void 0 : l.kind) === "rough" && l.paths.map((h, f) => /* @__PURE__ */ u(
              "path",
              {
                d: h.d,
                stroke: h.stroke,
                strokeWidth: h.strokeWidth,
                fill: h.fill,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              f
            )),
            o ? /* @__PURE__ */ u(
              "path",
              {
                d: i,
                fill: "none",
                stroke: e.data.color,
                strokeWidth: e.data.strokeWidth,
                strokeDasharray: r == null ? void 0 : r.map((h) => h * Math.max(e.data.strokeWidth, 1)).join(" "),
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
}), Gc = ce(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = e.data.strokeWidth * 2, n = qt(() => {
    const l = e.data.points;
    if (!l || l.length === 0) return "";
    const a = [`M${l[0][0]},${l[0][1]}`];
    for (let c = 1; c < l.length; c++)
      a.push(`L${l[c][0]},${l[c][1]}`);
    return a.push("Z"), a.join("");
  }, [e.data.points]), s = Qe(e.data.strokeStyle), i = s == null ? void 0 : s.map((l) => l * Math.max(e.data.strokeWidth, 1)).join(" ");
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
}), jc = ce(function({ node: e, editingLabel: o }) {
  var b, g, x, z;
  const r = e.h === "auto" ? 100 : e.h, n = e.data.strokeWidth * 2, s = Qe(e.data.strokeStyle), i = ((b = e.data.startPoint) == null ? void 0 : b[0]) ?? 0, l = ((g = e.data.startPoint) == null ? void 0 : g[1]) ?? r / 2, a = ((x = e.data.endPoint) == null ? void 0 : x[0]) ?? e.w, c = ((z = e.data.endPoint) == null ? void 0 : z[1]) ?? r / 2, h = qt(() => {
    if (e.data.roughness === 0) return null;
    const I = {
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
        return Tr(0, 0, e.w, r, I, M);
      case "ellipse":
        return Xn(e.w / 2, r / 2, e.w, r, I);
      case "diamond":
        return Yn(0, 0, e.w, r, I, M);
      case "line":
        return Lo(i, l, a, c, I);
      case "arrow":
        return Gn(i, l, a, c, I);
      default:
        return null;
    }
  }, [e, s, i, l, a, c, r]), f = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, d = e.data.opacity ?? 1, p = e.data.shape === "line" || e.data.shape === "arrow", m = e.data.label, y = e.data.labelFontSize ?? 14;
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
            children: /* @__PURE__ */ v("g", { transform: `translate(${n}, ${n})`, opacity: d, children: [
              f && /* @__PURE__ */ u(
                Uc,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              h ? h.map((I, M) => f && I.fill && I.fill !== "none" ? null : /* @__PURE__ */ u(
                "path",
                {
                  d: I.d,
                  stroke: I.stroke,
                  strokeWidth: I.strokeWidth,
                  fill: I.fill,
                  strokeDasharray: I.strokeDasharray,
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                M
              )) : /* @__PURE__ */ u(
                Vc,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
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
                Zc,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
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
        !p && m && !o && /* @__PURE__ */ u(
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
                  fontFamily: Ze(e.data.labelFontFamily ?? Ve),
                  fontSize: y,
                  color: e.data.fill && e.data.fillStyle === "solid" ? Oc(e.data.fill) : e.data.stroke,
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
function jn(t, e) {
  const o = Bo(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], l = [r, e], a = [0, n], c = Math.hypot(t / 2, e / 2), h = Math.min(o, c / 2) / c, f = (I, M, j) => [
    I[0] + j * (M[0] - I[0]),
    I[1] + j * (M[1] - I[1])
  ], d = f(s, i, h), p = f(s, i, 1 - h), m = f(i, l, h), y = f(i, l, 1 - h), b = f(l, a, h), g = f(l, a, 1 - h), x = f(a, s, h), z = f(a, s, 1 - h);
  return [
    `M${d[0]},${d[1]}`,
    `L${p[0]},${p[1]}`,
    `Q${i[0]},${i[1]} ${m[0]},${m[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${l[0]},${l[1]} ${b[0]},${b[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${a[0]},${a[1]} ${x[0]},${x[1]}`,
    `L${z[0]},${z[1]}`,
    `Q${s[0]},${s[1]} ${d[0]},${d[1]}`,
    "Z"
  ].join(" ");
}
function Vc({
  shape: t,
  w: e,
  h: o,
  x1: r,
  y1: n,
  x2: s,
  y2: i,
  stroke: l,
  fill: a,
  strokeWidth: c,
  dashArray: h,
  rounded: f
}) {
  const d = h == null ? void 0 : h.join(",");
  switch (t) {
    case "rect": {
      const p = f ? Bo(e, o) : 0;
      return /* @__PURE__ */ u(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: p || void 0,
          ry: p || void 0,
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
      return f ? /* @__PURE__ */ u(
        "path",
        {
          d: jn(e, o),
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
          x1: r,
          y1: n,
          x2: s,
          y2: i,
          stroke: l,
          strokeWidth: c,
          strokeDasharray: d
        }
      );
    case "arrow": {
      const p = Math.atan2(i - n, s - r), m = Math.max(12, c * 4), y = Math.PI / 6, b = s - m * Math.cos(p - y), g = i - m * Math.sin(p - y), x = s - m * Math.cos(p + y), z = i - m * Math.sin(p + y);
      return /* @__PURE__ */ v(ut, { children: [
        /* @__PURE__ */ u(
          "line",
          {
            x1: r,
            y1: n,
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
            points: `${b},${g} ${s},${i} ${x},${z}`,
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
function Zc({
  shape: t,
  w: e,
  h: o,
  x1: r,
  y1: n,
  x2: s,
  y2: i,
  hasFill: l,
  strokeWidth: a,
  rounded: c
}) {
  const h = l ? "painted" : "stroke", f = l ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const d = c ? Bo(e, o) : 0;
      return /* @__PURE__ */ u(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: d || void 0,
          ry: d || void 0,
          fill: f,
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
          fill: f,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: h
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ u(
        "path",
        {
          d: jn(e, o),
          fill: f,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: h
        }
      ) : /* @__PURE__ */ u(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: f,
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
          x1: r,
          y1: n,
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
function Uc({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? Bo(e, o) : 0;
      return /* @__PURE__ */ u("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ u("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ u(
        "path",
        {
          d: jn(e, o),
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
const qc = ce(function(e) {
  return /* @__PURE__ */ u(Pr, { node: e.node });
}), Kc = {
  type: "draw",
  component: qc,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => An(t, e, o, r),
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
};
function Qc({
  node: t
}) {
  const e = t.h === "auto" ? t.type === "draw" ? 0 : 100 : t.h, o = t.type === "draw" && e === 0 ? 24 : e, r = t.type === "draw" ? t.data.strokeWidth * 4 : t.data.strokeWidth * 2;
  return /* @__PURE__ */ u(
    "div",
    {
      style: {
        position: "absolute",
        left: t.x - r,
        top: t.y - r,
        width: t.w + r * 2,
        height: o + r * 2,
        zIndex: t.z,
        pointerEvents: "none",
        transform: t.rotation ? `rotate(${t.rotation}deg)` : void 0,
        transformOrigin: "center center",
        border: `1px solid ${t.type === "draw" ? t.data.color : t.data.stroke}`,
        borderRadius: 4,
        opacity: 0.6
      }
    }
  );
}
const Fi = ce(Qc), Jc = ce(function(e) {
  const o = e.node, r = o.h === "auto" ? 100 : o.h, n = o.w * e.zoom, s = r * e.zoom;
  return Math.min(n, s) < 2 ? /* @__PURE__ */ u(Fi, { node: o }) : /* @__PURE__ */ u(Pr, { node: o, editingLabel: e.editing });
}), $c = {
  type: "shape",
  component: Jc,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => Lr(t, e, o, r),
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
function _c(t) {
  return null;
}
const td = {
  type: "edge",
  component: _c,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, mr = 0.05, ed = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function od({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  onResizeHandleDown: s,
  cropping: i,
  onCropStart: l,
  onCropEnd: a
}) {
  const c = t.h, h = t.data.crop, f = ct(!1);
  f.current = !!i;
  const d = ct(null), [p, m] = tt(null), y = it(() => {
    d.current && d.current.naturalWidth > 0 && m({ w: d.current.naturalWidth, h: d.current.naturalHeight });
  }, []);
  mt(() => {
    d.current && d.current.naturalWidth > 0 && m({ w: d.current.naturalWidth, h: d.current.naturalHeight });
  }, [t.data.src]);
  const [b, g] = tt({ x: 0, y: 0, w: 1, h: 1 });
  mt(() => {
    i && (g(h ?? { x: 0, y: 0, w: 1, h: 1 }), !p && d.current && d.current.naturalWidth > 0 && m({ w: d.current.naturalWidth, h: d.current.naturalHeight }));
  }, [i]);
  const x = qt(() => {
    if (!p) return null;
    const Y = p.w / p.h, V = t.w / c;
    let O, K;
    return Y > V ? (O = t.w, K = t.w / Y) : (K = c, O = c * Y), { x: (t.w - O) / 2, y: (c - K) / 2, w: O, h: K };
  }, [p, t.w, c]), z = it(() => {
    const Y = b.x < 1e-3 && b.y < 1e-3 && b.w > 0.999 && b.h > 0.999;
    o.updateNodeWithHistory(t.id, {
      data: {
        ...t.data,
        crop: Y ? void 0 : { x: b.x, y: b.y, w: b.w, h: b.h }
      }
    }), a == null || a();
  }, [o, t, b, a]), I = it(() => {
    a == null || a();
  }, [a]);
  mt(() => {
    if (!i) return;
    const Y = (V) => {
      V.key === "Enter" ? (z(), V.preventDefault(), V.stopPropagation()) : V.key === "Escape" && (I(), V.preventDefault(), V.stopPropagation());
    };
    return document.addEventListener("keydown", Y, !0), () => document.removeEventListener("keydown", Y, !0);
  }, [i, z, I]);
  const M = it(
    (Y, V) => {
      if (V.stopPropagation(), V.preventDefault(), !x) return;
      const O = V.currentTarget.ownerDocument, K = V.clientX, nt = V.clientY, ot = { ...b }, yt = (et) => {
        const Tt = (et.clientX - K) / n / x.w, Ct = (et.clientY - nt) / n / x.h, bt = { ...ot }, ht = ot.x + ot.w, Dt = ot.y + ot.h;
        if (Y.includes("left")) {
          const It = Math.max(0, Math.min(ht - mr, ot.x + Tt));
          bt.x = It, bt.w = ht - It;
        }
        if (Y.includes("right") && (bt.w = Math.max(
          mr,
          Math.min(1 - ot.x, ot.w + Tt)
        )), Y.includes("top")) {
          const It = Math.max(0, Math.min(Dt - mr, ot.y + Ct));
          bt.y = It, bt.h = Dt - It;
        }
        Y.includes("bottom") && (bt.h = Math.max(
          mr,
          Math.min(1 - ot.y, ot.h + Ct)
        )), g(bt);
      }, ft = () => {
        O.removeEventListener("pointermove", yt), O.removeEventListener("pointerup", ft);
      };
      O.addEventListener("pointermove", yt), O.addEventListener("pointerup", ft);
    },
    [b, x, n]
  ), j = it(
    (Y) => {
      if (Y.stopPropagation(), Y.preventDefault(), !x) return;
      const V = Y.currentTarget.ownerDocument, O = Y.clientX, K = Y.clientY, nt = { ...b }, ot = (ft) => {
        const et = (ft.clientX - O) / n / x.w, Tt = (ft.clientY - K) / n / x.h;
        g({
          ...nt,
          x: Math.max(0, Math.min(1 - nt.w, nt.x + et)),
          y: Math.max(0, Math.min(1 - nt.h, nt.y + Tt))
        });
      }, yt = () => {
        V.removeEventListener("pointermove", ot), V.removeEventListener("pointerup", yt);
      };
      V.addEventListener("pointermove", ot), V.addEventListener("pointerup", yt);
    },
    [b, x, n]
  ), X = it(
    (Y) => {
      if (f.current) return;
      const V = Y.currentTarget.ownerDocument;
      if (Y.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: It, y: Pt } = o.screenToCanvas(
          Y.clientX,
          Y.clientY
        );
        for (const Kt of o.selection) {
          const Qt = o.getNode(Kt);
          if (!Qt) continue;
          const Zt = Qt.h === "auto" ? 100 : Qt.h;
          if (It >= Qt.x && It <= Qt.x + Qt.w && Pt >= Qt.y && Pt <= Qt.y + Zt)
            return;
        }
      }
      Y.stopPropagation(), Y.preventDefault(), Y.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const O = Y.clientX, K = Y.clientY, nt = Array.from(o.selection), ot = nt.map((It) => {
        const Pt = o.getNode(It);
        return { id: It, x: Pt.x, y: Pt.y };
      });
      let yt = !1, ft = null, et = O, Tt = K, Ct = !1;
      const bt = () => {
        ft = null;
        const It = (et - O) / o.viewport.zoom, Pt = (Tt - K) / o.viewport.zoom, { finalDx: Kt, finalDy: Qt } = o.computeDragSnap(
          ot,
          nt,
          It,
          Pt,
          Ct
        ), Zt = ot.map((Jt) => ({
          id: Jt.id,
          patch: { x: Jt.x + Kt, y: Jt.y + Qt }
        }));
        o.updateMany(Zt);
      }, ht = (It) => {
        const Pt = (It.clientX - O) / o.viewport.zoom, Kt = (It.clientY - K) / o.viewport.zoom;
        if (!yt)
          if (Math.abs(Pt) > 2 || Math.abs(Kt) > 2)
            yt = !0, o.pushHistorySnapshot();
          else
            return;
        et = It.clientX, Tt = It.clientY, Ct = It.metaKey || It.ctrlKey, ft === null && (ft = requestAnimationFrame(bt));
      }, Dt = () => {
        ft !== null && (cancelAnimationFrame(ft), bt()), o.clearAlignGuides(), V.removeEventListener("pointermove", ht), V.removeEventListener("pointerup", Dt);
      };
      V.addEventListener("pointermove", ht), V.addEventListener("pointerup", Dt);
    },
    [o, t.id]
  ), N = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 }
  ], _ = 8 / n, J = _ / 2, dt = 25 / n, H = e && s && !i, rt = it(
    (Y) => {
      const V = Y.currentTarget.ownerDocument;
      Y.stopPropagation(), Y.preventDefault();
      const O = t.x + t.w / 2, K = t.y + c / 2, nt = t.rotation || 0, { x: ot, y: yt } = o.screenToCanvas(
        Y.clientX,
        Y.clientY
      ), ft = Math.atan2(yt - K, ot - O);
      o.pushHistorySnapshot();
      const et = (Ct) => {
        const { x: bt, y: ht } = o.screenToCanvas(
          Ct.clientX,
          Ct.clientY
        ), Dt = Math.atan2(ht - K, bt - O);
        let It = nt + (Dt - ft) * (180 / Math.PI);
        (Ct.shiftKey || o.snapToGrid) && !(Ct.metaKey || Ct.ctrlKey) && (It = Math.round(It / 15) * 15), o.updateNode(t.id, { rotation: It });
      }, Tt = () => {
        V.removeEventListener("pointermove", et), V.removeEventListener("pointerup", Tt);
      };
      V.addEventListener("pointermove", et), V.addEventListener("pointerup", Tt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), Q = i && x ? {
    left: x.x + b.x * x.w,
    top: x.y + b.y * x.h,
    width: b.w * x.w,
    height: b.h * x.h
  } : null, q = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, R = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: q
  };
  if (!i && h) {
    const Y = h.y * 100, V = (1 - h.x - h.w) * 100, O = (1 - h.y - h.h) * 100, K = h.x * 100;
    R.objectViewBox = `inset(${Y}% ${V}% ${O}% ${K}%)`;
  }
  const B = 8 / n, $ = B / 2;
  return /* @__PURE__ */ v(
    "div",
    {
      onPointerDown: X,
      onDoubleClick: !i && r ? (Y) => {
        Y.stopPropagation(), l == null || l();
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
                  ref: d,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: y,
                  style: R,
                  draggable: !1
                }
              ),
              i && Q && /* @__PURE__ */ u(
                "div",
                {
                  onPointerDown: j,
                  style: {
                    position: "absolute",
                    left: Q.left,
                    top: Q.top,
                    width: Q.width,
                    height: Q.height,
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
        i && Q && ed.map(({ pos: Y, edges: V, cx: O, cy: K, cursor: nt }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (ot) => M(V, ot),
            style: {
              position: "absolute",
              left: Q.left + O * Q.width - $,
              top: Q.top + K * Q.height - $,
              width: B,
              height: B,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: nt,
              zIndex: 11
            }
          },
          Y
        )),
        e && !i && /* @__PURE__ */ v(ut, { children: [
          /* @__PURE__ */ u(
            "div",
            {
              style: {
                position: "absolute",
                left: "50%",
                top: -dt,
                width: 1,
                height: dt,
                background: "#3b82f6",
                marginLeft: -0.5,
                pointerEvents: "none"
              }
            }
          ),
          /* @__PURE__ */ u(
            "div",
            {
              onPointerDown: rt,
              style: {
                position: "absolute",
                left: "50%",
                top: -(dt + _ / 2),
                width: _,
                height: _,
                marginLeft: -_ / 2,
                borderRadius: "50%",
                background: "white",
                border: "1.5px solid #3b82f6",
                cursor: "grab"
              }
            }
          )
        ] }),
        H && N.map(({ pos: Y, cx: V, cy: O }) => /* @__PURE__ */ u(
          "div",
          {
            onPointerDown: (K) => {
              K.stopPropagation(), s == null || s(t.id, Y, K);
            },
            style: {
              position: "absolute",
              left: `calc(${V * 100}% - ${J}px)`,
              top: `calc(${O * 100}% - ${J}px)`,
              width: _,
              height: _,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: Dr(Y, t.rotation || 0)
            }
          },
          Y
        ))
      ]
    }
  );
}
const Ni = ce(od);
function rd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    Ni,
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
const nd = {
  type: "image",
  component: rd,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function sd({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = ct(null), [l, a] = tt(t.data.text), c = ct(!1), h = ct(t.data.text), f = ct(null), d = ct(e);
  d.current = e;
  const p = ct(t);
  p.current = t, mt(() => {
    o || a(t.data.text);
  }, [t.data.text]), ui(() => {
    var M, j;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const X = i.current.ownerDocument;
      let N = !1;
      if (r) {
        const _ = X.caretRangeFromPoint(r.clientX, r.clientY);
        if (_ && i.current.contains(_.startContainer)) {
          const J = (M = X.defaultView) == null ? void 0 : M.getSelection();
          J == null || J.removeAllRanges(), J == null || J.addRange(_), N = !0;
        }
      }
      if (!N) {
        const _ = X.createRange(), J = (j = X.defaultView) == null ? void 0 : j.getSelection();
        i.current.childNodes.length > 0 && (_.selectNodeContents(i.current), _.collapse(!1)), J == null || J.removeAllRanges(), J == null || J.addRange(_);
      }
      h.current = t.data.text, c.current = !1;
    }
  }, [o]), mt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const M = h.current, j = e.getNode(t.id);
        if (j && j.type === "text") {
          const X = j.data;
          M !== X.text && e.updateNodeWithHistory(t.id, {
            data: { ...X, text: M }
          });
        }
      };
  }, [o, e, t.id]), mt(() => {
    if (!i.current || !s) return;
    const M = new ResizeObserver(() => {
      var X;
      const j = ((X = i.current) == null ? void 0 : X.offsetHeight) ?? 0;
      j > 0 && s(t.id, j);
    });
    return M.observe(i.current), () => M.disconnect();
  }, [t.id, s, o]);
  const m = it(() => {
    var j;
    if (c.current) return;
    c.current = !0, f.current && (clearTimeout(f.current), f.current = null);
    const M = ((j = i.current) == null ? void 0 : j.innerText) ?? "";
    a(M), h.current = M, M !== t.data.text && e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: M }
    }), n();
  }, [e, t, n]), y = it(
    (M) => {
      var j;
      M.key === "Escape" && (M.preventDefault(), m(), (j = i.current) == null || j.blur()), M.stopPropagation();
    },
    [m]
  ), b = it(() => {
    m();
  }, [m]), g = it(() => {
    if (i.current) {
      const M = i.current.innerText;
      a(M), h.current = M, f.current && clearTimeout(f.current), f.current = setTimeout(() => {
        const j = p.current;
        M !== j.data.text && d.current.updateNode(j.id, {
          data: { ...j.data, text: M }
        });
      }, 0);
    }
  }, []), x = t.h === "auto" ? void 0 : t.h, z = t.data.opacity ?? 1, I = {
    fontFamily: Ze(t.data.fontFamily),
    fontSize: t.data.fontSize,
    color: t.data.color,
    textAlign: t.data.align,
    opacity: z,
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
          onBlur: b,
          onInput: g,
          onPointerDown: (M) => M.stopPropagation(),
          style: { ...I, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ u("div", { ref: i, style: I, children: l || " " })
    }
  );
}
const Bi = ce(sd);
function id(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    Bi,
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
const ad = {
  type: "text",
  component: id,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function ld(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, r = it(
    (s) => {
      var l, a;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (a = (l = t.callbacks).onEditEnd) == null || a.call(l);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), n = it(
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
const cd = {
  type: "frame",
  component: ld,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, dd = 100;
function hd({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: l
}) {
  const a = ct(null), c = ct(null), h = ct(""), f = ct(null), d = ct(null), p = ct(t);
  p.current = t;
  const m = ct(o);
  m.current = o, mt(() => {
    var I;
    if (s && c.current) {
      const M = c.current;
      M.innerText = t.data.text || "", h.current = t.data.text || "", M.focus();
      const j = M.ownerDocument, X = (I = j.defaultView) == null ? void 0 : I.getSelection(), N = f.current;
      f.current = null;
      let _ = !1;
      if (N && X && j.caretRangeFromPoint) {
        const J = j.caretRangeFromPoint(N.x, N.y);
        J && M.contains(J.startContainer) && (X.removeAllRanges(), X.addRange(J), _ = !0);
      }
      if (!_ && X) {
        const J = j.createRange();
        M.childNodes.length > 0 && (J.selectNodeContents(M), J.collapse(!1)), X.removeAllRanges(), X.addRange(J);
      }
    }
  }, [s]), mt(() => {
    if (s)
      return () => {
        const I = p.current, M = h.current;
        M !== I.data.text && m.current.updateNodeWithHistory(I.id, {
          data: { ...I.data, text: M }
        });
      };
  }, [s]);
  const y = it(() => {
    d.current && (clearTimeout(d.current), d.current = null), c.current && (h.current = c.current.innerText), l();
  }, [l]), b = it(
    (I) => {
      const M = I.currentTarget.ownerDocument;
      if (I.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: $, y: Y } = o.screenToCanvas(I.clientX, I.clientY);
        for (const V of o.selection) {
          const O = o.getNode(V);
          if (!O) continue;
          const K = O.h === "auto" ? 100 : O.h;
          if ($ >= O.x && $ <= O.x + O.w && Y >= O.y && Y <= O.y + K)
            return;
        }
      }
      if (I.stopPropagation(), s) return;
      I.currentTarget.setPointerCapture(I.pointerId), I.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const j = I.clientX, X = I.clientY, N = Array.from(o.selection), _ = [];
      for (const $ of N) {
        const Y = o.getNode($);
        Y && _.push({ id: $, x: Y.x, y: Y.y });
      }
      if (_.length === 0) return;
      let J = !1, dt = null, H = j, rt = X, Q = !1;
      const q = () => {
        dt = null;
        const $ = (H - j) / o.viewport.zoom, Y = (rt - X) / o.viewport.zoom, { finalDx: V, finalDy: O } = o.computeDragSnap(
          _,
          N,
          $,
          Y,
          Q
        ), K = _.map((nt) => ({
          id: nt.id,
          patch: { x: nt.x + V, y: nt.y + O }
        }));
        o.updateMany(K);
      }, R = ($) => {
        const Y = ($.clientX - j) / o.viewport.zoom, V = ($.clientY - X) / o.viewport.zoom;
        if (!J)
          if (Math.abs(Y) > 2 || Math.abs(V) > 2)
            J = !0, o.pushHistorySnapshot();
          else
            return;
        H = $.clientX, rt = $.clientY, Q = $.metaKey || $.ctrlKey, dt === null && (dt = requestAnimationFrame(q));
      }, B = () => {
        dt !== null && (cancelAnimationFrame(dt), q()), o.clearAlignGuides(), M.removeEventListener("pointermove", R), M.removeEventListener("pointerup", B);
      };
      M.addEventListener("pointermove", R), M.addEventListener("pointerup", B);
    },
    [o, t.id, s]
  ), g = it(
    (I) => {
      if (r) {
        if (I.stopPropagation(), t.groupId) {
          const M = [];
          let j = t.groupId;
          for (; j; )
            M.push(j), j = o.groupParent.get(j);
          if (!o.activeGroupId) {
            o.enterGroup(M[M.length - 1]), o.select(t.id);
            return;
          }
          const X = M.indexOf(o.activeGroupId);
          if (X > 0) {
            o.enterGroup(M[X - 1]), o.select(t.id);
            return;
          }
        }
        s || (f.current = { x: I.clientX, y: I.clientY }, o.select(t.id), i(t.id));
      }
    },
    [r, s, o, t.id, t.groupId, i]
  ), x = t.data.fontSize ?? 16, z = t.h === "auto" ? dd : t.h;
  return /* @__PURE__ */ u(
    "div",
    {
      ref: a,
      "data-node-id": t.id,
      className: r ? void 0 : "sb-block-inert",
      onPointerDown: r ? b : void 0,
      onDoubleClick: g,
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: z,
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
                c.current && (h.current = c.current.innerText, d.current && clearTimeout(d.current), d.current = setTimeout(() => {
                  const I = p.current, M = h.current;
                  M !== I.data.text && m.current.updateNode(I.id, {
                    data: { ...I.data, text: M }
                  });
                }, 0));
              },
              onKeyDown: (I) => {
                I.key === "Escape" && (I.stopPropagation(), y()), I.stopPropagation();
              },
              onPointerDown: (I) => I.stopPropagation(),
              style: {
                fontSize: x,
                fontFamily: Ze(Ve),
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
                fontFamily: Ze(Ve),
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
const Hi = ce(hd);
function ud(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    Hi,
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
const fd = {
  type: "sticky",
  component: ud,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, Oi = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function pd(t) {
  const e = t.match(Oi);
  return e ? e[1] : null;
}
function yd(t) {
  return Oi.test(t);
}
function md(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function bd(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function gd({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: l
}) {
  const a = t.h, { data: c } = t, h = (m) => {
    if (r && s) {
      m.stopPropagation();
      return;
    }
  }, f = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", d = Math.max(6, 8 / n), p = [
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
      onPointerDown: h,
      onDoubleClick: !s && r ? (m) => {
        m.stopPropagation(), l == null || l();
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
              border: f,
              boxSizing: "border-box",
              opacity: c.opacity ?? 1
            },
            children: [
              /* @__PURE__ */ u(
                "iframe",
                {
                  src: md(c.videoId),
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
        e && r && !s && p.map((m) => /* @__PURE__ */ u(
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
const xd = ce(gd);
function wd(t) {
  const e = t.node;
  return /* @__PURE__ */ u(
    xd,
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
const kd = {
  type: "youtube",
  component: wd,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, vd = [
  Jl,
  Kc,
  $c,
  td,
  nd,
  ad,
  cd,
  fd,
  kd
];
function no(t, e) {
  return `${t}:${e}`;
}
class Sd {
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
    return this.values.get(no(e, o)) ?? null;
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
      let a = !1;
      for (const c of l) {
        const h = c.data;
        if (h.toId === e && h.targetPort === i.id) {
          const f = this.values.get(
            no(h.fromId, h.sourcePort ?? "")
          );
          r[i.id] = f ?? i.defaultValue ?? null, a = !0;
          break;
        }
      }
      a || (r[i.id] = i.defaultValue ?? null);
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
      s.direction === "output" && (r[s.id] = this.values.get(no(e, s.id)) ?? null);
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
        let l = !1;
        for (const a of i) {
          const c = a.data;
          if (c.toId === e && c.targetPort === s.id) {
            r[s.id] = this.values.get(no(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, l = !0;
            break;
          }
        }
        l || (r[s.id] = s.defaultValue ?? null);
      } else
        r[s.id] = this.values.get(no(e, s.id)) ?? null;
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
            this.values.delete(no(n.id, i.id));
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
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), l = (m) => {
      if (i.has(m)) return;
      i.add(m);
      const y = o.get(m);
      if (y)
        for (const b of y)
          s.add(b), l(b);
    };
    for (const m of [...this.dirty])
      l(m);
    const a = /* @__PURE__ */ new Map();
    for (const m of s)
      a.set(m, 0);
    for (const m of n) {
      const y = m.data;
      y.sourcePort && y.targetPort && s.has(y.fromId) && s.has(y.toId) && a.set(
        y.toId,
        (a.get(y.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [m, y] of a)
      y === 0 && c.push(m);
    const h = [];
    for (; c.length > 0; ) {
      const m = c.shift();
      h.push(m);
      const y = o.get(m);
      if (y)
        for (const b of y) {
          if (!s.has(b)) continue;
          const g = (a.get(b) ?? 1) - 1;
          a.set(b, g), g === 0 && c.push(b);
        }
    }
    const f = new Set(h), d = /* @__PURE__ */ new Set();
    for (const m of s)
      f.has(m) || d.add(m);
    let p = !1;
    return (d.size !== this._cycleNodeIds.size || [...d].some((m) => !this._cycleNodeIds.has(m))) && (this._cycleNodeIds = d, p = !0), { sorted: h, cyclesChanged: p };
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
      return s.then((l) => {
        if (i !== this.generation) return;
        this.applyOutputs(e, r.ports, l) && (this.markDownstream(e), this.notifyListeners(), this.dirty.size > 0 && this.scheduleFlush());
      }), !1;
    }
    return this.applyOutputs(e, r.ports, s);
  }
  /** Apply computed outputs to the values map. Returns true if any value changed. */
  applyOutputs(e, o, r) {
    let n = !1;
    for (const s of o) {
      if (s.direction !== "output") continue;
      const i = no(e, s.id), l = r[s.id] ?? null, a = this.values.get(i) ?? null;
      Md(a, l) || (this.values.set(i, l), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function Md(t, e) {
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
function or(t) {
  return Qo.find((e) => e.key === t) ?? Qo[1];
}
function Cd() {
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
function Id() {
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
const sn = {
  "japanese-stationery": Cd,
  kraft: Id
};
function zd(t) {
  var e;
  return ((e = sn[t]) == null ? void 0 : e.call(sn)) ?? {};
}
const Xi = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none"
}, Td = {
  ...Xi,
  willChange: "transform"
}, Pd = ce(function({
  background: e
}) {
  const o = or(e), { staticDefs: r, staticLayers: n } = zd(e);
  return /* @__PURE__ */ v("svg", { style: Td, children: [
    r && /* @__PURE__ */ u("defs", { children: r }),
    /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: o.canvasBg }),
    n
  ] });
});
function Rd({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, a = or(o).group === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(Pd, { background: o }),
    r && /* @__PURE__ */ v("svg", { style: Xi, children: [
      /* @__PURE__ */ u("defs", { children: /* @__PURE__ */ u(
        "pattern",
        {
          id: "grid-dots",
          x: s,
          y: i,
          width: n,
          height: n,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ u("circle", { cx: n / 2, cy: n / 2, r: 1.5, fill: a })
        }
      ) }),
      /* @__PURE__ */ u("rect", { width: "100%", height: "100%", fill: "url(#grid-dots)" })
    ] })
  ] });
}
const Yi = "sb-excalib-index", Vn = "sb-excalib-";
function Wr() {
  try {
    const t = localStorage.getItem(Yi);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Gi(t) {
  localStorage.setItem(Yi, JSON.stringify(t));
}
function Ad(t) {
  try {
    const e = localStorage.getItem(Vn + t);
    return e ? Zn(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function Zn(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((r, n) => ({
    id: At(10),
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
function ji() {
  return Wr();
}
function Un(t) {
  const e = Ad(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function qn(t, e) {
  const o = Zn(t), r = At(10), n = o.libraryItems.map((l) => l.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(Vn + r, JSON.stringify(o));
  const i = Wr();
  return i.push(s), Gi(i), s;
}
function Ld(t) {
  localStorage.removeItem(Vn + t);
  const e = Wr().filter((o) => o.id !== t);
  Gi(e);
}
function Dd(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = Wr();
  for (const n of r) {
    if (!n.itemNames.some((l) => l.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = Un(n.id);
    for (const l of i)
      ((l.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: l });
  }
  return o;
}
async function Ed(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = Zn(r);
  return qn(n, { name: e, source: t });
}
const vn = {
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
}, Vi = fi(vn);
function $t() {
  return Ar(Vi);
}
function rr(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function uo(t) {
  if (t)
    return t * (180 / Math.PI);
}
function Zi(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function Ui(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function qi(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function Ki(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function Qi(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function Wd(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function an(t, e) {
  return {
    id: At(10),
    type: "shape",
    x: t.x,
    y: t.y,
    w: t.width,
    h: t.height,
    z: 0,
    rotation: uo(t.angle),
    locked: t.locked || void 0,
    data: {
      shape: e,
      stroke: t.strokeColor || "#1e1e2e",
      fill: Zi(t.backgroundColor),
      fillStyle: Ui(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: qi(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: rr(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? Wd(t) : void 0
    }
  };
}
function Xs(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: qi(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: rr(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [l, a] = o, c = Math.min(l[0], a[0]), h = Math.min(l[1], a[1]), f = Math.max(l[0], a[0]), d = Math.max(l[1], a[1]), p = Math.max(f - c, 1), m = Math.max(d - h, 1);
    return [
      {
        id: At(10),
        type: "shape",
        x: t.x + c,
        y: t.y + h,
        w: p,
        h: m,
        z: 0,
        rotation: uo(t.angle),
        locked: t.locked || void 0,
        data: {
          ...r,
          shape: e ? "arrow" : "line",
          startPoint: [l[0] - c, l[1] - h],
          endPoint: [a[0] - c, a[1] - h]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const l = Fd(t);
    if (l) return [l];
  }
  const s = At(10), i = [];
  for (let l = 0; l < o.length - 1; l++) {
    const a = o[l], c = o[l + 1], h = Math.min(a[0], c[0]), f = Math.min(a[1], c[1]), d = Math.max(a[0], c[0]), p = Math.max(a[1], c[1]), m = Math.max(d - h, 1), y = Math.max(p - f, 1), b = l === o.length - 2;
    i.push({
      id: At(10),
      type: "shape",
      x: t.x + h,
      y: t.y + f,
      w: m,
      h: y,
      z: 0,
      rotation: uo(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...r,
        shape: e && b ? "arrow" : "line",
        startPoint: [a[0] - h, a[1] - f],
        endPoint: [c[0] - h, c[1] - f]
      }
    });
  }
  return i;
}
function Fd(t) {
  const e = t.points ?? [];
  if (e.length < 3) return null;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const [l, a] of e)
    l < o && (o = l), a < r && (r = a), l > n && (n = l), a > s && (s = a);
  if (!isFinite(o)) return null;
  const i = e.map(([l, a]) => [
    l - o,
    a - r,
    0.5
  ]);
  return {
    id: At(10),
    type: "draw",
    x: t.x + o,
    y: t.y + r,
    w: Math.max(n - o, 1),
    h: Math.max(s - r, 1),
    z: 0,
    rotation: uo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "vector",
      points: i,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: rr(t.opacity ?? 100),
      fill: Zi(t.backgroundColor),
      fillStyle: Ui(t.fillStyle)
    }
  };
}
function Nd(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, r = t.simulatePressure !== !1, n = e.map((h, f) => {
    const d = !r && o && f < o.length ? o[f] : 0.5;
    return [h[0], h[1], d];
  });
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, a = -1 / 0;
  for (const [h, f] of n)
    h < s && (s = h), f < i && (i = f), h > l && (l = h), f > a && (a = f);
  isFinite(s) || (s = 0, i = 0, l = 0, a = 0);
  const c = n.map(
    ([h, f, d]) => [h - s, f - i, d]
  );
  return {
    id: At(10),
    type: "draw",
    x: t.x + s,
    y: t.y + i,
    w: Math.max(l - s, 1),
    h: Math.max(a - i, 1),
    z: 0,
    rotation: uo(t.angle),
    locked: t.locked || void 0,
    data: {
      tool: "pen",
      points: c,
      color: t.strokeColor || "#1e1e2e",
      strokeWidth: t.strokeWidth || 2,
      opacity: rr(t.opacity ?? 100)
    }
  };
}
function Bd(t) {
  return {
    id: At(10),
    type: "text",
    x: t.x,
    y: t.y,
    w: Math.ceil((t.width || 200) * 1.2),
    h: "auto",
    z: 0,
    rotation: uo(t.angle),
    locked: t.locked || void 0,
    data: {
      text: t.originalText || t.text || "",
      fontSize: t.fontSize || 20,
      fontFamily: Ki(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Qi(t.textAlign),
      opacity: rr(t.opacity ?? 100)
    }
  };
}
function Hd(t) {
  return {
    id: At(10),
    type: "frame",
    x: t.x,
    y: t.y,
    w: t.width || 400,
    h: t.height || 300,
    z: 0,
    rotation: uo(t.angle),
    locked: t.locked || void 0,
    data: {
      label: t.name || void 0
    }
  };
}
function Ji(t) {
  return Od(t.elements);
}
function Od(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [an(s, "rect")];
        break;
      case "ellipse":
        i = [an(s, "ellipse")];
        break;
      case "diamond":
        i = [an(s, "diamond")];
        break;
      case "arrow":
        i = Xs(s, !0);
        break;
      case "line":
        i = Xs(s, !1);
        break;
      case "freedraw": {
        const l = Nd(s);
        l && (i = [l]);
        break;
      }
      case "text":
        i = [Bd(s)];
        break;
      case "frame":
      case "magicframe":
        i = [Hd(s)];
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
    const a = e.find((h) => h.id === l);
    if (!a || a.type !== "shape") continue;
    const c = a.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = Ki(i.fontFamily), c.labelAlign = Qi(i.textAlign);
  }
  return Xd(t, e, o, r), Yd(e), { nodes: e, groupParent: r };
}
function Xd(t, e, o, r) {
  var s;
  const n = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let a = 0; a < i.groupIds.length - 1; a++) {
      const c = i.groupIds[a], h = i.groupIds[a + 1];
      n.has(c) || n.set(c, h);
    }
    const l = o.get(i.id);
    if (l) {
      const a = e.find((c) => c.id === l);
      a && (a.groupId = i.groupIds[0]);
    }
  }
  for (const [i, l] of n)
    r.set(i, l);
}
function Yd(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function Kn(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const f of t) {
    const d = f.h === "auto" ? 40 : f.h;
    o = Math.min(o, f.x), r = Math.min(r, f.y), n = Math.max(n, f.x + f.w), s = Math.max(s, f.y + d);
  }
  const i = n - o || 1, l = s - r || 1, a = 4, c = `${o - a} ${r - a} ${i + a * 2} ${l + a * 2}`, h = [];
  for (const f of t)
    switch (f.type) {
      case "shape":
        h.push(Gd(f));
        break;
      case "draw":
        h.push(jd(f));
        break;
      case "text":
        h.push(Vd(f));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${h.join("")}</svg>`;
}
function $i(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Gd(t) {
  var d, p, m, y;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: Qe(e.strokeStyle),
    seed: t.id
  }, n = ((d = e.startPoint) == null ? void 0 : d[0]) ?? 0, s = ((p = e.startPoint) == null ? void 0 : p[1]) ?? o / 2, i = ((m = e.endPoint) == null ? void 0 : m[0]) ?? t.w, l = ((y = e.endPoint) == null ? void 0 : y[1]) ?? o / 2;
  let a;
  switch (e.shape) {
    case "rect":
      a = Tr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      a = Xn(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      a = Yn(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      a = Lo(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    case "arrow":
      a = Gn(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, h = c < 1 ? `<g opacity="${c}">` : "<g>", f = a.map(
    (b) => `<path d="${$i(b.d)}" fill="${b.fill || "none"}" stroke="${b.stroke}" stroke-width="${b.strokeWidth}"${b.strokeDasharray ? ` stroke-dasharray="${b.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${h}${f.join("")}</g>`;
}
function jd(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function Vd(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${$i(n)}</text>`;
}
const _i = "sb-personal-library";
function Qn() {
  try {
    const t = localStorage.getItem(_i);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function ta(t) {
  localStorage.setItem(_i, JSON.stringify(t));
}
function ea() {
  return Qn();
}
function Zd(t, e, o) {
  const r = structuredClone(e);
  if (r.length > 0) {
    let a = 1 / 0, c = 1 / 0;
    for (const h of r)
      h.x < a && (a = h.x), h.y < c && (c = h.y);
    if (isFinite(a))
      for (const h of r)
        h.x -= a, h.y -= c;
  }
  const n = new Set(
    r.map((a) => a.groupId).filter(Boolean)
  ), s = [];
  for (const [a, c] of o)
    n.has(a) && s.push([a, c]);
  const i = {
    id: At(10),
    name: t.trim() || "Untitled",
    nodes: r,
    groupParent: s,
    createdAt: Date.now()
  }, l = Qn();
  return l.unshift(i), ta(l), i;
}
function Ud(t) {
  const e = Qn().filter((o) => o.id !== t);
  ta(e);
}
function oa(t, e, o, r) {
  const { nodes: n, groupParent: s } = Ji(e);
  if (n.length === 0) return;
  const i = structuredClone(n), l = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const x of i) {
    const z = At(10);
    l.set(x.id, z), x.id = z;
  }
  for (const x of i)
    x.groupId && (a.has(x.groupId) || a.set(x.groupId, At(10)), x.groupId = a.get(x.groupId));
  let c = 1 / 0, h = 1 / 0, f = -1 / 0, d = -1 / 0;
  for (const x of i) {
    const z = x.h === "auto" ? 100 : x.h;
    c = Math.min(c, x.x), h = Math.min(h, x.y), f = Math.max(f, x.x + x.w), d = Math.max(d, x.y + z);
  }
  const p = o ?? window.innerWidth / 2, m = r ?? window.innerHeight / 2, y = t.screenToCanvas(p, m), b = y.x - (c + f) / 2, g = y.y - (h + d) / 2;
  for (const x of i)
    x.x += b, x.y += g, x.z = t.nextZ();
  t.addNodes(i);
  for (const [x, z] of s) {
    const I = a.get(x) ?? x, M = a.get(z) ?? z;
    t.groupParent.set(I, M);
  }
  t.selectMultiple(i.map((x) => x.id));
}
const Sn = "application/x-spatialboard-library-item", Mn = "application/x-spatialboard-personal-item";
function ra(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const b of n) {
    const g = At(10);
    s.set(b.id, g), b.id = g;
  }
  for (const b of n)
    b.groupId && (i.has(b.groupId) || i.set(b.groupId, At(10)), b.groupId = i.get(b.groupId));
  for (const b of n)
    if (b.type === "edge") {
      const g = b.data;
      g.fromId && s.has(g.fromId) && (g.fromId = s.get(g.fromId)), g.toId && s.has(g.toId) && (g.toId = s.get(g.toId));
    }
  let l = 1 / 0, a = 1 / 0, c = -1 / 0, h = -1 / 0;
  for (const b of n) {
    const g = b.h === "auto" ? 100 : b.h;
    l = Math.min(l, b.x), a = Math.min(a, b.y), c = Math.max(c, b.x + b.w), h = Math.max(h, b.y + g);
  }
  const f = o ?? window.innerWidth / 2, d = r ?? window.innerHeight / 2, p = t.screenToCanvas(f, d), m = p.x - (l + c) / 2, y = p.y - (a + h) / 2;
  for (const b of n)
    b.x += m, b.y += y, b.z = t.nextZ();
  t.addNodes(n);
  for (const [b, g] of e.groupParent) {
    const x = i.get(b) ?? b, z = i.get(g) ?? g;
    t.groupParent.set(x, z);
  }
  t.selectMultiple(n.map((b) => b.id));
}
const Eo = /* @__PURE__ */ new Map();
function qd({ item: t }) {
  const e = qt(() => {
    const o = Eo.get(t.id);
    if (o) return o;
    const { nodes: r } = Ji(t), n = Kn(r, 56);
    return Eo.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function na({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const n = it(
    (s) => {
      s.dataTransfer.setData(
        Sn,
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
      onDragStart: n,
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
      children: /* @__PURE__ */ u(qd, { item: t })
    }
  );
}
function Kd({ nodes: t }) {
  const e = qt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = Eo.get(o);
    if (r) return r;
    const n = Kn(t, 56);
    return Eo.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ u("div", { dangerouslySetInnerHTML: { __html: e } });
}
function sa({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const [n, s] = tt(!1), i = it(
    (l) => {
      l.dataTransfer.setData(
        Mn,
        JSON.stringify({ itemId: t.id })
      ), l.dataTransfer.effectAllowed = "copy";
    },
    [t.id]
  );
  return /* @__PURE__ */ v(
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
            children: /* @__PURE__ */ u(Kd, { nodes: t.nodes })
          }
        ),
        n && /* @__PURE__ */ u(
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
function Qd({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = $t(), i = ct(null), l = ct(null), [a, c] = tt([]), [h, f] = tt([]), [d, p] = tt(""), [m, y] = tt(/* @__PURE__ */ new Set()), b = it(() => {
    c(ji()), f(ea());
  }, []);
  mt(() => {
    e && b();
  }, [e, b]), mt(() => {
    if (!e) return;
    const N = (_) => {
      i.current && !i.current.contains(_.target) && o();
    };
    return document.addEventListener("pointerdown", N), () => document.removeEventListener("pointerdown", N);
  }, [e, o]);
  const g = it(
    (N) => {
      var dt;
      const _ = (dt = N.target.files) == null ? void 0 : dt[0];
      if (!_) return;
      const J = new FileReader();
      J.onload = () => {
        try {
          const H = JSON.parse(J.result);
          if (H.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const rt = _.name.replace(/\.excalidrawlib$/, "");
          qn(H, { name: rt }), b();
        } catch (H) {
          console.error("Failed to parse library file:", H);
        }
      }, J.readAsText(_), N.target.value = "";
    },
    [b]
  ), x = it(
    (N) => {
      Ld(N), Eo.clear(), b();
    },
    [b]
  ), z = it(
    (N) => {
      oa(t, N);
    },
    [t]
  ), I = it(
    (N) => {
      ra(t, N);
    },
    [t]
  ), M = it(
    (N) => {
      Ud(N), Eo.clear(), b();
    },
    [b]
  ), j = it((N) => {
    y((_) => {
      const J = new Set(_);
      return J.has(N) ? J.delete(N) : J.add(N), J;
    });
  }, []), X = qt(() => {
    if (!d.trim()) return null;
    const N = d.toLowerCase(), _ = Dd(d), J = h.filter(
      (dt) => dt.name.toLowerCase().includes(N)
    );
    return { excalidraw: _, personal: J };
  }, [d, h]);
  return !e || !r ? null : fo(
    /* @__PURE__ */ v(
      "div",
      {
        ref: i,
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
        onPointerDown: (N) => N.stopPropagation(),
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
                children: "Libraries"
              }
            ),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                placeholder: "Search library...",
                value: d,
                onChange: (N) => p(N.target.value),
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
              children: X !== null ? X.excalidraw.length === 0 && X.personal.length === 0 ? /* @__PURE__ */ u(
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
              ) : /* @__PURE__ */ v(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 4
                  },
                  children: [
                    X.personal.map((N) => /* @__PURE__ */ u(
                      sa,
                      {
                        item: N,
                        onClick: () => I(N),
                        onRemove: () => M(N.id),
                        theme: s
                      },
                      N.id
                    )),
                    X.excalidraw.map(({ library: N, item: _ }) => /* @__PURE__ */ u(
                      na,
                      {
                        item: _,
                        libId: N.id,
                        onClick: () => z(_),
                        theme: s
                      },
                      _.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ v(ut, { children: [
                h.length > 0 && /* @__PURE__ */ u(
                  $d,
                  {
                    items: h,
                    onPlace: I,
                    onRemove: M,
                    theme: s
                  }
                ),
                a.length === 0 && h.length === 0 ? /* @__PURE__ */ v(
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
                ) : a.map((N) => {
                  const _ = m.has(N.id);
                  return /* @__PURE__ */ u(
                    Jd,
                    {
                      lib: N,
                      expanded: _,
                      onToggle: () => j(N.id),
                      onPlace: z,
                      onUninstall: () => x(N.id),
                      theme: s
                    },
                    N.id
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
                      var N;
                      return (N = l.current) == null ? void 0 : N.click();
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
              onChange: g
            }
          )
        ]
      }
    ),
    document.body
  );
}
function Jd({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const [i, l] = tt(null);
  return mt(() => {
    e && i === null && l(Un(t.id));
  }, [e, i, t.id]), /* @__PURE__ */ v("div", { style: { marginBottom: 4 }, children: [
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
              title: "Uninstall library",
              onClick: (a) => {
                a.stopPropagation(), n();
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
          na,
          {
            item: a,
            libId: t.id,
            onClick: () => r(a),
            theme: s
          },
          a.id
        ))
      }
    )
  ] });
}
function $d({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const [n, s] = tt(!0);
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
                transform: n ? "rotate(90deg)" : "rotate(0deg)",
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
              children: "Personal"
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
    n && /* @__PURE__ */ u(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: t.map((i) => /* @__PURE__ */ u(
          sa,
          {
            item: i,
            onClick: () => e(i),
            onRemove: () => o(i.id),
            theme: r
          },
          i.id
        ))
      }
    )
  ] });
}
async function _d(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n, credentials: "include" })).json();
}
async function Ys(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r, credentials: "include" })).json();
}
const Cn = "application/x-spatialboard-gif-item";
function ia(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let l = n.width, a = n.height;
  const c = Math.min(1, s / l, i / a);
  l = Math.round(l * c), a = Math.round(a * c);
  const h = o ?? window.innerWidth / 2, f = r ?? window.innerHeight / 2, d = t.screenToCanvas(h, f), p = {
    id: At(10),
    type: "image",
    x: d.x - l / 2,
    y: d.y - a / 2,
    w: l,
    h: a,
    z: t.nextZ(),
    data: { src: n.url }
  };
  t.addNode(p), t.select(p.id);
}
function th({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = $t(), i = ct(null), l = ct(null), [a, c] = tt(""), [h, f] = tt([]), [d, p] = tt(!1), [m, y] = tt(1), [b, g] = tt(!1), x = ct();
  mt(() => {
    if (!e) return;
    const X = (N) => {
      i.current && !i.current.contains(N.target) && o();
    };
    return document.addEventListener("pointerdown", X), () => document.removeEventListener("pointerdown", X);
  }, [e, o]), mt(() => {
    if (!e || a.trim()) return;
    const X = new AbortController();
    return p(!0), Ys(n, 1, 30, X.signal).then((N) => {
      f(N.data.data.filter((_) => _.type !== "ad")), y(1), g(N.data.has_next);
    }).catch(() => {
    }).finally(() => p(!1)), () => X.abort();
  }, [e, n, a]);
  const z = it(
    (X, N, _) => {
      if (!X.trim()) return;
      const J = new AbortController();
      return p(!0), _d(n, X, N, 30, J.signal).then((dt) => {
        const H = dt.data.data.filter((rt) => rt.type !== "ad");
        f((rt) => _ ? [...rt, ...H] : H), y(N), g(dt.data.has_next);
      }).catch(() => {
      }).finally(() => p(!1)), J;
    },
    [n]
  ), I = it(
    (X) => {
      if (c(X), x.current && clearTimeout(x.current), !X.trim()) {
        f([]), y(1), g(!1);
        return;
      }
      x.current = setTimeout(() => {
        z(X, 1, !1);
      }, 350);
    },
    [z]
  ), M = it(() => {
    const X = l.current;
    !X || d || !b || X.scrollTop + X.clientHeight >= X.scrollHeight - 100 && (a.trim() ? z(a, m + 1, !0) : (p(!0), Ys(n, m + 1, 30).then((N) => {
      const _ = N.data.data.filter((J) => J.type !== "ad");
      f((J) => [...J, ..._]), y(m + 1), g(N.data.has_next);
    }).catch(() => {
    }).finally(() => p(!1))));
  }, [d, b, a, m, z, n]), j = it(
    (X) => {
      ia(t, X);
    },
    [t]
  );
  return !e || !r ? null : fo(
    /* @__PURE__ */ v(
      "div",
      {
        ref: i,
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
        onPointerDown: (X) => X.stopPropagation(),
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
                children: "GIFs"
              }
            ),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                placeholder: "Search KLIPY",
                value: a,
                onChange: (X) => I(X.target.value),
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
              onScroll: M,
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
                    children: h.map((X) => /* @__PURE__ */ u(
                      eh,
                      {
                        item: X,
                        onClick: () => j(X),
                        engine: t,
                        theme: s
                      },
                      X.id
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
function eh({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = it(
    (l) => {
      l.dataTransfer.setData(Cn, JSON.stringify(t)), l.dataTransfer.effectAllowed = "copy";
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
function oh({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = tt(""), s = ct(null), i = ct(null);
  mt(() => {
    var f;
    (f = s.current) == null || f.focus();
  }, []);
  const l = qt(() => Kn(t, 56), [t]), a = it(() => {
    e(r.trim() || "Untitled");
  }, [r, e]), c = it(
    (f) => {
      f.key === "Enter" ? (f.preventDefault(), a()) : f.key === "Escape" && (f.preventDefault(), o());
    },
    [a, o]
  ), h = it(
    (f) => {
      i.current && !i.current.contains(f.target) && o();
    },
    [o]
  );
  return fo(
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
        children: /* @__PURE__ */ v(
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
function In(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function rh(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function aa(t, e, o, r) {
  return new Promise((n) => {
    const s = rh(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, h = i.naturalHeight || 200;
      if (c <= 1 || h <= 1) {
        const f = t.match(/viewBox=["']([^"']+)["']/i);
        if (f) {
          const d = f[1].trim().split(/[\s,]+/).map(Number);
          d.length === 4 && d[2] > 0 && d[3] > 0 && (c = d[2], h = d[3]);
        }
      }
      if (c > 400 || h > 400) {
        const f = Math.min(400 / c, 400 / h);
        c = Math.round(c * f), h = Math.round(h * f);
      }
      n({
        id: At(10),
        type: "image",
        x: e,
        y: o,
        w: c,
        h,
        z: r,
        data: { src: s }
      });
    }, i.onerror = () => n(null), i.src = s;
  });
}
async function nh(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await aa(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
const Gs = {
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
}, sh = ce(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const l = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, a = e.rotation || 0, c = e.x + e.w / 2, h = e.y + l / 2, f = 8 / o, d = f / 2, p = 25 / o, m = !!e.locked, y = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + l / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + l },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + l },
    { pos: "sw", cx: e.x, cy: e.y + l },
    { pos: "w", cx: e.x, cy: e.y + l / 2 }
  ];
  return /* @__PURE__ */ v("g", { transform: `rotate(${a}, ${c}, ${h})`, children: [
    /* @__PURE__ */ u(
      "rect",
      {
        x: e.x,
        y: e.y,
        width: e.w,
        height: l,
        fill: "none",
        stroke: m ? "#f59e0b" : "#3b82f6",
        strokeWidth: 1.5 / o,
        strokeDasharray: `${4 / o} ${3 / o}`
      }
    ),
    m && (() => {
      const b = 16 / o, g = e.x + e.w - b - 4 / o, x = e.y - b - 4 / o;
      return /* @__PURE__ */ v("g", { transform: `translate(${g}, ${x})`, children: [
        /* @__PURE__ */ u(
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
        /* @__PURE__ */ v("g", { transform: `scale(${b / 24})`, children: [
          /* @__PURE__ */ u("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ u("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    r && !m && y.map(({ pos: b, cx: g, cy: x }) => /* @__PURE__ */ u(
      "rect",
      {
        x: g - d,
        y: x - d,
        width: f,
        height: f,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: Dr(b, a),
          pointerEvents: "auto"
        },
        onPointerDown: (z) => {
          z.stopPropagation(), s == null || s(e.id, b, z);
        }
      },
      b
    )),
    r && !m && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u(
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
      /* @__PURE__ */ u(
        "rect",
        {
          x: e.x + e.w / 2 - d,
          y: e.y - p - d,
          width: f,
          height: f,
          rx: 1.5 / o,
          transform: `rotate(45, ${e.x + e.w / 2}, ${e.y - p})`,
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
}), ih = ce(function({
  edge: e,
  fromNode: o,
  toNode: r,
  viewport: n,
  selection: s,
  measuredHeights: i,
  registry: l,
  onEdgeEndpointDown: a,
  onKinkHandleDown: c,
  edgeReconnect: h,
  eraserMarkedIds: f,
  cycleNodeIds: d
}) {
  const p = e.data.edgeType || "bezier";
  let m, y;
  if (l && e.data.sourcePort) {
    const ht = l.get(o.type);
    ht != null && ht.ports && (m = _o(o, ht.ports, e.data.sourcePort, n.zoom, i) ?? void 0);
  }
  if (l && e.data.targetPort) {
    const ht = l.get(r.type);
    ht != null && ht.ports && (y = _o(r, ht.ports, e.data.targetPort, n.zoom, i) ?? void 0);
  }
  const b = Ge(
    o,
    r,
    p,
    i,
    e.data.sourceHandle,
    e.data.targetHandle,
    e.data.midpointOffset,
    e.data.curveOffset,
    m,
    y
  ), { path: g, x1: x, y1: z, x2: I, y2: M, labelX: j, labelY: X, arrowAngle: N, tailAngle: _, kinkHandle: J } = b, dt = s.has(e.id), H = e.data.strokeWidth, rt = e.data.style === "dashed" ? `${8 * H},${4 * H}` : e.data.style === "dotted" ? `${2 * H},${3 * H}` : void 0, Q = Math.max(8, H * 3), q = e.data.arrowHeadSize ?? Q, R = e.data.arrowTailSize ?? Q, B = e.data.animated, $ = f == null ? void 0 : f.has(e.id), Y = (h == null ? void 0 : h.edgeId) === e.id, V = !!(d && d.size > 0 && e.data.sourcePort && e.data.targetPort && d.has(e.data.fromId) && d.has(e.data.toId)), O = V ? "#ef4444" : e.data.color, K = e.data.roughness ?? 0, nt = qt(() => K <= 0 ? null : {
    stroke: O,
    roughness: K,
    strokeWidth: H,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [O, K, H, e.data.style, e.id]);
  let ot = null, yt = null, ft = null;
  nt && (ot = nn(g, nt), e.data.arrowHead === "arrow" && (yt = nn(Po(I, M, N, q), { ...nt, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (ft = nn(Po(x, z, _, R), { ...nt, strokeLineDash: void 0 })));
  const et = qt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), Tt = qt(() => {
    if (!B) return;
    const ht = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : "edge-flow", Dt = e.data.animatedDirection === "both" ? "2s" : "1s";
    return { animation: `${ht} ${Dt} linear infinite` };
  }, [B, e.data.animatedDirection]), Ct = qt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite" }),
    []
  ), bt = qt(
    () => $ ? { filter: "saturate(0)" } : void 0,
    [$]
  );
  return /* @__PURE__ */ v("g", { opacity: Y ? 0.15 : $ ? 0.25 : void 0, style: bt, children: [
    V && /* @__PURE__ */ u(
      "path",
      {
        d: g,
        stroke: "#ef4444",
        strokeWidth: H + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: et
      }
    ),
    dt && /* @__PURE__ */ u(
      "path",
      {
        d: g,
        stroke: "#3b82f6",
        strokeWidth: H + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    ot ? ot.map((ht, Dt) => /* @__PURE__ */ u(
      "path",
      {
        d: ht.d,
        stroke: ht.stroke,
        strokeWidth: ht.strokeWidth,
        strokeDasharray: ht.strokeDasharray,
        strokeLinecap: "round",
        fill: ht.fill ?? "none",
        style: B ? Tt : void 0
      },
      Dt
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: g,
        stroke: O,
        strokeWidth: H,
        strokeDasharray: B ? "12,8" : V ? `${6 * H},${4 * H}` : rt,
        strokeLinecap: "round",
        fill: "none",
        style: V ? Ct : Tt
      }
    ),
    e.data.arrowHead === "arrow" && (yt ? yt.map((ht, Dt) => /* @__PURE__ */ u(
      "path",
      {
        d: ht.d,
        stroke: ht.stroke,
        strokeWidth: ht.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ht.fill ?? "none"
      },
      `ah${Dt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: Po(I, M, N, q),
        fill: "none",
        stroke: O,
        strokeWidth: H,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Sr(I, M, N, q),
        fill: O,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: I,
        cy: M,
        r: q * 0.25,
        fill: O
      }
    ),
    e.data.arrowTail === "arrow" && (ft ? ft.map((ht, Dt) => /* @__PURE__ */ u(
      "path",
      {
        d: ht.d,
        stroke: ht.stroke,
        strokeWidth: ht.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ht.fill ?? "none"
      },
      `at${Dt}`
    )) : /* @__PURE__ */ u(
      "path",
      {
        d: Po(x, z, _, R),
        fill: "none",
        stroke: O,
        strokeWidth: H,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ u(
      "path",
      {
        d: Sr(x, z, _, R),
        fill: O,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ u(
      "circle",
      {
        cx: x,
        cy: z,
        r: R * 0.25,
        fill: O
      }
    ),
    e.data.label && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u(
        "rect",
        {
          x: j - (e.data.label.length * 3.5 + 6) / n.zoom,
          y: X - 8 / n.zoom,
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
          x: j,
          y: X + 4 / n.zoom,
          fill: O,
          fontSize: 12 / n.zoom,
          textAnchor: "middle",
          style: { pointerEvents: "none" },
          children: e.data.label
        }
      )
    ] }),
    dt && !Y && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u(
        "circle",
        {
          cx: x,
          cy: z,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ht) => {
            ht.stopPropagation(), a == null || a(e.id, "source", ht);
          }
        }
      ),
      /* @__PURE__ */ u(
        "circle",
        {
          cx: I,
          cy: M,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ht) => {
            ht.stopPropagation(), a == null || a(e.id, "target", ht);
          }
        }
      )
    ] }),
    dt && !Y && J && /* @__PURE__ */ u(
      "circle",
      {
        cx: J.x,
        cy: J.y,
        r: 5 / n.zoom,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / n.zoom,
        style: {
          cursor: J.axis === "xy" ? "move" : J.axis === "x" ? "ew-resize" : "ns-resize",
          pointerEvents: "auto"
        },
        onPointerDown: (ht) => {
          ht.stopPropagation(), c == null || c(e.id, J.axis, J.min, J.max, ht);
        }
      }
    )
  ] });
});
function ah({
  nodes: t,
  viewport: e,
  selection: o,
  measuredHeights: r,
  activeStroke: n,
  shapePreview: s,
  shapePreviewStyle: i,
  onResizeHandleDown: l,
  onRotateStart: a,
  onConnectionHandleDown: c,
  onEdgeEndpointDown: h,
  onKinkHandleDown: f,
  edgePreview: d,
  edgeReconnect: p,
  eraserMarkedIds: m,
  eraserTrail: y,
  laserTrail: b,
  mode: g,
  hoveredNodeId: x,
  registry: z,
  onPortHandleDown: I,
  cycleNodeIds: M,
  containerTypes: j,
  alignGuides: X
}) {
  const N = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, _ = t.filter(
    (H) => H.type !== "edge" && H.type !== "content" && H.type !== "image"
  ), J = t.filter((H) => H.type === "edge").sort((H, rt) => H.z - rt.z), dt = qt(() => new Map(t.map((H) => [H.id, H])), [t]);
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
      children: /* @__PURE__ */ v("g", { transform: N, children: [
        J.map((H) => {
          const rt = dt.get(H.data.fromId), Q = dt.get(H.data.toId);
          return !rt || !Q ? null : /* @__PURE__ */ u(
            ih,
            {
              edge: H,
              fromNode: rt,
              toNode: Q,
              viewport: e,
              selection: o,
              measuredHeights: r,
              registry: z,
              onEdgeEndpointDown: h,
              onKinkHandleDown: f,
              edgeReconnect: p,
              eraserMarkedIds: m,
              cycleNodeIds: M
            },
            H.id
          );
        }),
        (() => {
          var Y, V;
          const H = !!d || !!p, rt = (d == null ? void 0 : d.cursorX) ?? (p == null ? void 0 : p.cursorX) ?? 0, Q = (d == null ? void 0 : d.cursorY) ?? (p == null ? void 0 : p.cursorY) ?? 0, q = (d == null ? void 0 : d.fromNode.id) ?? (p == null ? void 0 : p.anchorNodeId) ?? null;
          let R = null, B = null;
          const $ = /* @__PURE__ */ new Set();
          if (H) {
            let O = 1 / 0, K = !1;
            const nt = 50 / e.zoom;
            for (const ot of t) {
              if (ot.type === "edge" || ot.id === q || (V = (Y = z == null ? void 0 : z.get(ot.type)) == null ? void 0 : Y.ports) != null && V.length) continue;
              const yt = ot.h === "auto" ? (r == null ? void 0 : r[ot.id]) ?? 100 : ot.h, ft = ot.w * 0.2, et = yt * 0.2;
              rt >= ot.x - ft && rt <= ot.x + ot.w + ft && Q >= ot.y - et && Q <= ot.y + yt + et && $.add(ot.id);
              const Tt = Ao(ot, r), Ct = j ? j.has(ot.type) : ot.type === "frame";
              for (const bt of Tt) {
                const ht = Math.hypot(bt.x - rt, bt.y - Q);
                ht >= nt || Ct && !K && R || (!Ct && K || ht < O) && (O = ht, K = Ct, R = ot.id, B = bt.side);
              }
            }
          }
          return t.filter((O) => {
            var K, nt;
            return O.type === "edge" || (nt = (K = z == null ? void 0 : z.get(O.type)) == null ? void 0 : K.ports) != null && nt.length ? !1 : o.size <= 1 && o.has(O.id) || H && (O.id === q || $.has(O.id));
          }).map((O) => {
            const K = Ao(O, r), nt = 4 / e.zoom, ot = 26 / e.zoom, yt = O.rotation || 0, ft = O.h === "auto" ? (r == null ? void 0 : r[O.id]) ?? 100 : O.h, et = O.x + O.w / 2, Tt = O.y + ft / 2, Ct = d && d.fromNode.id === O.id || p && p.anchorNodeId === O.id, bt = o.has(O.id) && !H;
            return /* @__PURE__ */ u("g", { transform: yt ? `rotate(${yt}, ${et}, ${Tt})` : void 0, children: K.map(({ side: ht }) => {
              const Dt = {
                top: [O.x + O.w / 2, O.y],
                bottom: [O.x + O.w / 2, O.y + ft],
                left: [O.x, O.y + ft / 2],
                right: [O.x + O.w, O.y + ft / 2]
              }, [It, Pt] = Dt[ht], Kt = ht === "top" && o.has(O.id) ? 42 / e.zoom : ot;
              let Qt = It, Zt = Pt;
              switch (ht) {
                case "top":
                  Zt = Pt - Kt;
                  break;
                case "bottom":
                  Zt = Pt + Kt;
                  break;
                case "left":
                  Qt = It - Kt;
                  break;
                case "right":
                  Qt = It + Kt;
                  break;
              }
              const Jt = H && R === O.id && B === ht;
              return /* @__PURE__ */ u(
                "circle",
                {
                  cx: Qt,
                  cy: Zt,
                  r: Jt ? 5 / e.zoom : nt,
                  fill: Ct || Jt ? "#3b82f6" : "white",
                  stroke: Jt ? "white" : H && !Ct ? "#3b82f6" : "#94a3b8",
                  strokeWidth: 1.5 / e.zoom,
                  opacity: Jt || H && !Ct ? 1 : 0.8,
                  style: {
                    cursor: bt ? "crosshair" : "default",
                    pointerEvents: bt ? "auto" : "none"
                  },
                  onPointerDown: bt ? (he) => {
                    he.stopPropagation(), c == null || c(O.id, ht, he);
                  } : void 0
                },
                `ch-${O.id}-${ht}`
              );
            }) }, `conn-${O.id}`);
          });
        })(),
        z && (() => {
          var Y;
          const H = !!d || !!p, rt = (d == null ? void 0 : d.cursorX) ?? (p == null ? void 0 : p.cursorX) ?? 0, Q = (d == null ? void 0 : d.cursorY) ?? (p == null ? void 0 : p.cursorY) ?? 0, q = (d == null ? void 0 : d.fromNode.id) ?? null, R = (d == null ? void 0 : d.sourceDirection) === "output" ? "input" : (d == null ? void 0 : d.sourceDirection) === "input" ? "output" : null;
          let B = null, $ = null;
          if (H && R) {
            let V = 40 / e.zoom;
            for (const O of t) {
              if (O.type === "edge" || O.id === q) continue;
              const K = z.get(O.type);
              if (!((Y = K == null ? void 0 : K.ports) != null && Y.length)) continue;
              const nt = O.h === "auto" ? (r == null ? void 0 : r[O.id]) ?? 100 : O.h, ot = 14 / e.zoom, yt = K.ports.filter((ft) => ft.direction === R);
              for (let ft = 0; ft < yt.length; ft++) {
                const et = yt[ft], Tt = O.y + nt / (yt.length + 1) * (ft + 1), Ct = et.direction === "input" ? O.x - ot : O.x + O.w + ot, bt = Math.hypot(Ct - rt, Tt - Q);
                bt < V && (V = bt, B = O.id, $ = et.id);
              }
            }
          }
          return t.filter((V) => {
            var K;
            if (V.type === "edge") return !1;
            const O = z.get(V.type);
            return !!((K = O == null ? void 0 : O.ports) != null && K.length);
          }).map((V) => {
            const K = z.get(V.type).ports, nt = V.h === "auto" ? (r == null ? void 0 : r[V.id]) ?? 100 : V.h, ot = V.rotation || 0, yt = V.x + V.w / 2, ft = V.y + nt / 2, et = 6 / e.zoom, Tt = 14 / e.zoom, Ct = K.filter((Pt) => Pt.direction === "input"), bt = K.filter((Pt) => Pt.direction === "output"), ht = !H, Dt = (Pt, Kt, Qt, Zt) => {
              const Jt = V.y + nt / (Qt.length + 1) * (Kt + 1), he = Zt === "input" ? V.x - Tt : V.x + V.w + Tt, Pe = Gs[Pt.dataType] || Gs.any, _t = B === V.id && $ === Pt.id, Re = _t ? 8 / e.zoom : et, $e = Zt === "input" ? V.x : V.x + V.w, po = Zt === "input" ? he - et - 4 / e.zoom : he + et + 4 / e.zoom;
              return /* @__PURE__ */ v("g", { children: [
                /* @__PURE__ */ u(
                  "line",
                  {
                    x1: he,
                    y1: Jt,
                    x2: $e,
                    y2: Jt,
                    stroke: Pe,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                _t && /* @__PURE__ */ u(
                  "circle",
                  {
                    cx: he,
                    cy: Jt,
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
                    cx: he,
                    cy: Jt,
                    r: Re,
                    fill: _t ? "white" : Pe,
                    stroke: _t ? Pe : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: ht ? "crosshair" : "default",
                      pointerEvents: ht ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: ht ? (ue) => {
                      ue.stopPropagation(), I == null || I(V.id, Pt.id, Zt, ue);
                    } : void 0
                  }
                ),
                (() => {
                  const ue = Pt.label || Pt.id, ve = 9 / e.zoom, _e = 5 / e.zoom, to = 2.5 / e.zoom, fe = ue.length * ve * 0.62 + _e * 2, Se = ve + to * 2, be = Zt === "input" ? po - fe : po, Fe = Jt - Se / 2, k = Se / 2, st = _t ? Pe : "#1a1a2e", Yt = _t ? Pe : "#2a2a40", ne = _t ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ v("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ u(
                      "rect",
                      {
                        x: be,
                        y: Fe,
                        width: fe,
                        height: Se,
                        rx: k,
                        ry: k,
                        fill: st,
                        fillOpacity: _t ? 0.9 : 0.85,
                        stroke: Yt,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ u(
                      "text",
                      {
                        x: be + fe / 2,
                        y: Jt + ve * 0.35,
                        fill: ne,
                        fontSize: ve,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: ue
                      }
                    )
                  ] });
                })()
              ] }, `port-${V.id}-${Pt.id}`);
            }, It = M == null ? void 0 : M.has(V.id);
            return /* @__PURE__ */ v("g", { transform: ot ? `rotate(${ot}, ${yt}, ${ft})` : void 0, children: [
              Ct.map((Pt, Kt) => Dt(Pt, Kt, Ct, "input")),
              bt.map((Pt, Kt) => Dt(Pt, Kt, bt, "output")),
              It && (() => {
                const Pt = 10 / e.zoom, Kt = V.x + V.w + Pt * 0.3, Qt = V.y - Pt * 0.3;
                return /* @__PURE__ */ v("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: Kt,
                      cy: Qt,
                      r: Pt,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ u(
                    "text",
                    {
                      x: Kt,
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
            ] }, `ports-${V.id}`);
          });
        })(),
        d && (() => {
          let H, rt;
          if (d.sourcePort && z) {
            const Q = d.fromNode, q = z.get(Q.type), R = q != null && q.ports ? _o(Q, q.ports, d.sourcePort, e.zoom, r) : null;
            if (R)
              H = R.x, rt = R.y;
            else {
              const B = Kr(Q, d.cursorX, d.cursorY, r);
              H = B.x, rt = B.y;
            }
          } else if (d.sourceHandle) {
            const Q = d.fromNode, q = Q.h === "auto" ? (r == null ? void 0 : r[Q.id]) ?? 100 : Q.h, R = {
              top: [Q.x + Q.w / 2, Q.y],
              bottom: [Q.x + Q.w / 2, Q.y + q],
              left: [Q.x, Q.y + q / 2],
              right: [Q.x + Q.w, Q.y + q / 2]
            }, B = d.sourceHandle, $ = B === "top" ? 42 / e.zoom : 26 / e.zoom, [Y, V] = R[B];
            let O = Y, K = V;
            switch (B) {
              case "top":
                K = V - $;
                break;
              case "bottom":
                K = V + $;
                break;
              case "left":
                O = Y - $;
                break;
              case "right":
                O = Y + $;
                break;
            }
            if (Q.rotation) {
              const nt = Q.x + Q.w / 2, ot = Q.y + q / 2, yt = Q.rotation * Math.PI / 180, ft = Math.cos(yt), et = Math.sin(yt), Tt = O - nt, Ct = K - ot;
              H = nt + Tt * ft - Ct * et, rt = ot + Tt * et + Ct * ft;
            } else
              H = O, rt = K;
          } else {
            const Q = Kr(d.fromNode, d.cursorX, d.cursorY, r);
            H = Q.x, rt = Q.y;
          }
          return /* @__PURE__ */ u(
            "line",
            {
              x1: H,
              y1: rt,
              x2: d.cursorX,
              y2: d.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        p && (() => {
          const H = dt.get(p.anchorNodeId);
          if (!H) return null;
          let rt, Q;
          if (p.anchorHandle) {
            const q = H.h === "auto" ? (r == null ? void 0 : r[H.id]) ?? 100 : H.h, R = {
              top: [H.x + H.w / 2, H.y],
              bottom: [H.x + H.w / 2, H.y + q],
              left: [H.x, H.y + q / 2],
              right: [H.x + H.w, H.y + q / 2]
            }, B = p.anchorHandle, $ = B === "top" ? 42 / e.zoom : 26 / e.zoom, [Y, V] = R[B];
            let O = Y, K = V;
            switch (B) {
              case "top":
                K = V - $;
                break;
              case "bottom":
                K = V + $;
                break;
              case "left":
                O = Y - $;
                break;
              case "right":
                O = Y + $;
                break;
            }
            if (H.rotation) {
              const nt = H.x + H.w / 2, ot = H.y + q / 2, yt = H.rotation * Math.PI / 180, ft = Math.cos(yt), et = Math.sin(yt), Tt = O - nt, Ct = K - ot;
              rt = nt + Tt * ft - Ct * et, Q = ot + Tt * et + Ct * ft;
            } else
              rt = O, Q = K;
          } else {
            const q = Kr(H, p.cursorX, p.cursorY, r);
            rt = q.x, Q = q.y;
          }
          return /* @__PURE__ */ u(
            "line",
            {
              x1: rt,
              y1: Q,
              x2: p.cursorX,
              y2: p.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && _.filter((H) => o.has(H.id)).map((H) => /* @__PURE__ */ u(
          sh,
          {
            node: H,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: l,
            onRotateStart: a
          },
          `sel-${H.id}`
        )),
        n && n.points.length > 1 && (() => {
          if (n.strokeStyle === "dashed" || n.strokeStyle === "dotted") {
            const rt = n.points, Q = ["M", rt[0][0], rt[0][1]];
            for (let B = 1; B < rt.length; B++) {
              const [$, Y] = rt[B], [V, O] = rt[B - 1];
              Q.push("Q", V, O, (V + $) / 2, (O + Y) / 2);
            }
            const q = rt[rt.length - 1];
            Q.push("L", q[0], q[1]);
            const R = Qe(n.strokeStyle);
            return /* @__PURE__ */ u(
              "path",
              {
                d: Q.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: R == null ? void 0 : R.map((B) => B * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            );
          }
          return /* @__PURE__ */ u(
            "path",
            {
              d: Bn(n.points, {
                size: n.width
              }),
              fill: n.color
            }
          );
        })(),
        s && i && (() => {
          const H = Math.min(s.startX, s.endX), rt = Math.min(s.startY, s.endY), Q = Math.abs(s.endX - s.startX), q = Math.abs(s.endY - s.startY);
          if (Q < 2 && q < 2) return null;
          const R = i, B = R.shapeType || "rect";
          if (B === "ellipse")
            return /* @__PURE__ */ u(
              "ellipse",
              {
                cx: H + Q / 2,
                cy: rt + q / 2,
                rx: Q / 2,
                ry: q / 2,
                stroke: R.stroke,
                strokeWidth: R.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (B === "diamond")
            return /* @__PURE__ */ u(
              "polygon",
              {
                points: `${H + Q / 2},${rt} ${H + Q},${rt + q / 2} ${H + Q / 2},${rt + q} ${H},${rt + q / 2}`,
                stroke: R.stroke,
                strokeWidth: R.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (B === "line" || B === "arrow") {
            const $ = s.startX, Y = s.startY, V = s.endX, O = s.endY;
            return /* @__PURE__ */ v(ut, { children: [
              /* @__PURE__ */ u(
                "line",
                {
                  x1: $,
                  y1: Y,
                  x2: V,
                  y2: O,
                  stroke: R.stroke,
                  strokeWidth: R.strokeWidth,
                  strokeDasharray: "4"
                }
              ),
              B === "arrow" && (() => {
                const K = Math.atan2(O - Y, V - $), nt = Math.max(12, R.strokeWidth * 4), ot = Math.PI / 6, yt = V - nt * Math.cos(K - ot), ft = O - nt * Math.sin(K - ot), et = V - nt * Math.cos(K + ot), Tt = O - nt * Math.sin(K + ot);
                return /* @__PURE__ */ u(
                  "polyline",
                  {
                    points: `${yt},${ft} ${V},${O} ${et},${Tt}`,
                    stroke: R.stroke,
                    strokeWidth: R.strokeWidth,
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
              y: rt,
              width: Q,
              height: q,
              stroke: R.stroke,
              strokeWidth: R.strokeWidth,
              fill: "none",
              strokeDasharray: "4"
            }
          );
        })(),
        y && y.length > 1 && (() => {
          const H = performance.now(), rt = 400, Q = 6 / e.zoom, q = [`M${y[0][0]},${y[0][1]}`];
          if (y.length === 2)
            q.push(`L${y[1][0]},${y[1][1]}`);
          else {
            for (let nt = 0; nt < y.length - 1; nt++) {
              const ot = (y[nt][0] + y[nt + 1][0]) / 2, yt = (y[nt][1] + y[nt + 1][1]) / 2;
              q.push(`Q${y[nt][0]},${y[nt][1]},${ot},${yt}`);
            }
            const K = y[y.length - 1];
            q.push(`L${K[0]},${K[1]}`);
          }
          const R = q.join(" "), B = (H - y[y.length - 1][2]) / rt, $ = (H - y[0][2]) / rt, Y = Math.max(0, 0.85 * (1 - B)), V = Math.max(0, 0.85 * (1 - $)), O = (Y + V) / 2;
          return O <= 0 ? null : /* @__PURE__ */ v(ut, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: R,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: Q * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: O * 0.35
              }
            ),
            /* @__PURE__ */ u(
              "path",
              {
                d: R,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: Q,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: O
              }
            )
          ] });
        })(),
        b && b.length > 1 && (() => {
          const H = performance.now(), rt = 1560, Q = 6 / e.zoom, q = [];
          let R = !1, B = !1;
          for (let yt = 0; yt < b.length; yt++) {
            const ft = b[yt];
            if (isNaN(ft[0])) {
              R = !1, B = !1;
              continue;
            }
            if (!R)
              q.push(`M${ft[0]},${ft[1]}`), R = !0, B = !0;
            else if (B) {
              const et = yt + 1 < b.length && !isNaN(b[yt + 1][0]) ? b[yt + 1] : null;
              if (et) {
                const Tt = (ft[0] + et[0]) / 2, Ct = (ft[1] + et[1]) / 2;
                q.push(`Q${ft[0]},${ft[1]},${Tt},${Ct}`);
              } else
                q.push(`L${ft[0]},${ft[1]}`);
            }
          }
          if (q.length === 0) return null;
          const $ = q.join(" "), Y = b.filter((yt) => !isNaN(yt[0]));
          if (Y.length === 0) return null;
          const V = (H - Y[Y.length - 1][2]) / rt, O = (H - Y[0][2]) / rt, K = Math.max(0, 0.85 * (1 - V)), nt = Math.max(0, 0.85 * (1 - O)), ot = (K + nt) / 2;
          return ot <= 0 ? null : /* @__PURE__ */ v(ut, { children: [
            /* @__PURE__ */ u(
              "path",
              {
                d: $,
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
                d: $,
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
        X && X.length > 0 && X.map((H, rt) => /* @__PURE__ */ u(
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
          `guide-${rt}`
        ))
      ] })
    }
  );
}
function lh({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = ct(null);
  mt(() => {
    var m;
    const f = (y) => {
      n.current && !n.current.contains(y.target) && r();
    }, d = (y) => {
      y.key === "Escape" && r();
    }, p = ((m = n.current) == null ? void 0 : m.ownerDocument) ?? document;
    return p.addEventListener("pointerdown", f, !0), p.addEventListener("keydown", d), () => {
      p.removeEventListener("pointerdown", f, !0), p.removeEventListener("keydown", d);
    };
  }, [r]), mt(() => {
    const f = n.current;
    if (!f) return;
    const d = f.getBoundingClientRect(), p = f.ownerDocument.defaultView ?? window;
    let m = t, y = e;
    d.right > p.innerWidth && (m = t - d.width), d.bottom > p.innerHeight && (y = e - d.height), m = Math.max(0, m), y = Math.max(0, y), f.style.left = `${m}px`, f.style.top = `${y}px`;
  }, [t, e]);
  const s = it(
    (f) => {
      f.disabled || (f.action(), r());
    },
    [r]
  ), i = navigator.platform.includes("Mac"), l = i ? "⌘" : "Ctrl+", a = i ? "⌥" : "Alt+", c = i ? "⇧" : "Shift+", h = (f) => f.replace("Mod+", l).replace("Alt+", a).replace("Shift+", c);
  return /* @__PURE__ */ u(
    "div",
    {
      "data-sb-context-menu": !0,
      ref: n,
      onPointerDown: (f) => f.stopPropagation(),
      onContextMenu: (f) => f.preventDefault(),
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
      children: o.map((f, d) => /* @__PURE__ */ v("div", { children: [
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
        f.items.map((p, m) => /* @__PURE__ */ v(
          "div",
          {
            onClick: () => s(p),
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "6px 16px",
              cursor: p.disabled ? "default" : "pointer",
              opacity: p.disabled ? 0.4 : 1,
              color: p.danger ? "#f87171" : "#e0e0e0",
              transition: "background 0.1s"
            },
            onMouseEnter: (y) => {
              p.disabled || (y.currentTarget.style.background = "rgba(255,255,255,0.08)");
            },
            onMouseLeave: (y) => {
              y.currentTarget.style.background = "transparent";
            },
            children: [
              /* @__PURE__ */ v("span", { children: [
                p.checked !== void 0 && /* @__PURE__ */ u("span", { style: { display: "inline-block", width: 16, marginRight: 4 }, children: p.checked ? "✓" : "" }),
                p.label
              ] }),
              p.shortcut && /* @__PURE__ */ u(
                "span",
                {
                  style: {
                    marginLeft: 32,
                    fontSize: 12,
                    color: "#888"
                  },
                  children: h(p.shortcut)
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
const la = "sbd-clipboard", ch = "sbd-nodes:";
function ca(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function js(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function da(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return js(e[1]);
  const o = t.match(
    new RegExp(`<!--${ch}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? js(o[1]) : null;
}
function br(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function ha(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + ha(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function dh(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(ha(n.blocks)) : n.markdown && e.push(n.markdown);
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
function Vs(t, e) {
  const o = dh(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = ca(e);
  return t.setData(
    "text/html",
    `<!--${la}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function hh(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const l = (y) => {
    n = y.clientX, s = y.clientY;
  }, a = (y) => {
    br(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = Vs(
      y.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (y) => {
    br(y.target) || t.selection.size !== 0 && (y.preventDefault(), t.copySelected(), i = Vs(
      y.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, h = async (y) => {
    var N, _, J;
    if (br(y.target)) return;
    const { x: b, y: g } = t.screenToCanvas(n, s), x = ((N = y.clipboardData) == null ? void 0 : N.getData("text/html")) || "", z = ((_ = y.clipboardData) == null ? void 0 : _.getData("text/plain")) || "";
    if (x.includes(la) || x.includes("data-sbd-nodes=") || i !== null && z === i) {
      if (i !== null && z === i && t.hasClipboard()) {
        y.preventDefault(), t.pasteClipboard(b, g);
        return;
      }
      const H = da(x);
      if (H) {
        y.preventDefault(), t.setClipboard(H), t.pasteClipboard(b, g);
        return;
      }
    }
    const M = (J = y.clipboardData) == null ? void 0 : J.items;
    if (M) {
      for (const dt of Array.from(M))
        if (dt.type.startsWith("image/")) {
          y.preventDefault();
          const H = dt.getAsFile();
          if (!H) continue;
          const rt = new FileReader();
          rt.onload = () => {
            const Q = rt.result, q = new Image();
            q.onload = () => {
              const R = t.screenToCanvas(n, s), B = 400, $ = 300, Y = q.naturalWidth / q.naturalHeight, V = Math.min(q.naturalWidth, B), O = Math.min(q.naturalHeight, $), K = Y >= 1 ? V : O * Y, nt = Y >= 1 ? V / Y : O;
              let ot = Q;
              if (x) {
                const ft = x.match(/<img[^>]+src=["']([^"']+)["']/i);
                ft && /\.(gif|webp|apng)(\?|#|$)/i.test(ft[1]) && (ot = ft[1].replace(/&amp;/g, "&"));
              }
              const yt = {
                id: At(10),
                type: "image",
                x: R.x,
                y: R.y,
                w: K,
                h: nt,
                z: t.nextZ(),
                data: { src: ot }
              };
              t.addNode(yt), t.select(yt.id);
            }, q.src = Q;
          }, rt.readAsDataURL(H);
          return;
        }
    }
    const j = In(z) ?? In(x);
    if (j) {
      y.preventDefault();
      const dt = t.screenToCanvas(n, s), H = await aa(
        j,
        dt.x,
        dt.y,
        t.nextZ()
      );
      H && (t.addNode(H), t.select(H.id));
      return;
    }
    if (yd(z)) {
      const dt = pd(z);
      if (dt) {
        y.preventDefault();
        const H = {
          id: At(10),
          type: "youtube",
          x: b,
          y: g,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: dt, url: z.trim() }
        };
        t.addNode(H), t.select(H.id);
        return;
      }
    }
    const X = x.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (X)
      try {
        const dt = xi(X);
        if (dt.length > 0) {
          y.preventDefault();
          const H = {
            id: At(10),
            type: "content",
            x: b,
            y: g,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: dt, markdown: z, borderColor: "#1e1e2e" }
          };
          t.addNode(H), t.select(H.id);
          return;
        }
      } catch {
      }
    if (z.trim()) {
      y.preventDefault();
      const dt = await En(z), H = {
        id: At(10),
        type: "content",
        x: b,
        y: g,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: dt, markdown: z, borderColor: "#1e1e2e" }
      };
      t.addNode(H), t.select(H.id);
      return;
    }
    t.hasClipboard() && (y.preventDefault(), t.pasteClipboard(b, g));
  }, f = (y) => {
    const b = y.target;
    if (br(b)) return;
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
    const g = y.ctrlKey || y.metaKey;
    if (g && y.key === "c") {
      t.copySelected();
      return;
    }
    if (g && y.key === "x") {
      t.copySelected();
      return;
    }
    if (g && y.key === "d") {
      y.preventDefault(), t.duplicateSelected();
      return;
    }
    if (g && y.key === "g") {
      y.preventDefault(), y.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (y.shiftKey && !g && y.key === "H") {
      y.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (y.shiftKey && !g && y.key === "V") {
      y.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (g && y.key === "]") {
      y.preventDefault();
      const x = Array.from(t.selection);
      y.altKey ? t.bringToFront(x) : t.bringForward(x);
      return;
    }
    if (g && y.key === "[") {
      y.preventDefault();
      const x = Array.from(t.selection);
      y.altKey ? t.sendToBack(x) : t.sendBackward(x);
      return;
    }
    if (!g && !y.altKey && !y.shiftKey) {
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
    if (g && y.key === "z") {
      y.preventDefault(), y.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (g && y.key === "a") {
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
    if (g && (y.key === "=" || y.key === "+")) {
      y.preventDefault(), t.zoomIn();
      return;
    }
    if (g && y.key === "-") {
      y.preventDefault(), t.zoomOut();
      return;
    }
    if (g && y.key === "0") {
      y.preventDefault(), t.fitToContent();
      return;
    }
  };
  function d(y, b) {
    y.addEventListener("pointermove", l), y.addEventListener("copy", a), y.addEventListener("cut", c), y.addEventListener("paste", h), b.addEventListener("keydown", f);
  }
  function p(y, b) {
    y.removeEventListener("pointermove", l), y.removeEventListener("copy", a), y.removeEventListener("cut", c), y.removeEventListener("paste", h), b.removeEventListener("keydown", f);
  }
  d(o, r);
  const m = setInterval(() => {
    if (!e) return;
    const y = e.ownerDocument;
    y !== o && (p(o, r), o = y, r = y.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, d(o, r));
  }, 500);
  return () => {
    clearInterval(m), p(o, r);
  };
}
async function Zs(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = uh(o, r, t), s = e.padding ?? 40, i = e.background !== !1, l = e.format === "png", a = n.w + s * 2, c = n.h + s * 2, h = n.x - s, f = n.y - s, d = await ua(o, t, r, h, f, l), p = i ? or(t.boardBackground).canvasBg : "transparent", m = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${c}" viewBox="0 0 ${a} ${c}">`,
    `<rect width="${a}" height="${c}" fill="${p}"/>`,
    ...d,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    Us(new Blob([m], { type: "image/svg+xml" }), "board.svg");
  else {
    const y = e.scale ?? 4, b = await Ch(m, a, c, y);
    Us(b, "board.png");
  }
}
function uh(t, e, o) {
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const a of t) {
    if (a.type === "edge") continue;
    const c = o.resolveHeight(a);
    r = Math.min(r, a.x), n = Math.min(n, a.y), s = Math.max(s, a.x + a.w), i = Math.max(i, a.y + c);
  }
  const l = new Map(t.map((a) => [a.id, a]));
  for (const a of t) {
    if (a.type !== "edge") continue;
    const c = a, h = l.get(c.data.fromId), f = l.get(c.data.toId);
    if (!h || !f) continue;
    const d = Ge(
      h,
      f,
      c.data.edgeType,
      e,
      c.data.sourceHandle,
      c.data.targetHandle,
      c.data.midpointOffset,
      c.data.curveOffset
    );
    r = Math.min(r, d.bounds.x), n = Math.min(n, d.bounds.y), s = Math.max(s, d.bounds.x + d.bounds.w), i = Math.max(i, d.bounds.y + d.bounds.h);
  }
  return isFinite(r) ? { x: r, y: n, w: s - r, h: i - n } : { x: 0, y: 0, w: 100, h: 100 };
}
async function ua(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), l = [...t].sort((c, h) => c.z - h.z), a = [];
  for (const c of l) {
    const h = c.x - r, f = c.y - n, d = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        a.push(fh(c, h, f, d));
        break;
      case "content":
        a.push(ph(c, h, f, c.w, d));
        break;
      case "draw":
        a.push(yh(c, r, n));
        break;
      case "shape":
        a.push(bh(c, h, f, c.w, d));
        break;
      case "text":
        a.push(gh(c, h, f, c.w, d));
        break;
      case "sticky":
        a.push(xh(c, h, f, c.w, d));
        break;
      case "image":
        a.push(await wh(c, h, f, c.w, d, s));
        break;
      case "youtube":
        a.push(await kh(c, h, f, c.w, d, s));
        break;
      case "edge": {
        const p = c, m = i.get(p.data.fromId), y = i.get(p.data.toId);
        m && y && a.push(Sh(p, m, y, o, r, n));
        break;
      }
    }
  }
  return a;
}
function Je(t, e, o, r, n, s, i) {
  const l = [];
  if (s) {
    const a = e + r / 2, c = o + n / 2;
    l.push(`transform="rotate(${s}, ${a}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && l.push(`opacity="${i}"`), `<g ${l.join(" ")}>${t}</g>`;
}
function fh(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", l = n.borderWidth ?? 1, a = Fr(n.borderStyle, l), c = n.label ? Wo(n.label) : "";
  let h = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${l}"` + (a ? ` stroke-dasharray="${a}"` : "") + "/>";
  return c && (h += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), Je(h, e, o, t.w, r, t.rotation, n.opacity);
}
function ph(t, e, o, r, n) {
  var f;
  const s = t.data, i = ((f = s.markdown) == null ? void 0 : f.trim()) || "", l = s.borderColor, a = s.borderWidth ?? 0, c = Fr(s.borderStyle, a);
  let h = "";
  return l && a > 0 ? h += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${l}" stroke-width="${a}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : h += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (h += Jn(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), Je(h, e, o, r, n, t.rotation, s.opacity);
}
function yh(t, e, o) {
  const r = t.data, n = r.points.map(
    ([l, a, c]) => [l + t.x - e, a + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return mh(n, r, t);
  const s = Qe(r.strokeStyle);
  let i = "";
  if (r.fill) {
    const l = n.map(([a, c]) => [a, c]);
    if (l.length > 2) {
      const a = l.map((c, h) => `${h === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${a}" fill="${r.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const l = n.map((c, h) => `${h === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), a = s.map((c) => c * Math.max(r.strokeWidth, 1)).join(" ");
    i += `<path d="${l}" fill="none" stroke="${r.color}" stroke-width="${r.strokeWidth}" stroke-dasharray="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const l = Bn(n, { size: r.strokeWidth });
    l && (i += `<path d="${l}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function mh(t, e, o) {
  const r = t.map((a, c) => `${c === 0 ? "M" : "L"}${a[0].toFixed(2)},${a[1].toFixed(2)}`).join(" ") + " Z", n = Qe(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((a) => a * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, l = o.h === "auto" ? 0 : o.h;
  return Je(i, o.x, o.y, o.w, l, o.rotation, e.opacity);
}
function bh(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: Qe(s.strokeStyle),
    seed: t.id
  };
  let l;
  const a = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      l = Tr(e, o, r, n, i, a);
      break;
    case "ellipse":
      l = Xn(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      l = Yn(e, o, r, n, i, a);
      break;
    case "line": {
      const h = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = Lo(e + h[0], o + h[1], e + f[0], o + f[1], i);
      break;
    }
    case "arrow": {
      const h = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = Gn(e + h[0], o + h[1], e + f[0], o + f[1], i);
      break;
    }
    default:
      l = Tr(e, o, r, n, i);
  }
  const c = l.map(
    (h) => `<path d="${h.d}" fill="${h.fill || "none"}" stroke="${h.stroke}" stroke-width="${h.strokeWidth}"` + (h.strokeDasharray ? ` stroke-dasharray="${h.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return Je(c, e, o, r, n, t.rotation, s.opacity);
}
function gh(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, l = Ze(s.fontFamily), a = !!s.borderColor, c = a ? 6 : 0;
  let h = "";
  if (a) {
    const d = s.borderWidth ?? 1, p = Fr(s.borderStyle, d);
    h += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${d}"` + (p ? ` stroke-dasharray="${p}"` : "") + "/>";
  }
  const f = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return h += Jn(
    s.text,
    f,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    l
  ), Je(h, e, o, r, i, t.rotation, s.opacity);
}
function xh(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + Jn(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return Je(l, e, o, r, n, t.rotation, s.opacity);
}
async function wh(t, e, o, r, n, s) {
  const i = t.data;
  let l = i.src;
  if (s && l && !l.startsWith("data:"))
    try {
      l = await Rr(l);
    } catch {
    }
  const a = i.borderColor, c = i.borderWidth ?? 0, h = Fr(i.borderStyle, c);
  let f = `<image href="${Wo(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return a && c > 0 && (f += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${a}" stroke-width="${c}"` + (h ? ` stroke-dasharray="${h}"` : "") + "/>"), Je(f, e, o, r, n, t.rotation, i.opacity);
}
async function kh(t, e, o, r, n, s) {
  const i = t.data;
  let l = bd(i.videoId);
  if (s)
    try {
      l = await Rr(l);
    } catch {
    }
  let a = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${Wo(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, h = o + n / 2, f = Math.min(r, n) * 0.12;
  return a += `<circle cx="${c}" cy="${h}" r="${f}" fill="rgba(0,0,0,0.6)"/><path d="${vh(c, h, f * 0.5)}" fill="white"/>`, Je(a, e, o, r, n, t.rotation, i.opacity);
}
function vh(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, l = e, a = n, c = e + o;
  return `M${n},${s} L${i},${l} L${a},${c} Z`;
}
function Sh(t, e, o, r, n, s) {
  const i = t.data, l = Ge(
    e,
    o,
    i.edgeType,
    r,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset
  ), a = `translate(${-n}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, h = i.strokeWidth;
  let f = `<path d="${l.path}" fill="none" stroke="${i.color}" stroke-width="${h}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const d = i.arrowHeadSize ?? Math.max(8, h * 3), p = i.arrowTailSize ?? Math.max(8, h * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      f += `<path d="${Po(l.x2, l.y2, l.arrowAngle, d)}" fill="none" stroke="${i.color}" stroke-width="${h}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      f += `<path d="${Sr(l.x2, l.y2, l.arrowAngle, d)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const m = d / 3;
      f += `<circle cx="${l.x2}" cy="${l.y2}" r="${m}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      f += `<path d="${Po(l.x1, l.y1, l.tailAngle, p)}" fill="none" stroke="${i.color}" stroke-width="${h}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      f += `<path d="${Sr(l.x1, l.y1, l.tailAngle, p)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const m = p / 3;
      f += `<circle cx="${l.x1}" cy="${l.y1}" r="${m}" fill="${i.color}"/>`;
    }
  }
  return i.label && (f += `<text x="${l.labelX}" y="${l.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${Wo(i.label)}</text>`), `<g transform="${a}">${f}</g>`;
}
function Jn(t, e, o, r, n, s, i, l, a) {
  if (!t) return "";
  const c = l === "center" ? "middle" : l === "right" ? "end" : "start", h = Mh(t, r, n), f = n * s, d = h.map(
    (p, m) => `<tspan x="${e}" dy="${m === 0 ? 0 : f}">${Wo(p)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${Wo(a)}" text-anchor="${c}">${d}</text>`;
}
function Mh(t, e, o) {
  const r = o * 0.55, n = Math.max(1, Math.floor(e / r)), s = [];
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
      h.length > n && a ? (s.push(a), a = c) : a = h;
    }
    a && s.push(a);
  }
  return s;
}
function Fr(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function Wo(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Rr(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function Ch(t, e, o, r) {
  return new Promise((n, s) => {
    const i = new Image(), l = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * r, c.height = o * r;
      const h = c.getContext("2d");
      h.scale(r, r), h.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(a), c.toBlob((f) => {
        f ? n(f) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(a), s(new Error("Failed to load SVG as image"));
    }, i.src = a;
  });
}
const Ih = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), ko = /* @__PURE__ */ new Map(), zh = 12;
function Th(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !Ih.has(r) && e.add(r);
    }
  return [...e];
}
async function Ph(t) {
  if (t.length === 0) return "";
  const e = [];
  for (const o of t) {
    if (ko.has(o)) {
      e.push(ko.get(o));
      continue;
    }
    try {
      let r;
      if (o === "Excalifont")
        r = await Rr(wi);
      else {
        const l = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!l) continue;
        r = await Rr(l[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (ko.size >= zh) {
        const s = ko.keys().next().value;
        s !== void 0 && ko.delete(s);
      }
      ko.set(o, n), e.push(n);
    } catch {
    }
  }
  return e.join(`
`);
}
async function Rh(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const r = t.resolveHeight(o), n = 0, s = o.w + n * 2, i = r + n * 2, l = o.x - n, a = o.y - n, c = [o], h = /* @__PURE__ */ new Set([e]), f = (x) => {
    h.has(x.id) || x.type === "edge" || (h.add(x.id), c.push(x));
  };
  for (const x of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: r }))
    f(x);
  for (const x of t.getFrameChildren(e))
    f(x);
  for (const x of t.getAllNodes())
    if (x.type === "edge") {
      const z = x;
      h.has(z.data.fromId) && h.has(z.data.toId) && c.push(x);
    }
  const d = t.measuredHeights, p = await ua(c, t, d, l, a, !0), m = Th(c), y = await Ph(m), b = or(t.boardBackground).canvasBg, g = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    y ? `<defs><style>${y}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${b}"/>`,
    ...p,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(g)}`;
}
function Us(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const qs = [
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
], Ks = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function Qs(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const fa = [
  ...qs,
  ...Qs(qs, "phone-landscape"),
  ...Ks,
  ...Qs(Ks, "tablet-landscape"),
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
], Ah = new Map(fa.map((t) => [t.key, t]));
function zn(t) {
  return Ah.get(t);
}
function pa(t) {
  return t.w / t.h;
}
const Lh = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function Dh() {
  const t = /* @__PURE__ */ new Map();
  for (const e of fa) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: Lh[e] ?? e,
    presets: o
  }));
}
function Eh(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function ln(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, l] = o[n], [a, c] = o[s];
    l > e != c > e && t < (a - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
async function Wh(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const l = await (await i.getType("text/html")).text();
        if (l.includes("sbd-clipboard") || l.includes("data-sbd-nodes=")) {
          const a = da(l);
          if (a) {
            t.setClipboard(a), t.pasteClipboard(e, o);
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
      const l = i.types.find((a) => a.startsWith("image/"));
      if (l) {
        const a = await i.getType(l), c = await new Promise((x) => {
          const z = new FileReader();
          z.onload = () => x(z.result), z.readAsDataURL(a);
        }), h = new Image();
        await new Promise((x) => {
          h.onload = () => x(), h.src = c;
        });
        const f = h.naturalWidth / h.naturalHeight, d = Math.min(h.naturalWidth, 400), p = Math.min(h.naturalHeight, 300), m = f >= 1 ? d : p * f, y = f >= 1 ? d / f : p;
        let b = c;
        if (n) {
          const x = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          x && /\.(gif|webp|apng)(\?|#|$)/i.test(x[1]) && (b = x[1].replace(/&amp;/g, "&"));
        }
        const g = {
          id: At(10),
          type: "image",
          x: e,
          y: o,
          w: m,
          h: y,
          z: t.nextZ(),
          data: { src: b }
        };
        t.addNode(g), t.select(g.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (n) {
      const i = n.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const l = xi(i);
        if (l.length > 0) {
          const a = {
            id: At(10),
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
      const i = await En(s), l = {
        id: At(10),
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
async function Js(t) {
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
  const r = o.join(`

`), n = r.split(`
`).filter(Boolean).map((l) => `<p>${l}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${ca(e)}">${n || "<p></p>"}</div>`;
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
function gr(t) {
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
function $s(t, e) {
  const o = e.x - t.x, r = e.y - t.y;
  return { dist: Math.sqrt(o * o + r * r), mx: (t.x + e.x) / 2, my: (t.y + e.y) / 2 };
}
const vo = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Fh({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: r,
  observeElement: n,
  unobserveElement: s,
  isContainer: i,
  children: l
}) {
  const a = ct(null);
  mt(() => {
    if (t.h !== "auto") return;
    const f = a.current;
    if (!f) return;
    const d = f.offsetHeight;
    return d > 0 && r(t.id, d), n(f, () => {
      const p = f.offsetHeight;
      p > 0 && r(t.id, p);
    }), () => s(f);
  }, [t.id, t.h, r, n, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, h = qt(() => ({
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
function Nh({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = ct(null), n = ct(t.data.label ?? ""), s = ct(t);
  s.current = t;
  const i = ct(t.data.label ?? "");
  mt(() => () => {
    const h = s.current, f = n.current.trim();
    if (f !== i.current) {
      const p = { data: { ...h.data, label: f || void 0 } }, m = r.current;
      if (m && f) {
        const b = h.h === "auto" ? 100 : h.h, g = m.scrollHeight + 24;
        g > b && (p.h = g);
      }
      e.updateNodeWithHistory(h.id, p);
    }
  }, []);
  const l = t.h === "auto" ? 100 : t.h, a = t.data.labelFontSize ?? 14, c = t.data.fill && t.data.fillStyle === "solid" ? Eh(t.data.fill) : t.data.stroke;
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
          ref: r,
          autoFocus: !0,
          defaultValue: t.data.label ?? "",
          placeholder: "",
          rows: 1,
          onBlur: () => o(),
          onKeyDown: (h) => {
            h.key === "Escape" && h.currentTarget.blur(), h.stopPropagation();
          },
          onInput: (h) => {
            const f = h.currentTarget;
            n.current = f.value;
            const d = s.current;
            e.updateNode(d.id, {
              data: { ...d.data, label: f.value || void 0 }
            }), f.style.height = "auto", f.style.height = f.scrollHeight + "px";
            const m = f.scrollHeight + 24;
            m > l && e.updateNode(t.id, { h: m });
          },
          onPointerDown: (h) => h.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: a,
            fontFamily: Ze(t.data.labelFontFamily ?? Ve),
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
function Bh({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r
}) {
  const n = ct(null), s = () => {
    var w;
    return ((w = n.current) == null ? void 0 : w.ownerDocument) ?? document;
  }, [i, l] = tt({ w: 0, h: 0 }), [a, c] = tt({ ...t.viewport }), [h, f] = tt(t.getAllNodes()), [d, p] = tt(
    new Set(t.selection)
  ), [m, y] = tt(t.mode), [b, g] = tt(t.activeGroupId), [x, z] = tt(t.snapToGrid), [I, M] = tt(t.gridSize), [j, X] = tt(t.smartGuides), [N, _] = tt([]), [J, dt] = tt(t.boardBackground), H = ct(!1), rt = ct(!1), Q = ct(/* @__PURE__ */ new Map()), q = ct(!1), R = ct(!1), B = ct(null), $ = ct(null);
  mt(() => {
    const w = (C) => {
      var F, S;
      if (C.key === " " && !C.repeat && !H.current) {
        const D = (F = C.target) == null ? void 0 : F.tagName;
        if (D === "INPUT" || D === "TEXTAREA" || (S = C.target) != null && S.isContentEditable) return;
        H.current = !0;
        const T = n.current;
        T && (T.style.cursor = "grab"), C.preventDefault();
      }
    }, A = (C) => {
      if (C.key === " ") {
        H.current = !1, rt.current = !1;
        const F = n.current;
        F && (F.style.cursor = t.lassoSelect ? vo : gr(t.mode));
      }
    };
    return window.addEventListener("keydown", w), window.addEventListener("keyup", A), () => {
      window.removeEventListener("keydown", w), window.removeEventListener("keyup", A);
    };
  }, []), mt(() => {
    const w = (C) => {
      Q.current.delete(C.pointerId), C.pointerType === "pen" && (R.current = !1), B.current && (clearTimeout(B.current), B.current = null, $.current = null);
    }, A = s();
    return A.addEventListener("pointerup", w), A.addEventListener("pointercancel", w), () => {
      A.removeEventListener("pointerup", w), A.removeEventListener("pointercancel", w);
    };
  }, []);
  const [Y, V] = tt(null), [O, K] = tt(null), [nt, ot] = tt(null), [yt, ft] = tt(null);
  mt(() => {
    const w = n.current;
    if (!w) return;
    t.setContainer(w);
    const A = () => {
      const F = w.getBoundingClientRect();
      t.containerOffset = { x: F.left, y: F.top };
    };
    A();
    const C = new ResizeObserver((F) => {
      var T;
      const { width: S, height: D } = ((T = F[0]) == null ? void 0 : T.contentRect) ?? { width: 0, height: 0 };
      l((E) => E.w === S && E.h === D ? E : { w: S, h: D }), t.setContainerSize(S, D), A();
    });
    return C.observe(w), () => C.disconnect();
  }, [t]);
  const [et, Tt] = tt({}), Ct = it((w, A) => {
    Tt(
      (C) => C[w] === A ? C : { ...C, [w]: A }
    ), t.updateMeasuredHeight(w, A);
  }, [t]), bt = ct(null), ht = ct(/* @__PURE__ */ new Map());
  function Dt() {
    return bt.current || (bt.current = new ResizeObserver((w) => {
      var A;
      for (const C of w)
        (A = ht.current.get(C.target)) == null || A(C);
    })), bt.current;
  }
  const It = it((w, A) => {
    ht.current.set(w, A), Dt().observe(w);
  }, []), Pt = it((w) => {
    var A;
    ht.current.delete(w), (A = bt.current) == null || A.unobserve(w);
  }, []);
  mt(() => () => {
    var w;
    (w = bt.current) == null || w.disconnect(), bt.current = null, ht.current.clear();
  }, []);
  const Kt = qt(() => new Set(h.map((w) => w.id)), [h]);
  mt(() => {
    Tt((w) => {
      let A = !1;
      const C = {};
      for (const [F, S] of Object.entries(w))
        Kt.has(F) ? C[F] = S : A = !0;
      return A ? C : w;
    });
  }, [Kt]);
  const Qt = it(
    (w, A, C) => {
      let F, S;
      if (o && w.data.sourcePort) {
        const D = o.get(A.type);
        D != null && D.ports && (F = _o(A, D.ports, w.data.sourcePort, a.zoom, et) ?? void 0);
      }
      if (o && w.data.targetPort) {
        const D = o.get(C.type);
        D != null && D.ports && (S = _o(C, D.ports, w.data.targetPort, a.zoom, et) ?? void 0);
      }
      return { sourcePortPos: F, targetPortPos: S };
    },
    [o, a.zoom, et]
  );
  it(
    (w) => t.zoomToNode(w),
    [t]
  );
  const Zt = it(
    (w, A) => {
      if (!w.rotation)
        return { minX: w.x, minY: w.y, maxX: w.x + w.w, maxY: w.y + A };
      const C = w.x + w.w / 2, F = w.y + A / 2, S = w.rotation * Math.PI / 180, D = Math.cos(S), T = Math.sin(S), E = [
        [w.w / 2, A / 2],
        [-w.w / 2, A / 2],
        [-w.w / 2, -A / 2],
        [w.w / 2, -A / 2]
      ];
      let L = 1 / 0, W = 1 / 0, P = -1 / 0, G = -1 / 0;
      for (const [Z, U] of E) {
        const lt = C + Z * D - U * T, at = F + Z * T + U * D;
        L = Math.min(L, lt), W = Math.min(W, at), P = Math.max(P, lt), G = Math.max(G, at);
      }
      return { minX: L, minY: W, maxX: P, maxY: G };
    },
    []
  ), Jt = 8, he = it(
    (w, A) => A.filter((C) => {
      if (C.type === "edge") {
        const D = C.data, T = t.getNode(D.fromId), E = t.getNode(D.toId);
        if (!T || !E) return !1;
        const { x1: L, y1: W, x2: P, y2: G } = qr(T, E, et);
        return L >= w.x && L <= w.x + w.w && W >= w.y && W <= w.y + w.h && P >= w.x && P <= w.x + w.w && G >= w.y && G <= w.y + w.h;
      }
      const F = C.h === "auto" ? et[C.id] ?? 100 : C.h, S = Zt(C, F);
      return S.minX >= w.x && S.maxX <= w.x + w.w && S.minY >= w.y && S.maxY <= w.y + w.h;
    }),
    [Zt, et]
  ), Pe = it(
    (w, A) => w.length < 3 ? [] : A.filter((C) => {
      if (C.type === "edge") {
        const T = C, E = t.getNode(T.data.fromId), L = t.getNode(T.data.toId);
        if (!E || !L) return !1;
        const { x1: W, y1: P, x2: G, y2: Z } = qr(E, L, et);
        return ln(W, P, w) && ln(G, Z, w);
      }
      const F = C.h === "auto" ? et[C.id] ?? 100 : C.h, S = C.x + C.w / 2, D = C.y + F / 2;
      return ln(S, D, w);
    }),
    [t, et]
  ), _t = qt(() => {
    if (d.size < 2) return null;
    let w = 1 / 0, A = 1 / 0, C = -1 / 0, F = -1 / 0;
    for (const S of d) {
      const D = h.find((L) => L.id === S);
      if (!D || D.type === "edge") continue;
      const T = D.h === "auto" ? et[D.id] ?? 100 : D.h, E = Zt(D, T);
      w = Math.min(w, E.minX), A = Math.min(A, E.minY), C = Math.max(C, E.maxX), F = Math.max(F, E.maxY);
    }
    return w === 1 / 0 ? null : {
      x: w - Jt,
      y: A - Jt,
      w: C - w + Jt * 2,
      h: F - A + Jt * 2
    };
  }, [d, h, et, Zt]), Re = qt(() => {
    if (!b) return null;
    const w = t.getAllGroupDescendantNodes(b);
    if (w.length === 0) return null;
    let A = 1 / 0, C = 1 / 0, F = -1 / 0, S = -1 / 0;
    for (const T of w) {
      if (T.type === "edge") continue;
      const E = T.h === "auto" ? et[T.id] ?? 100 : T.h, L = Zt(T, E);
      A = Math.min(A, L.minX), C = Math.min(C, L.minY), F = Math.max(F, L.maxX), S = Math.max(S, L.maxY);
    }
    if (A === 1 / 0) return null;
    const D = 8;
    return { x: A - D, y: C - D, w: F - A + D * 2, h: S - C + D * 2 };
  }, [b, h, et, Zt, t]), $e = qt(() => {
    const w = h.filter(
      (W) => {
        if (o) {
          const P = o.get(W.type);
          return P && !P.isSVGOnly;
        }
        return W.type === "content" || W.type === "draw" || W.type === "shape" || W.type === "image" || W.type === "text" || W.type === "frame" || W.type === "sticky";
      }
    ), A = a.zoom < 0.5 ? 15 : a.zoom < 1 ? 25 : 30;
    if (i.w <= 0 || i.h <= 0 || w.length < A)
      return null;
    const { zoom: C, x: F, y: S } = a, D = 500, T = {
      x: -F / C - D,
      y: -S / C - D,
      w: i.w / C + D * 2,
      h: i.h / C + D * 2
    }, E = t.getNodesInRect(T), L = /* @__PURE__ */ new Map();
    for (const W of E) {
      const P = t.getNode(W.id);
      P && L.set(W.id, P);
    }
    for (const W of d) {
      const P = t.getNode(W);
      P && L.set(P.id, P);
    }
    for (const W of h) {
      if (W.type !== "edge" || L.has(W.id)) continue;
      const P = W.data, G = t.getNode(P.fromId), Z = t.getNode(P.toId);
      if (!G || !Z) continue;
      let U = L.has(P.fromId) || L.has(P.toId);
      if (!U) {
        const { x1: lt, y1: at, x2: wt, y2: St } = qr(G, Z, et);
        U = Nl(lt, at, wt, St, T);
      }
      U && (L.set(W.id, W), L.has(G.id) || L.set(G.id, G), L.has(Z.id) || L.set(Z.id, Z));
    }
    return Array.from(L.values());
  }, [a, i, h, d, t]), po = qt(() => $e || h, [h, $e]);
  mt(() => {
    let w = null;
    const A = () => {
      w === null && (w = requestAnimationFrame(() => {
        w = null, f([...t.getAllNodes()]);
      }));
    };
    let C = null;
    const F = () => {
      C === null && (C = requestAnimationFrame(() => {
        C = null, c({ ...t.viewport });
      }));
    }, S = () => {
      p((G) => {
        const Z = new Set(t.selection);
        return G.size !== Z.size || [...G].some((U) => !Z.has(U)) ? (me((U) => U && !Z.has(U) ? null : U), Le((U) => U && !Z.has(U) ? null : U), oo((U) => U && !Z.has(U) ? null : U), yo((U) => U && !Z.has(U) ? null : U), mo((U) => U && !Z.has(U) ? null : U), Fe(null), Z) : G;
      });
    }, D = () => {
      y(t.mode), t.mode === "text" && (jo.current = !1);
    }, T = () => dt(t.boardBackground), E = () => _([...t.alignGuides]);
    t.on("change", A), t.on("viewport", F), t.on("selection", S), t.on("mode", D), t.on("background", T), t.on("guides", E);
    const L = (G) => g(G), W = () => g(null), P = () => {
      const G = n.current;
      G && (G.style.cursor = t.lassoSelect ? vo : gr(t.mode));
    };
    return t.on("group:enter", L), t.on("group:exit", W), t.on("lassoToggle", P), () => {
      w !== null && cancelAnimationFrame(w), C !== null && cancelAnimationFrame(C), t.off("change", A), t.off("viewport", F), t.off("selection", S), t.off("mode", D), t.off("background", T), t.off("guides", E), t.off("group:enter", L), t.off("group:exit", W), t.off("lassoToggle", P);
    };
  }, [t]), mt(() => {
    const w = n.current;
    if (!w) return;
    const A = (C) => {
      if (!C.ctrlKey && !C.metaKey) {
        const S = C.target.closest(".sb-editor-wrap");
        if (S && S.scrollHeight > S.clientHeight) {
          const D = S.scrollTop <= 0 && C.deltaY < 0, T = S.scrollTop + S.clientHeight >= S.scrollHeight && C.deltaY > 0;
          if (!D && !T) return;
        }
      }
      C.preventDefault(), C.ctrlKey || C.metaKey ? t.zoomByWheel(C.deltaY, C.clientX, C.clientY) : t.pan(-C.deltaX, -C.deltaY);
    };
    return w.addEventListener("wheel", A, { passive: !1 }), () => w.removeEventListener("wheel", A);
  }, [t]);
  const [ue, ve] = tt(null), [_e, to] = tt(null), [fe, Se] = tt(null), [be, Fe] = tt(null), k = ct({
    x: 0,
    y: 0,
    index: -1
  }), [st, Yt] = tt(null), [ne, ge] = tt(null), Ae = ct(null), [eo, me] = tt(null), Xo = ct(null), [ir, Le] = tt(null), [ns, oo] = tt(null), [Yo, yo] = tt(null), [ss, mo] = tt(null), [ba, is] = tt(null);
  mt(() => {
    const w = (A) => {
      Ua(() => mo(A));
    };
    return t.on("image:cropRequest", w), () => t.off("image:cropRequest", w);
  }, [t]);
  const as = eo || ns || ir || Yo || ss || ba, Hr = ct(null), ls = ct(null), [Or, Xr] = tt(/* @__PURE__ */ new Set()), ro = ct(/* @__PURE__ */ new Set()), [cs, Go] = tt([]), [ar, Yr] = tt(null), Me = ct([]), Ne = ct(null), [ds, lr] = tt([]), ae = ct([]), bo = ct(null), jo = ct(!1), hs = it(
    (w, A, C, F = "auto") => {
      const S = At(10);
      ls.current = S, t.addNode({
        id: S,
        type: "content",
        x: w,
        y: A,
        w: C,
        h: F,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), cr = it(
    (w, A, C) => {
      const { x: F, y: S } = t.screenToCanvas(w, A);
      if (C) {
        const W = t.hitTestAll(F, S, et);
        if (W.length > 0) {
          const P = k.current, G = Math.abs(F - P.x) + Math.abs(S - P.y);
          let Z = 0;
          G < 5 && (Z = (P.index + 1) % W.length), k.current = { x: F, y: S, index: Z }, t.select(W[Z].id);
        } else
          t.deselectAll();
      } else {
        let W = !1;
        for (const P of t.selection) {
          const G = t.getNode(P);
          if (!G) continue;
          const Z = G.h === "auto" ? 100 : G.h;
          if (F >= G.x && F <= G.x + G.w && S >= G.y && S <= G.y + Z) {
            W = !0;
            break;
          }
        }
        if (!W && t.selection.size >= 2) {
          let P = 1 / 0, G = 1 / 0, Z = -1 / 0, U = -1 / 0;
          for (const lt of t.selection) {
            const at = t.getNode(lt);
            if (!at || at.type === "edge") continue;
            const wt = at.h === "auto" ? 100 : at.h;
            P = Math.min(P, at.x), G = Math.min(G, at.y), Z = Math.max(Z, at.x + at.w), U = Math.max(U, at.y + wt);
          }
          P !== 1 / 0 && F >= P && F <= Z && S >= G && S <= U && (W = !0);
        }
        if (!W) {
          const P = t.hitTest(F, S, et);
          P ? t.select(P.id) : t.deselectAll();
        }
      }
      const D = Array.from(t.selection), T = D.length > 0, E = [];
      if (E.push({
        items: [
          {
            label: "Cut",
            shortcut: "Mod+X",
            disabled: !T,
            action: () => {
              t.cutSelected(), Js(t);
            }
          },
          {
            label: "Copy",
            shortcut: "Mod+C",
            disabled: !T,
            action: () => {
              t.copySelected(), Js(t);
            }
          },
          {
            label: "Paste",
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              Wh(t, F, S);
            }
          }
        ]
      }), E.push({
        items: [
          {
            label: "Duplicate",
            shortcut: "Mod+D",
            disabled: !T,
            action: () => t.duplicateSelected()
          }
        ]
      }), T && E.push({
        items: [
          {
            label: "Add to Personal Library",
            action: () => {
              const W = D.map((Z) => t.getNode(Z)).filter((Z) => !!Z).map((Z) => structuredClone(Z)), P = new Set(
                W.map((Z) => Z.groupId).filter(Boolean)
              ), G = /* @__PURE__ */ new Map();
              for (const [Z, U] of t.groupParent)
                P.has(Z) && G.set(Z, U);
              Yr({
                nodes: W,
                groupParent: G
              });
            }
          }
        ]
      }), D.length >= 2 || T && t.selectionHasGroup()) {
        const W = [];
        D.length >= 2 && W.push({
          label: "Group selection",
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && W.push({
          label: "Ungroup selection",
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), E.push({ items: W });
      }
      if (T && D.every((P) => {
        const G = t.getNode(P);
        return G && (G.type === "draw" || G.type === "shape");
      }) && E.push({
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
      }), T && E.push({
        items: [
          {
            label: "Bring forward",
            shortcut: "Mod+]",
            action: () => t.bringForward(D)
          },
          {
            label: "Send backward",
            shortcut: "Mod+[",
            action: () => t.sendBackward(D)
          },
          {
            label: "Bring to front",
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(D)
          },
          {
            label: "Send to back",
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(D)
          }
        ]
      }), T) {
        const W = D.some((Z) => {
          var U;
          return (U = t.getNode(Z)) == null ? void 0 : U.locked;
        }), P = D.some((Z) => {
          var U;
          return !((U = t.getNode(Z)) != null && U.locked);
        }), G = [];
        P && G.push({
          label: "Lock",
          action: () => {
            for (const Z of D) t.updateNode(Z, { locked: !0 });
          }
        }), W && G.push({
          label: "Unlock",
          action: () => {
            for (const Z of D) t.updateNode(Z, { locked: void 0 });
          }
        }), E.push({ items: G });
      }
      T && E.push({
        items: [
          {
            label: "Delete",
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const L = [10, 20, 40, 80];
      return E.push({
        items: [
          {
            label: "Toggle Grid",
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), z(t.snapToGrid);
            }
          },
          {
            label: "Smart Guides",
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), X(t.smartGuides);
            }
          },
          ...L.map((W) => ({
            label: `${W}px`,
            checked: t.gridSize === W,
            action: () => {
              t.gridSize = W, M(W);
            }
          }))
        ]
      }), E.push({
        items: [
          {
            label: "Export as PNG",
            action: () => Zs(t, { format: "png" })
          },
          {
            label: "Export as SVG",
            action: () => Zs(t, { format: "svg" })
          }
        ]
      }), E;
    },
    [t]
  ), ga = it(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const A = cr(w.clientX, w.clientY, w.altKey);
      Se({ x: w.clientX, y: w.clientY, sections: A });
    },
    [t, cr]
  ), Vo = it(
    (w, A, C) => {
      const F = At(10);
      t.addNode({
        id: F,
        type: "text",
        x: w,
        y: A,
        w: C,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: "",
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? Ve,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      }), t.select(F), Hr.current = F, me(F);
    },
    [t]
  ), xa = it(
    (w) => {
      if (t.presentationMode) return;
      if (t.mode === "text" && jo.current) {
        jo.current = !1, n.current && (n.current.style.cursor = "text"), t.deselectAll();
        const { x: D, y: T } = t.screenToCanvas(w.clientX, w.clientY);
        Vo(D, T, 300);
        return;
      }
      if (t.mode !== "select") return;
      const { x: A, y: C } = t.screenToCanvas(w.clientX, w.clientY), F = t.hitTestAll(A, C, et), S = F.find((D) => !t.isContainerType(D.type)) ?? F[0] ?? null;
      if (S != null && S.groupId) {
        const D = [];
        let T = S.groupId;
        for (; T; )
          D.push(T), T = t.groupParent.get(T);
        if (!t.activeGroupId) {
          t.enterGroup(D[D.length - 1]), t.select(S.id);
          return;
        }
        const E = D.indexOf(t.activeGroupId);
        if (E > 0) {
          t.enterGroup(D[E - 1]), t.select(S.id);
          return;
        }
      }
      if (S && S.type === "text") {
        t.select(S.id), Xo.current = { clientX: w.clientX, clientY: w.clientY }, me(S.id);
        return;
      }
      if (S && S.type === "sticky") {
        t.select(S.id), oo(S.id);
        return;
      }
      if (S && S.type === "frame") {
        t.select(S.id), Le(S.id);
        return;
      }
      if (S && S.type === "shape") {
        const D = S.data, T = D.shape === "line" || D.shape === "arrow";
        t.select(S.id), T || yo(S.id);
        return;
      }
      if (S && S.type === "draw") {
        t.select(S.id);
        return;
      }
      if (!S || S.type === "draw") {
        const T = t.getAllNodes().filter((E) => E.type === "shape").sort((E, L) => L.z - E.z).find((E) => !(E.data.shape === "line" || E.data.shape === "arrow") && Lr(E, A, C, t.viewport.zoom, !0));
        if (T) {
          t.select(T.id), yo(T.id);
          return;
        }
      }
      S || (t.deselectAll(), Vo(A, C, 300));
    },
    [t, et, Vo]
  ), wa = it(
    (w) => {
      if (Q.current.set(w.pointerId, { x: w.clientX, y: w.clientY }), w.pointerType === "pen" && (R.current = !0), w.pointerType === "touch" && (Q.current.size >= 2 || R.current)) {
        q.current = !0, B.current && (clearTimeout(B.current), B.current = null, $.current = null);
        const S = new Map(Q.current), D = [...Q.current.keys()].find((P) => P !== w.pointerId);
        D !== void 0 && s().dispatchEvent(
          new PointerEvent("pointerup", {
            pointerId: D,
            bubbles: !0,
            clientX: w.clientX,
            clientY: w.clientY
          })
        );
        const T = [...S.values()];
        let E = $s(T[0], T[1] ?? T[0]);
        const L = (P) => {
          if (!S.has(P.pointerId)) return;
          S.set(P.pointerId, { x: P.clientX, y: P.clientY });
          const G = [...S.values()];
          if (G.length < 2) return;
          const Z = $s(G[0], G[1]);
          if (t.pan(Z.mx - E.mx, Z.my - E.my), E.dist > 1) {
            const U = Math.min(Math.max(Z.dist / E.dist, 0.9), 1.1);
            t.zoomByFactor(U, Z.mx, Z.my);
          }
          E = Z;
        }, W = (P) => {
          Q.current.delete(P.pointerId), S.delete(P.pointerId), P.pointerType === "pen" && (R.current = !1), S.size < 2 && !R.current && (q.current = !1, s().removeEventListener("pointermove", L), s().removeEventListener("pointerup", W), s().removeEventListener("pointercancel", W));
        };
        s().addEventListener("pointermove", L), s().addEventListener("pointerup", W), s().addEventListener("pointercancel", W);
        return;
      }
      if (q.current || t.presentationMode && !(w.button === 1 || w.button === 0 && H.current))
        return;
      if (fe && Se(null), w.pointerType === "touch") {
        const S = w.clientX, D = w.clientY, T = w.pointerId;
        $.current = { clientX: S, clientY: D }, B.current = setTimeout(() => {
          if (B.current = null, !$.current || q.current) return;
          const E = cr(S, D, !1);
          Se({ x: S, y: D, sections: E }), s().dispatchEvent(
            new PointerEvent("pointerup", {
              pointerId: T,
              bubbles: !0,
              clientX: S,
              clientY: D
            })
          ), $.current = null;
        }, 500);
      }
      if (w.button === 1 || w.button === 0 && H.current) {
        w.preventDefault(), rt.current = !0;
        const S = t.viewport.x, D = t.viewport.y, T = w.clientX, E = w.clientY, L = n.current;
        L && (L.style.cursor = "grabbing");
        const W = (G) => {
          t.viewport.x = S + (G.clientX - T), t.viewport.y = D + (G.clientY - E), c({ ...t.viewport });
        }, P = () => {
          rt.current = !1, L && (L.style.cursor = H.current ? "grab" : t.lassoSelect ? vo : ""), s().removeEventListener("pointermove", W), s().removeEventListener("pointerup", P);
        };
        s().addEventListener("pointermove", W), s().addEventListener("pointerup", P);
        return;
      }
      const { x: C, y: F } = t.screenToCanvas(w.clientX, w.clientY);
      if (w.pointerType === "touch" && B.current && t.hitTest(C, F, et) && (clearTimeout(B.current), B.current = null, $.current = null), t.mode === "select") {
        if (w.button !== 0) return;
        if (w.altKey) {
          const T = t.hitTestAll(C, F, et);
          if (T.length > 0) {
            const E = k.current, L = Math.abs(C - E.x) + Math.abs(F - E.y);
            let W = 0;
            L < 5 && (W = (E.index + 1) % T.length), k.current = { x: C, y: F, index: W }, t.select(T[W].id);
          }
          return;
        }
        let S = !1;
        !t.lassoSelect && t.selection.size >= 2 && _t && C >= _t.x && C <= _t.x + _t.w && F >= _t.y && F <= _t.y + _t.h && (S = !0);
        let D = null;
        if (!t.lassoSelect) {
          const T = t.hitTestAll(C, F, et);
          D = T.find((E) => t.selection.has(E.id) && !t.isContainerType(E.type)) ?? T.find((E) => !t.isContainerType(E.type)) ?? T[0] ?? null, !D && !S && (D = Ol(t.nodes, C, F, t.viewport.zoom, et, Qt));
        }
        if (D || S) {
          D && (t.activeGroupId && !t.isNodeInActiveGroup(D.id) && t.exitAllGroups(), w.shiftKey ? t.toggleSelect(D.id) : t.selection.has(D.id) || t.select(D.id));
          const T = Array.from(t.selection).filter(
            (kt) => {
              var Mt;
              return !((Mt = t.getNode(kt)) != null && Mt.locked);
            }
          );
          if (T.length === 0) return;
          const E = w.clientX, L = w.clientY, W = /* @__PURE__ */ new Set(), P = /* @__PURE__ */ new Set();
          for (const kt of T) {
            const Mt = t.getNode(kt);
            if (Mt && t.isContainerType(Mt.type)) {
              P.add(kt);
              for (const Bt of t.getFrameDescendantIds(kt))
                t.selection.has(Bt) || W.add(Bt);
            }
          }
          const G = [...T, ...W], Z = G.map((kt) => {
            const Mt = t.getNode(kt);
            return { id: kt, x: Mt.x, y: Mt.y };
          }), U = t.selectionGroupId(), lt = U ? t.groupRotations.get(U) : null, at = lt == null ? void 0 : lt.cx, wt = lt == null ? void 0 : lt.cy;
          Fe(null);
          let St = !1, xt = null, zt = E, Xt = L, Ht = !1;
          const pt = new Set(G), Lt = () => {
            xt = null;
            const kt = (zt - E) / t.viewport.zoom, Mt = (Xt - L) / t.viewport.zoom, { finalDx: Bt, finalDy: jt } = t.computeDragSnap(
              Z,
              pt,
              kt,
              Mt,
              Ht
            ), oe = Z.map((re) => ({
              id: re.id,
              patch: { x: re.x + Bt, y: re.y + jt }
            }));
            t.updateMany(oe), lt && U && t.groupRotations.set(U, {
              angle: lt.angle,
              cx: at + Bt,
              cy: wt + jt
            });
          }, gt = (kt) => {
            const Mt = (kt.clientX - E) / t.viewport.zoom, Bt = (kt.clientY - L) / t.viewport.zoom;
            if (!St)
              if (Math.abs(Mt) > 2 || Math.abs(Bt) > 2)
                St = !0, t.pushHistorySnapshot();
              else
                return;
            zt = kt.clientX, Xt = kt.clientY, Ht = kt.metaKey || kt.ctrlKey, xt === null && (xt = requestAnimationFrame(Lt));
          }, Gt = () => {
            if (xt !== null && (cancelAnimationFrame(xt), Lt()), t.clearAlignGuides(), s().removeEventListener("pointermove", gt), s().removeEventListener("pointerup", Gt), St) {
              const kt = T.filter(
                (Mt) => !W.has(Mt)
              );
              kt.length > 0 && t.updateFrameMembership(kt);
            }
          };
          s().addEventListener("pointermove", gt), s().addEventListener("pointerup", Gt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          w.shiftKey || t.deselectAll();
          const T = new Set(t.selection);
          if (t.lassoSelect) {
            const E = [[C, F]];
            to([...E]);
            let L = null, W = 0;
            const P = (U = !1) => {
              L = null;
              const lt = U || W % 2 === 0;
              if (W++, lt && E.length >= 3) {
                const wt = Pe(E, t.getAllNodes()).map((xt) => xt.id), St = w.shiftKey ? [.../* @__PURE__ */ new Set([...T, ...wt])] : wt;
                (St.length !== t.selection.size || St.some((xt) => !t.selection.has(xt))) && t.selectMultiple(St);
              }
              to([...E]);
            }, G = (U) => {
              const { x: lt, y: at } = t.screenToCanvas(U.clientX, U.clientY);
              E.push([lt, at]), L === null && (L = requestAnimationFrame(() => P(!1)));
            }, Z = () => {
              L !== null && cancelAnimationFrame(L), P(!0), s().removeEventListener("pointermove", G), s().removeEventListener("pointerup", Z), to(null), t.toggleLassoSelect();
            };
            s().addEventListener("pointermove", G), s().addEventListener("pointerup", Z);
          } else {
            const E = { startX: C, startY: F, endX: C, endY: F };
            ve(E);
            let L = null, W = 0;
            const P = (U = !1, lt = !1) => {
              L = null;
              const at = Math.min(E.startX, E.endX), wt = Math.min(E.startY, E.endY), St = Math.abs(E.endX - E.startX), xt = Math.abs(E.endY - E.startY), zt = lt || U || W % 2 === 0;
              if (W++, zt) {
                const Ht = he(
                  { x: at, y: wt, w: St, h: xt },
                  t.getAllNodes()
                ).map((Lt) => Lt.id), pt = w.shiftKey ? [.../* @__PURE__ */ new Set([...T, ...Ht])] : Ht;
                (pt.length !== t.selection.size || pt.some((Lt) => !t.selection.has(Lt))) && t.selectMultiple(pt);
              }
              ve({ ...E });
            }, G = (U) => {
              const { x: lt, y: at } = t.screenToCanvas(U.clientX, U.clientY);
              E.endX = lt, E.endY = at, L === null && (L = requestAnimationFrame(() => P(!1)));
            }, Z = () => {
              L !== null && cancelAnimationFrame(L), P(!0), s().removeEventListener("pointermove", G), s().removeEventListener("pointerup", Z), ve(null);
            };
            s().addEventListener("pointermove", G), s().addEventListener("pointerup", Z);
          }
        }
      } else if (t.mode === "text") {
        if (jo.current) return;
        t.deselectAll();
        const S = C, D = F, T = {
          startX: C,
          startY: F,
          endX: C,
          endY: F
        };
        let E = !1;
        Yt(T);
        const L = (P) => {
          const { x: G, y: Z } = t.screenToCanvas(P.clientX, P.clientY);
          T.endX = G, T.endY = Z;
          const U = Math.abs(T.endX - T.startX), lt = Math.abs(T.endY - T.startY);
          (U > 10 || lt > 10) && (E = !0), Yt({ ...T });
        }, W = () => {
          s().removeEventListener("pointermove", L), s().removeEventListener("pointerup", W), Yt(null);
          const P = E ? Math.max(Math.abs(T.endX - T.startX), 60) : 300, G = E ? Math.min(T.startX, T.endX) : S, Z = E ? Math.min(T.startY, T.endY) : D;
          Vo(G, Z, P), jo.current = !0, n.current && (n.current.style.cursor = "crosshair");
        };
        s().addEventListener("pointermove", L), s().addEventListener("pointerup", W);
      } else if (t.mode === "note") {
        t.deselectAll();
        const S = C, D = F, T = {
          startX: C,
          startY: F,
          endX: C,
          endY: F
        };
        let E = !1;
        Yt(T);
        const L = (P) => {
          const { x: G, y: Z } = t.screenToCanvas(P.clientX, P.clientY);
          T.endX = G, T.endY = Z;
          const U = Math.abs(T.endX - T.startX), lt = Math.abs(T.endY - T.startY);
          (U > 10 || lt > 10) && (E = !0), Yt({ ...T });
        }, W = () => {
          s().removeEventListener("pointermove", L), s().removeEventListener("pointerup", W), Yt(null);
          const P = E ? Math.max(Math.abs(T.endX - T.startX), 100) : 300, G = E ? Math.max(Math.abs(T.endY - T.startY), 40) : "auto", Z = E ? Math.min(T.startX, T.endX) : S, U = E ? Math.min(T.startY, T.endY) : D;
          hs(Z, U, P, G), t.setMode("select");
        };
        s().addEventListener("pointermove", L), s().addEventListener("pointerup", W);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const S = C, D = F, T = {
          startX: C,
          startY: F,
          endX: C,
          endY: F
        };
        let E = !1;
        Yt(T);
        const L = (P) => {
          const { x: G, y: Z } = t.screenToCanvas(P.clientX, P.clientY);
          T.endX = G, T.endY = Z, Math.abs(T.endX - T.startX) > 10 && (E = !0), Yt({ ...T });
        }, W = () => {
          s().removeEventListener("pointermove", L), s().removeEventListener("pointerup", W), Yt(null);
          const P = E ? Math.max(Math.abs(T.endX - T.startX), 100) : 200, G = E ? Math.min(T.startX, T.endX) : S, Z = E ? Math.min(T.startY, T.endY) : D, U = At(10), lt = E ? Math.max(Math.abs(T.endY - T.startY), 100) : 150;
          t.addNode({
            id: U,
            type: "sticky",
            x: G,
            y: Z,
            w: P,
            h: lt,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(U), oo(U), t.setMode("select");
        };
        s().addEventListener("pointermove", L), s().addEventListener("pointerup", W);
      } else if (t.mode === "draw") {
        const S = w.pressure || 0.5, D = {
          points: [[C, F, S]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle
        };
        V(D), t.notifyDrawProgress(D);
        const T = (L) => {
          const { x: W, y: P } = t.screenToCanvas(L.clientX, L.clientY), G = L.pressure || 0.5;
          D.points.push([W, P, G]), V({ ...D, points: [...D.points] }), t.notifyDrawProgress({ ...D, points: [...D.points] });
        }, E = () => {
          if (s().removeEventListener("pointermove", T), s().removeEventListener("pointerup", E), t.notifyDrawEnd(), D.points.length < 2) {
            V(null);
            return;
          }
          let L = 1 / 0, W = 1 / 0, P = -1 / 0, G = -1 / 0;
          for (const [U, lt] of D.points)
            U < L && (L = U), lt < W && (W = lt), U > P && (P = U), lt > G && (G = lt);
          const Z = D.points.map(
            ([U, lt, at]) => [U - L, lt - W, at]
          );
          t.addNode({
            id: At(10),
            type: "draw",
            x: L,
            y: W,
            w: P - L,
            h: G - W,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: Z,
              color: D.color,
              strokeWidth: D.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => V(null));
        };
        s().addEventListener("pointermove", T), s().addEventListener("pointerup", E);
      } else if (t.mode === "shape") {
        const S = {
          startX: C,
          startY: F,
          endX: C,
          endY: F
        };
        K(S);
        const D = {
          shapeType: t.activeTool.shapeType || "rect",
          stroke: t.activeTool.color,
          strokeWidth: t.activeTool.width
        }, T = (L) => {
          const { x: W, y: P } = t.screenToCanvas(L.clientX, L.clientY);
          S.endX = W, S.endY = P, K({ ...S }), t.notifyShapeProgress({ ...S, ...D });
        }, E = () => {
          s().removeEventListener("pointermove", T), s().removeEventListener("pointerup", E), t.notifyShapeEnd();
          const L = t.activeTool.shapeType || "rect", W = L === "line" || L === "arrow", P = Math.min(S.startX, S.endX);
          let G = Math.min(S.startY, S.endY);
          const Z = Math.abs(S.endX - S.startX), U = Math.abs(S.endY - S.startY);
          let lt;
          if (W) {
            const St = t.activeTool.width * 2;
            lt = Math.max(U, St), U < St && (G -= (St - U) / 2);
          } else
            lt = U;
          if (Z < 5 && (W ? Z < 5 && Math.abs(S.endY - S.startY) < 5 : lt < 5)) {
            K(null);
            return;
          }
          const at = {};
          W && (at.startPoint = [
            S.startX - P,
            S.startY - G
          ], at.endPoint = [
            S.endX - P,
            S.endY - G
          ]);
          const wt = At(10);
          t.addNode({
            id: wt,
            type: "shape",
            x: P,
            y: G,
            w: Z,
            h: lt,
            z: t.nextZ(),
            data: {
              shape: L,
              stroke: t.activeTool.color,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle,
              strokeWidth: t.activeTool.width,
              strokeStyle: t.activeTool.strokeStyle,
              roughness: t.activeTool.roughness ?? 1,
              opacity: t.activeTool.opacity ?? 1,
              ...at
            }
          }), K(null), t.setMode("select"), t.select(wt);
        };
        s().addEventListener("pointermove", T), s().addEventListener("pointerup", E);
      } else if (t.mode === "edge") {
        const S = t.hitTest(C, F, et);
        if (!S || S.type === "edge") return;
        ot({ fromNode: S, cursorX: C, cursorY: F });
        const D = (E) => {
          const { x: L, y: W } = t.screenToCanvas(E.clientX, E.clientY);
          ot(
            (P) => P ? { ...P, cursorX: L, cursorY: W } : null
          );
        }, T = (E) => {
          s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", T), ot(null);
          const { x: L, y: W } = t.screenToCanvas(E.clientX, E.clientY);
          let P = t.hitTest(L, W, et);
          if (!P || P.type === "edge" || t.isContainerType(P.type)) {
            const at = 50 / t.viewport.zoom;
            let wt = 1 / 0, St = !1, xt = null;
            for (const zt of t.getAllNodes()) {
              if (zt.type === "edge" || zt.id === S.id) continue;
              const Xt = t.isContainerType(zt.type), Ht = Ao(zt, et);
              for (const pt of Ht) {
                const Lt = Math.hypot(pt.x - L, pt.y - W);
                Lt >= at || Xt && !St && xt || (!Xt && St || Lt < wt) && (wt = Lt, St = Xt, xt = zt);
              }
            }
            xt && (P = xt);
          }
          if (!P || P.type === "edge" || P.id === S.id || t.getAllNodes().some(
            (at) => at.type === "edge" && (at.data.fromId === S.id && at.data.toId === P.id || at.data.fromId === P.id && at.data.toId === S.id)
          )) return;
          const Z = ur(S, C, F, et), U = ur(P, L, W, et), lt = {
            id: At(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: S.id,
              toId: P.id,
              style: "solid",
              color: t.activeTool.color,
              strokeWidth: 2,
              arrowHead: "arrow",
              arrowTail: "none",
              edgeType: "bezier",
              sourceHandle: Z,
              targetHandle: U
            }
          };
          t.addNode(lt), t.select(lt.id);
        };
        s().addEventListener("pointermove", D), s().addEventListener("pointerup", T);
      } else if (t.mode === "frame") {
        const S = {
          startX: C,
          startY: F,
          endX: C,
          endY: F
        };
        K(S);
        const D = (E) => {
          const { x: L, y: W } = t.screenToCanvas(E.clientX, E.clientY);
          S.endX = L, S.endY = W, K({ ...S });
        }, T = () => {
          s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", T);
          const E = Math.min(S.startX, S.endX), L = Math.min(S.startY, S.endY), W = Math.abs(S.endX - S.startX), P = Math.abs(S.endY - S.startY);
          if (W < 20 || P < 20) {
            K(null);
            return;
          }
          const G = At(10);
          t.addNode({
            id: G,
            type: "frame",
            x: E,
            y: L,
            w: W,
            h: P,
            z: t.nextZ(),
            data: {
              label: "Frame",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(G), K(null), t.select(G), t.setMode("select");
        };
        s().addEventListener("pointermove", D), s().addEventListener("pointerup", T);
      } else if (t.mode === "erase") {
        if (w.button !== 0) return;
        const S = (at, wt) => {
          const St = t.hitTestAll(at, wt, et), xt = Hl(
            t.nodes,
            at,
            wt,
            t.viewport.zoom,
            et,
            Qt
          );
          let zt = !1;
          for (const Xt of [...St, ...xt])
            ro.current.has(Xt.id) || (ro.current.add(Xt.id), zt = !0);
          zt && Xr(new Set(ro.current));
        }, D = 400;
        ro.current = /* @__PURE__ */ new Set();
        const T = performance.now();
        Me.current = [[C, F, T]], Go([[C, F, T]]), S(C, F);
        let E = C, L = F;
        const W = () => {
          const at = performance.now(), wt = Me.current.length;
          Me.current = Me.current.filter(
            (St) => at - St[2] < D
          ), Me.current.length !== wt && Go([...Me.current]), Ne.current = requestAnimationFrame(W);
        };
        Ne.current = requestAnimationFrame(W);
        const P = (at) => {
          const { x: wt, y: St } = t.screenToCanvas(at.clientX, at.clientY);
          E = wt, L = St;
          const xt = performance.now();
          Me.current.push([E, L, xt]), Go([...Me.current]), S(E, L);
        }, G = () => {
          Ne.current !== null && (cancelAnimationFrame(Ne.current), Ne.current = null), ro.current = /* @__PURE__ */ new Set(), Xr(/* @__PURE__ */ new Set()), Me.current = [], Go([]);
        }, Z = () => {
          lt();
          const at = Array.from(ro.current);
          G(), at.length > 0 && t.deleteNodes(at);
        }, U = (at) => {
          at.key === "Escape" && (lt(), G());
        }, lt = () => {
          s().removeEventListener("pointermove", P), s().removeEventListener("pointerup", Z), s().removeEventListener("keydown", U);
        };
        s().addEventListener("pointermove", P), s().addEventListener("pointerup", Z), s().addEventListener("keydown", U);
      } else if (t.mode === "laser") {
        if (w.button !== 0) return;
        const S = 1560;
        bo.current !== null && (cancelAnimationFrame(bo.current), bo.current = null);
        const D = performance.now();
        ae.current.length > 0 && ae.current.push([NaN, NaN, D]), ae.current.push([C, F, D]), lr([...ae.current]), t.notifyLaserProgress([[C, F]]);
        let T = D;
        const E = () => {
          const P = performance.now(), G = ae.current.length;
          ae.current = ae.current.filter(
            (Z) => P - Z[2] < S
          ), (ae.current.length !== G || ae.current.length > 0) && lr([...ae.current]), P - T >= 60 && (T = P, ae.current.length > 0 && t.notifyLaserProgress(
            ae.current.map((Z) => [Z[0], Z[1]])
          )), ae.current.length > 0 ? bo.current = requestAnimationFrame(E) : (bo.current = null, lr([]), t.notifyLaserEnd());
        };
        bo.current = requestAnimationFrame(E);
        const L = (P) => {
          const { x: G, y: Z } = t.screenToCanvas(P.clientX, P.clientY), U = performance.now();
          ae.current.push([G, Z, U]), lr([...ae.current]), t.notifyLaserProgress(
            ae.current.map((lt) => [lt[0], lt[1]])
          );
        }, W = () => {
          s().removeEventListener("pointermove", L), s().removeEventListener("pointerup", W);
        };
        s().addEventListener("pointermove", L), s().addEventListener("pointerup", W);
      } else if (t.mode === "hand") {
        if (w.button !== 0) return;
        w.preventDefault();
        const S = t.viewport.x, D = t.viewport.y, T = w.clientX, E = w.clientY, L = n.current;
        L && (L.style.cursor = "grabbing");
        const W = (G) => {
          t.viewport.x = S + (G.clientX - T), t.viewport.y = D + (G.clientY - E), c({ ...t.viewport });
        }, P = () => {
          L && (L.style.cursor = t.lassoSelect ? vo : gr(t.mode)), s().removeEventListener("pointermove", W), s().removeEventListener("pointerup", P);
        };
        s().addEventListener("pointermove", W), s().addEventListener("pointerup", P);
      }
    },
    [
      t,
      hs,
      Vo,
      fe,
      cr,
      _t,
      et,
      Zt,
      he
    ]
  ), Gr = it(
    (w, A, C) => {
      if (C.preventDefault(), t.presentationMode) return;
      const F = t.getNode(w);
      if (!F || F.locked) return;
      const S = C.clientX, D = C.clientY, T = F.x, E = F.y, L = F.w, W = F.h === "auto", P = W ? et[w] ?? 100 : F.h, G = F.type === "draw" ? F.data.points.map(
        (St) => [...St]
      ) : null, Z = F.type === "shape" ? F.data.startPoint : void 0, U = F.type === "shape" ? F.data.endPoint : void 0, lt = F.type === "text" ? F.data.fontSize : 0;
      t.pushHistorySnapshot();
      const at = (St) => {
        const xt = (St.clientX - S) / t.viewport.zoom, zt = (St.clientY - D) / t.viewport.zoom;
        let Xt = T, Ht = E, pt = L, Lt = P;
        if ((A === "nw" || A === "w" || A === "sw") && (Xt = T + xt, pt = L - xt), (A === "ne" || A === "e" || A === "se") && (pt = L + xt), (A === "nw" || A === "n" || A === "ne") && (Ht = E + zt, Lt = P - zt), (A === "sw" || A === "s" || A === "se") && (Lt = P + zt), t.snapToGrid && !(St.metaKey || St.ctrlKey)) {
          const kt = t.gridSize, Mt = (Bt) => Math.round(Bt / kt) * kt;
          (A === "nw" || A === "w" || A === "sw") && (Xt = Mt(Xt), pt = T + L - Xt), (A === "ne" || A === "e" || A === "se") && (pt = Mt(Xt + pt) - Xt), (A === "nw" || A === "n" || A === "ne") && (Ht = Mt(Ht), Lt = E + P - Ht), (A === "sw" || A === "s" || A === "se") && (Lt = Mt(Ht + Lt) - Ht);
        }
        const gt = 10;
        if (pt < gt && (pt = gt, (A === "nw" || A === "w" || A === "sw") && (Xt = T + L - gt)), Lt < gt && (Lt = gt, (A === "nw" || A === "n" || A === "ne") && (Ht = E + P - gt)), F.type === "frame") {
          const kt = F.data.devicePreset;
          if (kt) {
            const Mt = zn(kt);
            if (Mt) {
              const Bt = pa(Mt);
              if (A === "nw" || A === "ne" || A === "sw" || A === "se" || (A === "e" || A === "w")) {
                const re = Math.round(pt / Bt);
                (A === "nw" || A === "ne") && (Ht = E + P - re), Lt = re;
              } else
                pt = Math.round(Lt * Bt);
            }
          }
        }
        const Gt = {
          x: Xt,
          y: Ht,
          w: pt,
          h: W ? "auto" : Lt
        };
        if (G && F.type === "draw") {
          const kt = L > 0 ? pt / L : 1, Mt = P > 0 ? Lt / P : 1, Bt = G.map(
            ([jt, oe, re]) => [jt * kt, oe * Mt, re]
          );
          Gt.data = { ...F.data, points: Bt };
        }
        if (F.type === "shape" && (Z || U)) {
          const kt = L > 0 ? pt / L : 1, Mt = P > 0 ? Lt / P : 1, Bt = { ...F.data };
          Z && (Bt.startPoint = [
            Z[0] * kt,
            Z[1] * Mt
          ]), U && (Bt.endPoint = [
            U[0] * kt,
            U[1] * Mt
          ]), Gt.data = Bt;
        }
        if (F.type === "text" && lt > 0 && A !== "e" && A !== "w") {
          const kt = A === "n" || A === "s" ? P > 0 ? Lt / P : 1 : L > 0 ? pt / L : 1, Mt = Math.max(8, Math.round(lt * kt));
          Gt.data = { ...F.data, fontSize: Mt };
        }
        t.updateNode(w, Gt);
      }, wt = () => {
        s().removeEventListener("pointermove", at), s().removeEventListener("pointerup", wt), t.isContainerType(F.type) && t.syncFrameChildrenAfterResize(w);
      };
      s().addEventListener("pointermove", at), s().addEventListener("pointerup", wt);
    },
    [t, et]
  ), ka = it(
    (w, A) => {
      A.stopPropagation(), A.preventDefault();
      const C = t.getNode(w);
      if (!C || C.locked) return;
      const F = C.h === "auto" ? et[w] ?? 100 : C.h, S = C.x + C.w / 2, D = C.y + F / 2, T = C.rotation || 0, { x: E, y: L } = t.screenToCanvas(
        A.clientX,
        A.clientY
      ), W = Math.atan2(L - D, E - S);
      t.pushHistorySnapshot();
      const P = (Z) => {
        const { x: U, y: lt } = t.screenToCanvas(Z.clientX, Z.clientY), at = Math.atan2(lt - D, U - S);
        let wt = T + (at - W) * (180 / Math.PI);
        (Z.shiftKey || t.snapToGrid) && !(Z.metaKey || Z.ctrlKey) && (wt = Math.round(wt / 15) * 15), t.updateNode(w, { rotation: wt });
      }, G = () => {
        s().removeEventListener("pointermove", P), s().removeEventListener("pointerup", G);
      };
      s().addEventListener("pointermove", P), s().addEventListener("pointerup", G);
    },
    [t, et]
  ), us = it(
    (w, A, C) => {
      C.stopPropagation(), C.preventDefault();
      const F = t.getNode(w);
      if (!F) return;
      const { x: S, y: D } = t.screenToCanvas(C.clientX, C.clientY);
      ot({ fromNode: F, cursorX: S, cursorY: D, sourceHandle: A });
      const T = (L) => {
        const { x: W, y: P } = t.screenToCanvas(L.clientX, L.clientY);
        ot(
          (G) => G ? { ...G, cursorX: W, cursorY: P } : null
        );
      }, E = (L) => {
        s().removeEventListener("pointermove", T), s().removeEventListener("pointerup", E), ot(null);
        const { x: W, y: P } = t.screenToCanvas(L.clientX, L.clientY);
        let G = t.hitTest(W, P, et);
        if (!G || G.type === "edge" || t.isContainerType(G.type)) {
          const at = 50 / t.viewport.zoom;
          let wt = 1 / 0, St = !1, xt = null;
          for (const zt of t.getAllNodes()) {
            if (zt.type === "edge" || zt.id === F.id) continue;
            const Xt = t.isContainerType(zt.type), Ht = Ao(zt, et);
            for (const pt of Ht) {
              const Lt = Math.hypot(pt.x - W, pt.y - P);
              Lt >= at || Xt && !St && xt || (!Xt && St || Lt < wt) && (wt = Lt, St = Xt, xt = zt);
            }
          }
          xt && (G = xt);
        }
        if (!G || G.type === "edge" || G.id === F.id || t.getAllNodes().some(
          (at) => at.type === "edge" && (at.data.fromId === F.id && at.data.toId === G.id || at.data.fromId === G.id && at.data.toId === F.id)
        )) return;
        const U = ur(G, W, P, et), lt = {
          id: At(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: F.id,
            toId: G.id,
            style: "solid",
            color: t.activeTool.color,
            strokeWidth: 2,
            arrowHead: "arrow",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: A,
            targetHandle: U
          }
        };
        t.addNode(lt), t.select(lt.id);
      };
      s().addEventListener("pointermove", T), s().addEventListener("pointerup", E);
    },
    [t, et]
  ), va = it(
    (w) => {
      let A = null, C = w === "top" || w === "left" ? 1 / 0 : -1 / 0;
      for (const F of t.selection) {
        const S = t.getNode(F);
        if (!S || S.type === "edge") continue;
        const D = S.h === "auto" ? et[S.id] ?? 100 : S.h;
        let T;
        switch (w) {
          case "top":
            T = S.y;
            break;
          case "bottom":
            T = S.y + D;
            break;
          case "left":
            T = S.x;
            break;
          case "right":
            T = S.x + S.w;
            break;
        }
        (w === "top" || w === "left" ? T < C : T > C) && (C = T, A = F);
      }
      return A;
    },
    [t, et]
  ), Sa = it(
    (w, A, C, F) => {
      var Z;
      F.stopPropagation(), F.preventDefault();
      const S = t.getNode(w);
      if (!S || !o) return;
      const D = o.get(S.type), T = (Z = D == null ? void 0 : D.ports) == null ? void 0 : Z.find((U) => U.id === A);
      if (!T) return;
      const E = C === "input" ? "left" : "right", { x: L, y: W } = t.screenToCanvas(F.clientX, F.clientY);
      ot({
        fromNode: S,
        cursorX: L,
        cursorY: W,
        sourceHandle: E,
        sourcePort: A,
        sourceDirection: C
      });
      const P = (U) => {
        const { x: lt, y: at } = t.screenToCanvas(U.clientX, U.clientY);
        ot(
          (wt) => wt ? { ...wt, cursorX: lt, cursorY: at } : null
        );
      }, G = (U) => {
        var De;
        s().removeEventListener("pointermove", P), s().removeEventListener("pointerup", G), ot(null);
        const { x: lt, y: at } = t.screenToCanvas(U.clientX, U.clientY), wt = C === "output" ? "input" : "output", St = 40 / t.viewport.zoom;
        let xt = null, zt = null, Xt = 1 / 0;
        for (const ee of t.getAllNodes()) {
          if (ee.type === "edge" || ee.id === S.id) continue;
          const se = o.get(ee.type);
          if (!((De = se == null ? void 0 : se.ports) != null && De.length)) continue;
          const go = ee.h === "auto" ? t.measuredHeights[ee.id] ?? 100 : ee.h;
          for (const xe of se.ports) {
            if (xe.direction !== wt || T.dataType !== "any" && xe.dataType !== "any" && T.dataType !== xe.dataType) continue;
            const xo = se.ports.filter((Wa) => Wa.direction === xe.direction), Vr = xo.indexOf(xe), dr = 14 / t.viewport.zoom, Da = ee.y + go / (xo.length + 1) * (Vr + 1), Ea = xe.direction === "input" ? ee.x - dr : ee.x + ee.w + dr, Zr = Math.hypot(Ea - lt, Da - at);
            Zr < St && Zr < Xt && (Xt = Zr, xt = ee, zt = xe);
          }
        }
        if (!xt || !zt) return;
        const Ht = zt.id, pt = C === "output" ? xt.id : S.id, Lt = C === "output" ? Ht : A;
        if (t.getAllNodes().some((ee) => {
          if (ee.type !== "edge") return !1;
          const se = ee.data;
          return se.toId === pt && se.targetPort === Lt;
        })) return;
        const Gt = C === "output" ? S.id : xt.id, kt = C === "output" ? xt.id : S.id, Mt = C === "output" ? A : Ht, Bt = C === "output" ? Ht : A, re = {
          id: At(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: Gt,
            toId: kt,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: Mt,
            targetPort: Bt
          }
        };
        t.addNode(re), t.select(re.id);
      };
      s().addEventListener("pointermove", P), s().addEventListener("pointerup", G);
    },
    [t, o, et]
  ), [fs, Ma] = tt(0);
  mt(() => {
    if (r)
      return r.onChange(() => Ma((w) => w + 1));
  }, [r]);
  const Ca = it(
    (w, A, C, F, S) => {
      S.stopPropagation(), S.preventDefault();
      const D = t.getNode(w);
      if (!D || D.type !== "edge") return;
      t.pushHistorySnapshot();
      const T = (L) => {
        const W = t.screenToCanvas(L.clientX, L.clientY), P = t.getNode(w);
        if (!P) return;
        const G = t.getNode(P.data.fromId), Z = t.getNode(P.data.toId);
        if (!(!G || !Z))
          if (A === "xy") {
            const U = Ge(
              G,
              Z,
              P.data.edgeType || "bezier",
              et,
              P.data.sourceHandle,
              P.data.targetHandle,
              void 0,
              void 0
              // no offsets → natural midpoint
            );
            if (!U.kinkHandle) return;
            const lt = W.x - U.kinkHandle.x, at = W.y - U.kinkHandle.y;
            t.updateNode(w, {
              data: { ...P.data, curveOffset: [lt, at] }
            });
          } else {
            const U = A === "x" ? W.x : W.y, lt = Ge(
              G,
              Z,
              P.data.edgeType || "bezier",
              et,
              P.data.sourceHandle,
              P.data.targetHandle,
              0.5
              // default to get range
            );
            if (!lt.kinkHandle) return;
            const at = lt.kinkHandle.min, wt = lt.kinkHandle.max, St = wt - at;
            if (St === 0) return;
            const zt = (Math.max(at, Math.min(wt, U)) - at) / St;
            t.updateNode(w, {
              data: { ...P.data, midpointOffset: zt }
            });
          }
      }, E = () => {
        s().removeEventListener("pointermove", T), s().removeEventListener("pointerup", E);
      };
      s().addEventListener("pointermove", T), s().addEventListener("pointerup", E);
    },
    [t, et]
  ), Ia = it(
    (w, A, C) => {
      C.stopPropagation(), C.preventDefault();
      const F = t.getNode(w);
      if (!F || F.type !== "edge") return;
      const { fromId: S, toId: D, sourceHandle: T, targetHandle: E } = F.data, L = A === "source" ? D : S, W = A === "source" ? E : T, P = t.getNode(S), G = t.getNode(D);
      if (!P || !G) return;
      const Z = Ge(
        P,
        G,
        F.data.edgeType || "bezier",
        et,
        T,
        E
      ), U = A === "source" ? { x: Z.x1, y: Z.y1 } : { x: Z.x2, y: Z.y2 };
      ft({
        edgeId: w,
        endpoint: A,
        anchorNodeId: L,
        anchorHandle: W,
        cursorX: U.x,
        cursorY: U.y
      });
      const lt = (wt) => {
        const { x: St, y: xt } = t.screenToCanvas(wt.clientX, wt.clientY);
        ft(
          (zt) => zt ? { ...zt, cursorX: St, cursorY: xt } : null
        );
      }, at = (wt) => {
        s().removeEventListener("pointermove", lt), s().removeEventListener("pointerup", at), ft(null);
        const { x: St, y: xt } = t.screenToCanvas(wt.clientX, wt.clientY);
        let zt = t.hitTest(St, xt, et);
        if (!zt || zt.type === "edge" || t.isContainerType(zt.type)) {
          const kt = 50 / t.viewport.zoom;
          let Mt = 1 / 0, Bt = !1, jt = null;
          for (const oe of t.getAllNodes()) {
            if (oe.type === "edge") continue;
            const re = t.isContainerType(oe.type), De = Ao(oe, et);
            for (const ee of De) {
              const se = Math.hypot(ee.x - St, ee.y - xt);
              se >= kt || re && !Bt && jt || (!re && Bt || se < Mt) && (Mt = se, Bt = re, jt = oe);
            }
          }
          jt && (zt = jt);
        }
        if (!zt || zt.type === "edge") return;
        const Xt = A === "source" ? zt.id : S, Ht = A === "target" ? zt.id : D;
        if (Xt === Ht) return;
        const pt = A === "source" ? S : D;
        if (zt.id === pt || t.getAllNodes().some((kt) => {
          if (kt.type !== "edge" || kt.id === w) return !1;
          const Mt = kt.data;
          return Mt.fromId === Xt && Mt.toId === Ht || Mt.fromId === Ht && Mt.toId === Xt;
        })) return;
        const gt = ur(zt, St, xt, et), Gt = A === "source" ? { fromId: zt.id, sourceHandle: gt } : { toId: zt.id, targetHandle: gt };
        t.updateNodeWithHistory(w, { data: Gt });
      };
      s().addEventListener("pointermove", lt), s().addEventListener("pointerup", at);
    },
    [t, et]
  ), za = it(
    (w) => {
      if (w.stopPropagation(), w.preventDefault(), t.presentationMode) return;
      const A = Array.from(t.selection).map((gt) => t.getNode(gt)).filter(Boolean);
      if (A.length < 2) return;
      const F = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, S = F ? t.groupRotations.get(F) : null;
      let D, T;
      if (S)
        D = S.cx, T = S.cy;
      else {
        let gt = 1 / 0, Gt = 1 / 0, kt = -1 / 0, Mt = -1 / 0;
        for (const Bt of A) {
          const jt = Bt.h === "auto" ? et[Bt.id] ?? 100 : Bt.h, oe = Zt(Bt, jt);
          gt = Math.min(gt, oe.minX), Gt = Math.min(Gt, oe.minY), kt = Math.max(kt, oe.maxX), Mt = Math.max(Mt, oe.maxY);
        }
        D = (gt + kt) / 2, T = (Gt + Mt) / 2;
      }
      const E = (S == null ? void 0 : S.angle) ?? 0, W = A.filter((gt) => !gt.locked).map((gt) => {
        const Gt = gt.h === "auto" ? et[gt.id] ?? 100 : gt.h;
        return {
          id: gt.id,
          cx: gt.x + gt.w / 2,
          cy: gt.y + Gt / 2,
          w: gt.w,
          h: Gt,
          rotation: gt.rotation || 0
        };
      }), P = -E * Math.PI / 180, G = Math.cos(P), Z = Math.sin(P);
      let U = 1 / 0, lt = 1 / 0, at = -1 / 0, wt = -1 / 0;
      for (const gt of W) {
        const Gt = gt.cx - D, kt = gt.cy - T, Mt = D + Gt * G - kt * Z, Bt = T + Gt * Z + kt * G;
        U = Math.min(U, Mt - gt.w / 2), lt = Math.min(lt, Bt - gt.h / 2), at = Math.max(at, Mt + gt.w / 2), wt = Math.max(wt, Bt + gt.h / 2);
      }
      const St = {
        x: U - Jt,
        y: lt - Jt,
        w: at - U + Jt * 2,
        h: wt - lt + Jt * 2
      }, { x: xt, y: zt } = t.screenToCanvas(w.clientX, w.clientY), Xt = Math.atan2(zt - T, xt - D);
      t.pushHistorySnapshot();
      let Ht = E;
      const pt = (gt) => {
        const { x: Gt, y: kt } = t.screenToCanvas(gt.clientX, gt.clientY);
        let Bt = (Math.atan2(kt - T, Gt - D) - Xt) * (180 / Math.PI);
        (gt.shiftKey || t.snapToGrid) && !(gt.metaKey || gt.ctrlKey) && (Bt = Math.round(Bt / 15) * 15), Ht = E + Bt, Fe({ angle: Ht, cx: D, cy: T, bounds: St });
        const jt = Bt * Math.PI / 180, oe = Math.cos(jt), re = Math.sin(jt), De = W.map((ee) => {
          const se = ee.cx - D, go = ee.cy - T, xe = D + se * oe - go * re, xo = T + se * re + go * oe;
          return {
            id: ee.id,
            patch: {
              x: xe - ee.w / 2,
              y: xo - ee.h / 2,
              rotation: Ht
            }
          };
        });
        t.updateMany(De);
      }, Lt = () => {
        F && t.groupRotations.set(F, { angle: Ht, cx: D, cy: T }), Fe({ angle: Ht, cx: D, cy: T, bounds: St }), s().removeEventListener("pointermove", pt), s().removeEventListener("pointerup", Lt);
      };
      s().addEventListener("pointermove", pt), s().addEventListener("pointerup", Lt);
    },
    [t, et, Zt]
  ), Ta = it(
    (w, A) => {
      if (A.stopPropagation(), A.preventDefault(), t.presentationMode) return;
      const C = Array.from(t.selection).map((pt) => t.getNode(pt)).filter(Boolean);
      if (C.length < 2) return;
      const F = (pt) => pt.h === "auto" ? et[pt.id] ?? 100 : pt.h;
      let S = 1 / 0, D = 1 / 0, T = -1 / 0, E = -1 / 0;
      for (const pt of C) {
        const Lt = F(pt), gt = Zt(pt, Lt);
        S = Math.min(S, gt.minX), D = Math.min(D, gt.minY), T = Math.max(T, gt.maxX), E = Math.max(E, gt.maxY);
      }
      const L = { x: S, y: D, w: T - S, h: E - D }, W = L.w || 1, P = L.h || 1, Z = C.filter((pt) => !pt.locked).map((pt) => {
        const Lt = F(pt);
        return {
          id: pt.id,
          type: pt.type,
          isAutoH: pt.h === "auto",
          relX: (pt.x - L.x) / W,
          relY: (pt.y - L.y) / P,
          relW: pt.w / W,
          relH: Lt / P,
          origW: pt.w,
          origH: Lt,
          origPoints: pt.type === "draw" ? pt.data.points.map((gt) => [...gt]) : null,
          drawData: pt.type === "draw" ? { ...pt.data } : null
        };
      }), U = A.clientX, lt = A.clientY;
      t.pushHistorySnapshot();
      let at = null, wt = U, St = lt, xt = !1;
      const zt = () => {
        at = null;
        const pt = (wt - U) / t.viewport.zoom, Lt = (St - lt) / t.viewport.zoom;
        let gt = L.x, Gt = L.y, kt = L.w, Mt = L.h;
        if ((w === "nw" || w === "w" || w === "sw") && (gt = L.x + pt, kt = L.w - pt), (w === "ne" || w === "e" || w === "se") && (kt = L.w + pt), (w === "nw" || w === "n" || w === "ne") && (Gt = L.y + Lt, Mt = L.h - Lt), (w === "sw" || w === "s" || w === "se") && (Mt = L.h + Lt), t.snapToGrid && !xt) {
          const jt = t.gridSize, oe = (re) => Math.round(re / jt) * jt;
          (w === "nw" || w === "w" || w === "sw") && (gt = oe(gt), kt = L.x + L.w - gt), (w === "ne" || w === "e" || w === "se") && (kt = oe(gt + kt) - gt), (w === "nw" || w === "n" || w === "ne") && (Gt = oe(Gt), Mt = L.y + L.h - Gt), (w === "sw" || w === "s" || w === "se") && (Mt = oe(Gt + Mt) - Gt);
        }
        kt < 20 && (kt = 20, (w === "nw" || w === "w" || w === "sw") && (gt = L.x + L.w - 20)), Mt < 20 && (Mt = 20, (w === "nw" || w === "n" || w === "ne") && (Gt = L.y + L.h - 20));
        const Bt = Z.map((jt) => {
          const oe = gt + jt.relX * kt, re = Gt + jt.relY * Mt, De = jt.relW * kt, ee = jt.relH * Mt, se = {
            x: oe,
            y: re,
            w: De,
            h: jt.isAutoH ? "auto" : ee
          };
          if (jt.origPoints && jt.drawData) {
            const go = jt.origW > 0 ? De / jt.origW : 1, xe = jt.origH > 0 ? ee / jt.origH : 1;
            se.data = {
              ...jt.drawData,
              points: jt.origPoints.map(
                ([xo, Vr, dr]) => [xo * go, Vr * xe, dr]
              )
            };
          }
          return { id: jt.id, patch: se };
        });
        t.updateMany(Bt);
      }, Xt = (pt) => {
        wt = pt.clientX, St = pt.clientY, xt = pt.metaKey || pt.ctrlKey, at === null && (at = requestAnimationFrame(zt));
      }, Ht = () => {
        at !== null && (cancelAnimationFrame(at), zt()), s().removeEventListener("pointermove", Xt), s().removeEventListener("pointerup", Ht);
        for (const pt of C)
          t.isContainerType(pt.type) && t.syncFrameChildrenAfterResize(pt.id);
      };
      s().addEventListener("pointermove", Xt), s().addEventListener("pointerup", Ht);
    },
    [t, et, Zt]
  );
  mt(() => {
    n.current && (n.current.style.cursor = t.lassoSelect ? vo : gr(m)), m !== "select" && m !== "edge" && (Ae.current = null, ge(null)), m !== "erase" && (Ne.current !== null && (cancelAnimationFrame(Ne.current), Ne.current = null), ro.current = /* @__PURE__ */ new Set(), Xr(/* @__PURE__ */ new Set()), Me.current = [], Go([]));
  }, [m]);
  const jr = ct(null), ps = ct(null), Pa = it(
    (w) => {
      if (B.current && w.pointerType === "touch" && $.current) {
        const A = w.clientX - $.current.clientX, C = w.clientY - $.current.clientY;
        Math.sqrt(A * A + C * C) > 8 && (clearTimeout(B.current), B.current = null, $.current = null);
      }
      t.mode !== "select" && t.mode !== "edge" || (ps.current = { clientX: w.clientX, clientY: w.clientY }, jr.current === null && (jr.current = requestAnimationFrame(() => {
        jr.current = null;
        const A = n.current, C = ps.current;
        if (!A || !C) return;
        const { x: F, y: S } = t.screenToCanvas(C.clientX, C.clientY);
        if (t.lassoSelect) {
          A.style.cursor = vo;
          return;
        }
        if (t.mode === "edge") {
          const E = t.hitTest(F, S, et), L = E && E.type !== "edge" ? E.id : null;
          L !== Ae.current && (Ae.current = L, ge(L));
          return;
        }
        if (t.selection.size >= 2 && _t && F >= _t.x && F <= _t.x + _t.w && S >= _t.y && S <= _t.y + _t.h) {
          A.style.cursor = "move";
          return;
        }
        const D = t.hitTest(F, S, et), T = D ? D.id : null;
        if (T !== Ae.current && (Ae.current = T, ge(T)), D) {
          A.style.cursor = "move";
          return;
        }
        A.style.cursor = "default";
      })));
    },
    [t, _t, et, Zt]
  ), Ra = it((w) => {
    (w.dataTransfer.types.includes("Files") || w.dataTransfer.types.includes(Sn) || w.dataTransfer.types.includes(Mn) || w.dataTransfer.types.includes(Cn)) && (w.preventDefault(), w.dataTransfer.dropEffect = "copy");
  }, []), Aa = it(
    (w) => {
      if (w.preventDefault(), t.presentationMode) return;
      const A = w.dataTransfer.getData(Cn);
      if (A) {
        try {
          const L = JSON.parse(A);
          ia(t, L, w.clientX, w.clientY);
        } catch (L) {
          console.error("Failed to place GIF:", L);
        }
        return;
      }
      const C = w.dataTransfer.getData(Mn);
      if (C) {
        try {
          const { itemId: L } = JSON.parse(C), P = ea().find((G) => G.id === L);
          P && ra(t, P, w.clientX, w.clientY);
        } catch (L) {
          console.error("Failed to place personal library item:", L);
        }
        return;
      }
      const F = w.dataTransfer.getData(Sn);
      if (F) {
        try {
          const { libraryId: L, itemId: W } = JSON.parse(F), G = Un(L).find((Z) => Z.id === W);
          G && oa(t, G, w.clientX, w.clientY);
        } catch (L) {
          console.error("Failed to place library item:", L);
        }
        return;
      }
      const S = w.dataTransfer.files[0];
      if (!S) return;
      if (S.name.endsWith(".excalidrawlib") || S.name.endsWith(".excalidrawlib.json")) {
        const L = new FileReader();
        L.onload = () => {
          try {
            const W = JSON.parse(L.result);
            if (W.type === "excalidrawlib") {
              const P = S.name.replace(/\.excalidrawlib(\.json)?$/, "");
              qn(W, { name: P });
            }
          } catch (W) {
            console.error("Failed to import library:", W);
          }
        }, L.readAsText(S);
        return;
      }
      if (S.type === "image/svg+xml" || S.name.endsWith(".svg")) {
        const L = new FileReader();
        L.onload = () => {
          const W = L.result, P = In(W);
          P && nh(t, P, w.clientX, w.clientY);
        }, L.readAsText(S);
        return;
      }
      if (!S.type.startsWith("image/")) return;
      const { x: D, y: T } = t.screenToCanvas(w.clientX, w.clientY), E = new FileReader();
      E.onload = () => {
        const L = E.result, W = new Image();
        W.onload = () => {
          const P = Math.min(W.naturalWidth, 400), G = Math.min(W.naturalHeight, 300), Z = W.naturalWidth / W.naturalHeight, U = Z >= 1 ? P : G * Z, lt = Z >= 1 ? P / Z : G;
          t.addNode({
            id: At(10),
            type: "image",
            x: D,
            y: T,
            w: U,
            h: lt,
            z: t.nextZ(),
            data: { src: L }
          });
        }, W.src = L;
      }, E.readAsDataURL(S);
    },
    [t]
  ), La = `translate(${a.x}px, ${a.y}px) scale(${a.zoom})`;
  return /* @__PURE__ */ v(
    "div",
    {
      ref: n,
      "data-sb-canvas": !0,
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        touchAction: "none",
        background: or(J).canvasBg
      },
      onPointerDown: wa,
      onPointerMove: Pa,
      onDoubleClick: xa,
      onContextMenu: ga,
      onDragOver: Ra,
      onDrop: Aa,
      children: [
        /* @__PURE__ */ u(Rd, { viewport: a, gridSize: I, background: J, gridVisible: x }),
        /* @__PURE__ */ v(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transform: La,
              transformOrigin: "0 0",
              pointerEvents: "none"
            },
            children: [
              ($e || h).filter((w) => {
                if (o) {
                  const A = o.get(w.type);
                  return A && !A.isSVGOnly;
                }
                return w.type === "content" || w.type === "draw" || w.type === "shape" || w.type === "image" || w.type === "text" || w.type === "frame" || w.type === "sticky";
              }).sort((w, A) => w.z - A.z).map((w) => {
                var F;
                const A = Or.has(w.id);
                let C;
                if (o) {
                  const S = o.get(w.type);
                  if (S) {
                    const D = S.component, T = d.has(w.id), E = m === "select" || m === "text" || m === "note" || m === "sticky", L = /* @__PURE__ */ u(
                      D,
                      {
                        node: w,
                        data: w.data,
                        isSelected: T,
                        multiSelected: d.size > 1 && T && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: E,
                        zoom: a.zoom,
                        editing: as === w.id,
                        editClickPos: as === w.id ? Xo.current : null,
                        callbacks: {
                          onMeasuredHeight: Ct,
                          onResizeHandleDown: Gr,
                          onEditStart: (W) => {
                            const P = t.getNode(W);
                            P && (P.type === "text" ? me(W) : P.type === "sticky" ? oo(W) : P.type === "frame" ? Le(W) : P.type === "shape" ? yo(W) : P.type === "image" ? mo(W) : P.type === "youtube" && is(W));
                          },
                          onEditEnd: () => {
                            me(null), oo(null), Le(null), yo(null), mo(null), is(null);
                          }
                        },
                        portValues: r && ((F = S.ports) != null && F.length) && fs >= 0 ? r.getAllPortValues(w.id) : void 0,
                        updateData: (W) => {
                          t.updateNodeWithHistory(w.id, {
                            data: { ...w.data, ...W }
                          });
                        }
                      },
                      S.handlesOwnLayout ? w.id : void 0
                    );
                    S.handlesOwnLayout ? C = L : C = /* @__PURE__ */ u(
                      Fh,
                      {
                        node: w,
                        isInteractive: E,
                        measuredH: et[w.id],
                        onMeasuredHeight: Ct,
                        observeElement: It,
                        unobserveElement: Pt,
                        isContainer: S.isContainer,
                        children: L
                      },
                      w.id
                    );
                  }
                } else if (w.type === "content") {
                  const S = w;
                  C = /* @__PURE__ */ u(
                    Mi,
                    {
                      node: S,
                      isSelected: d.has(w.id),
                      multiSelected: d.size > 1 && d.has(w.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: m === "select" || m === "text" || m === "note",
                      zoom: a.zoom,
                      onMeasuredHeight: Ct,
                      autoEdit: ls.current === S.id
                    },
                    w.id
                  );
                } else if (w.type === "text")
                  C = /* @__PURE__ */ u(
                    Bi,
                    {
                      node: w,
                      engine: t,
                      editing: eo === w.id,
                      editClickPos: eo === w.id ? Xo.current : null,
                      onStopEdit: () => {
                        if (Hr.current === w.id) {
                          Hr.current = null;
                          const S = t.getNode(w.id);
                          if (!S || !S.data.text.trim()) {
                            t.deleteNode(w.id), me(null);
                            return;
                          }
                          t.pushHistorySnapshot();
                        }
                        me(null);
                      },
                      onMeasuredHeight: Ct
                    },
                    w.id
                  );
                else if (w.type === "image")
                  C = /* @__PURE__ */ u(
                    Ni,
                    {
                      node: w,
                      isSelected: d.has(w.id),
                      engine: t,
                      interactive: m === "select",
                      zoom: a.zoom,
                      onResizeHandleDown: Gr,
                      cropping: ss === w.id,
                      onCropStart: () => mo(w.id),
                      onCropEnd: () => mo(null)
                    },
                    w.id
                  );
                else if (w.type === "sticky")
                  C = /* @__PURE__ */ u(
                    Hi,
                    {
                      node: w,
                      isSelected: d.has(w.id),
                      engine: t,
                      interactive: m === "select" || m === "sticky",
                      zoom: a.zoom,
                      editing: ns === w.id,
                      onEditStart: oo,
                      onEditEnd: () => oo(null)
                    },
                    w.id
                  );
                else if (w.type === "frame") {
                  const S = w, D = S.h === "auto" ? 100 : S.h;
                  C = /* @__PURE__ */ u(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: S.x,
                        top: S.y,
                        width: S.w,
                        height: D,
                        zIndex: S.z,
                        background: S.data.backgroundColor || "rgba(0,0,0,0.02)",
                        border: `${S.data.borderWidth || 1}px ${S.data.borderStyle || "dashed"} ${S.data.borderColor || "#ccc"}`,
                        boxSizing: "border-box",
                        borderRadius: 8,
                        opacity: S.data.opacity ?? 1,
                        pointerEvents: "none",
                        overflow: "visible",
                        transform: S.rotation ? `rotate(${S.rotation}deg)` : void 0,
                        transformOrigin: "center center"
                      },
                      children: ir === w.id ? /* @__PURE__ */ u(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: S.data.label ?? "",
                          placeholder: "Frame label...",
                          onBlur: (T) => {
                            const E = T.currentTarget.value.trim();
                            t.updateNodeWithHistory(w.id, {
                              data: { ...S.data, label: E || void 0 }
                            }), Le(null);
                          },
                          onKeyDown: (T) => {
                            (T.key === "Enter" || T.key === "Escape") && T.currentTarget.blur(), T.stopPropagation();
                          },
                          onPointerDown: (T) => T.stopPropagation(),
                          style: {
                            position: "absolute",
                            top: -24,
                            left: 0,
                            fontSize: 12,
                            color: S.data.borderColor || "#999",
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
                      ) : S.data.label ? /* @__PURE__ */ u(
                        "div",
                        {
                          onDoubleClick: (T) => {
                            T.stopPropagation(), t.select(w.id), Le(w.id);
                          },
                          style: {
                            position: "absolute",
                            top: -20,
                            left: 4,
                            fontSize: 12,
                            color: S.data.borderColor || "#999",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            pointerEvents: "auto",
                            cursor: "default"
                          },
                          children: S.data.label
                        }
                      ) : null
                    },
                    w.id
                  );
                } else {
                  const S = w;
                  if (S.type === "draw")
                    C = /* @__PURE__ */ u(Pr, { node: S }, w.id);
                  else {
                    const D = S.h === "auto" ? 100 : S.h, T = S.w * a.zoom, E = D * a.zoom;
                    C = Math.min(T, E) < 2 ? /* @__PURE__ */ u(
                      Fi,
                      {
                        node: S
                      },
                      w.id
                    ) : /* @__PURE__ */ u(Pr, { node: S, editingLabel: Yo === w.id }, w.id);
                  }
                }
                return A ? /* @__PURE__ */ u("div", { style: { opacity: 0.25, filter: "saturate(0)" }, children: C }, w.id) : C;
              }),
              Yo && (() => {
                const w = t.getNode(Yo);
                if (!w || w.type !== "shape") return null;
                const A = w.data;
                return A.shape === "line" || A.shape === "arrow" ? null : /* @__PURE__ */ u(
                  Nh,
                  {
                    node: w,
                    engine: t,
                    onDone: () => yo(null)
                  },
                  Yo
                );
              })()
            ]
          }
        ),
        /* @__PURE__ */ u(
          ah,
          {
            nodes: po,
            viewport: a,
            selection: d,
            measuredHeights: et,
            activeStroke: Y,
            shapePreview: O,
            shapePreviewStyle: O ? {
              stroke: t.mode === "frame" ? "#1e1e2e" : t.activeTool.color,
              strokeWidth: t.mode === "frame" ? 1 : t.activeTool.width,
              roughness: t.mode === "frame" ? 0 : t.activeTool.roughness ?? 1,
              shapeType: t.mode === "frame" ? "rect" : t.activeTool.shapeType || "rect"
            } : null,
            onResizeHandleDown: Gr,
            onRotateStart: ka,
            onConnectionHandleDown: us,
            onEdgeEndpointDown: Ia,
            onKinkHandleDown: Ca,
            edgePreview: nt,
            edgeReconnect: yt,
            eraserMarkedIds: Or.size > 0 ? Or : void 0,
            eraserTrail: cs.length > 1 ? cs : void 0,
            laserTrail: ds.length > 1 ? ds : void 0,
            mode: m,
            hoveredNodeId: ne,
            registry: o,
            onPortHandleDown: Sa,
            cycleNodeIds: r && fs >= 0 ? r.cycleNodeIds : void 0,
            containerTypes: t.containerTypes,
            alignGuides: N
          }
        ),
        _t && (() => {
          const w = t.selectionGroupId(), A = w ? t.groupRotations.get(w) : void 0;
          let C, F, S, D;
          if (be)
            C = be.bounds, F = be.angle, S = be.cx, D = be.cy;
          else if (A && A.angle !== 0) {
            const P = -A.angle * Math.PI / 180, G = Math.cos(P), Z = Math.sin(P);
            let U = 1 / 0, lt = 1 / 0, at = -1 / 0, wt = -1 / 0;
            for (const St of t.selection) {
              const xt = t.getNode(St);
              if (!xt || xt.type === "edge") continue;
              const zt = xt.h === "auto" ? et[xt.id] ?? 100 : xt.h, Xt = xt.x + xt.w / 2, Ht = xt.y + zt / 2, pt = Xt - A.cx, Lt = Ht - A.cy, gt = A.cx + pt * G - Lt * Z, Gt = A.cy + pt * Z + Lt * G;
              U = Math.min(U, gt - xt.w / 2), lt = Math.min(lt, Gt - zt / 2), at = Math.max(at, gt + xt.w / 2), wt = Math.max(wt, Gt + zt / 2);
            }
            C = {
              x: U - Jt,
              y: lt - Jt,
              w: at - U + Jt * 2,
              h: wt - lt + Jt * 2
            }, F = A.angle, S = A.cx, D = A.cy;
          } else
            C = _t, F = 0, S = 0, D = 0;
          const T = 8 / a.zoom, E = T / 2, L = [
            { pos: "nw", cx: C.x, cy: C.y },
            { pos: "n", cx: C.x + C.w / 2, cy: C.y },
            { pos: "ne", cx: C.x + C.w, cy: C.y },
            { pos: "e", cx: C.x + C.w, cy: C.y + C.h / 2 },
            { pos: "se", cx: C.x + C.w, cy: C.y + C.h },
            { pos: "s", cx: C.x + C.w / 2, cy: C.y + C.h },
            { pos: "sw", cx: C.x, cy: C.y + C.h },
            { pos: "w", cx: C.x, cy: C.y + C.h / 2 }
          ], W = F !== 0 ? ` rotate(${F}, ${S}, ${D})` : "";
          return /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ v("g", { transform: W, children: [
                /* @__PURE__ */ u(
                  "rect",
                  {
                    x: C.x,
                    y: C.y,
                    width: C.w,
                    height: C.h,
                    fill: "none",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / a.zoom
                  }
                ),
                F === 0 && L.map(({ pos: P, cx: G, cy: Z }) => /* @__PURE__ */ u(
                  "rect",
                  {
                    x: G - E,
                    y: Z - E,
                    width: T,
                    height: T,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / a.zoom,
                    style: { cursor: Dr(P, F), pointerEvents: "auto" },
                    onPointerDown: (U) => {
                      U.stopPropagation(), Ta(P, U);
                    }
                  },
                  P
                )),
                (() => {
                  const P = 25 / a.zoom, G = C.x + C.w / 2, Z = C.y;
                  return /* @__PURE__ */ v(ut, { children: [
                    /* @__PURE__ */ u(
                      "line",
                      {
                        x1: G,
                        y1: Z,
                        x2: G,
                        y2: Z - P,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / a.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const U = 8 / a.zoom, lt = U / 2;
                      return /* @__PURE__ */ u(
                        "rect",
                        {
                          x: G - lt,
                          y: Z - P - lt,
                          width: U,
                          height: U,
                          rx: 1.5 / a.zoom,
                          transform: `rotate(45, ${G}, ${Z - P})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / a.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (at) => za(at)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const P = 26 / a.zoom, G = 42 / a.zoom, Z = 4 / a.zoom;
                  return [
                    { side: "top", cx: C.x + C.w / 2, cy: C.y - G },
                    { side: "right", cx: C.x + C.w + P, cy: C.y + C.h / 2 },
                    { side: "bottom", cx: C.x + C.w / 2, cy: C.y + C.h + P },
                    { side: "left", cx: C.x - P, cy: C.y + C.h / 2 }
                  ].map(({ side: lt, cx: at, cy: wt }) => /* @__PURE__ */ u(
                    "circle",
                    {
                      cx: at,
                      cy: wt,
                      r: Z,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / a.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (St) => {
                        St.stopPropagation();
                        const xt = va(lt);
                        xt && us(xt, lt, St);
                      }
                    },
                    `conn-${lt}`
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
            children: /* @__PURE__ */ u("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ u(
              "rect",
              {
                x: Re.x,
                y: Re.y,
                width: Re.w,
                height: Re.h,
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
        ue && (() => {
          const w = t.canvasToScreen(ue.startX, ue.startY), A = t.canvasToScreen(ue.endX, ue.endY), C = Math.min(w.x, A.x), F = Math.min(w.y, A.y), S = Math.abs(A.x - w.x), D = Math.abs(A.y - w.y);
          return S < 2 && D < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u(
                "rect",
                {
                  x: C,
                  y: F,
                  width: S,
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
        _e && _e.length > 2 && (() => {
          const A = _e.map(([C, F]) => t.canvasToScreen(C, F)).map((C) => `${C.x},${C.y}`).join(" ");
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
        st && (() => {
          const w = Math.min(st.startX, st.endX), A = Math.min(st.startY, st.endY), C = Math.abs(st.endX - st.startX), F = Math.abs(st.endY - st.startY);
          return C < 2 && F < 2 ? null : /* @__PURE__ */ u(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ u("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ u(
                "rect",
                {
                  x: w,
                  y: A,
                  width: C,
                  height: F,
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
        fe && /* @__PURE__ */ u(
          lh,
          {
            x: fe.x,
            y: fe.y,
            sections: fe.sections,
            onClose: () => Se(null)
          }
        ),
        ar && /* @__PURE__ */ u(
          oh,
          {
            nodes: ar.nodes,
            onSave: (w) => {
              Zd(w, ar.nodes, ar.groupParent), Yr(null);
            },
            onCancel: () => Yr(null)
          }
        )
      ]
    }
  );
}
const nr = 52, Ko = 270, xf = nr + Ko, Hh = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], $n = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Oh = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], _n = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Xh = [1, 2.5, 5, 10, 20], ya = [14, 20, 28, 36], ts = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Yh = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], we = [
  { name: "Standard", colors: Hh },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], es = we, Gh = [
  { name: "Standard", colors: Yh },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Et = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Wt = {
  width: 52,
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
}, jh = {
  fontSize: 9,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  padding: "4px 0 2px",
  marginTop: 4
}, Vh = "https://libraries.excalidraw.com/libraries.json", Tn = "https://libraries.excalidraw.com/libraries";
function Zh({
  onClose: t,
  onInstalled: e
}) {
  const o = $t(), [r, n] = tt([]), [s, i] = tt(!0), [l, a] = tt(null), [c, h] = tt(""), [f, d] = tt(null), [p, m] = tt(/* @__PURE__ */ new Set()), y = it(() => {
    const x = ji(), z = new Set(x.map((I) => I.source));
    m(z);
  }, []);
  mt(() => {
    let x = !1;
    return (async () => {
      try {
        const z = await fetch(Vh);
        if (!z.ok) throw new Error(`HTTP ${z.status}`);
        const I = await z.json();
        x || (n(I), i(!1));
      } catch (z) {
        x || (a(String(z)), i(!1));
      }
    })(), y(), () => {
      x = !0;
    };
  }, [y]);
  const b = qt(() => {
    if (!c.trim()) return r;
    const x = c.toLowerCase();
    return r.filter(
      (z) => {
        var I, M;
        return z.name.toLowerCase().includes(x) || ((I = z.description) == null ? void 0 : I.toLowerCase().includes(x)) || ((M = z.itemNames) == null ? void 0 : M.some((j) => j.toLowerCase().includes(x)));
      }
    );
  }, [r, c]), g = it(
    async (x) => {
      d(x.id);
      try {
        const z = `${Tn}/${x.source}`;
        await Ed(z, x.name), y(), e();
      } catch (z) {
        console.error("Failed to install library:", z);
      } finally {
        d(null);
      }
    },
    [e, y]
  );
  return fo(
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
            onPointerDown: (x) => x.stopPropagation(),
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
              /* @__PURE__ */ v(
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
                          "Failed to load directory: ",
                          l
                        ]
                      }
                    ),
                    !s && !l && b.length === 0 && /* @__PURE__ */ u(
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
                    b.map((x, z) => {
                      const I = p.has(
                        `${Tn}/${x.source}`
                      ), M = f === x.id;
                      return /* @__PURE__ */ u(
                        Uh,
                        {
                          entry: x,
                          isInstalled: I,
                          isInstalling: M,
                          onInstall: () => g(x),
                          theme: o
                        },
                        x.id || `dir-${z}`
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
                    b.length,
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
function Uh({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var i;
  const s = t.preview ? `${Tn}/${t.preview}` : null;
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
          ((i = t.authors) == null ? void 0 : i.length) > 0 && /* @__PURE__ */ v(
            "div",
            {
              style: {
                fontSize: 10,
                color: n.textMuted,
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
            children: e ? "Installed" : o ? "Installing..." : "Install"
          }
        )
      ]
    }
  );
}
const qh = [
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
], Fo = {
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
function No({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...Ot })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...Ot }),
    t === "text" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M7 4h10", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M12 4v16", ...Ot })
    ] }),
    t === "note" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...Ot }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...Ot, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...Ot, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...Ot, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...Ot })
    ] }),
    t === "erase" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...Ot })
    ] }),
    t === "laser" && /* @__PURE__ */ u("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ u("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...Ot, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...Ot, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...Ot, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...Ot, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...Ot, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...Ot })
    ] }),
    t === "fit" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...Ot })
    ] }),
    t === "paper" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...Ot }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...Ot, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...Ot, opacity: 0.4 }),
      /* @__PURE__ */ u("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...Ot, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...Ot }),
      /* @__PURE__ */ u("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...Ot })
    ] }),
    t === "library" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...Ot }),
      /* @__PURE__ */ u("path", { d: "M8 7h6", ...Ot, opacity: 0.5 }),
      /* @__PURE__ */ u("path", { d: "M8 11h4", ...Ot, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...Ot }),
      /* @__PURE__ */ u("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] })
  ] });
}
const Kh = {
  light: "Light",
  dark: "Dark",
  textured: "Textured"
};
function Qh({
  engine: t,
  background: e
}) {
  const o = $t(), [r, n] = tt(!1), s = ct(null), i = ct(null);
  mt(() => {
    if (!r) return;
    const c = (h) => {
      i.current && !i.current.contains(h.target) && s.current && !s.current.contains(h.target) && n(!1);
    };
    return document.addEventListener("pointerdown", c), () => document.removeEventListener("pointerdown", c);
  }, [r]);
  const l = Qo.find((c) => c.key === e) ?? Qo[1], a = r && s.current ? (() => {
    const c = s.current.getBoundingClientRect();
    return fo(
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
            const f = Qo.filter((d) => d.group === h);
            return f.length === 0 ? null : /* @__PURE__ */ v("div", { style: { marginBottom: 6 }, children: [
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
                  children: Kh[h]
                }
              ),
              f.map((d) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    t.setBoardBackground(d.key), n(!1);
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
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ v(
      "button",
      {
        ref: s,
        title: "Paper type",
        onClick: () => n((c) => !c),
        style: {
          ...Fo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: r ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ u(No, { name: "paper" }),
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
function Jh({ engine: t }) {
  const e = $t(), [o, r] = tt(!1), n = ct(null), s = ct(null);
  mt(() => {
    if (!o) return;
    const l = (a) => {
      s.current && !s.current.contains(a.target) && n.current && !n.current.contains(a.target) && r(!1);
    };
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, [o]);
  const i = o && n.current ? (() => {
    const l = n.current.getBoundingClientRect();
    return fo(
      /* @__PURE__ */ v(
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
            pi.map((a) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => {
                  const c = typeof window < "u" ? window : void 0;
                  if (!c) return;
                  const h = c.innerWidth / 2, f = c.innerHeight / 2, d = Ro(t.viewport, h, f);
                  t.applyTemplate(a.id, d.x, d.y), r(!1);
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
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: n,
        title: "Templates",
        onClick: () => r((l) => !l),
        style: {
          ...Fo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: o ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(No, { name: "template" })
      }
    ),
    i
  ] });
}
function $h({ engine: t }) {
  const e = $t(), [o, r] = tt(!1), [n, s] = tt(!1), i = ct(null), [l, a] = tt(null), c = it(() => {
    r((d) => (!d && i.current && a(i.current.getBoundingClientRect()), !d));
  }, []), h = it(() => r(!1), []), f = it(() => {
    s(!0);
  }, []);
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: i,
        title: "Libraries",
        onClick: c,
        style: {
          ...Fo,
          width: 40,
          height: 40,
          borderRadius: e.controlBorderRadius,
          background: o ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ u(No, { name: "library" })
      }
    ),
    /* @__PURE__ */ u(
      Qd,
      {
        engine: t,
        open: o,
        onClose: h,
        triggerRect: l,
        onBrowseDirectory: f
      }
    ),
    n && /* @__PURE__ */ u(
      Zh,
      {
        onClose: () => s(!1),
        onInstalled: () => {
          r(!1), setTimeout(() => {
            i.current && a(i.current.getBoundingClientRect()), r(!0);
          }, 100);
        }
      }
    )
  ] });
}
function _h({ engine: t, baseUrl: e }) {
  const o = $t(), [r, n] = tt(!1), s = ct(null), [i, l] = tt(null), a = it(() => {
    n((h) => (!h && s.current && l(s.current.getBoundingClientRect()), !h));
  }, []), c = it(() => n(!1), []);
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      "button",
      {
        ref: s,
        title: "GIF Search",
        onClick: a,
        style: {
          ...Fo,
          width: 40,
          height: 40,
          borderRadius: o.controlBorderRadius,
          background: r ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ u(No, { name: "gif" })
      }
    ),
    /* @__PURE__ */ u(
      th,
      {
        engine: t,
        open: r,
        onClose: c,
        triggerRect: i,
        baseUrl: e
      }
    )
  ] });
}
function tu({ engine: t, gifApiBaseUrl: e }) {
  const o = $t(), [r, n] = tt(t.mode), [s, i] = tt(t.boardBackground), [l, a] = tt(t.lassoSelect);
  return mt(() => {
    const c = () => n(t.mode), h = () => i(t.boardBackground), f = () => a(t.lassoSelect);
    return t.on("mode", c), t.on("background", h), t.on("lassoToggle", f), () => {
      t.off("mode", c), t.off("background", h), t.off("lassoToggle", f);
    };
  }, [t]), /* @__PURE__ */ v(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: nr,
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
        qh.map((c) => {
          const h = r === c.key && !(c.key === "select" && l);
          return /* @__PURE__ */ v(
            "button",
            {
              title: `${c.label} (${c.shortcut}${c.num ? ` / ${c.num}` : ""})`,
              onClick: () => {
                l && (t.toggleLassoSelect(), a(!1)), t.setMode(c.key);
              },
              style: {
                ...Fo,
                width: 40,
                height: 40,
                borderRadius: o.controlBorderRadius,
                background: h ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ u(No, { name: c.key }),
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
        /* @__PURE__ */ v(
          "button",
          {
            title: "Lasso Select (L)",
            onClick: () => {
              l ? (t.toggleLassoSelect(), a(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), a(!0));
            },
            style: {
              ...Fo,
              width: 40,
              height: 40,
              borderRadius: o.controlBorderRadius,
              background: l ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ u(No, { name: "lasso" }),
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
        /* @__PURE__ */ u(Qh, { engine: t, background: s }),
        /* @__PURE__ */ u(Jh, { engine: t }),
        /* @__PURE__ */ u($h, { engine: t }),
        e && /* @__PURE__ */ u(_h, { engine: t, baseUrl: e })
      ]
    }
  );
}
const eu = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), ou = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function _s(t) {
  return t.data.opacity ?? 1;
}
function So(t, e) {
  return t.data[e];
}
function ru(t) {
  const e = {}, o = t.filter((n) => eu.has(n.type));
  if (o.length > 0) {
    const n = _s(o[0]), s = o.every((i) => _s(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => ou.has(n.type));
  if (r.length > 0) {
    const n = So(r[0], "borderColor"), s = r.every(
      (h) => So(h, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = So(r[0], "borderWidth") ?? 1, l = r.every(
      (h) => (So(h, "borderWidth") ?? 1) === i
    );
    e.borderWidth = l ? i : "mixed";
    const a = So(r[0], "borderStyle") ?? "solid", c = r.every(
      (h) => (So(h, "borderStyle") ?? "solid") === a
    );
    e.borderStyle = c ? a : "mixed";
  }
  return e;
}
function nu(t) {
  const [e, o] = tt(t.mode), [r, n] = tt(new Set(t.selection)), [, s] = tt(0);
  if (mt(() => {
    const h = () => o(t.mode), f = () => {
      n(new Set(t.selection)), s((p) => p + 1);
    }, d = () => s((p) => p + 1);
    return t.on("mode", h), t.on("selection", f), t.on("change", d), () => {
      t.off("mode", h), t.off("selection", f), t.off("change", d);
    };
  }, [t]), r.size === 0)
    return e === "draw" || e === "shape" || e === "text" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const h of r) {
    const f = t.getNode(h);
    f && i.push(f);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const l = /* @__PURE__ */ new Map();
  for (const h of i) {
    const f = l.get(h.type);
    f ? f.push(h) : l.set(h.type, [h]);
  }
  const a = [];
  for (const [h, f] of l)
    a.push({ type: h, nodes: f });
  const c = ru(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: a },
    commonProps: c
  };
}
const Nr = fi(null);
function Te(t, e) {
  const o = Ar(Nr);
  return it(
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
function ke({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = $t(), n = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ v("div", { style: Et, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Opacity" }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "range",
        min: 0,
        max: 100,
        value: n,
        onChange: (s) => e(parseInt(s.target.value) / 100),
        style: { flex: 1, accentColor: r.accentColor }
      }
    ),
    /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10, color: o ? r.textFaint : r.text }, children: o ? "--" : n })
  ] });
}
const su = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function ye({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = $t(), [l, a] = tt(""), [c, h] = tt(0), [f, d] = tt(!1), p = ct(null), m = e[c] ?? e[0], y = o == null ? void 0 : o.toLowerCase();
  mt(() => {
    if (!f) return;
    const x = (z) => {
      p.current && !p.current.contains(z.target) && d(!1);
    };
    return document.addEventListener("mousedown", x), () => document.removeEventListener("mousedown", x);
  }, [f]);
  const b = () => {
    const x = l.trim();
    if (!x) return;
    const z = x.startsWith("#") ? x : `#${x}`;
    su.test(z) && (r(z), a(""));
  }, g = e.some(
    (x) => x.colors.some((z) => z.toLowerCase() === y)
  );
  return /* @__PURE__ */ v("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
    /* @__PURE__ */ v("div", { style: { ...Et, margin: 0, flexWrap: "wrap", gap: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: i.textMuted }, children: t }),
      n && /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r(null),
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
      m.colors.map((x) => {
        const z = !s && y === x.toLowerCase();
        return /* @__PURE__ */ u(
          "button",
          {
            onClick: () => r(x),
            style: {
              ...Ut,
              width: 20,
              height: 20,
              background: x,
              border: z ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
              borderRadius: "50%"
            }
          },
          x
        );
      }),
      o && !g && !s && /* @__PURE__ */ u(
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
      e.length > 1 && /* @__PURE__ */ v("div", { ref: p, style: { position: "relative", marginLeft: "auto" }, children: [
        /* @__PURE__ */ v(
          "button",
          {
            onClick: () => d((x) => !x),
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
              m.name,
              /* @__PURE__ */ u("span", { style: { fontSize: 7 }, children: f ? "▲" : "▼" })
            ]
          }
        ),
        f && /* @__PURE__ */ u(
          "div",
          {
            style: {
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: 2,
              background: i.panelBg,
              border: `1px solid ${i.border}`,
              borderRadius: i.panelBorderRadius,
              padding: 4,
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 120,
              boxShadow: i.panelShadow
            },
            children: e.map((x, z) => /* @__PURE__ */ v(
              "button",
              {
                onClick: () => {
                  h(z), d(!1);
                },
                style: {
                  ...Ut,
                  height: 28,
                  padding: "0 8px",
                  background: z === c ? i.controlBgActive : "transparent",
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
                  /* @__PURE__ */ u("span", { style: { display: "flex", gap: 2 }, children: x.colors.slice(0, 6).map((I) => /* @__PURE__ */ u(
                    "span",
                    {
                      style: {
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: I,
                        display: "inline-block"
                      }
                    },
                    I
                  )) }),
                  /* @__PURE__ */ u("span", { children: x.name })
                ]
              },
              x.name
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ u("div", { style: { display: "flex", alignItems: "center", gap: 4, paddingLeft: 52 }, children: /* @__PURE__ */ u(
      "input",
      {
        type: "text",
        value: l,
        onChange: (x) => a(x.target.value),
        onKeyDown: (x) => {
          x.key === "Enter" && b();
        },
        onBlur: b,
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
function Ho({
  label: t,
  value: e,
  onChange: o,
  mixed: r
}) {
  const n = $t();
  return /* @__PURE__ */ v("div", { style: Et, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: n.textMuted }, children: t }),
    Oh.map((s) => /* @__PURE__ */ u(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...Ut,
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
function Oo({
  label: t,
  widths: e = Xh,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = $t();
  return /* @__PURE__ */ v("div", { style: Et, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: s.textMuted }, children: t }),
    e.map((i) => /* @__PURE__ */ u(
      "button",
      {
        title: `${i}px`,
        onClick: () => r(i),
        style: {
          ...Ut,
          width: 36,
          height: 24,
          background: !n && o === i ? s.controlBgActive : s.controlBg,
          borderRadius: s.controlBorderRadius
        },
        children: /* @__PURE__ */ u(
          "div",
          {
            style: {
              width: 20,
              height: Math.max(i, 1),
              background: s.text,
              borderRadius: i / 2
            }
          }
        )
      },
      i
    ))
  ] });
}
function sr({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      ye,
      {
        label: "Border",
        palettes: we,
        value: t,
        onChange: (s) => n("borderColor", s ?? void 0),
        allowNull: !0,
        mixed: r == null ? void 0 : r.color
      }
    ),
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u(
        Ho,
        {
          label: "Style",
          value: e ?? "solid",
          onChange: (s) => n("borderStyle", s),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ u(
        Oo,
        {
          label: "Width",
          value: o ?? 1,
          onChange: (s) => n("borderWidth", s),
          mixed: r == null ? void 0 : r.width
        }
      )
    ] })
  ] });
}
function os({ style: t }) {
  const e = $t();
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
const iu = /* @__PURE__ */ v("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ u("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ u("path", { d: "m21 21-4.35-4.35" })
] });
function Br({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var x, z;
  const n = $t(), [s, i] = tt(!1), [l, a] = tt(""), c = ct(null), h = ct(null), [f, d] = tt(null), p = l.trim().toLowerCase(), m = qt(
    () => o.filter((I) => I.toLowerCase().includes(p)),
    [o, p]
  ), y = qt(
    () => xr.filter(
      (I) => !o.includes(I.key) && (I.key.toLowerCase().includes(p) || I.label.toLowerCase().includes(p))
    ),
    [o, p]
  );
  mt(() => {
    if (!s || !h.current) return;
    const I = h.current.getBoundingClientRect(), M = 260, j = 16;
    let X = I.left;
    X + M > window.innerWidth - j && (X = window.innerWidth - M - j), X < j && (X = j), d({ top: I.bottom + 4, left: X });
  }, [s]), mt(() => {
    var j;
    if (!s) return;
    const I = (X) => {
      var dt, H;
      const N = X.target;
      if ((dt = c.current) != null && dt.contains(N)) return;
      const J = (((H = c.current) == null ? void 0 : H.ownerDocument) ?? document).getElementById("font-picker-popover");
      J != null && J.contains(N) || i(!1);
    }, M = ((j = c.current) == null ? void 0 : j.ownerDocument) ?? document;
    return M.addEventListener("mousedown", I), () => M.removeEventListener("mousedown", I);
  }, [s]);
  const b = (I) => {
    e(I), i(!1), a("");
  }, g = (I, M) => {
    const j = (M == null ? void 0 : M.label) ?? I, X = M == null ? void 0 : M.category, N = t === I;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => b(I),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: N ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: Ze(I),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (_) => {
          N || (_.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (_) => {
          N || (_.currentTarget.style.background = "transparent");
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
              children: kl(X)
            }
          ),
          /* @__PURE__ */ u("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: j })
        ]
      },
      I
    );
  };
  return /* @__PURE__ */ v("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ v(
      "button",
      {
        ref: h,
        type: "button",
        onClick: () => i((I) => !I),
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
          fontFamily: Ze(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ u("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((x = xr.find((I) => I.key === t)) == null ? void 0 : x.label) ?? t }),
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
    s && f && fo(
      /* @__PURE__ */ v(
        "div",
        {
          id: "font-picker-popover",
          style: {
            position: "fixed",
            top: f.top,
            left: f.left,
            width: 260,
            maxHeight: Math.min(320, window.innerHeight - f.top - 16),
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
                  /* @__PURE__ */ u("span", { style: { color: "#64748b", display: "flex" }, children: iu }),
                  /* @__PURE__ */ u(
                    "input",
                    {
                      type: "text",
                      placeholder: "Quick search",
                      value: l,
                      onChange: (I) => a(I.target.value),
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
                m.map((I) => g(I, xr.find((M) => M.key === I)))
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
                y.length > 0 ? y.map((I) => g(I.key, I)) : /* @__PURE__ */ u(
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
      (((z = c.current) == null ? void 0 : z.ownerDocument) ?? document).body
    )
  ] });
}
function rs({ name: t, size: e = 16 }) {
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
const au = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], lu = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function cu({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function so(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function du({ engine: t, node: e, fontsInScene: o }) {
  const r = $t(), n = Te(t, e), s = Ar(Nr) ?? [e], { data: i } = e, l = i.fill ?? null, a = i.fillStyle ?? "hachure", c = i.strokeStyle ?? "solid", h = so(s, (g) => g.data.stroke), f = so(s, (g) => g.data.fill ?? null), d = so(s, (g) => g.data.fillStyle ?? "hachure"), p = so(s, (g) => g.data.strokeStyle ?? "solid"), m = so(s, (g) => g.data.strokeWidth), y = so(s, (g) => g.data.roughness), b = so(s, (g) => g.data.opacity ?? 1);
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Shape" }),
      lu.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => n({ shape: g.key }),
          style: {
            ...Ut,
            width: 28,
            height: 28,
            background: i.shape === g.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ u(cu, { name: g.key })
        },
        g.key
      ))
    ] }),
    (i.shape === "rect" || i.shape === "diamond") && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => n({ edgeStyle: g.key === "sharp" ? void 0 : g.key }),
          style: {
            ...Ut,
            width: 28,
            height: 28,
            background: (i.edgeStyle ?? "sharp") === g.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ u(rs, { name: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Label" }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: i.label ?? "",
          placeholder: "Add label...",
          onChange: (g) => n({ label: g.target.value || void 0 }),
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
    ] }),
    i.label && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Font" }),
      /* @__PURE__ */ u(
        Br,
        {
          value: i.labelFontFamily ?? "Excalifont",
          onChange: (g) => n({ labelFontFamily: g === "Excalifont" ? void 0 : g }),
          fontsInScene: o
        }
      )
    ] }),
    i.label && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Size" }),
      au.map((g) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => n({ labelFontSize: g.size === 14 ? void 0 : g.size }),
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: (i.labelFontSize ?? 14) === g.size ? r.controlBgActive : r.controlBg,
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
    i.label && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Align" }),
      ts.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.key,
          onClick: () => n({ labelAlign: g.key === "center" ? void 0 : g.key }),
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: (i.labelAlign ?? "center") === g.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 12,
            borderRadius: r.controlBorderRadius
          },
          children: g.label
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ye,
      {
        label: "Stroke",
        palettes: we,
        value: h ? void 0 : i.stroke,
        mixed: h,
        onChange: (g) => n({ stroke: g })
      }
    ),
    /* @__PURE__ */ u(
      ye,
      {
        label: "Fill",
        palettes: es,
        value: f ? void 0 : l,
        mixed: f,
        onChange: (g) => n({ fill: g ?? void 0 }),
        allowNull: !0
      }
    ),
    l && !f && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Fill pattern" }),
      $n.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => n({ fillStyle: g.key }),
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: !d && a === g.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ u(os, { style: g.key })
        },
        g.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ho,
      {
        label: "Stroke style",
        value: c,
        mixed: p,
        onChange: (g) => n({ strokeStyle: g })
      }
    ),
    /* @__PURE__ */ u(
      Oo,
      {
        label: "Stroke width",
        value: i.strokeWidth,
        mixed: m,
        onChange: (g) => n({ strokeWidth: g })
      }
    ),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Roughness" }),
      _n.map((g) => /* @__PURE__ */ u(
        "button",
        {
          title: g.label,
          onClick: () => n({ roughness: g.value }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 8px",
            background: !y && i.roughness === g.value ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: g.label
        },
        g.value
      ))
    ] }),
    /* @__PURE__ */ u(
      ke,
      {
        value: i.opacity ?? 1,
        mixed: b,
        onChange: (g) => n({ opacity: g })
      }
    )
  ] });
}
function Mo(t, e) {
  if (t.length < 2) return !1;
  const o = e(t[0]);
  return !t.every((r) => e(r) === o);
}
function hu({ engine: t, node: e }) {
  const o = $t(), r = Te(t, e), n = Ar(Nr) ?? [e], { data: s } = e, i = s.fill ?? null, l = s.fillStyle ?? "hachure", a = s.strokeStyle ?? "solid", c = Mo(n, (y) => y.data.color), h = Mo(n, (y) => y.data.fill ?? null), f = Mo(n, (y) => y.data.fillStyle ?? "hachure"), d = Mo(n, (y) => y.data.strokeStyle ?? "solid"), p = Mo(n, (y) => y.data.strokeWidth), m = Mo(n, (y) => y.data.opacity ?? 1);
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      ye,
      {
        label: "Stroke",
        palettes: we,
        value: c ? void 0 : s.color,
        mixed: c,
        onChange: (y) => r({ color: y })
      }
    ),
    /* @__PURE__ */ u(
      ye,
      {
        label: "Fill",
        palettes: es,
        value: h ? void 0 : i,
        mixed: h,
        onChange: (y) => r({ fill: y ?? void 0 }),
        allowNull: !0
      }
    ),
    i && !h && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Fill pattern" }),
      $n.map((y) => /* @__PURE__ */ u(
        "button",
        {
          title: y.label,
          onClick: () => r({ fillStyle: y.key }),
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: !f && l === y.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(os, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ho,
      {
        label: "Stroke style",
        value: a,
        mixed: d,
        onChange: (y) => r({ strokeStyle: y })
      }
    ),
    /* @__PURE__ */ u(
      Oo,
      {
        label: "Stroke width",
        value: s.strokeWidth,
        mixed: p,
        onChange: (y) => r({ strokeWidth: y })
      }
    ),
    /* @__PURE__ */ u(
      ke,
      {
        value: s.opacity ?? 1,
        mixed: m,
        onChange: (y) => r({ opacity: y })
      }
    )
  ] });
}
function uu({ engine: t, node: e, fontsInScene: o }) {
  const r = $t(), n = Te(t, e), { data: s } = e;
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Font" }),
      /* @__PURE__ */ u(
        Br,
        {
          value: s.fontFamily,
          onChange: (i) => n({ fontFamily: i }),
          fontsInScene: o
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Size" }),
      ya.map((i) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => n({ fontSize: i }),
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: s.fontSize === i ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            borderRadius: r.controlBorderRadius
          },
          children: i
        },
        i
      ))
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Align" }),
      ts.map((i) => /* @__PURE__ */ u(
        "button",
        {
          title: i.key,
          onClick: () => n({ align: i.key }),
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: s.align === i.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 12,
            borderRadius: r.controlBorderRadius
          },
          children: i.label
        },
        i.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ye,
      {
        label: "Color",
        palettes: we,
        value: s.color,
        onChange: (i) => n({ color: i })
      }
    ),
    /* @__PURE__ */ u(
      sr,
      {
        borderColor: s.borderColor ?? null,
        borderStyle: s.borderStyle,
        borderWidth: s.borderWidth,
        onChange: (i, l) => n({ [i]: l })
      }
    ),
    /* @__PURE__ */ u(
      ke,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function fu({ engine: t, node: e }) {
  const o = $t(), r = Te(t, e), { data: n } = e;
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      ye,
      {
        label: "Color",
        palettes: we,
        value: n.color,
        onChange: (s) => r({ color: s })
      }
    ),
    /* @__PURE__ */ u(
      Ho,
      {
        label: "Style",
        value: n.style,
        onChange: (s) => r({ style: s })
      }
    ),
    /* @__PURE__ */ u(
      Oo,
      {
        label: "Width",
        value: n.strokeWidth,
        onChange: (s) => r({ strokeWidth: s })
      }
    ),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Roughness" }),
      _n.map((s) => /* @__PURE__ */ u(
        "button",
        {
          title: s.label,
          onClick: () => r({ roughness: s.value }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 8px",
            background: (n.roughness ?? 0) === s.value ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: s.label
        },
        s.value
      ))
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Head" }),
      ["none", "arrow", "filled", "dot"].map((s) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r({ arrowHead: s }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 6px",
            background: (n.arrowHead ?? "none") === s ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 11,
            borderRadius: o.controlBorderRadius
          },
          children: s === "none" ? "None" : s === "arrow" ? "▷" : s === "filled" ? "▶" : "●"
        },
        s
      ))
    ] }),
    (n.arrowHead ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Head size" }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "range",
          min: 4,
          max: 40,
          step: 1,
          value: n.arrowHeadSize ?? Math.max(8, n.strokeWidth * 3),
          onChange: (s) => r({ arrowHeadSize: Number(s.target.value) }),
          style: { flex: 1, accentColor: o.accentColor }
        }
      ),
      /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: n.arrowHeadSize ?? Math.max(8, n.strokeWidth * 3) })
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Tail" }),
      ["none", "arrow", "filled", "dot"].map((s) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r({ arrowTail: s }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 6px",
            background: (n.arrowTail ?? "none") === s ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 11,
            borderRadius: o.controlBorderRadius
          },
          children: s === "none" ? "None" : s === "arrow" ? "◁" : s === "filled" ? "◀" : "●"
        },
        s
      ))
    ] }),
    (n.arrowTail ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Tail size" }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "range",
          min: 4,
          max: 40,
          step: 1,
          value: n.arrowTailSize ?? Math.max(8, n.strokeWidth * 3),
          onChange: (s) => r({ arrowTailSize: Number(s.target.value) }),
          style: { flex: 1, accentColor: o.accentColor }
        }
      ),
      /* @__PURE__ */ u("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: n.arrowTailSize ?? Math.max(8, n.strokeWidth * 3) })
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Label" }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: n.label ?? "",
          onChange: (s) => r({ label: s.target.value || void 0 }),
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
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Path" }),
      [
        { key: "bezier", label: "Bezier" },
        { key: "straight", label: "Straight" },
        { key: "smoothstep", label: "Smooth" },
        { key: "step", label: "Step" }
      ].map((s) => /* @__PURE__ */ u(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeType: s.key }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 6px",
            background: (n.edgeType ?? "bezier") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: s.label
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Animate" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r({ animated: !n.animated }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 12px",
            background: n.animated ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 11,
            borderRadius: o.controlBorderRadius
          },
          children: n.animated ? "On" : "Off"
        }
      )
    ] }),
    n.animated && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Direction" }),
      ["forward", "reverse", "both"].map((s) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r({ animatedDirection: s }),
          style: {
            ...Ut,
            height: 28,
            padding: "0 6px",
            background: (n.animatedDirection ?? "forward") === s ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 10,
            borderRadius: o.controlBorderRadius
          },
          children: s === "forward" ? "→" : s === "reverse" ? "←" : "⇆"
        },
        s
      ))
    ] })
  ] });
}
function pu({ engine: t, node: e }) {
  const o = $t(), [r, n] = tt("idle"), s = Te(t, e), { data: i } = e, l = !!i.crop;
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      sr,
      {
        borderColor: i.borderColor ?? null,
        borderStyle: i.borderStyle,
        borderWidth: i.borderWidth,
        onChange: (a, c) => s({ [a]: c })
      }
    ),
    /* @__PURE__ */ v("div", { style: { ...Et, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Crop" }),
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
    /* @__PURE__ */ v("div", { style: { ...Et, marginTop: 4 }, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Background" }),
      /* @__PURE__ */ u(
        "button",
        {
          onClick: async () => {
            if (r !== "loading") {
              n("loading");
              try {
                const { removeBackground: a } = await import("@imgly/background-removal"), h = await (await fetch(i.src)).blob(), f = await a(h), d = new FileReader(), p = await new Promise((m, y) => {
                  d.onload = () => m(d.result), d.onerror = y, d.readAsDataURL(f);
                });
                s({ src: p }), n("idle");
              } catch (a) {
                console.error("Background removal failed:", a), n("error"), setTimeout(() => n("idle"), 3e3);
              }
            }
          },
          disabled: r === "loading",
          style: {
            ...Ut,
            height: 28,
            padding: "0 10px",
            background: r === "error" ? o.error : o.controlBg,
            color: o.text,
            fontSize: 10,
            borderRadius: o.controlBorderRadius,
            gap: 4,
            opacity: r === "loading" ? 0.6 : 1
          },
          children: r === "loading" ? "Removing..." : r === "error" ? "Failed" : "Remove BG"
        }
      )
    ] }),
    /* @__PURE__ */ u(
      ke,
      {
        value: i.opacity ?? 1,
        onChange: (a) => s({ opacity: a })
      }
    )
  ] });
}
function yu({ engine: t, node: e }) {
  const o = $t(), r = Te(t, e), { data: n } = e;
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      sr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ v("div", { style: Et, children: [
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
            ...Ut,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(rs, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ke,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
const Jo = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, mu = Dh();
function bu({
  value: t,
  onChange: e,
  theme: o
}) {
  const [r, n] = tt(String(t));
  mt(() => n(String(t)), [t]);
  const s = () => {
    const i = parseInt(r, 10);
    !isNaN(i) && i >= 100 && i <= 5e3 ? e(i) : n(String(t));
  };
  return /* @__PURE__ */ v("div", { style: Et, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Duration" }),
    /* @__PURE__ */ u(
      "input",
      {
        type: "number",
        min: 100,
        max: 5e3,
        step: 50,
        value: r,
        onChange: (i) => n(i.target.value),
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
function gu({ engine: t, node: e }) {
  const o = $t(), r = Te(t, e), { data: n } = e, s = it(
    (l) => {
      var d;
      if (!l) {
        r({ devicePreset: void 0 });
        return;
      }
      const a = zn(l);
      if (!a) return;
      const c = pa(a), h = Math.round(e.w / c), f = { devicePreset: l };
      (!n.label || ((d = zn(n.devicePreset ?? "")) == null ? void 0 : d.label) === n.label) && (f.label = a.label), r(f), t.updateNodeWithHistory(e.id, { h });
    },
    [t, e, n.label, n.devicePreset, r]
  ), i = qt(() => {
    const l = t.getAllNodes().filter((d) => d.type === "frame"), a = l.length, c = /* @__PURE__ */ new Set();
    for (const d of l)
      d.id !== e.id && d.data.slideOrder != null && c.add(d.data.slideOrder);
    const h = [];
    for (let d = 1; d <= a; d++)
      c.has(d) || h.push(d);
    const f = e.data.slideOrder;
    return f != null && !h.includes(f) && (h.push(f), h.sort((d, p) => d - p)), h;
  }, [t, e]);
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Label" }),
      /* @__PURE__ */ u(
        "input",
        {
          type: "text",
          value: n.label ?? "",
          onChange: (l) => r({ label: l.target.value || void 0 }),
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
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Device" }),
      /* @__PURE__ */ v(
        "select",
        {
          value: n.devicePreset ?? "",
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
            mu.map((l) => /* @__PURE__ */ u("optgroup", { label: l.label, children: l.presets.map((a) => /* @__PURE__ */ v("option", { value: a.key, children: [
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
      ye,
      {
        label: "Background",
        palettes: we,
        value: (() => {
          const l = n.backgroundColor;
          if (!l) return null;
          for (const a of we) {
            const c = a.colors.find((h) => l === `${h}15`);
            if (c) return c;
          }
          return l.length === 9 && l.endsWith("15") ? l.slice(0, 7) : null;
        })(),
        onChange: (l) => r({ backgroundColor: l ? `${l}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ u(
      ye,
      {
        label: "Border",
        palettes: we,
        value: n.borderColor,
        onChange: (l) => r({ borderColor: l })
      }
    ),
    /* @__PURE__ */ u(
      Ho,
      {
        label: "Style",
        value: n.borderStyle ?? "dashed",
        onChange: (l) => r({ borderStyle: l })
      }
    ),
    /* @__PURE__ */ u(
      Oo,
      {
        label: "Width",
        value: n.borderWidth ?? 1,
        onChange: (l) => r({ borderWidth: l })
      }
    ),
    /* @__PURE__ */ u(
      ke,
      {
        value: n.opacity ?? 1,
        onChange: (l) => r({ opacity: l })
      }
    ),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Slide #" }),
      /* @__PURE__ */ v(
        "select",
        {
          value: n.slideOrder ?? "",
          onChange: (l) => {
            const a = l.target.value;
            r({ slideOrder: a ? parseInt(a, 10) : void 0 });
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
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Transition" }),
      /* @__PURE__ */ v(
        "select",
        {
          value: n.transition ?? "pan",
          onChange: (l) => {
            const a = l.target.value;
            r({ transition: a === "pan" ? void 0 : a, transitionDuration: void 0 });
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
    (n.transition ?? "pan") !== "none" && /* @__PURE__ */ u(
      bu,
      {
        value: n.transitionDuration ?? Jo[n.transition ?? "pan"],
        onChange: (l) => r({ transitionDuration: l === Jo[n.transition ?? "pan"] ? void 0 : l }),
        theme: o
      }
    )
  ] });
}
function xu({ engine: t, node: e }) {
  const o = $t(), r = Te(t, e), { data: n } = e;
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      ye,
      {
        label: "Color",
        palettes: Gh,
        value: n.color,
        onChange: (s) => {
          s && r({ color: s });
        }
      }
    ),
    /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Size" }),
      [12, 14, 16, 20, 24].map((s) => /* @__PURE__ */ u(
        "button",
        {
          onClick: () => r({ fontSize: s }),
          style: {
            ...Ut,
            width: 32,
            height: 24,
            background: (n.fontSize ?? 16) === s ? o.controlBgActive : o.controlBg,
            borderRadius: o.controlBorderRadius,
            fontSize: 10,
            color: o.text
          },
          children: s
        },
        s
      ))
    ] }),
    /* @__PURE__ */ v("div", { style: Et, children: [
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
            ...Ut,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ u(rs, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ke,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function wu({ engine: t, node: e }) {
  const o = $t(), r = Te(t, e), { data: n } = e;
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ v("div", { style: Et, children: [
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
      sr,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ u(
      ke,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function ku({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const vu = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function Su({ engine: t, mode: e, fontsInScene: o }) {
  const r = $t(), [, n] = tt(0), s = it(() => n((m) => m + 1), []), i = t.activeTool;
  if (e === "text") {
    const m = i.fontFamily ?? Ve, y = i.fontSize ?? 20, b = i.textAlign ?? "left", g = i.color;
    return /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ v("div", { style: Et, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Font" }),
        /* @__PURE__ */ u(
          Br,
          {
            value: m,
            onChange: (x) => {
              i.fontFamily = x, s();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ v("div", { style: Et, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Size" }),
        ya.map((x) => /* @__PURE__ */ u(
          "button",
          {
            onClick: () => {
              i.fontSize = x, s();
            },
            style: {
              ...Ut,
              width: 36,
              height: 28,
              background: y === x ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: x
          },
          x
        ))
      ] }),
      /* @__PURE__ */ v("div", { style: Et, children: [
        /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Align" }),
        ts.map((x) => /* @__PURE__ */ u(
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
              background: b === x.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: x.label
          },
          x.key
        ))
      ] }),
      /* @__PURE__ */ u(
        ye,
        {
          label: "Color",
          palettes: we,
          value: g,
          onChange: (x) => {
            i.color = x, s();
          }
        }
      ),
      /* @__PURE__ */ u(
        ke,
        {
          value: i.opacity ?? 1,
          onChange: (x) => {
            i.opacity = x, s();
          }
        }
      )
    ] });
  }
  const l = e === "shape", a = i.color, c = i.fillColor ?? null, h = i.fillStyle ?? "hachure", f = i.strokeStyle ?? "solid", d = i.width, p = i.roughness ?? 1;
  return /* @__PURE__ */ v(ut, { children: [
    l && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Shape" }),
      vu.map((m) => /* @__PURE__ */ u(
        "button",
        {
          title: m.label,
          onClick: () => {
            i.shapeType = m.key, s();
          },
          style: {
            ...Ut,
            width: 28,
            height: 28,
            background: (i.shapeType ?? "rect") === m.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ u(ku, { name: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ u(
      ye,
      {
        label: "Stroke",
        palettes: we,
        value: a,
        onChange: (m) => {
          i.color = m, s();
        }
      }
    ),
    /* @__PURE__ */ u(
      ye,
      {
        label: "Fill",
        palettes: es,
        value: c,
        onChange: (m) => {
          i.fillColor = m ?? void 0, s();
        },
        allowNull: !0
      }
    ),
    c && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Fill pattern" }),
      $n.map((m) => /* @__PURE__ */ u(
        "button",
        {
          title: m.label,
          onClick: () => {
            i.fillStyle = m.key, s();
          },
          style: {
            ...Ut,
            width: 36,
            height: 28,
            background: h === m.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ u(os, { style: m.key })
        },
        m.key
      ))
    ] }),
    /* @__PURE__ */ u(
      Ho,
      {
        label: "Stroke style",
        value: f,
        onChange: (m) => {
          i.strokeStyle = m, s();
        }
      }
    ),
    /* @__PURE__ */ u(
      Oo,
      {
        label: "Stroke width",
        value: d,
        onChange: (m) => {
          i.width = m, s();
        }
      }
    ),
    l && /* @__PURE__ */ v("div", { style: Et, children: [
      /* @__PURE__ */ u("span", { style: { ...Wt, color: r.textMuted }, children: "Roughness" }),
      _n.map((m) => /* @__PURE__ */ u(
        "button",
        {
          title: m.label,
          onClick: () => {
            i.roughness = m.value, s();
          },
          style: {
            ...Ut,
            height: 28,
            padding: "0 8px",
            background: p === m.value ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: m.label
        },
        m.value
      ))
    ] }),
    /* @__PURE__ */ u(
      ke,
      {
        value: i.opacity ?? 1,
        onChange: (m) => {
          i.opacity = m, s();
        }
      }
    )
  ] });
}
function Mu({ engine: t, node: e, PanelComponent: o }) {
  const r = Te(t, e);
  return /* @__PURE__ */ u(o, { node: e, data: e.data, engine: t, updateData: r });
}
const Pn = {
  shape: "Shape",
  draw: "Drawing",
  text: "Text",
  edge: "Edge",
  image: "Image",
  content: "Content",
  frame: "Frame",
  sticky: "Sticky Note",
  youtube: "YouTube"
}, Cu = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), Iu = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function zu(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function Tu({ label: t }) {
  const e = $t();
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
function ma({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ u(du, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ u(hu, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ u(uu, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ u(fu, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ u(pu, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ u(yu, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ u(gu, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ u(xu, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ u(wu, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ u(Mu, { engine: t, node: e, PanelComponent: n.propertiesPanel }) : null;
    }
  }
}
function ti({
  engine: t,
  nodes: e
}) {
  const o = $t(), r = Math.round(e[0].rotation ?? 0), s = e.every(
    (c) => Math.round(c.rotation ?? 0) === r
  ) ? r : null, [i, l] = tt(null), a = it(
    (c) => {
      l(null);
      const h = parseFloat(c);
      if (isNaN(h)) return;
      const f = Math.max(-360, Math.min(360, h)), d = e.map((p) => ({
        id: p.id,
        patch: { rotation: f }
      }));
      t.batchUpdateWithHistory(d);
    },
    [t, e]
  );
  return /* @__PURE__ */ v("div", { style: Et, children: [
    /* @__PURE__ */ u("span", { style: { ...Wt, color: o.textMuted }, children: "Rotation" }),
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
function Pu({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = it(
    (n, s) => {
      const i = n === "opacity" ? Cu : Iu, l = e.filter((a) => i.has(a.type)).map((a) => ({
        id: a.id,
        patch: {
          data: { ...a.data, [n]: s }
        }
      }));
      t.batchUpdateWithHistory(l);
    },
    [t, e]
  );
  return /* @__PURE__ */ v(ut, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ u(
      ke,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (n) => r("opacity", n)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ u(
      sr,
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
function Ru({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r
}) {
  const n = Pn[e.type] ?? e.type, s = e.nodes.length, i = e.nodes[0], l = $t();
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ v("div", { style: { ...jh, color: l.textFaint, borderTop: `1px solid ${l.border}` }, children: [
      n,
      " (",
      s,
      ")"
    ] }),
    /* @__PURE__ */ u(Nr.Provider, { value: e.nodes, children: /* @__PURE__ */ u(
      ma,
      {
        engine: t,
        node: i,
        registry: o,
        fontsInScene: r
      }
    ) })
  ] });
}
function Au(t) {
  switch (t.kind) {
    case "none":
      return "No selection";
    case "tool":
      return `${t.mode.charAt(0).toUpperCase() + t.mode.slice(1)} tool`;
    case "single":
      return Pn[t.node.type] ?? t.node.type;
    case "multi":
      return t.typeGroups.map(
        (o) => `${o.nodes.length} ${(Pn[o.type] ?? o.type).toLowerCase()}${o.nodes.length > 1 ? "s" : ""}`
      ).join(", ");
  }
}
function ei({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const n = qt(() => zu(t), [t, o]), s = Au(o);
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(Tu, { label: s }),
    o.kind === "tool" && /* @__PURE__ */ u(Su, { engine: t, mode: o.mode, fontsInScene: n }),
    o.kind === "single" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u(
        ma,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: n
        }
      ),
      /* @__PURE__ */ u(ti, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u(Pu, { engine: t, nodes: o.nodes, commonProps: r }),
      /* @__PURE__ */ u(ti, { engine: t, nodes: o.nodes }),
      o.typeGroups.map((i) => /* @__PURE__ */ u(
        Ru,
        {
          engine: t,
          group: i,
          registry: e,
          fontsInScene: n
        },
        i.type
      ))
    ] })
  ] });
}
function Lu({ engine: t, registry: e }) {
  const o = $t(), { target: r, commonProps: n } = nu(t), s = r.kind !== "none", [i, l] = tt(!1), a = ct(null), [c, h] = tt(null), f = ct(null), [d, p] = tt(!1), m = it(() => {
    var X, N;
    const M = (X = a.current) == null ? void 0 : X.offsetParent;
    if (M) return { width: M.clientWidth, height: M.clientHeight };
    const j = ((N = a.current) == null ? void 0 : N.ownerDocument.defaultView) ?? window;
    return { width: j.innerWidth, height: j.innerHeight };
  }, []), y = it(() => {
    const { width: M } = m();
    return { x: M - Ko - 16, y: 12 };
  }, [m]), b = c ?? y(), g = ct(!1);
  ui(() => {
    if (!g.current && a.current && !c) {
      g.current = !0;
      const M = a.current.offsetParent;
      M && h({ x: M.clientWidth - Ko - 16, y: 12 });
    }
  }), mt(() => {
    var X, N;
    const M = ((X = a.current) == null ? void 0 : X.offsetParent) ?? ((N = a.current) == null ? void 0 : N.ownerDocument.body);
    if (!M) return;
    const j = new ResizeObserver((_) => {
      var dt;
      const J = ((dt = _[0]) == null ? void 0 : dt.contentRect.width) ?? M.clientWidth;
      l(J < 600);
    });
    return j.observe(M), l(M.clientWidth < 600), () => j.disconnect();
  }, []);
  const x = it(
    (M) => {
      M.stopPropagation(), p(!0);
      const j = c ? c.x : y().x, X = c ? c.y : y().y;
      f.current = {
        startX: M.clientX,
        startY: M.clientY,
        startLeft: j,
        startTop: X
      }, M.currentTarget.setPointerCapture(M.pointerId);
    },
    [c, y]
  ), z = it(
    (M) => {
      if (!f.current) return;
      M.stopPropagation();
      const j = M.clientX - f.current.startX, X = M.clientY - f.current.startY, { width: N, height: _ } = m(), J = Math.max(
        nr,
        Math.min(N - Ko - 8, f.current.startLeft + j)
      ), dt = Math.max(
        8,
        Math.min(_ - 100, f.current.startTop + X)
      );
      h({ x: J, y: dt });
    },
    [m]
  ), I = it(() => {
    f.current = null, p(!1);
  }, []);
  return s ? i ? /* @__PURE__ */ v(
    "div",
    {
      ref: a,
      "data-sb-props-panel": !0,
      onPointerDown: (M) => M.stopPropagation(),
      style: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "45vh",
        minHeight: 200,
        background: o.panelBg,
        borderRadius: "12px 12px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        color: o.text,
        fontSize: 12
      },
      children: [
        /* @__PURE__ */ u(
          "div",
          {
            style: {
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0
            },
            children: /* @__PURE__ */ u(
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
              ei,
              {
                engine: t,
                registry: e,
                target: r,
                commonProps: n
              }
            )
          }
        )
      ]
    }
  ) : /* @__PURE__ */ v(
    "div",
    {
      ref: a,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: b.x,
        top: b.y,
        width: Ko,
        background: o.panelBg,
        borderRadius: o.panelBorderRadius,
        padding: "0 0 12px",
        display: "flex",
        flexDirection: "column",
        zIndex: 99,
        color: o.text,
        fontSize: 11,
        maxHeight: "calc(100% - 40px)",
        boxShadow: o.panelShadow
      },
      onPointerDown: (M) => M.stopPropagation(),
      onPointerMove: z,
      onPointerUp: I,
      onPointerCancel: I,
      children: [
        /* @__PURE__ */ v(
          "div",
          {
            onPointerDown: x,
            style: {
              cursor: d ? "grabbing" : "grab",
              padding: "8px 16px",
              userSelect: "none",
              touchAction: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderBottom: `1px solid ${o.border}`,
              color: o.textMuted,
              fontSize: 10,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ u("span", { style: { opacity: 0.6 }, children: "⋮⋮" }),
              /* @__PURE__ */ u("span", { children: "Drag to move" })
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
              ei,
              {
                engine: t,
                registry: e,
                target: r,
                commonProps: n
              }
            )
          }
        )
      ]
    }
  ) : null;
}
function Du({ engine: t, registry: e, gifApiBaseUrl: o }) {
  return /* @__PURE__ */ v(ut, { children: [
    /* @__PURE__ */ u(
      "div",
      {
        "data-sb-sidebar": !0,
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: nr,
          zIndex: 100
        },
        onPointerDown: (r) => r.stopPropagation(),
        children: /* @__PURE__ */ u(tu, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ u(Lu, { engine: t, registry: e })
  ] });
}
const $o = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function Eu(t) {
  const e = t.viewport.zoom, o = $o.find((r) => r > e + 1e-3) ?? $o[$o.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Wu(t) {
  const e = t.viewport.zoom, o = [...$o].reverse().find((r) => r < e - 1e-3) ?? $o[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const Fu = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
}, Ce = {
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
function Ee({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ u("path", { d: "M5 12h14", ...le }),
    t === "plus" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M12 5v14", ...le }),
      /* @__PURE__ */ u("path", { d: "M5 12h14", ...le })
    ] }),
    t === "undo" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...le, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...le, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...le, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...le, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...le }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...le })
    ] }),
    t === "play" && /* @__PURE__ */ u("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1", ...le }),
      /* @__PURE__ */ u("path", { d: "M6 6V18M18 6V18", ...le }),
      /* @__PURE__ */ u("path", { d: "M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4", ...le })
    ] }),
    t === "home" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M3 12l9-8 9 8", ...le, fill: "none" }),
      /* @__PURE__ */ u("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...le, fill: "none" })
    ] }),
    t === "bookmark" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", ...le, fill: "none" }),
    t === "bookmark-fill" && /* @__PURE__ */ u("path", { d: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "currentColor" })
  ] });
}
function Nu({ engine: t, framesPanelOpen: e, onToggleFramesPanel: o }) {
  const r = $t(), [n, s] = tt(t.viewport.zoom), [i, l] = tt(!1), [a, c] = tt(!1), [h, f] = tt(() => t.originView != null), [d, p] = tt(
    () => t.getAllNodes().filter((x) => x.type === "frame").length
  );
  mt(() => {
    const x = () => s(t.viewport.zoom), z = () => {
      l(t.canUndo()), c(t.canRedo());
    }, I = () => {
      p(t.getAllNodes().filter((M) => M.type === "frame").length), f(t.originView != null);
    };
    return t.on("viewport", x), t.on("history", z), t.on("change", I), t.on("node:create", I), t.on("node:delete", I), () => {
      t.off("viewport", x), t.off("history", z), t.off("change", I), t.off("node:create", I), t.off("node:delete", I);
    };
  }, [t]);
  const m = r.panelBg, y = `1px solid ${r.border}`, b = {
    ...Fu,
    borderRadius: r.panelBorderRadius
  }, g = {
    width: 1,
    height: 20,
    background: r.separator,
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
      onPointerDown: (x) => x.stopPropagation(),
      children: [
        /* @__PURE__ */ v("div", { style: { ...b, background: m, border: y, boxShadow: r.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Zoom out",
              onClick: () => Wu(t),
              style: { ...Ce, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ u(Ee, { name: "minus" })
            }
          ),
          /* @__PURE__ */ u("div", { style: g }),
          /* @__PURE__ */ v(
            "button",
            {
              title: "Reset zoom to 100%",
              onClick: () => {
                t.viewport.zoom = 1, t.pan(0, 0);
              },
              style: {
                ...Ce,
                minWidth: 48,
                height: 32,
                color: r.text,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: "inherit",
                padding: "0 4px"
              },
              children: [
                Math.round(n * 100),
                "%"
              ]
            }
          ),
          /* @__PURE__ */ u("div", { style: g }),
          /* @__PURE__ */ u(
            "button",
            {
              title: "Zoom in",
              onClick: () => Eu(t),
              style: { ...Ce, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ u(Ee, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { style: { ...b, background: m, border: y, boxShadow: r.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Fit to content (Ctrl+0)",
              onClick: () => t.fitToContent(),
              style: { ...Ce, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ u(Ee, { name: "fit" })
            }
          ),
          /* @__PURE__ */ u("div", { style: g }),
          /* @__PURE__ */ u(
            "button",
            {
              title: h ? "Clear saved view" : "Save current view as origin",
              onClick: () => {
                h ? (t.clearOriginView(), f(!1)) : (t.setOriginView(), f(!0));
              },
              style: { ...Ce, width: 32, height: 32, color: h ? r.accentColor : r.textFaint },
              children: /* @__PURE__ */ u(Ee, { name: h ? "bookmark-fill" : "bookmark" })
            }
          ),
          /* @__PURE__ */ u("div", { style: g }),
          /* @__PURE__ */ u(
            "button",
            {
              title: "Go to saved view",
              onClick: () => {
                h && t.goToOriginView();
              },
              disabled: !h,
              style: { ...Ce, width: 32, height: 32, color: h ? r.text : r.textFaint },
              children: /* @__PURE__ */ u(Ee, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { style: { ...b, overflow: "visible", background: m, border: y, boxShadow: r.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Present (frames as slides)",
              onClick: () => t.enterPresentation(),
              style: { ...Ce, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ u(Ee, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ v(ut, { children: [
            /* @__PURE__ */ u("div", { style: g }),
            /* @__PURE__ */ v(
              "button",
              {
                title: "Toggle slides panel",
                onClick: o,
                style: {
                  ...Ce,
                  width: 32,
                  height: 32,
                  color: e ? r.text : r.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ u(Ee, { name: "slides" }),
                  d > 0 && /* @__PURE__ */ u(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        top: -4,
                        right: -4,
                        minWidth: 14,
                        height: 14,
                        borderRadius: 7,
                        background: r.accentColor,
                        color: "#fff",
                        fontSize: 9,
                        fontWeight: 700,
                        lineHeight: "14px",
                        textAlign: "center",
                        padding: "0 3px",
                        pointerEvents: "none"
                      },
                      children: d
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ v("div", { style: { ...b, background: m, border: y, boxShadow: r.panelShadow }, children: [
          /* @__PURE__ */ u(
            "button",
            {
              title: "Undo (Ctrl+Z)",
              onClick: () => t.undo(),
              disabled: !i,
              style: { ...Ce, width: 32, height: 32, color: i ? r.text : r.textFaint },
              children: /* @__PURE__ */ u(Ee, { name: "undo" })
            }
          ),
          /* @__PURE__ */ u("div", { style: g }),
          /* @__PURE__ */ u(
            "button",
            {
              title: "Redo (Ctrl+Shift+Z)",
              onClick: () => t.redo(),
              disabled: !a,
              style: { ...Ce, width: 32, height: 32, color: a ? r.text : r.textFaint },
              children: /* @__PURE__ */ u(Ee, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
const oi = 240, ri = 6;
function cn(t) {
  const o = t.getAllNodes().filter((h) => h.type === "frame");
  if (o.length === 0) return [];
  const r = o.map((h) => ({
    id: h.id,
    x: h.x,
    y: h.y,
    slideOrder: h.data.slideOrder,
    label: h.data.label || "",
    borderColor: h.data.borderColor,
    transition: h.data.transition,
    transitionDuration: h.data.transitionDuration
  })), n = r.filter((h) => h.slideOrder != null).sort((h, f) => h.slideOrder - f.slideOrder), s = r.filter((h) => h.slideOrder == null), i = 100;
  s.sort((h, f) => h.y - f.y);
  const l = [];
  for (const h of s) {
    const f = l[l.length - 1];
    f && Math.abs(h.y - f[0].y) < i ? f.push(h) : l.push([h]);
  }
  const a = l.flatMap((h) => h.sort((f, d) => f.x - d.x));
  return [...n, ...a].map((h, f) => ({
    id: h.id,
    label: h.label || `Frame ${f + 1}`,
    order: f + 1,
    slideOrder: h.slideOrder,
    borderColor: h.borderColor,
    transition: h.transition,
    transitionDuration: h.transitionDuration
  }));
}
const Bu = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Hu() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...Bu }) });
}
function Ou(t, e, o) {
  const [r, n] = tt("");
  return mt(() => {
    let s = !1;
    return Rh(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function Xu({ engine: t, frameId: e, tick: o }) {
  const r = Ou(t, e, o);
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
const ni = [
  { key: "pan", label: "Pan" },
  { key: "fade", label: "Fade" },
  { key: "dissolve", label: "Dissolve" },
  { key: "zoom", label: "Zoom" },
  { key: "fold", label: "Fold" },
  { key: "cube", label: "Cube" },
  { key: "none", label: "Cut" }
];
function si({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ u("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ u("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ u("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ u("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ u("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ u("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ u("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const Yu = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function Gu({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n
}) {
  var m;
  const [s, i] = tt(!1), [l, a] = tt(!1), c = ct(null), h = ct(null), f = t !== "none", d = e ?? Jo[t];
  mt(() => {
    if (!s && !l) return;
    const y = (b) => {
      s && c.current && !c.current.contains(b.target) && i(!1), l && h.current && !h.current.contains(b.target) && a(!1);
    };
    return document.addEventListener("mousedown", y), () => document.removeEventListener("mousedown", y);
  }, [s, l]);
  const p = {
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
        zIndex: s || l ? 50 : void 0
      },
      children: [
        /* @__PURE__ */ u("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: n.border } }),
        /* @__PURE__ */ v("div", { ref: c, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ v("button", { onClick: () => {
            i((y) => !y), a(!1);
          }, style: p, children: [
            /* @__PURE__ */ u(si, { type: t }),
            /* @__PURE__ */ u("span", { children: ((m = ni.find((y) => y.key === t)) == null ? void 0 : m.label) ?? "Pan" }),
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
              children: ni.map((y) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    o(y.key), i(!1);
                  },
                  style: {
                    border: "none",
                    background: y.key === t ? n.controlBgActive : "transparent",
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
                    /* @__PURE__ */ u(si, { type: y.key }),
                    y.label
                  ]
                },
                y.key
              ))
            }
          )
        ] }),
        f && /* @__PURE__ */ v("div", { ref: h, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ v("button", { onClick: () => {
            a((y) => !y), i(!1);
          }, style: p, children: [
            /* @__PURE__ */ v("span", { children: [
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
              children: Yu.map((y) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    r(y === Jo[t] ? void 0 : y), a(!1);
                  },
                  style: {
                    border: "none",
                    background: y === d ? n.controlBgActive : "transparent",
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
                    y === Jo[t] ? " •" : ""
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
function ju({ engine: t, open: e, onClose: o }) {
  const r = $t(), [n, s] = tt(() => cn(t)), [i, l] = tt(() => new Set(t.selection)), [a, c] = tt(0), h = ct(null), f = ct(null), d = ct(0), p = ct(!1), m = ct(n);
  m.current = n;
  const y = ct(!1), b = ct(!1), [g, x] = tt(null), [z, I] = tt(null), [M, j] = tt(0), X = ct([]), N = ct(null), _ = it(() => {
    if (y.current) return;
    const q = cn(t);
    s(q);
  }, [t]), J = it(() => {
    l(new Set(t.selection));
  }, [t]), dt = ct(null), H = it(() => {
    dt.current && clearTimeout(dt.current), dt.current = setTimeout(() => c((q) => q + 1), 500);
  }, []);
  mt(() => {
    _(), J();
    const q = setTimeout(() => c((B) => B + 1), 200), R = () => {
      _(), H();
    };
    return t.on("change", R), t.on("node:create", R), t.on("node:delete", R), t.on("node:data", R), t.on("selection", J), t.on("history", R), () => {
      clearTimeout(q), t.off("change", R), t.off("node:create", R), t.off("node:delete", R), t.off("node:data", R), t.off("selection", J), t.off("history", R), dt.current && clearTimeout(dt.current);
    };
  }, [t, _, J, H]), mt(() => {
    if (!N.current) return;
    const q = N.current.querySelectorAll("[data-frame-card]");
    X.current = Array.from(q).map((R) => R.offsetHeight + ri);
  }, [n]);
  const rt = it(
    (q) => {
      t.select(q), t.zoomToNode(q, 0.8);
    },
    [t]
  ), Q = it(
    (q, R) => {
      q.preventDefault(), q.stopPropagation(), d.current = q.clientY, h.current = R, f.current = R, p.current = !1;
    },
    []
  );
  return mt(() => {
    const q = (B) => {
      if (h.current === null) return;
      const $ = B.clientY - d.current;
      if (!p.current) {
        if (Math.abs($) < 4) return;
        p.current = !0, x(h.current), I(h.current);
      }
      j($);
      const Y = X.current, V = h.current;
      let O = V;
      if ($ > 0) {
        let K = 0;
        for (let nt = V + 1; nt < m.current.length && (K += Y[nt] || 0, $ > K - (Y[nt] || 0) / 2); nt++)
          O = nt;
      } else if ($ < 0) {
        let K = 0;
        for (let nt = V - 1; nt >= 0 && (K -= Y[nt] || 0, $ < K + (Y[nt] || 0) / 2); nt--)
          O = nt;
      }
      f.current = O, I(O);
    }, R = () => {
      const B = h.current, $ = f.current;
      if (B !== null && $ !== null && B !== $) {
        y.current = !0;
        const Y = [...m.current], [V] = Y.splice(B, 1);
        Y.splice($, 0, V);
        let O = !0;
        for (let K = 0; K < Y.length; K++) {
          const nt = Y[K], ot = t.getNode(nt.id);
          ot && (O ? (t.updateNodeWithHistory(nt.id, {
            data: { ...ot.data, slideOrder: K + 1 }
          }), O = !1) : t.updateNode(nt.id, {
            data: { ...ot.data, slideOrder: K + 1 }
          }));
        }
        y.current = !1, b.current = !0, s(cn(t)), c((K) => K + 1);
      }
      h.current = null, f.current = null, p.current = !1, x(null), I(null), j(0), b.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          b.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", q), document.addEventListener("pointerup", R), document.addEventListener("pointercancel", R), () => {
      document.removeEventListener("pointermove", q), document.removeEventListener("pointerup", R), document.removeEventListener("pointercancel", R);
    };
  }, [t]), /* @__PURE__ */ v(
    "div",
    {
      "data-sb-frames-panel": !0,
      style: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        width: oi,
        background: r.panelBg,
        borderLeft: `1px solid ${r.border}`,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : `translateX(${oi}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (q) => q.stopPropagation(),
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
                "Slides (",
                n.length,
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
                    color: r.textMuted,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: 4,
                    padding: 0
                  },
                  children: /* @__PURE__ */ u(Hu, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ v(
          "div",
          {
            ref: N,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: ri
            },
            children: [
              n.length === 0 && /* @__PURE__ */ u("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: "No frames yet. Use the Frame tool (F) to create slides." }),
              n.map((q, R) => {
                const B = i.has(q.id), $ = g === R;
                let Y = 0;
                if ($)
                  Y = M;
                else if (g !== null && z !== null) {
                  const K = X.current;
                  g < z ? R > g && R <= z && (Y = -(K[g] || 0)) : g > z && R >= z && R < g && (Y = K[g] || 0);
                }
                const V = (K) => {
                  t.updateNodeWithHistory(q.id, {
                    data: { transition: K === "pan" ? void 0 : K, transitionDuration: void 0 }
                  });
                }, O = (K) => {
                  t.updateNodeWithHistory(q.id, {
                    data: { transitionDuration: K }
                  });
                };
                return /* @__PURE__ */ v(Xa.Fragment, { children: [
                  g === null && /* @__PURE__ */ u(
                    Gu,
                    {
                      value: q.transition ?? "pan",
                      durationMs: q.transitionDuration,
                      onChange: V,
                      onDurationChange: O,
                      theme: r
                    }
                  ),
                  /* @__PURE__ */ u(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (K) => Q(K, R),
                      onDoubleClick: () => rt(q.id),
                      style: {
                        borderRadius: 6,
                        border: B ? `2px solid ${q.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: B ? r.controlBgActive : "transparent",
                        cursor: $ ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: $ || b.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${Y}px)`,
                        zIndex: $ ? 10 : 1,
                        opacity: $ ? 0.92 : 1,
                        boxShadow: $ ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ u(Xu, { engine: t, frameId: q.id, tick: a })
                    }
                  )
                ] }, q.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const io = 50, dn = 30, Vu = `
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
`, Zu = `
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
function ii(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function Uu(t, e, o) {
  const r = ii(t, t.VERTEX_SHADER, e), n = ii(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function qu() {
  const t = [], e = [];
  for (let o = 0; o <= dn; o++)
    for (let r = 0; r <= io; r++)
      t.push(r / io, o / dn * 2 - 1);
  for (let o = 0; o < dn; o++)
    for (let r = 0; r < io; r++) {
      const n = o * (io + 1) + r;
      e.push(n, n + io + 1, n + 1, n + 1, n + io + 1, n + io + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function Ku({ phase: t, progress: e }) {
  const o = ct(null), r = ct(null);
  return mt(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const l = Uu(i, Vu, Zu);
    if (!l) return;
    i.useProgram(l);
    const { vertices: a, indices: c } = qu(), h = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, h), i.bufferData(i.ARRAY_BUFFER, a, i.STATIC_DRAW);
    const f = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, f), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const d = i.getAttribLocation(l, "aUV");
    i.enableVertexAttribArray(d), i.vertexAttribPointer(d, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const p = (m) => i.getUniformLocation(l, m);
    return r.current = {
      gl: i,
      locs: { uLayPos: p("uLayPos"), uRadius: p("uRadius"), uSide: p("uSide"), uColor: p("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(l), i.deleteBuffer(h), i.deleteBuffer(f), r.current = null;
    };
  }, []), mt(() => {
    const n = r.current;
    if (!n) return;
    const { gl: s, locs: i, count: l } = n, a = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - a : a, h = 0.07 + 0.16 * c;
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
const Qu = {
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
}, hn = {
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
}, Rn = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function ai({ dir: t }) {
  return /* @__PURE__ */ v("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ u("polyline", { points: "15,18 9,12 15,6", ...Rn }),
    t === "right" && /* @__PURE__ */ u("polyline", { points: "9,6 15,12 9,18", ...Rn })
  ] });
}
function Ju() {
  return /* @__PURE__ */ u("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ u("path", { d: "M18 6L6 18M6 6l12 12", ...Rn }) });
}
function li(t) {
  return 1 - Math.pow(1 - t, 3);
}
function ci(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function di(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * li(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * li((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * ci((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - ci((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function $u(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function hi(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function _u({ engine: t }) {
  const [e, o] = tt(t.presentationMode), [r, n] = tt(t.presentationIndex), [s, i] = tt(t.presentationSlides.length), [l, a] = tt(""), [c, h] = tt(t.transitionOverlay), f = ct(null), d = ct(null);
  if (mt(() => {
    const m = document.querySelector("[data-sb-canvas]");
    f.current = m, d.current = (m == null ? void 0 : m.parentElement) ?? null;
    const y = () => {
      var z;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), h(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const I = t.presentationSlides[t.presentationIndex], M = t.getNode(I);
        a(((z = M == null ? void 0 : M.data) == null ? void 0 : z.label) || "");
      } else
        a("");
      const b = t.transitionOverlay, g = f.current, x = d.current;
      if (g && x && b && b.type === "cube" && b.t != null) {
        const I = b.direction ?? 1, { zoom: M, angle: j } = di(b.t, I);
        $u(g, x, M, j);
      } else g && x && hi(g, x);
    };
    return t.on("presentation", y), () => {
      t.off("presentation", y);
      const b = f.current, g = d.current;
      b && g && hi(b, g);
    };
  }, [t]), !e || s === 0) return null;
  const p = c && c.type === "cube" && c.t != null ? (() => {
    const m = c.direction ?? 1, { angle: y } = di(c.t, m);
    return Math.abs(y) / 90 * 0.4;
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
        c && c.type === "fold" && /* @__PURE__ */ u(Ku, { phase: c.phase, progress: c.progress }),
        p > 0.01 && /* @__PURE__ */ u(
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
        /* @__PURE__ */ v("div", { style: Qu, onPointerDown: (m) => m.stopPropagation(), children: [
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...hn, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ u(Ju, {})
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...hn, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ u(ai, { dir: "left" })
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
                l && /* @__PURE__ */ v("span", { style: { opacity: 0.6, marginLeft: 8 }, children: [
                  "— ",
                  l
                ] })
              ]
            }
          ),
          /* @__PURE__ */ u(
            "button",
            {
              style: { ...hn, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ u(ai, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
const tf = ja(() => import("./DebugPanel-Cn5rSOej.js"));
function wf({
  nodeTypes: t = vd,
  engine: e,
  keyboardShortcuts: o = !0,
  style: r,
  initialData: n,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: l,
  theme: a,
  onPresentationChange: c,
  gifApiBaseUrl: h
}) {
  const f = qt(
    () => e ?? new Yl(),
    [e]
  ), d = qt(() => new Gl(t), [t]);
  mt(() => vl(), []), mt(() => {
    f.setRegistry(d);
  }, [f, d]), mt(() => {
    for (const M of t)
      M.isContainer && f.registerContainerType(M.type);
  }, [f, t]);
  const p = ct(!1);
  mt(() => {
    n && !p.current && (p.current = !0, f.fromSBD(n));
  }, [f, n]);
  const m = ct(null);
  mt(() => {
    if (o)
      return hh(f, m.current);
  }, [f, o]);
  const y = qt(() => t.some((j) => {
    var X;
    return (X = j.ports) == null ? void 0 : X.length;
  }) ? new Sd(f, d) : null, [f, d, t]);
  mt(() => {
    if (y)
      return y.connect();
  }, [y]);
  const b = qt(
    () => a ? { ...vn, ...a } : vn,
    [a]
  ), [g, x] = tt(!1), [z, I] = tt(!1);
  return mt(() => {
    const M = () => {
      const j = f.presentationMode;
      x(j), c == null || c(j);
    };
    return f.on("presentation", M), () => f.off("presentation", M);
  }, [f, c]), /* @__PURE__ */ u(Vi.Provider, { value: b, children: /* @__PURE__ */ v(
    "div",
    {
      ref: m,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...r
      },
      children: [
        s && !g && /* @__PURE__ */ u(Du, { engine: f, registry: d, gifApiBaseUrl: h }),
        i && /* @__PURE__ */ u(Ga, { fallback: null, children: /* @__PURE__ */ u(tf, { engine: f, extraBoards: l }) }),
        /* @__PURE__ */ v(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !g ? nr : 0,
              top: 0,
              right: 0,
              bottom: 0,
              overflow: "hidden"
            },
            children: [
              /* @__PURE__ */ u(Bh, { engine: f, schema: Ln, registry: d, dataFlow: y }),
              !g && /* @__PURE__ */ u(
                Nu,
                {
                  engine: f,
                  framesPanelOpen: z,
                  onToggleFramesPanel: () => I((M) => !M)
                }
              ),
              !g && /* @__PURE__ */ u(
                ju,
                {
                  engine: f,
                  open: z,
                  onClose: () => I(!1)
                }
              ),
              /* @__PURE__ */ u(_u, { engine: f })
            ]
          }
        )
      ]
    }
  ) });
}
const ef = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], Co = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, te = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function qo({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ u("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...te }),
      /* @__PURE__ */ u("path", { d: "M15 5l4 4", ...te })
    ] }),
    t === "shape" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...te }),
    t === "text" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M7 4h10", ...te }),
      /* @__PURE__ */ u("path", { d: "M12 4v16", ...te })
    ] }),
    t === "note" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M4 3h16v14l-4 4H4z", ...te }),
      /* @__PURE__ */ u("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...te }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...te, opacity: 0.5 }),
      /* @__PURE__ */ u("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...te, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ u("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...te, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...te }),
      /* @__PURE__ */ u("path", { d: "M12.5 4.5l8 8", ...te })
    ] }),
    t === "rect" && /* @__PURE__ */ u("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...te }),
    t === "ellipse" && /* @__PURE__ */ u("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...te }),
    t === "diamond" && /* @__PURE__ */ u("path", { d: "M12 3l9 9-9 9-9-9z", ...te }),
    t === "line" && /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...te }),
    t === "arrow" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...te }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...te, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...te, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "8,5 4,9 8,13", ...te, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...te, fill: "none" }),
      /* @__PURE__ */ u("polyline", { points: "16,5 20,9 16,13", ...te, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M6 9V3h12v6", ...te }),
      /* @__PURE__ */ u("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...te }),
      /* @__PURE__ */ u("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...te })
    ] }),
    t === "fit" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("path", { d: "M15 3h6v6M9 21H3v-6", ...te }),
      /* @__PURE__ */ u("path", { d: "M21 3l-7 7M3 21l7-7", ...te })
    ] })
  ] });
}
function kf({ engine: t }) {
  const [e, o] = tt(t.mode), [r, n] = tt(!1), [s, i] = tt(!1), [l, a] = tt(t.boardBackground);
  return mt(() => {
    const c = () => o(t.mode), h = () => {
      n(t.canUndo()), i(t.canRedo());
    }, f = () => a(t.boardBackground);
    return t.on("mode", c), t.on("history", h), t.on("background", f), () => {
      t.off("mode", c), t.off("history", h), t.off("background", f);
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
        ef.map((c) => /* @__PURE__ */ u(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...Co,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(qo, { name: c.key })
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
              ...Co,
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
              ...Co,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(qo, { name: "print" })
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
              ...Co,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(qo, { name: "undo" })
          }
        ),
        /* @__PURE__ */ u(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...Co,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ u(qo, { name: "redo" })
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
              ...Co,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ u(qo, { name: "fit" })
          }
        )
      ]
    }
  );
}
const Xe = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], of = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], rf = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Io = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], nf = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], zo = [1, 2.5, 5, 10, 20], sf = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], af = [14, 20, 28, 36], lf = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], un = 300, Ft = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Nt = {
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
function vf({
  engine: t,
  registry: e
}) {
  const [o, r] = tt(t.mode), [n, s] = tt(t.selection), [, i] = tt(0), [l, a] = tt(null), c = ct(null), h = ct(null), [f, d] = tt(!1), p = it(() => {
    var st;
    return { x: (((st = c.current) == null ? void 0 : st.ownerDocument.defaultView) ?? window).innerWidth - un - 12, y: 12 };
  }, []), m = l ?? p();
  mt(() => {
    const k = () => r(t.mode), st = () => {
      s(new Set(t.selection)), i((ne) => ne + 1);
    }, Yt = () => i((ne) => ne + 1);
    return t.on("mode", k), t.on("selection", st), t.on("change", Yt), () => {
      t.off("mode", k), t.off("selection", st), t.off("change", Yt);
    };
  }, [t]);
  const y = it((k) => {
    k.stopPropagation(), d(!0);
    const st = l ? l.x : p().x, Yt = l ? l.y : p().y;
    h.current = { startX: k.clientX, startY: k.clientY, startLeft: st, startTop: Yt }, k.currentTarget.setPointerCapture(k.pointerId);
  }, [l, p]);
  mt(() => {
    var ne;
    const k = (ge) => {
      var Le;
      if (!h.current) return;
      const Ae = ge.clientX - h.current.startX, eo = ge.clientY - h.current.startY, me = ((Le = c.current) == null ? void 0 : Le.ownerDocument.defaultView) ?? window, Xo = Math.max(48, Math.min(me.innerWidth - un - 8, h.current.startLeft + Ae)), ir = Math.max(8, Math.min(me.innerHeight - 100, h.current.startTop + eo));
      a({ x: Xo, y: ir });
    }, st = () => {
      h.current = null, d(!1);
    }, Yt = ((ne = c.current) == null ? void 0 : ne.ownerDocument) ?? document;
    return Yt.addEventListener("pointermove", k), Yt.addEventListener("pointerup", st), Yt.addEventListener("pointercancel", st), () => {
      Yt.removeEventListener("pointermove", k), Yt.removeEventListener("pointerup", st), Yt.removeEventListener("pointercancel", st);
    };
  }, []);
  const b = (() => {
    if (n.size === 1) {
      const k = Array.from(n)[0], st = t.getNode(k);
      if ((st == null ? void 0 : st.type) === "shape") return { kind: "shape", node: st };
      if ((st == null ? void 0 : st.type) === "draw") return { kind: "draw", node: st };
      if ((st == null ? void 0 : st.type) === "text") return { kind: "text", node: st };
      if ((st == null ? void 0 : st.type) === "edge") return { kind: "edge", node: st };
      if ((st == null ? void 0 : st.type) === "image") return { kind: "image", node: st };
      if ((st == null ? void 0 : st.type) === "content") return { kind: "content", node: st };
      if ((st == null ? void 0 : st.type) === "frame") return { kind: "frame", node: st };
      if ((st == null ? void 0 : st.type) === "sticky") return { kind: "sticky", node: st };
      if (st && e) {
        const Yt = e.get(st.type);
        if (Yt != null && Yt.propertiesPanel)
          return { kind: "custom", node: st, PanelComponent: Yt.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" ? { kind: "tool" } : null;
  })(), g = it(
    (k) => {
      !b || b.kind !== "shape" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), x = it(
    (k) => {
      !b || b.kind !== "draw" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), z = it(
    (k) => {
      !b || b.kind !== "text" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), I = it(
    (k) => {
      !b || b.kind !== "edge" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), M = it(
    (k) => {
      !b || b.kind !== "image" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), j = it(
    (k) => {
      !b || b.kind !== "content" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), X = it(
    (k) => {
      !b || b.kind !== "frame" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), N = it(
    (k) => {
      !b || b.kind !== "sticky" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), _ = it(
    (k) => {
      !b || b.kind !== "custom" || t.updateNodeWithHistory(b.node.id, {
        data: { ...b.node.data, ...k }
      });
    },
    [t, b]
  ), [J, dt] = tt("idle");
  if (!b) return null;
  const H = b.kind === "custom", rt = b.kind === "shape", Q = b.kind === "draw", q = b.kind === "text", R = b.kind === "edge", B = b.kind === "image", $ = b.kind === "content", Y = b.kind === "frame", V = b.kind === "sticky", O = b.kind === "tool", K = O && o === "shape", nt = O && o === "text", ot = q ? b.node.data.fontFamily : t.activeTool.fontFamily ?? Ve, yt = q ? b.node.data.fontSize : t.activeTool.fontSize ?? 20, ft = q ? b.node.data.align : t.activeTool.textAlign ?? "left", et = q ? b.node.data.color : t.activeTool.color, Tt = rt ? b.node.data.stroke : Q ? b.node.data.color : t.activeTool.color, Ct = rt || Q ? b.node.data.fill ?? null : t.activeTool.fillColor ?? null, bt = rt || Q ? b.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", ht = rt || Q ? b.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", Dt = rt || Q ? b.node.data.strokeWidth : t.activeTool.width, It = rt ? b.node.data.roughness : t.activeTool.roughness ?? 1, Pt = rt || Q || q || B || $ || Y || V ? b.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Kt = (() => {
    const k = /* @__PURE__ */ new Set(), st = [];
    for (const Yt of t.getAllNodes())
      if (Yt.type === "text") {
        const ne = Yt.data.fontFamily;
        ne && !k.has(ne) && (k.add(ne), st.push(ne));
      }
    return st;
  })(), Qt = !q && !nt && !R && !B && !$ && !Y && !V && !H, Zt = Qt, Jt = Qt, he = rt || K, Pe = q || nt, _t = (k) => {
    rt ? g({ stroke: k }) : Q ? x({ color: k }) : (t.activeTool.color = k, i((st) => st + 1));
  }, Re = (k) => {
    rt ? g({ fill: k ?? void 0 }) : Q ? x({ fill: k ?? void 0 }) : (t.activeTool.fillColor = k ?? void 0, i((st) => st + 1));
  }, $e = (k) => {
    rt ? g({ fillStyle: k }) : Q ? x({ fillStyle: k }) : (t.activeTool.fillStyle = k, i((st) => st + 1));
  }, po = (k) => {
    rt ? g({ strokeStyle: k }) : Q ? x({ strokeStyle: k }) : (t.activeTool.strokeStyle = k, i((st) => st + 1));
  }, ue = (k) => {
    rt ? g({ strokeWidth: k }) : Q ? x({ strokeWidth: k }) : (t.activeTool.width = k, i((st) => st + 1));
  }, ve = (k) => {
    rt ? g({ roughness: k }) : (t.activeTool.roughness = k, i((st) => st + 1));
  }, _e = (k) => {
    rt ? g({ opacity: k }) : Q ? x({ opacity: k }) : q ? z({ opacity: k }) : B ? M({ opacity: k }) : $ ? j({ opacity: k }) : Y ? X({ opacity: k }) : V ? N({ opacity: k }) : (t.activeTool.opacity = k, i((st) => st + 1));
  }, to = (k) => {
    q ? z({ fontFamily: k }) : (t.activeTool.fontFamily = k, i((st) => st + 1));
  }, fe = (k) => {
    q ? z({ fontSize: k }) : (t.activeTool.fontSize = k, i((st) => st + 1));
  }, Se = (k) => {
    q ? z({ align: k }) : (t.activeTool.textAlign = k, i((st) => st + 1));
  }, be = (k) => {
    q ? z({ color: k }) : (t.activeTool.color = k, i((st) => st + 1));
  }, Fe = {
    position: "fixed",
    left: m.x,
    top: m.y,
    width: un,
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
      style: Fe,
      onPointerDown: (k) => k.stopPropagation(),
      children: [
        /* @__PURE__ */ v(
          "div",
          {
            onPointerDown: y,
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
            children: [
              /* @__PURE__ */ u("span", { style: { opacity: 0.6 }, children: "⋮⋮" }),
              /* @__PURE__ */ u("span", { children: "Drag to move" })
            ]
          }
        ),
        Pe && /* @__PURE__ */ v(ut, { children: [
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Font" }),
            /* @__PURE__ */ u(
              Br,
              {
                value: ot,
                onChange: to,
                fontsInScene: Kt
              }
            )
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Size" }),
            af.map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => fe(k),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: yt === k ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: k
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Align" }),
            lf.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.key,
                onClick: () => Se(k.key),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: ft === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: k.label
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Color" }),
            Xe.map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => be(k),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: et === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          q && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Border" }),
            [null, ...Xe].map((k, st) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => z({ borderColor: k ?? void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === k ? "2px solid white" : `2px solid ${st === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: st === 0 && /* @__PURE__ */ u(
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
              k ?? "none"
            ))
          ] }),
          q && b.node.data.borderColor && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Style" }),
            Io.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => z({ borderStyle: k.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === k.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: k.dash
                  }
                ) })
              },
              k.key
            ))
          ] }),
          q && b.node.data.borderColor && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Width" }),
            zo.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: `${k}px`,
                onClick: () => z({ borderWidth: k }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(k, 1),
                      background: "white",
                      borderRadius: k / 2
                    }
                  }
                )
              },
              k
            ))
          ] })
        ] }),
        Qt && /* @__PURE__ */ v(ut, { children: [
          K && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Shape" }),
            sf.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => {
                  t.activeTool.shapeType = k.key, i((st) => st + 1);
                },
                style: {
                  ...Vt,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(cf, { name: k.key })
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Stroke" }),
            Xe.map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => _t(k),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: Tt === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          Zt && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Fill" }),
            of.map((k, st) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => Re(k),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: Ct === k ? "2px solid white" : `2px solid ${st === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: st === 0 && /* @__PURE__ */ u(
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
              k ?? "none"
            ))
          ] }),
          Zt && Ct && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Fill pattern" }),
            rf.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => $e(k.key),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: bt === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(df, { style: k.key })
              },
              k.key
            ))
          ] }),
          Jt && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Stroke style" }),
            Io.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => po(k.key),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: ht === k.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: k.dash
                  }
                ) })
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Stroke width" }),
            zo.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: `${k}px`,
                onClick: () => ue(k),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: Dt === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(k, 1),
                      background: "white",
                      borderRadius: k / 2
                    }
                  }
                )
              },
              k
            ))
          ] }),
          he && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Roughness" }),
            nf.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => ve(k.value),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: It === k.value ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: k.label
              },
              k.value
            ))
          ] })
        ] }),
        R && /* @__PURE__ */ v(ut, { children: [
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Color" }),
            Xe.map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => I({ color: k }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: b.node.data.color === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Style" }),
            Io.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => I({ style: k.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: b.node.data.style === k.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: k.dash
                  }
                ) })
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Width" }),
            zo.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: `${k}px`,
                onClick: () => I({ strokeWidth: k }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: b.node.data.strokeWidth === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(k, 1),
                      background: "white",
                      borderRadius: k / 2
                    }
                  }
                )
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => I({ arrowHead: k }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.arrowHead ?? "none") === k ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: k === "none" ? "None" : k === "arrow" ? "▷" : k === "filled" ? "▶" : "●"
              },
              k
            ))
          ] }),
          (b.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Head size" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (k) => I({ arrowHeadSize: Number(k.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowHeadSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => I({ arrowTail: k }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.arrowTail ?? "none") === k ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: k === "none" ? "None" : k === "arrow" ? "◁" : k === "filled" ? "◀" : "●"
              },
              k
            ))
          ] }),
          (b.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Tail size" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3),
                onChange: (k) => I({ arrowTailSize: Number(k.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ u("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: b.node.data.arrowTailSize ?? Math.max(8, b.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Label" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (k) => I({ label: k.target.value || void 0 }),
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
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => I({ edgeType: k.key }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.edgeType ?? "bezier") === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: k.label
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Animate" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: () => I({ animated: !b.node.data.animated }),
                style: {
                  ...Vt,
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
          b.node.data.animated && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Direction" }),
            ["forward", "reverse", "both"].map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => I({ animatedDirection: k }),
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 8px",
                  background: (b.node.data.animatedDirection ?? "forward") === k ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: k === "forward" ? "→" : k === "reverse" ? "←" : "⇆"
              },
              k
            ))
          ] })
        ] }),
        B && /* @__PURE__ */ v(ut, { children: [
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Border" }),
            [null, ...Xe].map((k, st) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => M({ borderColor: k ?? void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === k ? "2px solid white" : `2px solid ${st === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: st === 0 && /* @__PURE__ */ u(
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
              k ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Style" }),
            Io.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => M({ borderStyle: k.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === k.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: k.dash
                  }
                ) })
              },
              k.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Width" }),
            zo.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: `${k}px`,
                onClick: () => M({ borderWidth: k }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(k, 1),
                      background: "white",
                      borderRadius: k / 2
                    }
                  }
                )
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: { ...Ft, marginTop: 4 }, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Background" }),
            /* @__PURE__ */ u(
              "button",
              {
                onClick: async () => {
                  if (!(J === "loading" || b.kind !== "image")) {
                    dt("loading");
                    try {
                      const { removeBackground: k } = await import("@imgly/background-removal"), Yt = await (await fetch(b.node.data.src)).blob(), ne = await k(Yt), ge = new FileReader(), Ae = await new Promise((eo, me) => {
                        ge.onload = () => eo(ge.result), ge.onerror = me, ge.readAsDataURL(ne);
                      });
                      M({ src: Ae }), dt("idle");
                    } catch (k) {
                      console.error("Background removal failed:", k), dt("error"), setTimeout(() => dt("idle"), 3e3);
                    }
                  }
                },
                disabled: J === "loading",
                style: {
                  ...Vt,
                  height: 28,
                  padding: "0 10px",
                  background: J === "error" ? "#e74c3c" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6,
                  gap: 4,
                  opacity: J === "loading" ? 0.6 : 1
                },
                children: J === "loading" ? "Removing..." : J === "error" ? "Failed" : "Remove BG"
              }
            )
          ] })
        ] }),
        $ && /* @__PURE__ */ v(ut, { children: [
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Border" }),
            [null, ...Xe].map((k, st) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => j({ borderColor: k ?? void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (b.node.data.borderColor ?? null) === k ? "2px solid white" : `2px solid ${st === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: st === 0 && /* @__PURE__ */ u(
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
              k ?? "none"
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Style" }),
            Io.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => j({ borderStyle: k.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "solid") === k.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: k.dash
                  }
                ) })
              },
              k.key
            ))
          ] }),
          b.node.data.borderColor && /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Width" }),
            zo.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: `${k}px`,
                onClick: () => j({ borderWidth: k }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(k, 1),
                      background: "white",
                      borderRadius: k / 2
                    }
                  }
                )
              },
              k
            ))
          ] })
        ] }),
        Y && /* @__PURE__ */ v(ut, { children: [
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Label" }),
            /* @__PURE__ */ u(
              "input",
              {
                type: "text",
                value: b.node.data.label ?? "",
                onChange: (k) => X({ label: k.target.value || void 0 }),
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
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Background" }),
            [null, ...Xe].map((k, st) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => X({ backgroundColor: k ? `${k}15` : void 0 }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (() => {
                    const Yt = b.node.data.backgroundColor;
                    return (k === null ? !Yt : Yt === `${k}15`) ? "2px solid white" : `2px solid ${st === 0 ? "#555" : "transparent"}`;
                  })(),
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: st === 0 && /* @__PURE__ */ u(
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
              k ?? "none"
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Border" }),
            Xe.map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => X({ borderColor: k }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: b.node.data.borderColor === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Style" }),
            Io.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: k.label,
                onClick: () => X({ borderStyle: k.key }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 28,
                  background: (b.node.data.borderStyle ?? "dashed") === k.key ? "#3b82f6" : "#2a2a3e",
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
                    strokeDasharray: k.dash
                  }
                ) })
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Width" }),
            zo.map((k) => /* @__PURE__ */ u(
              "button",
              {
                title: `${k}px`,
                onClick: () => X({ borderWidth: k }),
                style: {
                  ...Vt,
                  width: 36,
                  height: 24,
                  background: (b.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ u(
                  "div",
                  {
                    style: {
                      width: 20,
                      height: Math.max(k, 1),
                      background: "white",
                      borderRadius: k / 2
                    }
                  }
                )
              },
              k
            ))
          ] })
        ] }),
        V && /* @__PURE__ */ v(ut, { children: [
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => N({ color: k }),
                style: {
                  ...Vt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: b.node.data.color === k ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Ft, children: [
            /* @__PURE__ */ u("span", { style: Nt, children: "Size" }),
            [12, 14, 16, 20, 24].map((k) => /* @__PURE__ */ u(
              "button",
              {
                onClick: () => N({ fontSize: k }),
                style: {
                  ...Vt,
                  width: 32,
                  height: 24,
                  background: (b.node.data.fontSize ?? 16) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6,
                  fontSize: 10,
                  color: "white"
                },
                children: k
              },
              k
            ))
          ] })
        ] }),
        H && (() => {
          const { node: k, PanelComponent: st } = b;
          return /* @__PURE__ */ u(st, { node: k, data: k.data, engine: t, updateData: _ });
        })(),
        !R && !H && /* @__PURE__ */ v("div", { style: Ft, children: [
          /* @__PURE__ */ u("span", { style: Nt, children: "Opacity" }),
          /* @__PURE__ */ u(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Pt * 100),
              onChange: (k) => _e(parseInt(k.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ u("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Pt * 100) })
        ] })
      ]
    }
  );
}
function cf({ name: t, size: e = 16 }) {
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
    t === "arrow" && /* @__PURE__ */ v(ut, { children: [
      /* @__PURE__ */ u("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ u("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function df({ style: t }) {
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
  Ve as D,
  Gl as N,
  Qo as P,
  xf as S,
  kf as T,
  vn as a,
  Sd as b,
  vf as c,
  Du as d,
  wf as e,
  Bh as f,
  Yl as g,
  vd as h,
  Jl as i,
  Kc as j,
  td as k,
  cd as l,
  or as m,
  At as n,
  Bn as o,
  nd as p,
  En as q,
  Ml as r,
  no as s,
  gl as t,
  hh as u,
  $c as v,
  fd as w,
  ad as x,
  $t as y
};
