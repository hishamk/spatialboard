var za = Object.defineProperty;
var Ta = (t, e, o) => e in t ? za(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var xt = (t, e, o) => Ta(t, typeof e != "symbol" ? e + "" : e, o);
import { BlockNoteSchema as Pa, defaultBlockSpecs as Aa, BlockNoteEditor as Ra } from "@blocknote/core";
import { jsxs as v, jsx as d, Fragment as lt } from "react/jsx-runtime";
import Da, { memo as ue, useRef as it, useState as $, useEffect as yt, useCallback as rt, Component as Ea, useMemo as qt, useLayoutEffect as In, useContext as ni, createContext as si, Suspense as Wa, lazy as La } from "react";
import { useCreateBlockNote as Fa } from "@blocknote/react";
import { BlockNoteView as Na } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { createPortal as fo } from "react-dom";
const Ba = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
let Rt = (t = 21) => {
  let e = "", o = crypto.getRandomValues(new Uint8Array(t |= 0));
  for (; t--; )
    e += Ba[o[t] & 63];
  return e;
};
const Ha = {
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
}, Oa = {
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
}, Xa = {
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
}, Ya = {
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
}, Ga = {
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
}, ja = {
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
}, Va = {
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
}, Ua = {
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
}, Za = {
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
}, qa = {
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
}, Ka = {
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
}, Qa = {
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
}, ii = [
  Ha,
  Oa,
  Xa,
  Ya,
  Ga,
  ja,
  Va,
  Ua,
  Za,
  qa,
  Ka,
  Qa
];
class Ja {
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
const ai = 4, $a = 8, _a = 24;
function co(t, e, o, r) {
  if (!t.rotation) return [e, o];
  const n = t.x + t.w / 2, s = t.y + r / 2, i = -t.rotation * Math.PI / 180, l = Math.cos(i), a = Math.sin(i), c = e - n, u = o - s;
  return [n + c * l - u * a, s + c * a + u * l];
}
function br(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
function tl(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, u) => u.z - c.z);
  let l = null, a = null;
  for (const c of i)
    if (c.type === "draw") {
      if (zn(c, e, o, r))
        return c;
    } else if (c.type === "shape") {
      if (zr(c, e, o, r)) return c;
      if (!a && c.data.label) {
        const u = c.h === "auto" ? 100 : c.h, [f, h] = co(c, e, o, u), p = di(c, u);
        p && f >= p.lx && f <= p.rx && h >= p.ly && h <= p.ry && (a = c);
      }
    } else if (s && s.has(c.type)) {
      const u = br(c, n);
      li(c, e, o, r, u) && (l || (l = c));
    } else {
      const u = br(c, n), f = ai / r, [h, p] = co(c, e, o, u);
      h >= c.x - f && h <= c.x + c.w + f && p >= c.y - f && p <= c.y + u + f && (a || (a = c));
    }
  return a ?? l;
}
function li(t, e, o, r, n) {
  const s = n ?? (t.h === "auto" ? 100 : t.h), [i, l] = co(t, e, o, s), a = $a / r;
  if (t.data.label && i >= t.x && i <= t.x + t.w && l >= t.y - _a && l <= t.y)
    return !0;
  if (i < t.x - a || i > t.x + t.w + a || l < t.y - a || l > t.y + s + a)
    return !1;
  const u = Math.abs(i - t.x), f = Math.abs(i - (t.x + t.w)), h = Math.abs(l - t.y), p = Math.abs(l - (t.y + s)), y = i >= t.x - a && i <= t.x + t.w + a;
  return l >= t.y - a && l <= t.y + s + a && (u <= a || f <= a) || y && (h <= a || p <= a);
}
function ci(t, e, o, r, n, s) {
  const i = n - o, l = s - r, a = i * i + l * l;
  if (a === 0) return (t - o) ** 2 + (e - r) ** 2;
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / a)), u = o + c * i, f = r + c * l;
  return (t - u) ** 2 + (e - f) ** 2;
}
function di(t, e) {
  const o = t.data;
  if (!o.label) return null;
  const r = o.labelFontSize ?? 14, n = r * 1.3, s = r * 0.55, l = t.w - 12 * 2, a = o.label.split(`
`);
  let c = 0;
  for (const y of a) {
    const g = y.length * s;
    c += Math.max(1, Math.ceil(g / Math.max(l, 1)));
  }
  const u = c * n, f = Math.min(l, Math.max(...a.map((y) => y.length)) * s), h = t.x + t.w / 2, p = t.y + e / 2;
  return {
    lx: h - f / 2 - 4,
    ly: p - u / 2 - 4,
    rx: h + f / 2 + 4,
    ry: p + u / 2 + 4
  };
}
function zr(t, e, o, r, n) {
  const s = t.h === "auto" ? 100 : t.h, [i, l] = co(t, e, o, s), a = t.data, u = (a.strokeWidth ?? 2) / 2 / r, f = !!a.fill || !!n;
  switch (a.shape) {
    case "rect": {
      if (f)
        return i >= t.x - u && i <= t.x + t.w + u && l >= t.y - u && l <= t.y + s + u;
      const h = Math.abs(i - t.x), p = Math.abs(i - (t.x + t.w)), y = Math.abs(l - t.y), g = Math.abs(l - (t.y + s)), m = i >= t.x - u && i <= t.x + t.w + u;
      return l >= t.y - u && l <= t.y + s + u && (h <= u || p <= u) || m && (y <= u || g <= u);
    }
    case "ellipse": {
      const h = t.x + t.w / 2, p = t.y + s / 2, y = t.w / 2, g = s / 2;
      if (y === 0 || g === 0) return !1;
      const m = (i - h) / y, w = (l - p) / g, b = m * m + w * w;
      if (f) {
        const S = ((y + u) / y) ** 2;
        return b <= S;
      }
      const M = u / Math.min(y, g);
      return Math.abs(Math.sqrt(b) - 1) <= M;
    }
    case "diamond": {
      const h = t.x + t.w / 2, p = t.y + s / 2, y = t.w / 2, g = s / 2;
      if (y === 0 || g === 0) return !1;
      const m = Math.abs(i - h) / y, w = Math.abs(l - p) / g, b = m + w;
      if (f) {
        const S = u / Math.min(y, g);
        return b <= 1 + S;
      }
      const M = u / Math.min(y, g);
      return Math.abs(b - 1) <= M;
    }
    case "line":
    case "arrow": {
      const h = a.startPoint ?? [0, 0], p = a.endPoint ?? [t.w, s], y = t.x + h[0], g = t.y + h[1], m = t.x + p[0], w = t.y + p[1];
      return ci(i, l, y, g, m, w) <= u * u;
    }
    default:
      return i >= t.x - u && i <= t.x + t.w + u && l >= t.y - u && l <= t.y + s + u;
  }
}
function el(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const i = o[n][0], l = o[n][1], a = o[s][0], c = o[s][1];
    l > e != c > e && t < (a - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
function zn(t, e, o, r) {
  const s = t.data.strokeWidth / 2 / r, i = s * s, l = t.h === "auto" ? 100 : t.h, [a, c] = co(t, e, o, l);
  if (a < t.x - s || a > t.x + t.w + s || c < t.y - s || c > t.y + l + s)
    return !1;
  const u = t.data.points;
  if (!u || u.length === 0) return !1;
  const f = a - t.x, h = c - t.y;
  if (u.length === 1) {
    const p = f - u[0][0], y = h - u[0][1];
    return p * p + y * y <= i;
  }
  if (t.data.fill && u.length >= 3 && el(f, h, u))
    return !0;
  for (let p = 0; p < u.length - 1; p++)
    if (ci(f, h, u[p][0], u[p][1], u[p + 1][0], u[p + 1][1]) <= i)
      return !0;
  return !1;
}
function ol(t, e, o, r = 1, n, s) {
  const i = Array.from(t.values()).filter((c) => c.type !== "edge").sort((c, u) => u.z - c.z), l = [], a = [];
  for (const c of i)
    if (c.type === "draw")
      zn(c, e, o, r) && l.push(c);
    else if (c.type === "shape") {
      if (zr(c, e, o, r))
        l.push(c);
      else if (c.data.label) {
        const u = c.h === "auto" ? 100 : c.h, [f, h] = co(c, e, o, u), p = di(c, u);
        p && f >= p.lx && f <= p.rx && h >= p.ly && h <= p.ry && a.push(c);
      }
    } else if (s && s.has(c.type)) {
      const u = br(c, n);
      li(c, e, o, r, u) && a.push(c);
    } else {
      const u = br(c, n), f = ai / r, [h, p] = co(c, e, o, u);
      h >= c.x - f && h <= c.x + c.w + f && p >= c.y - f && p <= c.y + u + f && a.push(c);
    }
  return [...l, ...a];
}
function ir(t, e) {
  if (!t.rotation) return { x: t.x, y: t.y, w: t.w, h: e };
  const o = t.x + t.w / 2, r = t.y + e / 2, n = t.w / 2, s = e / 2, i = t.rotation * Math.PI / 180, l = Math.abs(Math.cos(i)), a = Math.abs(Math.sin(i)), c = n * l + s * a, u = n * a + s * l;
  return {
    x: o - c,
    y: r - u,
    w: c * 2,
    h: u * 2
  };
}
const Te = class Te {
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
    this.nodes[0] = new Te({ x: r + e, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[1] = new Te({ x: r, y: n, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[2] = new Te({ x: r, y: n + o, w: e, h: o }, this.level + 1, this.heightMap), this.nodes[3] = new Te({ x: r + e, y: n + o, w: e, h: o }, this.level + 1, this.heightMap);
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
    const n = ir(e, r);
    if (this.nodes.length) {
      const s = this.getIndex(n);
      if (s !== -1) {
        this.nodes[s].insert(e, r);
        return;
      }
    }
    if (this.objects.push(e), this.objects.length > Te.MAX_OBJECTS && this.level < Te.MAX_LEVELS) {
      this.nodes.length || this.split();
      let s = 0;
      for (; s < this.objects.length; ) {
        const i = this.objects[s], l = this.resolveH(i), a = ir(i, l), c = this.getIndex(a);
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
      const r = this.resolveH(e), n = this.getIndex(ir(e, r));
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
      const s = this.resolveH(n), i = ir(n, s);
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
xt(Te, "MAX_OBJECTS", 10), // Max depth of the tree
xt(Te, "MAX_LEVELS", 8);
let an = Te;
function Go(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function Vo(t, e, o) {
  return {
    x: (e - t.x) / t.zoom,
    y: (o - t.y) / t.zoom
  };
}
function rl(t, e, o) {
  return {
    x: e * t.zoom + t.x,
    y: o * t.zoom + t.y
  };
}
function nl(t, e, o, r) {
  const n = e > 0 ? 0.95 : 1.05, s = Go(t.zoom * n, 0.1, 5), i = Vo(t, o, r);
  return {
    x: o - i.x * s,
    y: r - i.y * s,
    zoom: s
  };
}
const Tn = Pa.create({
  blockSpecs: {
    ...Aa
    // Future custom blocks:
    // callout: CalloutBlock,
    // aiPrompt: AIPromptBlock,
  }
});
let Yr = null;
function Pn() {
  return Yr || (Yr = Ra.create({ schema: Tn })), Yr;
}
async function sl(t) {
  return await Pn().blocksToMarkdownLossy(t);
}
async function An(t) {
  return await Pn().tryParseMarkdownToBlocks(t);
}
function hi(t) {
  return Pn().tryParseHTMLToBlocks(t);
}
function il(t, e, o) {
  const [r, n] = t, [s, i] = e, [l, a] = o, c = l - s, u = a - i, f = c * c + u * u;
  if (f === 0)
    return (r - s) ** 2 + (n - i) ** 2;
  let h = ((r - s) * c + (n - i) * u) / f;
  h = Math.max(0, Math.min(1, h));
  const p = s + h * c, y = i + h * u;
  return (r - p) ** 2 + (n - y) ** 2;
}
function ln(t, e = 1) {
  if (t.length <= 2) return t;
  let o = 0, r = 0;
  const n = t[0], s = t[t.length - 1];
  for (let a = 1; a < t.length - 1; a++) {
    const c = il(t[a], n, s);
    c > o && (o = c, r = a);
  }
  if (o <= e)
    return [n, s];
  const i = ln(t.slice(0, r + 1), e), l = ln(t.slice(r), e);
  return [...i.slice(0, -1), ...l];
}
async function al(t, e) {
  const o = [], r = ['canvas_w="2000"', 'canvas_h="1500"', 'grid="20"', 'snap="false"'];
  if (e != null && e.background && e.background !== "dot-grid" && r.push(`background="${e.background}"`), e != null && e.originView) {
    const h = e.originView;
    r.push(`originView="${h.x},${h.y},${h.zoom}"`);
  }
  o.push(`<!--@meta ${r.join(" ")} -->`), o.push("");
  const n = t.filter((h) => h.type === "frame").sort((h, p) => h.z - p.z || h.y - p.y || h.x - p.x);
  for (const h of n) {
    const p = h.h === "auto" ? "auto" : Math.round(h.h), y = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${p}"`,
      `z="${h.z}"`
    ];
    h.data.label && y.push(`label="${h.data.label.replace(/"/g, "&quot;")}"`), h.data.backgroundColor && y.push(`backgroundColor="${h.data.backgroundColor}"`), h.data.borderColor && y.push(`borderColor="${h.data.borderColor}"`), h.data.borderWidth != null && y.push(`borderWidth="${h.data.borderWidth}"`), h.data.borderStyle && h.data.borderStyle !== "solid" && y.push(`borderStyle="${h.data.borderStyle}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && y.push(`opacity="${h.data.opacity}"`), h.data.slideOrder != null && y.push(`slideOrder="${h.data.slideOrder}"`), h.data.transition && h.data.transition !== "pan" && y.push(`transition="${h.data.transition}"`), h.data.transitionDuration != null && y.push(`transitionDuration="${h.data.transitionDuration}"`), h.rotation && y.push(`rotation="${h.rotation}"`), h.locked && y.push('locked="true"'), h.groupId && y.push(`group="${h.groupId}"`), o.push(`<!--@frame ${y.join(" ")} -->`), o.push("");
  }
  const s = t.filter((h) => h.type === "content").sort((h, p) => h.z - p.z || h.y - p.y || h.x - p.x);
  for (const h of s) {
    const p = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${h.h}"`,
      `z="${h.z}"`
    ];
    h.rotation && p.push(`rotation="${h.rotation}"`), h.locked && p.push('locked="true"'), h.groupId && p.push(`group="${h.groupId}"`), h.data.borderColor && p.push(`borderColor="${h.data.borderColor}"`), h.data.borderWidth != null && p.push(`borderWidth="${h.data.borderWidth}"`), h.data.borderStyle && h.data.borderStyle !== "solid" && p.push(`borderStyle="${h.data.borderStyle}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && p.push(`opacity="${h.data.opacity}"`), o.push(`<!--@block ${p.join(" ")} -->`);
    const y = h.data.blocks.length > 0 ? await sl(h.data.blocks) : "";
    o.push(y), o.push("");
  }
  const i = t.filter((h) => h.type === "draw");
  for (const h of i) {
    const p = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `z="${h.z}"`,
      `tool="${h.data.tool}"`,
      `color="${h.data.color}"`,
      `width="${h.data.strokeWidth}"`
    ];
    h.data.opacity !== void 0 && h.data.opacity !== 1 && p.push(`opacity="${h.data.opacity}"`), h.data.fill && p.push(`fill="${h.data.fill}"`), h.data.fillStyle && h.data.fillStyle !== "hachure" && p.push(`fillStyle="${h.data.fillStyle}"`), h.rotation && p.push(`rotation="${h.rotation}"`), h.locked && p.push('locked="true"'), h.groupId && p.push(`group="${h.groupId}"`), o.push(`<!--@draw ${p.join(" ")} -->`);
    const g = ln([...h.data.points], 1).map(
      ([m, w, b]) => `${(m + h.x).toFixed(1)},${(w + h.y).toFixed(1)},${b.toFixed(2)}`
    ).join(" ");
    o.push(g), o.push("");
  }
  const l = t.filter((h) => h.type === "shape");
  for (const h of l) {
    const p = h.h === "auto" ? "auto" : Math.round(h.h), y = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${p}"`,
      `z="${h.z}"`,
      'tool="shape"',
      `shape="${h.data.shape}"`,
      `color="${h.data.stroke}"`,
      `stroke="${h.data.strokeWidth}"`,
      `roughness="${h.data.roughness}"`
    ];
    h.data.fill && y.push(`fill="${h.data.fill}"`), h.data.fillStyle && h.data.fillStyle !== "hachure" && y.push(`fillStyle="${h.data.fillStyle}"`), h.data.strokeStyle && h.data.strokeStyle !== "solid" && y.push(`strokeStyle="${h.data.strokeStyle}"`), h.data.edgeStyle && h.data.edgeStyle !== "sharp" && y.push(`edgeStyle="${h.data.edgeStyle}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && y.push(`opacity="${h.data.opacity}"`), h.data.startPoint && y.push(`startPt="${h.data.startPoint[0].toFixed(1)},${h.data.startPoint[1].toFixed(1)}"`), h.data.endPoint && y.push(`endPt="${h.data.endPoint[0].toFixed(1)},${h.data.endPoint[1].toFixed(1)}"`), h.data.label && y.push(`label="${h.data.label.replace(/"/g, "&quot;")}"`), h.data.labelFontSize && y.push(`labelFontSize="${h.data.labelFontSize}"`), h.data.labelFontFamily && h.data.labelFontFamily !== "Excalifont" && y.push(`labelFontFamily="${h.data.labelFontFamily}"`), h.data.labelAlign && h.data.labelAlign !== "center" && y.push(`labelAlign="${h.data.labelAlign}"`), h.rotation && y.push(`rotation="${h.rotation}"`), h.locked && y.push('locked="true"'), h.groupId && y.push(`group="${h.groupId}"`), o.push(`<!--@draw ${y.join(" ")} -->`), o.push("");
  }
  const a = t.filter((h) => h.type === "text");
  for (const h of a) {
    const p = [
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
    h.data.opacity !== void 0 && h.data.opacity !== 1 && p.push(`opacity="${h.data.opacity}"`), h.rotation && p.push(`rotation="${h.rotation}"`), h.locked && p.push('locked="true"'), h.groupId && p.push(`group="${h.groupId}"`), o.push(`<!--@text ${p.join(" ")} -->`), o.push(h.data.text), o.push("");
  }
  const c = t.filter((h) => h.type === "image");
  for (const h of c) {
    const p = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${Math.round(h.h)}"`,
      `z="${h.z}"`,
      `src="${h.data.src.replace(/"/g, "&quot;")}"`
    ];
    h.rotation && p.push(`rotation="${h.rotation}"`), h.locked && p.push('locked="true"'), h.groupId && p.push(`group="${h.groupId}"`), h.data.alt && p.push(`alt="${h.data.alt.replace(/"/g, "&quot;")}"`), h.data.opacity != null && h.data.opacity !== 1 && p.push(`opacity="${h.data.opacity}"`), h.data.borderColor && p.push(`borderColor="${h.data.borderColor}"`), h.data.borderWidth != null && p.push(`borderWidth="${h.data.borderWidth}"`), h.data.borderStyle && h.data.borderStyle !== "solid" && p.push(`borderStyle="${h.data.borderStyle}"`), o.push(`<!--@image ${p.join(" ")} -->`), o.push("");
  }
  const u = t.filter((h) => h.type === "edge");
  for (const h of u) {
    const p = [
      `id="${h.id}"`,
      `from="${h.data.fromId}"`,
      `to="${h.data.toId}"`,
      `style="${h.data.style}"`,
      `color="${h.data.color}"`
    ];
    h.data.label && p.push(`label="${h.data.label}"`), h.data.strokeWidth && h.data.strokeWidth !== 1 && p.push(`strokeWidth="${h.data.strokeWidth}"`), h.data.arrowHead && h.data.arrowHead !== "none" && p.push(`arrowHead="${h.data.arrowHead}"`), h.data.arrowTail && h.data.arrowTail !== "none" && p.push(`arrowTail="${h.data.arrowTail}"`), h.data.arrowHeadSize && p.push(`arrowHeadSize="${h.data.arrowHeadSize}"`), h.data.arrowTailSize && p.push(`arrowTailSize="${h.data.arrowTailSize}"`), h.data.edgeType && h.data.edgeType !== "bezier" && p.push(`edgeType="${h.data.edgeType}"`), h.data.animated && p.push('animated="true"'), h.data.animatedDirection && h.data.animatedDirection !== "forward" && p.push(`animatedDirection="${h.data.animatedDirection}"`), h.data.sourceHandle && p.push(`sourceHandle="${h.data.sourceHandle}"`), h.data.targetHandle && p.push(`targetHandle="${h.data.targetHandle}"`), h.data.midpointOffset != null && h.data.midpointOffset !== 0.5 && p.push(`midpointOffset="${h.data.midpointOffset}"`), h.data.curveOffset && (h.data.curveOffset[0] !== 0 || h.data.curveOffset[1] !== 0) && p.push(`curveOffset="${h.data.curveOffset[0]},${h.data.curveOffset[1]}"`), h.locked && p.push('locked="true"'), h.groupId && p.push(`group="${h.groupId}"`), o.push(`<!--@edge ${p.join(" ")} -->`), o.push("");
  }
  const f = t.filter((h) => h.type === "sticky");
  for (const h of f) {
    const p = [
      `id="${h.id}"`,
      `x="${Math.round(h.x)}"`,
      `y="${Math.round(h.y)}"`,
      `w="${Math.round(h.w)}"`,
      `h="${h.h}"`,
      `z="${h.z}"`,
      `color="${h.data.color}"`
    ];
    h.data.fontSize && h.data.fontSize !== 16 && p.push(`fontSize="${h.data.fontSize}"`), h.data.opacity !== void 0 && h.data.opacity !== 1 && p.push(`opacity="${h.data.opacity}"`), h.rotation && p.push(`rotation="${h.rotation}"`), h.locked && p.push('locked="true"'), h.groupId && p.push(`group="${h.groupId}"`), o.push(`<!--@sticky ${p.join(" ")} -->`), o.push(h.data.text), o.push("");
  }
  return o.join(`
`);
}
const ui = "data:font/woff2;base64,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", Ee = "Excalifont", yr = [
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
], fi = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), ll = /* @__PURE__ */ new Set(["Excalifont"]), cl = /* @__PURE__ */ new Set([...fi, ...ll]);
function dl(t) {
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
function We(t) {
  return fi.has(t) ? t : `'${t}', sans-serif`;
}
let cs = !1;
function hl(t = document) {
  if (cs) return;
  cs = !0;
  const e = t.createElement("style");
  e.textContent = `
@font-face {
  font-family: 'Excalifont';
  src: url('${ui}') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}`, t.head.appendChild(e);
  const o = yr.filter((n) => !cl.has(n.key)).map((n) => "family=" + n.key.replace(/ /g, "+")).join("&"), r = t.createElement("link");
  r.rel = "stylesheet", r.href = `https://fonts.googleapis.com/css2?${o}&display=swap`, t.head.appendChild(r);
}
function Oe(t) {
  const e = {}, o = /(\w+)="([^"]*)"/g;
  let r;
  for (; (r = o.exec(t)) !== null; )
    e[r[1]] = r[2];
  return e;
}
const ul = {
  default: "dot-grid",
  "cutting-board": "blueprint"
};
async function fl(t) {
  var s, i;
  const e = [], o = {}, r = t.split(`
`);
  let n = 0;
  for (; n < r.length; ) {
    const l = r[n].trim();
    if (l.startsWith("<!--@meta")) {
      const a = Oe(l);
      if (a.background) {
        const c = ul[a.background] ?? a.background;
        o.background = c;
      }
      if (a.originView) {
        const c = a.originView.split(",").map(Number);
        c.length === 3 && c.every((u) => !isNaN(u)) && (o.originView = { x: c[0], y: c[1], zoom: c[2] });
      }
      n++;
      continue;
    }
    if (l.startsWith("<!--@frame")) {
      const a = Oe(l);
      for (n++; n < r.length && r[n].trim() === ""; ) n++;
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
    if (l.startsWith("<!--@block")) {
      const a = Oe(l);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
      const u = c.join(`
`), f = u.trim().length > 0 ? await An(u) : [];
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
          blocks: f,
          markdown: u,
          borderColor: a.borderColor || void 0,
          borderWidth: a.borderWidth ? parseFloat(a.borderWidth) : void 0,
          borderStyle: a.borderStyle || void 0,
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (l.startsWith("<!--@draw")) {
      const a = Oe(l);
      if (n++, a.tool === "shape")
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
        }); n < r.length && r[n].trim() === ""; ) n++;
      else {
        let c = "";
        n < r.length && !r[n].trim().startsWith("<!--@") && (c = r[n].trim(), n++);
        const u = c ? c.split(" ").filter(Boolean).map((m) => {
          const w = m.split(",").map(Number);
          return [
            w[0] || 0,
            w[1] || 0,
            w[2] || 0.5
          ];
        }) : [];
        let f = 1 / 0, h = 1 / 0, p = -1 / 0, y = -1 / 0;
        for (const [m, w] of u)
          m < f && (f = m), w < h && (h = w), m > p && (p = m), w > y && (y = w);
        isFinite(f) || (f = parseFloat(a.x || "0"), h = parseFloat(a.y || "0"), p = f, y = h);
        const g = u.map(
          ([m, w, b]) => [m - f, w - h, b]
        );
        for (e.push({
          id: a.id || Rt(10),
          type: "draw",
          x: f,
          y: h,
          w: p - f,
          h: y - h,
          z: parseInt(a.z || "0"),
          rotation: a.rotation ? parseFloat(a.rotation) : void 0,
          locked: a.locked === "true" || void 0,
          groupId: a.group || void 0,
          data: {
            tool: a.tool || "pen",
            points: g,
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
      const a = Oe(l);
      n++, e.push({
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
    if (l.startsWith("<!--@edge")) {
      const a = Oe(l);
      for (n++, e.push({
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
          midpointOffset: a.midpointOffset ? parseFloat(a.midpointOffset) : void 0,
          curveOffset: a.curveOffset ? a.curveOffset.split(",").map(Number) : void 0
        }
      }); n < r.length && r[n].trim() === ""; ) n++;
      continue;
    }
    if (l.startsWith("<!--@text")) {
      const a = Oe(l);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
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
          text: c.join(`
`),
          fontSize: parseFloat(a.fontSize || "20"),
          fontFamily: a.fontFamily || Ee,
          color: a.color || "#1e1e2e",
          align: a.align || "left",
          opacity: a.opacity ? parseFloat(a.opacity) : void 0
        }
      });
      continue;
    }
    if (l.startsWith("<!--@sticky")) {
      const a = Oe(l);
      n++;
      const c = [];
      for (; n < r.length && !r[n].trim().startsWith("<!--@"); )
        c.push(r[n]), n++;
      for (; c.length > 0 && c[c.length - 1].trim() === ""; )
        c.pop();
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
function ho(t, e) {
  return t.h !== "auto" ? t.h : (e == null ? void 0 : e[t.id]) ?? 100;
}
const pl = 14;
function Ko(t, e, o, r, n) {
  const s = e.find((h) => h.id === o);
  if (!s) return null;
  const i = ho(t, n), l = pl / r, a = e.filter((h) => h.direction === s.direction), c = a.indexOf(s);
  if (c < 0) return null;
  const u = t.y + i / (a.length + 1) * (c + 1), f = s.direction === "input" ? t.x - l : t.x + t.w + l;
  if (t.rotation) {
    const h = t.x + t.w / 2, p = t.y + i / 2, y = t.rotation * Math.PI / 180, g = Math.cos(y), m = Math.sin(y), w = f - h, b = u - p;
    return { x: h + w * g - b * m, y: p + w * m + b * g };
  }
  return { x: f, y: u };
}
function ds(t, e, o, r, n, s, i, l) {
  const a = i - n, c = l - s;
  if (a === 0 && c === 0) return { x: n, y: s, side: "right" };
  let u = 1 / 0, f = n, h = s, p = "right";
  if (a !== 0) {
    const y = (t + o - n) / a;
    if (y > 0 && y < u) {
      const g = s + y * c;
      g >= e && g <= e + r && (u = y, f = t + o, h = g, p = "right");
    }
  }
  if (a !== 0) {
    const y = (t - n) / a;
    if (y > 0 && y < u) {
      const g = s + y * c;
      g >= e && g <= e + r && (u = y, f = t, h = g, p = "left");
    }
  }
  if (c !== 0) {
    const y = (e + r - s) / c;
    if (y > 0 && y < u) {
      const g = n + y * a;
      g >= t && g <= t + o && (u = y, f = g, h = e + r, p = "bottom");
    }
  }
  if (c !== 0) {
    const y = (e - s) / c;
    if (y > 0 && y < u) {
      const g = n + y * a;
      g >= t && g <= t + o && (u = y, f = g, h = e, p = "top");
    }
  }
  return { x: f, y: h, side: p };
}
function cn(t, e, o, r, n) {
  const s = Math.cos(n), i = Math.sin(n), l = t - o, a = e - r;
  return [o + l * s - a * i, r + l * i + a * s];
}
function dn(t, e, o, r) {
  const n = t.x + t.w / 2, s = t.y + e / 2;
  if (!t.rotation)
    return ds(t.x, t.y, t.w, e, n, s, o, r);
  const i = -t.rotation * Math.PI / 180, [l, a] = cn(o, r, n, s, i), c = ds(t.x, t.y, t.w, e, n, s, l, a), [u, f] = cn(c.x, c.y, n, s, -i);
  return { x: u, y: f, side: c.side };
}
function hn(t, e, o, r) {
  const n = dn(t, e, o, r);
  return { x: n.x, y: n.y };
}
function un(t, e, o) {
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
  const l = t.rotation * Math.PI / 180, [a, c] = cn(s, i, r, n, l);
  return { x: a, y: c };
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
function Ue(t, e, o = "bezier", r, n, s, i, l, a, c) {
  const u = ho(t, r), f = ho(e, r), h = t.x + t.w / 2, p = t.y + u / 2, y = e.x + e.w / 2, g = e.y + f / 2;
  let m, w, b;
  if (a)
    m = a.x, w = a.y, b = n ?? "right";
  else if (n) {
    const O = un(t, u, n);
    m = O.x, w = O.y, b = n;
  } else {
    const O = dn(t, u, y, g);
    m = O.x, w = O.y, b = O.side;
  }
  let M, S, A;
  if (c)
    M = c.x, S = c.y, A = s ?? "left";
  else if (s) {
    const O = un(e, f, s);
    M = O.x, S = O.y, A = s;
  } else {
    const O = dn(e, f, h, p);
    M = O.x, S = O.y, A = O.side;
  }
  switch (o) {
    case "straight":
      return yl(m, w, M, S, b, A);
    case "bezier":
      return gl(m, w, M, S, b, A, l);
    case "smoothstep":
      return ml(m, w, M, S, b, A, i);
    case "step":
      return bl(m, w, M, S, b, A, i);
  }
}
function yl(t, e, o, r, n, s) {
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
function gl(t, e, o, r, n, s, i) {
  const l = Math.hypot(o - t, r - e), a = Math.min(l * 0.5, Math.max(50, l * 0.25)), c = Ao(n), u = Ao(s), f = i ? i[0] * (4 / 3) : 0, h = i ? i[1] * (4 / 3) : 0, p = t + c.dx * a + f, y = e + c.dy * a + h, g = o + u.dx * a + f, m = r + u.dy * a + h, w = 0.125 * t + 0.375 * p + 0.375 * g + 0.125 * o, b = 0.125 * e + 0.375 * y + 0.375 * m + 0.125 * r, M = Math.atan2(r - m, o - g), S = Math.atan2(e - y, t - p), A = {
    x: w,
    y: b,
    axis: "xy",
    min: 0,
    max: 0
  }, O = Math.min(t, o, p, g), j = Math.min(e, r, y, m), Y = Math.max(t, o, p, g), _ = Math.max(e, r, y, m);
  return {
    path: `M${t},${e} C${p},${y} ${g},${m} ${o},${r}`,
    labelX: w,
    labelY: b,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: M,
    tailAngle: S,
    sourceSide: n,
    targetSide: s,
    kinkHandle: A,
    bounds: { x: O, y: j, w: Y - O, h: _ - j }
  };
}
function ml(t, e, o, r, n, s, i) {
  const { points: c, kinkHandle: u } = Rn(t, e, o, r, n, s, 20, i), f = xl(c, 8), h = Math.floor(c.length / 2), p = (c[h - 1][0] + c[h][0]) / 2, y = (c[h - 1][1] + c[h][1]) / 2, g = c[c.length - 1], m = c[c.length - 2], w = Math.atan2(g[1] - m[1], g[0] - m[0]), b = c[0], M = c[1], S = Math.atan2(b[1] - M[1], b[0] - M[0]);
  let A = 1 / 0, O = 1 / 0, j = -1 / 0, Y = -1 / 0;
  for (const [_, J] of c)
    _ < A && (A = _), J < O && (O = J), _ > j && (j = _), J > Y && (Y = J);
  return {
    path: f,
    labelX: p,
    labelY: y,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: w,
    tailAngle: S,
    sourceSide: n,
    targetSide: s,
    kinkHandle: u,
    bounds: { x: A, y: O, w: j - A, h: Y - O }
  };
}
function bl(t, e, o, r, n, s, i) {
  const { points: a, kinkHandle: c } = Rn(t, e, o, r, n, s, 20, i), u = [`M${a[0][0]},${a[0][1]}`];
  for (let Y = 1; Y < a.length; Y++)
    u.push(`L${a[Y][0]},${a[Y][1]}`);
  const f = Math.floor(a.length / 2), h = (a[f - 1][0] + a[f][0]) / 2, p = (a[f - 1][1] + a[f][1]) / 2, y = a[a.length - 1], g = a[a.length - 2], m = Math.atan2(y[1] - g[1], y[0] - g[0]), w = a[0], b = a[1], M = Math.atan2(w[1] - b[1], w[0] - b[0]);
  let S = 1 / 0, A = 1 / 0, O = -1 / 0, j = -1 / 0;
  for (const [Y, _] of a)
    Y < S && (S = Y), _ < A && (A = _), Y > O && (O = Y), _ > j && (j = _);
  return {
    path: u.join(" "),
    labelX: h,
    labelY: p,
    x1: t,
    y1: e,
    x2: o,
    y2: r,
    arrowAngle: m,
    tailAngle: M,
    sourceSide: n,
    targetSide: s,
    kinkHandle: c,
    bounds: { x: S, y: A, w: O - S, h: j - A }
  };
}
function Rn(t, e, o, r, n, s, i, l) {
  const a = Ao(n), c = Ao(s), u = t + a.dx * i, f = e + a.dy * i, h = o + c.dx * i, p = r + c.dy * i, y = n === "left" || n === "right", g = s === "left" || s === "right", m = [[t, e], [u, f]], w = l ?? 0.5;
  let b;
  if (y && g) {
    const M = u + (h - u) * w;
    m.push([M, f], [M, p]);
    const S = Math.min(u, h), A = Math.max(u, h);
    b = { x: M, y: (f + p) / 2, axis: "x", min: S, max: A };
  } else if (!y && !g) {
    const M = f + (p - f) * w;
    m.push([u, M], [h, M]);
    const S = Math.min(f, p), A = Math.max(f, p);
    b = { x: (u + h) / 2, y: M, axis: "y", min: S, max: A };
  } else y && !g ? m.push([h, f]) : m.push([u, p]);
  return m.push([h, p], [o, r]), { points: m, kinkHandle: b };
}
function xl(t, e) {
  if (t.length < 2) return "";
  if (t.length === 2) return `M${t[0][0]},${t[0][1]} L${t[1][0]},${t[1][1]}`;
  const o = [`M${t[0][0]},${t[0][1]}`];
  for (let n = 1; n < t.length - 1; n++) {
    const s = t[n - 1], i = t[n], l = t[n + 1], a = i[0] - s[0], c = i[1] - s[1], u = l[0] - i[0], f = l[1] - i[1], h = Math.hypot(a, c), p = Math.hypot(u, f);
    if (h === 0 || p === 0) {
      o.push(`L${i[0]},${i[1]}`);
      continue;
    }
    const y = Math.min(e, h / 2, p / 2), g = i[0] - a / h * y, m = i[1] - c / h * y, w = i[0] + u / p * y, b = i[1] + f / p * y;
    o.push(`L${g},${m}`), o.push(`Q${i[0]},${i[1]} ${w},${b}`);
  }
  const r = t[t.length - 1];
  return o.push(`L${r[0]},${r[1]}`), o.join(" ");
}
function wl(t, e, o, r, n, s, i, l, a) {
  const c = 1 - a, u = c * c, f = u * c, h = a * a, p = h * a;
  return [
    f * t + 3 * u * a * o + 3 * c * h * n + p * i,
    f * e + 3 * u * a * r + 3 * c * h * s + p * l
  ];
}
function kl(t, e, o, r, n, s, i, l, a, c, u = 24) {
  let f = 1 / 0, h = o, p = r;
  for (let y = 1; y <= u; y++) {
    const g = y / u, [m, w] = wl(o, r, n, s, i, l, a, c, g), b = Dn(t, e, h, p, m, w);
    b < f && (f = b), h = m, p = w;
  }
  return f;
}
function vl(t, e, o) {
  let r = 1 / 0;
  for (let n = 1; n < o.length; n++) {
    const s = Dn(t, e, o[n - 1][0], o[n - 1][1], o[n][0], o[n][1]);
    s < r && (r = s);
  }
  return r;
}
function pi(t, e, o, r, n, s, i, l) {
  const a = n.data.edgeType || "bezier", c = Ue(
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
  ), { x1: u, y1: f, x2: h, y2: p } = c;
  if (a === "straight")
    return Dn(t, e, u, f, h, p);
  if (a === "bezier") {
    const m = Math.hypot(h - u, p - f), w = Math.min(m * 0.5, Math.max(50, m * 0.25)), b = Ao(c.sourceSide), M = Ao(c.targetSide), S = n.data.curveOffset ? n.data.curveOffset[0] * (4 / 3) : 0, A = n.data.curveOffset ? n.data.curveOffset[1] * (4 / 3) : 0, O = u + b.dx * w + S, j = f + b.dy * w + A, Y = h + M.dx * w + S, _ = p + M.dy * w + A;
    return kl(t, e, u, f, O, j, Y, _, h, p);
  }
  const y = 20, { points: g } = Rn(u, f, h, p, c.sourceSide, c.targetSide, y, n.data.midpointOffset);
  return vl(t, e, g);
}
function Gr(t, e, o) {
  const r = ho(t, o), n = ho(e, o), s = t.x + t.w / 2, i = t.y + r / 2, l = e.x + e.w / 2, a = e.y + n / 2, c = hn(t, r, l, a), u = hn(e, n, s, i);
  return { x1: c.x, y1: c.y, x2: u.x, y2: u.y };
}
function jr(t, e, o, r) {
  const n = ho(t, r);
  return hn(t, n, e, o);
}
function Dn(t, e, o, r, n, s) {
  const i = n - o, l = s - r, a = i * i + l * l;
  if (a === 0) return Math.hypot(t - o, e - r);
  const c = Math.max(0, Math.min(1, ((t - o) * i + (e - r) * l) / a)), u = o + c * i, f = r + c * l;
  return Math.hypot(t - u, e - f);
}
function Sl(t, e, o, r, n) {
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
  for (const [l, a, c, u] of i)
    if (Ml(t, e, o, r, l, a, c, u)) return !0;
  return !1;
}
function Ml(t, e, o, r, n, s, i, l) {
  const a = o - t, c = r - e, u = i - n, f = l - s, h = a * f - c * u;
  if (Math.abs(h) < 1e-10) return !1;
  const p = n - t, y = s - e, g = (p * f - y * u) / h, m = (p * c - y * a) / h;
  return g >= 0 && g <= 1 && m >= 0 && m <= 1;
}
function zo(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, a = r / 2, c = t + n * a, u = e + s * a, f = t - n * a, h = e - s * a, p = r * 0.4;
  return `M${f + i * p},${h + l * p} L${c},${u} L${f - i * p},${h - l * p}`;
}
function xr(t, e, o, r) {
  const n = Math.cos(o), s = Math.sin(o), i = -s, l = n, a = r / 2, c = t + n * a, u = e + s * a, f = t - n * a, h = e - s * a, p = r * 0.4;
  return `M${c},${u} L${f + i * p},${h + l * p} L${f - i * p},${h - l * p} Z`;
}
function To(t, e) {
  const o = ho(t, e);
  return ["top", "right", "bottom", "left"].map((n) => {
    const s = un(t, o, n);
    return { side: n, x: s.x, y: s.y };
  });
}
function ar(t, e, o, r) {
  const n = To(t, r);
  let s = n[0], i = 1 / 0;
  for (const l of n) {
    const a = Math.hypot(l.x - e, l.y - o);
    a < i && (i = a, s = l);
  }
  return s.side;
}
function Cl(t, e, o, r, n, s) {
  const i = 8 / r, l = [];
  for (const a of t.values()) {
    if (a.type !== "edge") continue;
    const c = a, u = t.get(c.data.fromId), f = t.get(c.data.toId);
    if (!u || !f) continue;
    const h = s == null ? void 0 : s(c, u, f);
    pi(e, o, u, f, c, n, h == null ? void 0 : h.sourcePortPos, h == null ? void 0 : h.targetPortPos) < i && l.push(a);
  }
  return l;
}
function Il(t, e, o, r, n, s) {
  const i = 8 / r;
  let l = null, a = i;
  for (const c of t.values()) {
    if (c.type !== "edge") continue;
    const u = c, f = t.get(u.data.fromId), h = t.get(u.data.toId);
    if (!f || !h) continue;
    const p = s == null ? void 0 : s(u, f, h), y = pi(e, o, f, h, u, n, p == null ? void 0 : p.sourcePortPos, p == null ? void 0 : p.targetPortPos);
    y < a && (a = y, l = c);
  }
  return l;
}
function zl(t, e, o) {
  const r = t.x, n = t.x + t.w / 2, s = t.x + t.w, i = t.y, l = t.y + t.h / 2, a = t.y + t.h, c = [r, n, s], u = [i, l, a];
  let f = 1 / 0, h = 1 / 0;
  const p = [];
  for (const g of e) {
    const m = g.x, w = g.x + g.w / 2, b = g.x + g.w, M = g.y, S = g.y + g.h / 2, A = g.y + g.h, O = [m, w, b], j = [M, S, A];
    for (const Y of c)
      for (const _ of O) {
        const J = _ - Y;
        Math.abs(J) <= o && (Math.abs(J) < Math.abs(f) && (f = J), p.push({
          axis: "x",
          position: _,
          start: Math.min(t.y, t.y + t.h, g.y, g.y + g.h),
          end: Math.max(t.y, t.y + t.h, g.y, g.y + g.h)
        }));
      }
    for (const Y of u)
      for (const _ of j) {
        const J = _ - Y;
        Math.abs(J) <= o && (Math.abs(J) < Math.abs(h) && (h = J), p.push({
          axis: "y",
          position: _,
          start: Math.min(t.x, t.x + t.w, g.x, g.x + g.w),
          end: Math.max(t.x, t.x + t.w, g.x, g.x + g.w)
        }));
      }
  }
  const y = /* @__PURE__ */ new Map();
  for (const g of p) {
    const m = `${g.axis}:${g.position.toFixed(1)}`, w = y.get(m);
    w ? (w.start = Math.min(w.start, g.start), w.end = Math.max(w.end, g.end)) : y.set(m, { ...g });
  }
  return {
    guides: Array.from(y.values()),
    snapDx: Math.abs(f) <= o ? f : 0,
    snapDy: Math.abs(h) <= o ? h : 0
  };
}
class Tl {
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
      width: 2.5,
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
    xt(this, "history", new Ja());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    xt(this, "listeners", {});
    xt(this, "_suppressEvents", !1);
    xt(this, "_collabMode", !1);
    xt(this, "clipboard", []);
    xt(this, "pasteCount", 0);
    xt(this, "nextZValue", 1);
    xt(this, "_minZ", 0);
    xt(this, "quadTree", new an({ x: -1e5, y: -1e5, w: 2e5, h: 2e5 }));
    xt(this, "adjacency", /* @__PURE__ */ new Map());
    /** Explicit frame→children tracking. Only nodes intentionally placed inside a frame are tracked. */
    xt(this, "frameChildren", /* @__PURE__ */ new Map());
    /** Node types that act as containers (frame-like behavior). "frame" is always included. */
    xt(this, "_containerTypes", /* @__PURE__ */ new Set(["frame"]));
    xt(this, "registry");
    /** Measured heights for auto-height nodes (canvas-coordinate units). */
    xt(this, "_measuredHeights", {});
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
    const i = s.flatMap((a) => a.sort((c, u) => c.x - u.x)), l = [...o, ...i];
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
    const o = this.resolveHeight(e), r = 40, n = e.x - r, s = e.y - r, i = e.w + r * 2, l = o + r * 2, a = this._containerWidth, c = this._containerHeight, u = Go(Math.min(a / i, c / l), 0.1, 5);
    return {
      x: (a - i * u) / 2 - n * u,
      y: (c - l * u) / 2 - s * u,
      zoom: u
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
        const a = performance.now(), c = (u) => {
          const f = Math.min((u - a) / r, 1);
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
    const r = o ?? 600, n = performance.now(), s = { ...this.viewport }, i = Math.max(0.1, Math.min(s.zoom, e.zoom) * 0.35), l = (s.x + e.x) / 2, a = (s.y + e.y) / 2, c = (u) => {
      const f = Math.min((u - n) / r, 1);
      if (f < 0.5) {
        const h = f * 2, p = 1 - Math.pow(1 - h, 3);
        this.viewport.x = s.x + (l - s.x) * p, this.viewport.y = s.y + (a - s.y) * p, this.viewport.zoom = s.zoom + (i - s.zoom) * p;
      } else {
        const h = (f - 0.5) * 2, p = 1 - Math.pow(1 - h, 3);
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
    let a = r, c = n, u = [];
    const f = o instanceof Set ? o : new Set(o);
    if (l) {
      let h = 1 / 0, p = 1 / 0, y = -1 / 0, g = -1 / 0;
      for (const Y of e) {
        const _ = this.getNode(Y.id);
        if (!_) continue;
        const J = Y.x + r, dt = Y.y + n, B = this.resolveHeight(_);
        h = Math.min(h, J), p = Math.min(p, dt), y = Math.max(y, J + _.w), g = Math.max(g, dt + B);
      }
      const m = { x: h, y: p, w: y - h, h: g - p }, w = -this.viewport.x / this.viewport.zoom, b = -this.viewport.y / this.viewport.zoom, M = this._containerWidth / this.viewport.zoom, S = this._containerHeight / this.viewport.zoom, A = [], O = this.quadTree.retrieve([], { x: w, y: b, w: M, h: S });
      for (const Y of O) {
        if (Y.type === "edge" || f.has(Y.id)) continue;
        const _ = this.resolveHeight(Y);
        A.push({ x: Y.x, y: Y.y, w: Y.w, h: _ });
      }
      const j = zl(m, A, 5);
      if (u = j.guides, i) {
        const Y = e[0].x + r, _ = e[0].y + n, J = this.snap(Y, _), dt = J.x - Y, B = J.y - _, et = j.snapDx !== 0 && Math.abs(j.snapDx) <= Math.abs(dt), X = j.snapDy !== 0 && Math.abs(j.snapDy) <= Math.abs(B);
        a = r + (et ? j.snapDx : dt), c = n + (X ? j.snapDy : B), et || (u = u.filter((z) => z.axis !== "x")), X || (u = u.filter((z) => z.axis !== "y"));
      } else
        a = r + j.snapDx, c = n + j.snapDy;
    } else if (i) {
      const h = this.snap(e[0].x + r, e[0].y + n);
      a = h.x - e[0].x, c = h.y - e[0].y;
    }
    return this.alignGuides = u, this.emit("guides"), { finalDx: a, finalDy: c };
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
    this.viewport = nl(
      this.viewport,
      e,
      o - this.containerOffset.x,
      r - this.containerOffset.y
    ), this.emit("viewport");
  }
  zoomTo(e, o) {
    const r = Go(e, 0.1, 5);
    if (o) {
      const n = o.x - this.containerOffset.x, s = o.y - this.containerOffset.y, i = Vo(this.viewport, n, s);
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
    const n = r.h === "auto" ? 100 : r.h, s = r.x + r.w / 2, i = r.y + n / 2, l = this.getWindow(), a = l.innerWidth, c = l.innerHeight, u = Go(o, 0.2, 5);
    this.viewport = {
      x: a / 2 - s * u,
      y: c / 2 - i * u,
      zoom: u
    }, this.emit("viewport");
  }
  fitToContent() {
    if (this.nodes.size === 0) return;
    let e = 1 / 0, o = 1 / 0, r = -1 / 0, n = -1 / 0;
    for (const f of this.nodes.values()) {
      const h = f.h === "auto" ? 100 : f.h;
      f.x < e && (e = f.x), f.y < o && (o = f.y), f.x + f.w > r && (r = f.x + f.w), f.y + h > n && (n = f.y + h);
    }
    const s = 50;
    e -= s, o -= s, r += s, n += s;
    const i = r - e, l = n - o, a = this._containerWidth, c = this._containerHeight, u = Go(
      Math.min(a / i, c / l),
      0.1,
      5
    );
    this.viewport = {
      x: (a - i * u) / 2 - e * u,
      y: (c - l * u) / 2 - o * u,
      zoom: u
    }, this.emit("viewport");
  }
  /** Save the current viewport as the origin view (restored on next load). */
  setOriginView() {
    this.originView = { ...this.viewport };
  }
  /** Clear the saved origin view. */
  clearOriginView() {
    this.originView = null;
  }
  /** Jump to the saved origin view, or fit-to-content if none is saved. */
  goToOriginView() {
    this.originView ? (this.viewport = { ...this.originView }, this.emit("viewport")) : this.fitToContent();
  }
  screenToCanvas(e, o) {
    return Vo(
      this.viewport,
      e - this.containerOffset.x,
      o - this.containerOffset.y
    );
  }
  canvasToScreen(e, o) {
    return rl(this.viewport, e, o);
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
    var s, i, l, a, c, u, f, h, p;
    const r = this.nodes.get(e);
    if (!r) return;
    const n = { ...r, ...o };
    if (o.data && typeof o.data == "object" && r.data && typeof r.data == "object" && (n.data = {
      ...r.data,
      ...o.data
    }), this.nodes.set(e, n), (r.x !== n.x || r.y !== n.y || r.w !== n.w || r.h !== n.h || (r.rotation ?? 0) !== (n.rotation ?? 0)) && (this.quadTree.remove(r), this.quadTree.insert(n), this.updateConnectedEdges(e)), r.x !== n.x || r.y !== n.y) {
      const y = n.x - r.x, g = n.y - r.y;
      (l = (i = (s = this.registry) == null ? void 0 : s.get(n.type)) == null ? void 0 : i.onMove) == null || l.call(i, n, y, g, this), this.emit("node:move", n, y, g);
    }
    if (r.w !== n.w || r.h !== n.h) {
      const y = r.w !== 0 ? n.w / r.w : 1, g = r.h === "auto" ? 0 : r.h, m = n.h === "auto" ? 0 : n.h, w = g !== 0 ? m / g : 1;
      this.emit("node:resize", n, y, w);
    }
    (r.rotation ?? 0) !== (n.rotation ?? 0) && ((u = (c = (a = this.registry) == null ? void 0 : a.get(n.type)) == null ? void 0 : c.onRotate) == null || u.call(c, n, n.rotation ?? 0, this), this.emit("node:rotate", n, n.rotation ?? 0)), o.data && r.data !== n.data && ((p = (h = (f = this.registry) == null ? void 0 : f.get(n.type)) == null ? void 0 : h.onDataChange) == null || p.call(h, n, r.data, n.data, this), this.emit("node:data", n, r.data, n.data)), this.emit("change");
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
          const a = Ue(
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
        const u = c.data;
        if (u.fromId === e || u.toId === e) {
          const f = this.nodes.get(a);
          f && this.quadTree.remove(f), this.nodes.delete(a), this.selection.delete(a);
          const h = u.fromId === e ? u.toId : u.fromId;
          (l = this.adjacency.get(h)) == null || l.delete(a);
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
      for (const [c, u] of this.frameChildren) {
        if (!u.has(o)) continue;
        const f = this.nodes.get(c);
        if (!f) {
          u.delete(o);
          continue;
        }
        const h = this.resolveHeight(f);
        r.x >= f.x && r.y >= f.y && r.x + r.w <= f.x + f.w && r.y + n <= f.y + h || u.delete(o);
      }
      let s;
      this._containerTypes.has(r.type) && (s = this.getFrameDescendantIds(o));
      let i = null, l = 1 / 0;
      const a = this.quadTree.retrieve([], { x: r.x, y: r.y, w: r.w, h: n });
      for (const c of a) {
        if (!this._containerTypes.has(c.type) || c.id === o || s != null && s.has(c.id)) continue;
        const u = this.resolveHeight(c);
        if (r.x >= c.x && r.y >= c.y && r.x + r.w <= c.x + c.w && r.y + n <= c.y + u) {
          const h = c.w * u;
          h < l && (l = h, i = c);
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
        for (const u of this.nodes.values())
          u.id !== o && (n ? u.type === "edge" : u.type !== "edge") && u.z >= r.z && this._nodesOverlap(r, u) && s.push(u);
        if (s.length === 0) continue;
        s.sort((u, f) => u.z - f.z);
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
        for (const u of this.nodes.values())
          u.id !== o && (n ? u.type === "edge" : u.type !== "edge") && u.z <= r.z && this._nodesOverlap(r, u) && s.push(u);
        if (s.length === 0) continue;
        s.sort((u, f) => f.z - u.z);
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
    return tl(i, e, o, this.viewport.zoom, r, this._containerTypes);
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
    return ol(i, e, o, this.viewport.zoom, r, this._containerTypes);
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
              ([c, u, f]) => [l.w - c, u, f]
            );
            s = { ...l, data: { ...l.data, points: a } };
          } else {
            const a = l.h === "auto" ? 0 : l.h, c = l.data.points.map(
              ([u, f, h]) => [u, a - f, h]
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
                const a = l.h === "auto" ? 0 : l.h, c = [l.data.startPoint[0], a - l.data.startPoint[1]], u = [l.data.endPoint[0], a - l.data.endPoint[1]];
                s = { ...l, data: { ...l.data, startPoint: c, endPoint: u } };
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
    const e = Rt(10), o = /* @__PURE__ */ new Set();
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
      const l = Rt();
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
      s.groupId && (n.has(s.groupId) || n.set(s.groupId, Rt(10)), s.groupId = n.get(s.groupId));
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
    const l = (r + s) / 2, a = (n + i) / 2;
    let c, u;
    if (e !== void 0 && o !== void 0)
      c = e, u = o;
    else {
      const w = this.getWindow(), b = w.innerWidth / 2, M = w.innerHeight / 2, S = Vo(this.viewport, b, M);
      c = S.x, u = S.y;
    }
    const f = this.pasteCount * 20, h = c - l + f, p = u - a + f, y = /* @__PURE__ */ new Map(), g = this.clipboard.map((w) => {
      const b = Rt();
      return y.set(w.id, b), {
        ...structuredClone(w),
        id: b,
        x: w.x + h,
        y: w.y + p,
        z: this.nextZValue++,
        locked: void 0
      };
    });
    for (const w of g)
      if (w.type === "edge" && w.data) {
        const b = w.data;
        y.has(b.fromId) && (b.fromId = y.get(b.fromId)), y.has(b.toId) && (b.toId = y.get(b.toId));
      }
    const m = /* @__PURE__ */ new Map();
    for (const w of g)
      w.groupId && (m.has(w.groupId) || m.set(w.groupId, Rt(10)), w.groupId = m.get(w.groupId));
    for (const [w, b] of this.groupParent)
      m.has(w) && m.has(b) && this.linkGroupParent(m.get(w), m.get(b));
    this.addNodes(g), this.selectMultiple(g.map((w) => w.id));
  }
  /**
   * Insert a pre-built template centered at (cx, cy) in canvas coordinates.
   */
  applyTemplate(e, o, r) {
    const n = ii.find((p) => p.id === e);
    if (!n) return;
    const s = structuredClone(n.nodes), i = /* @__PURE__ */ new Map();
    for (const p of s) {
      const y = Rt(10);
      i.set(p.id, y), p.id = y;
    }
    for (const p of s) {
      if (p.type === "edge" && p.data) {
        const y = p.data;
        i.has(y.fromId) && (y.fromId = i.get(y.fromId)), i.has(y.toId) && (y.toId = i.get(y.toId));
      }
      p.groupId && i.has(p.groupId) && (p.groupId = i.get(p.groupId));
    }
    let l = 1 / 0, a = 1 / 0, c = -1 / 0, u = -1 / 0;
    for (const p of s) {
      if (p.type === "edge") continue;
      const y = p.h === "auto" ? 100 : p.h;
      l = Math.min(l, p.x), a = Math.min(a, p.y), c = Math.max(c, p.x + p.w), u = Math.max(u, p.y + y);
    }
    const f = o - (l + c) / 2, h = r - (a + u) / 2;
    for (const p of s)
      p.type !== "edge" && (p.x += f, p.y += h), p.z = this.nextZValue++;
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
    return al(this.getAllNodes(), {
      background: this.boardBackground,
      originView: this.originView ?? void 0
    });
  }
  async fromSBD(e) {
    this.history.clear(), this.nodes.clear(), this.groupParent.clear(), this.groupChildren.clear();
    const { nodes: o, meta: r } = await fl(e);
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
class Pl {
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
const hs = ["n", "ne", "e", "se", "s", "sw", "w", "nw"], Al = {
  n: "ns-resize",
  ne: "nesw-resize",
  e: "ew-resize",
  se: "nwse-resize",
  s: "ns-resize",
  sw: "nesw-resize",
  w: "ew-resize",
  nw: "nwse-resize"
};
function Tr(t, e) {
  const o = hs.indexOf(t);
  if (o === -1) return "default";
  const r = (e % 360 + 360) % 360, n = Math.round(r / 45) % 8, s = (o + n) % 8;
  return Al[hs[s]];
}
class Rl extends Ea {
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
function us({ markdown: t }) {
  return /* @__PURE__ */ d(
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
const Dl = 0, El = [
  { pos: "nw", top: 0, left: 0 },
  { pos: "n", top: 0, left: "50%" },
  { pos: "ne", top: 0, left: "100%" },
  { pos: "e", top: "50%", left: "100%" },
  { pos: "se", top: "100%", left: "100%" },
  { pos: "s", top: "100%", left: "50%" },
  { pos: "sw", top: "100%", left: 0 },
  { pos: "w", top: "50%", left: 0 }
];
function Wl(t) {
  return t.type !== "paragraph" ? !1 : !t.content || t.content.length === 0 ? !0 : t.content.every(
    (e) => e.type === "text" && (!e.text || e.text === "")
  );
}
function Ll({
  node: t,
  isSelected: e,
  multiSelected: o,
  engine: r,
  schema: n,
  interactive: s,
  zoom: i,
  onMeasuredHeight: l
}) {
  const a = it(null), c = it(t.data.blocks.length === 0), u = it(!1), f = it(!1), h = it(!1), p = it(!1), y = it(t.data.blocks), [g, m] = $(!1), [w, b] = $(!1), M = it(null), S = Fa({ schema: n }), A = it(
    t.data.blocks.length > 0 ? t.data.blocks : null
  );
  yt(() => {
    const z = A.current;
    if (!z) return;
    A.current = null;
    const K = requestAnimationFrame(() => {
      try {
        S.replaceBlocks(S.document, z);
        return;
      } catch {
      }
      try {
        const V = S.blocksToHTMLLossy(z);
        S._tiptapEditor.commands.setContent(V);
        return;
      } catch {
      }
      console.warn("[ContentBlock] All block rendering strategies failed, using markdown fallback"), b(!0);
    });
    return () => cancelAnimationFrame(K);
  }, [S]), yt(() => {
    (!e || o) && m(!1);
  }, [e, o]), yt(() => {
    c.current && (c.current = !1, u.current = !0, m(!0));
  }, [S]), yt(() => {
    if (!g || !u.current && !M.current) return;
    const z = M.current;
    M.current = null, u.current = !1;
    const K = requestAnimationFrame(() => {
      if (S.focus(), z)
        try {
          const V = S._tiptapEditor, U = V.view.posAtCoords({ left: z.x, top: z.y });
          U && V.commands.setTextSelection(U.pos);
        } catch {
        }
    });
    return () => cancelAnimationFrame(K);
  }, [g, S]);
  const O = rt(() => {
    if (f.current || h.current) return;
    const z = r.getNode(t.id), K = S.document;
    y.current = K, r.updateNode(t.id, {
      data: { ...z == null ? void 0 : z.data, blocks: K }
    });
  }, [S, r, t.id]);
  yt(() => {
    if (!S) return;
    const z = () => {
      var L, nt;
      if (f.current || h.current || p.current) return;
      const tt = S.document.length, U = r.getNode(t.id), G = ((nt = (L = U == null ? void 0 : U.data) == null ? void 0 : L.blocks) == null ? void 0 : nt.length) ?? 0;
      if (tt < G) return;
      const N = setTimeout(O, 100);
      return () => clearTimeout(N);
    };
    let K;
    const V = S.onChange(() => {
      K == null || K(), K = z();
    });
    return () => {
      V == null || V(), K == null || K();
    };
  }, [S, O]), yt(() => {
    const z = a.current;
    if (!z) return;
    const K = (V) => {
      const tt = V.relatedTarget;
      tt && z.contains(tt) || O();
    };
    return z.addEventListener("focusout", K), () => z.removeEventListener("focusout", K);
  }, [O]), yt(() => {
    if (g || t.data.blocks === y.current) return;
    const z = JSON.stringify(t.data.blocks), K = JSON.stringify(y.current);
    if (z !== K) {
      if (t.data.blocks.length > 0 && S.document.length > 0) {
        p.current = !0;
        try {
          S.replaceBlocks(S.document, t.data.blocks);
        } catch {
          try {
            const V = S.blocksToHTMLLossy(t.data.blocks);
            S._tiptapEditor.commands.setContent(V);
          } catch {
          }
        }
        p.current = !1;
      }
      y.current = t.data.blocks;
    }
  }, [t.data.blocks, g, S]), yt(() => {
    if (t.h !== "auto" || !l) return;
    const z = a.current;
    if (!z) return;
    const K = () => {
      const tt = z.offsetHeight;
      tt > 0 && l(t.id, tt);
    };
    K();
    const V = new ResizeObserver(K);
    return V.observe(z), () => V.disconnect();
  }, [t.id, t.h, l]);
  const j = rt(() => {
    const z = r.getNode(t.id);
    if (!z || z.h === "auto" || !S || !a.current)
      return;
    const K = z.h - Dl, V = a.current.querySelector(".bn-editor");
    if (!V) return;
    const tt = S.document;
    if (tt.length === 0) return;
    let U = 0;
    for (let nt = tt.length - 1; nt >= 1 && Wl(tt[nt]); nt--)
      U++;
    const G = V.scrollHeight, N = tt.length > 0 ? G / tt.length : 36;
    if (f.current = !0, G < K) {
      const nt = K - G, st = Math.max(0, Math.floor(nt / N));
      if (st > 0) {
        const pt = tt[tt.length - 1];
        S.insertBlocks(
          Array.from({ length: st }, () => ({
            type: "paragraph",
            content: []
          })),
          pt,
          "after"
        );
      }
    } else if (G > K && U > 0) {
      const nt = G - K, st = Math.min(U, Math.ceil(nt / N));
      if (st > 0) {
        const pt = tt.slice(tt.length - st);
        S.removeBlocks(pt);
      }
    }
    const L = r.getNode(t.id);
    L && r.updateNode(t.id, {
      data: { ...L.data, blocks: S.document }
    }), f.current = !1;
  }, [S, r, t.id]), Y = it(j);
  Y.current = j, yt(() => {
    if (t.h === "auto") return;
    const z = setTimeout(() => Y.current(), 60);
    return () => clearTimeout(z);
  }, []);
  const _ = rt(
    (z) => {
      const K = z.currentTarget.ownerDocument;
      if (z.altKey) return;
      if (!r.selection.has(t.id) && r.selection.size > 0) {
        const { x: mt, y: wt } = r.screenToCanvas(z.clientX, z.clientY);
        for (const ct of r.selection) {
          const St = r.getNode(ct);
          if (!St) continue;
          const vt = St.h === "auto" ? 100 : St.h;
          if (mt >= St.x && mt <= St.x + St.w && wt >= St.y && wt <= St.y + vt)
            return;
        }
      }
      z.stopPropagation(), z.preventDefault(), z.shiftKey ? r.toggleSelect(t.id) : r.selection.has(t.id) || r.select(t.id);
      const V = z.clientX, tt = z.clientY, U = Array.from(r.selection), G = U.map((mt) => {
        const wt = r.getNode(mt);
        return { id: mt, x: wt.x, y: wt.y };
      });
      let N = !1, L = null, nt = V, st = tt, pt = !1;
      const ut = () => {
        L = null;
        const mt = (nt - V) / r.viewport.zoom, wt = (st - tt) / r.viewport.zoom, { finalDx: ct, finalDy: St } = r.computeDragSnap(
          G,
          U,
          mt,
          wt,
          pt
        ), vt = G.map((Et) => ({
          id: Et.id,
          patch: { x: Et.x + ct, y: Et.y + St }
        }));
        r.updateMany(vt);
      }, kt = (mt) => {
        const wt = (mt.clientX - V) / r.viewport.zoom, ct = (mt.clientY - tt) / r.viewport.zoom;
        if (!N)
          if (Math.abs(wt) > 2 || Math.abs(ct) > 2)
            N = !0, h.current = !0, r.pushHistorySnapshot();
          else
            return;
        nt = mt.clientX, st = mt.clientY, pt = mt.metaKey || mt.ctrlKey, L === null && (L = requestAnimationFrame(ut));
      }, Dt = () => {
        h.current = !1, L !== null && (cancelAnimationFrame(L), ut()), r.clearAlignGuides(), K.removeEventListener("pointermove", kt), K.removeEventListener("pointerup", Dt);
      };
      K.addEventListener("pointermove", kt), K.addEventListener("pointerup", Dt);
    },
    [r, t.id]
  ), J = rt(
    (z) => {
      var ut;
      const K = z.currentTarget.ownerDocument;
      z.stopPropagation(), z.preventDefault();
      const V = t.h === "auto" ? (((ut = a.current) == null ? void 0 : ut.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h, tt = t.x + t.w / 2, U = t.y + V / 2, G = t.rotation || 0, { x: N, y: L } = r.screenToCanvas(
        z.clientX,
        z.clientY
      ), nt = Math.atan2(L - U, N - tt);
      r.pushHistorySnapshot();
      const st = (kt) => {
        const { x: Dt, y: mt } = r.screenToCanvas(kt.clientX, kt.clientY), wt = Math.atan2(mt - U, Dt - tt);
        let ct = G + (wt - nt) * (180 / Math.PI);
        (kt.shiftKey || r.snapToGrid) && !(kt.metaKey || kt.ctrlKey) && (ct = Math.round(ct / 15) * 15), r.updateNode(t.id, { rotation: ct });
      }, pt = () => {
        K.removeEventListener("pointermove", st), K.removeEventListener("pointerup", pt);
      };
      K.addEventListener("pointermove", st), K.addEventListener("pointerup", pt);
    },
    [r, t.id, t.x, t.y, t.w, t.h, t.rotation]
  ), dt = rt(
    (z, K) => {
      var ut;
      const V = K.currentTarget.ownerDocument;
      K.stopPropagation(), K.preventDefault();
      const tt = K.clientX, U = K.clientY, G = t.x, N = t.y, L = t.w, nt = t.h === "auto" ? (((ut = a.current) == null ? void 0 : ut.getBoundingClientRect().height) ?? 60) / r.viewport.zoom : t.h;
      r.pushHistorySnapshot();
      const st = (kt) => {
        const Dt = (kt.clientX - tt) / r.viewport.zoom, mt = (kt.clientY - U) / r.viewport.zoom;
        let wt = G, ct = N, St = L, vt = nt;
        if ((z === "nw" || z === "w" || z === "sw") && (wt = G + Dt, St = L - Dt), (z === "ne" || z === "e" || z === "se") && (St = L + Dt), (z === "nw" || z === "n" || z === "ne") && (ct = N + mt, vt = nt - mt), (z === "sw" || z === "s" || z === "se") && (vt = nt + mt), r.snapToGrid && !(kt.metaKey || kt.ctrlKey)) {
          const Et = r.gridSize, Qt = (Wt) => Math.round(Wt / Et) * Et;
          (z === "nw" || z === "w" || z === "sw") && (wt = Qt(wt), St = G + L - wt), (z === "ne" || z === "e" || z === "se") && (St = Qt(wt + St) - wt), (z === "nw" || z === "n" || z === "ne") && (ct = Qt(ct), vt = N + nt - ct), (z === "sw" || z === "s" || z === "se") && (vt = Qt(ct + vt) - ct);
        }
        St < 100 && (St = 100, (z === "nw" || z === "w" || z === "sw") && (wt = G + L - 100)), vt < 60 && (vt = 60, (z === "nw" || z === "n" || z === "ne") && (ct = N + nt - 60)), r.updateNode(t.id, { x: wt, y: ct, w: St, h: vt });
      }, pt = () => {
        V.removeEventListener("pointermove", st), V.removeEventListener("pointerup", pt), requestAnimationFrame(() => Y.current());
      };
      V.addEventListener("pointermove", st), V.addEventListener("pointerup", pt);
    },
    [r, t.id, t.x, t.y, t.w, t.h]
  ), B = rt(
    (z) => {
      if (!z.altKey) {
        if (g) {
          z.stopPropagation();
          return;
        }
        if (e) {
          _(z);
          return;
        }
        _(z);
      }
    },
    [g, e, _, r, t.id]
  ), et = rt(
    (z) => {
      if (z.stopPropagation(), !g) {
        if (t.groupId) {
          const K = [];
          let V = t.groupId;
          for (; V; )
            K.push(V), V = r.groupParent.get(V);
          if (!r.activeGroupId) {
            r.enterGroup(K[K.length - 1]), r.select(t.id);
            return;
          }
          const tt = K.indexOf(r.activeGroupId);
          if (tt > 0) {
            r.enterGroup(K[tt - 1]), r.select(t.id);
            return;
          }
        }
        r.select(t.id), M.current = { x: z.clientX, y: z.clientY }, m(!0);
      }
    },
    [g, r, t.id, t.groupId, S]
  ), X = e && !o;
  return /* @__PURE__ */ v(
    "div",
    {
      ref: a,
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
        /* @__PURE__ */ d(
          "div",
          {
            onDoubleClick: et,
            style: {
              overflow: "hidden",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              borderRadius: t.data.borderColor || e ? 7 : 0
            },
            children: /* @__PURE__ */ d(
              "div",
              {
                className: "sb-editor-wrap",
                onPointerDown: B,
                onKeyDown: g ? (z) => {
                  z.key === "Escape" && (z.stopPropagation(), m(!1));
                } : void 0,
                style: g ? { cursor: "text", userSelect: "text" } : { cursor: "move", userSelect: "none" },
                children: w ? /* @__PURE__ */ d(us, { markdown: t.data.markdown ?? "" }) : /* @__PURE__ */ d(Rl, { fallback: /* @__PURE__ */ d(us, { markdown: t.data.markdown ?? "" }), children: /* @__PURE__ */ d(
                  Na,
                  {
                    editor: S,
                    theme: "light",
                    editable: s && g
                  }
                ) })
              }
            )
          }
        ),
        X && El.map(({ pos: z, top: K, left: V }) => {
          const tt = 8 / i;
          return /* @__PURE__ */ d(
            "div",
            {
              onPointerDown: (U) => dt(z, U),
              style: {
                position: "absolute",
                top: K,
                left: V,
                width: tt,
                height: tt,
                transform: "translate(-50%, -50%)",
                background: "white",
                border: `${1.5 / i}px solid #3b82f6`,
                cursor: Tr(z, t.rotation || 0),
                zIndex: 10,
                pointerEvents: "auto"
              }
            },
            z
          );
        }),
        X && (() => {
          const z = 25 / i, K = 10 / i;
          return /* @__PURE__ */ v(lt, { children: [
            /* @__PURE__ */ d(
              "div",
              {
                style: {
                  position: "absolute",
                  top: -z,
                  left: "50%",
                  width: 1.5 / i,
                  height: z,
                  transform: "translateX(-50%)",
                  background: "#3b82f6",
                  pointerEvents: "none"
                }
              }
            ),
            /* @__PURE__ */ d(
              "div",
              {
                onPointerDown: J,
                style: {
                  position: "absolute",
                  top: -(z + K / 2),
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
const yi = ue(Ll);
function Fl(t) {
  const e = t.node;
  return /* @__PURE__ */ d(
    yi,
    {
      node: e,
      isSelected: t.isSelected,
      multiSelected: t.multiSelected,
      engine: t.engine,
      schema: Tn,
      interactive: t.interactive,
      zoom: t.zoom,
      onMeasuredHeight: t.callbacks.onMeasuredHeight
    }
  );
}
const Nl = {
  type: "content",
  component: Fl,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.markdown || null
}, { PI: Bl } = Math, Qo = Bl + 1e-4, fs = 0.5, ps = [1, 1];
function ys(t, e, o, r = (n) => n) {
  return t * r(0.5 - e * (0.5 - o));
}
const { min: Vr } = Math;
function gi(t, e, o) {
  let r = Vr(1, e / o);
  return Vr(1, t + (Vr(1, 1 - r) - t) * (r * 0.275));
}
function Hl(t) {
  return [-t[0], -t[1]];
}
function Pe(t, e) {
  return [t[0] + e[0], t[1] + e[1]];
}
function gs(t, e, o) {
  return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t;
}
function Ze(t, e) {
  return [t[0] - e[0], t[1] - e[1]];
}
function fn(t, e, o) {
  return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t;
}
function Ve(t, e) {
  return [t[0] * e, t[1] * e];
}
function Ur(t, e, o) {
  return t[0] = e[0] * o, t[1] = e[1] * o, t;
}
function Ol(t, e) {
  return [t[0] / e, t[1] / e];
}
function mi(t) {
  return [t[1], -t[0]];
}
function Zr(t, e) {
  let o = e[0];
  return t[0] = e[1], t[1] = -o, t;
}
function ms(t, e) {
  return t[0] * e[0] + t[1] * e[1];
}
function Xl(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function Yl(t) {
  return Math.hypot(t[0], t[1]);
}
function bs(t, e) {
  let o = t[0] - e[0], r = t[1] - e[1];
  return o * o + r * r;
}
function bi(t) {
  return Ol(t, Yl(t));
}
function Gl(t, e) {
  return Math.hypot(t[1] - e[1], t[0] - e[0]);
}
function En(t, e, o) {
  let r = Math.sin(o), n = Math.cos(o), s = t[0] - e[0], i = t[1] - e[1], l = s * n - i * r, a = s * r + i * n;
  return [l + e[0], a + e[1]];
}
function xs(t, e, o, r) {
  let n = Math.sin(r), s = Math.cos(r), i = e[0] - o[0], l = e[1] - o[1], a = i * s - l * n, c = i * n + l * s;
  return t[0] = a + o[0], t[1] = c + o[1], t;
}
function ws(t, e, o) {
  return Pe(t, Ve(Ze(e, t), o));
}
function jl(t, e, o, r) {
  let n = o[0] - e[0], s = o[1] - e[1];
  return t[0] = e[0] + n * r, t[1] = e[1] + s * r, t;
}
function xi(t, e, o) {
  return Pe(t, Ve(e, o));
}
const se = [0, 0], Xe = [0, 0], Ye = [0, 0];
function Vl(t, e) {
  let o = xi(t, bi(mi(Ze(t, Pe(t, [1, 1])))), -e), r = [], n = 1 / 13;
  for (let s = n; s <= 1; s += n) r.push(En(o, t, Qo * 2 * s));
  return r;
}
function Ul(t, e, o) {
  let r = [], n = 1 / o;
  for (let s = n; s <= 1; s += n) r.push(En(e, t, Qo * s));
  return r;
}
function Zl(t, e, o) {
  let r = Ze(e, o), n = Ve(r, 0.5), s = Ve(r, 0.51);
  return [Ze(t, n), Ze(t, s), Pe(t, s), Pe(t, n)];
}
function ql(t, e, o, r) {
  let n = [], s = xi(t, e, o), i = 1 / r;
  for (let l = i; l < 1; l += i) n.push(En(s, t, Qo * 3 * l));
  return n;
}
function Kl(t, e, o) {
  return [Pe(t, Ve(e, o)), Pe(t, Ve(e, o * 0.99)), Ze(t, Ve(e, o * 0.99)), Ze(t, Ve(e, o))];
}
function ks(t, e, o) {
  return t === !1 || t === void 0 ? 0 : t === !0 ? Math.max(e, o) : t;
}
function Ql(t, e, o) {
  return t.slice(0, 10).reduce((r, n) => {
    let s = n.pressure;
    return e && (s = gi(r, n.distance, o)), (r + s) / 2;
  }, t[0].pressure);
}
function Jl(t, e = {}) {
  let { size: o = 16, smoothing: r = 0.5, thinning: n = 0.5, simulatePressure: s = !0, easing: i = (V) => V, start: l = {}, end: a = {}, last: c = !1 } = e, { cap: u = !0, easing: f = (V) => V * (2 - V) } = l, { cap: h = !0, easing: p = (V) => --V * V * V + 1 } = a;
  if (t.length === 0 || o <= 0) return [];
  let y = t[t.length - 1].runningLength, g = ks(l.taper, o, y), m = ks(a.taper, o, y), w = (o * r) ** 2, b = [], M = [], S = Ql(t, s, o), A = ys(o, n, t[t.length - 1].pressure, i), O, j = t[0].vector, Y = t[0].point, _ = Y, J = Y, dt = _, B = !1;
  for (let V = 0; V < t.length; V++) {
    let { pressure: tt } = t[V], { point: U, vector: G, distance: N, runningLength: L } = t[V], nt = V === t.length - 1;
    if (!nt && y - L < 3) continue;
    n ? (s && (tt = gi(S, N, o)), A = ys(o, n, tt, i)) : A = o / 2, O === void 0 && (O = A);
    let st = L < g ? f(L / g) : 1, pt = y - L < m ? p((y - L) / m) : 1;
    A = Math.max(0.01, A * Math.min(st, pt));
    let ut = (nt ? t[V] : t[V + 1]).vector, kt = nt ? 1 : ms(G, ut), Dt = ms(G, j) < 0 && !B, mt = kt !== null && kt < 0;
    if (Dt || mt) {
      Zr(se, j), Ur(se, se, A);
      for (let wt = 0; wt <= 1; wt += 0.07692307692307693) fn(Xe, U, se), xs(Xe, Xe, U, Qo * wt), J = [Xe[0], Xe[1]], b.push(J), gs(Ye, U, se), xs(Ye, Ye, U, Qo * -wt), dt = [Ye[0], Ye[1]], M.push(dt);
      Y = J, _ = dt, mt && (B = !0);
      continue;
    }
    if (B = !1, nt) {
      Zr(se, G), Ur(se, se, A), b.push(Ze(U, se)), M.push(Pe(U, se));
      continue;
    }
    jl(se, ut, G, kt), Zr(se, se), Ur(se, se, A), fn(Xe, U, se), J = [Xe[0], Xe[1]], (V <= 1 || bs(Y, J) > w) && (b.push(J), Y = J), gs(Ye, U, se), dt = [Ye[0], Ye[1]], (V <= 1 || bs(_, dt) > w) && (M.push(dt), _ = dt), S = tt, j = G;
  }
  let et = [t[0].point[0], t[0].point[1]], X = t.length > 1 ? [t[t.length - 1].point[0], t[t.length - 1].point[1]] : Pe(t[0].point, [1, 1]), z = [], K = [];
  if (t.length === 1) {
    if (!(g || m) || c) return Vl(et, O || A);
  } else {
    g || m && t.length === 1 || (u ? z.push(...Ul(et, M[0], 13)) : z.push(...Zl(et, b[0], M[0])));
    let V = mi(Hl(t[t.length - 1].vector));
    m || g && t.length === 1 ? K.push(X) : h ? K.push(...ql(X, V, A, 29)) : K.push(...Kl(X, V, A));
  }
  return b.concat(K, M.reverse(), z);
}
const vs = [0, 0];
function Ss(t) {
  return t != null && t >= 0;
}
function $l(t, e = {}) {
  var h;
  let { streamline: o = 0.5, size: r = 16, last: n = !1 } = e;
  if (t.length === 0) return [];
  let s = 0.15 + (1 - o) * 0.85, i = Array.isArray(t[0]) ? t : t.map(({ x: p, y, pressure: g = fs }) => [p, y, g]);
  if (i.length === 2) {
    let p = i[1];
    i = i.slice(0, -1);
    for (let y = 1; y < 5; y++) i.push(ws(i[0], p, y / 4));
  }
  i.length === 1 && (i = [...i, [...Pe(i[0], ps), ...i[0].slice(2)]]);
  let l = [{ point: [i[0][0], i[0][1]], pressure: Ss(i[0][2]) ? i[0][2] : 0.25, vector: [...ps], distance: 0, runningLength: 0 }], a = !1, c = 0, u = l[0], f = i.length - 1;
  for (let p = 1; p < i.length; p++) {
    let y = n && p === f ? [i[p][0], i[p][1]] : ws(u.point, i[p], s);
    if (Xl(u.point, y)) continue;
    let g = Gl(y, u.point);
    if (c += g, p < f && !a) {
      if (c < r) continue;
      a = !0;
    }
    fn(vs, u.point, y), u = { point: y, pressure: Ss(i[p][2]) ? i[p][2] : fs, vector: bi(vs), distance: g, runningLength: c }, l.push(u);
  }
  return l[0].vector = ((h = l[1]) == null ? void 0 : h.vector) || [0, 0], l;
}
function _l(t, e = {}) {
  return Jl($l(t, e), e);
}
var tc = _l;
function Wn(t, e = {}) {
  const o = tc(t, {
    size: e.size || 4,
    thinning: e.thinning ?? 0.5,
    smoothing: e.smoothing ?? 0.5,
    streamline: e.streamline ?? 0.5
  });
  return ec(o);
}
function ec(t) {
  if (!t.length) return "";
  const e = [], [o, r] = t[0];
  e.push("M", o, r);
  for (let n = 0; n < t.length; n++) {
    const [s, i] = t[n], [l, a] = t[(n + 1) % t.length];
    e.push("Q", s, i, (s + l) / 2, (i + a) / 2);
  }
  return e.push("Z"), e.join(" ");
}
function wi(t, e = 0.5) {
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
function oc(t, e = 0.5) {
  if (t.length < 2) return "";
  const o = wi(t, e), r = o.length, n = [];
  n.push("M", o[0][0], o[0][1]);
  for (let s = 0; s < r; s++) {
    const [i, l] = o[s], [a, c] = o[(s + 1) % r];
    n.push("Q", i, l, (i + a) / 2, (l + c) / 2);
  }
  return n.push("Z"), n.join(" ");
}
function rc(t, e, o, r) {
  const n = e[0] - t[0], s = e[1] - t[1], i = r[0] - o[0], l = r[1] - o[1], a = n * l - s * i;
  if (Math.abs(a) < 1e-10) return null;
  const c = ((o[0] - t[0]) * l - (o[1] - t[1]) * i) / a, u = ((o[0] - t[0]) * s - (o[1] - t[1]) * n) / a;
  return c <= 0 || c >= 1 || u <= 0 || u >= 1 ? null : [t[0] + c * n, t[1] + c * s];
}
function nc(t) {
  if (t.length < 2) return "";
  let e = `M ${t[0][0]},${t[0][1]}`;
  for (let o = 1; o < t.length; o++)
    e += ` L ${t[o][0]},${t[o][1]}`;
  return e + " Z";
}
function Ms(t) {
  let e = 0;
  for (let o = 0, r = t.length - 1; o < t.length; r = o++)
    e += (t[r][0] + t[o][0]) * (t[r][1] - t[o][1]);
  return Math.abs(e) / 2;
}
function sc(t) {
  if (t.length < 4) return [];
  const e = t.length, o = [];
  for (let i = 0; i < e - 1; i++)
    for (let l = i + 2; l < e - 1; l++) {
      const a = rc(
        t[i],
        t[i + 1],
        t[l],
        t[l + 1]
      );
      if (!a) continue;
      const c = [a];
      for (let u = i + 1; u <= l; u++)
        c.push(t[u]);
      Ms(c) < 100 || o.push({
        pathD: nc(c),
        points: c.map((u) => [u[0], u[1]])
      });
    }
  if (o.length === 0) return [];
  const r = o.map((i) => Ms(i.points)), s = Math.max(...r) * 0.05;
  return o.filter((i, l) => r[l] >= s);
}
function qr(t, e, o) {
  if (t && t.length) {
    const [r, n] = e, s = Math.PI / 180 * o, i = Math.cos(s), l = Math.sin(s);
    for (const a of t) {
      const [c, u] = a;
      a[0] = (c - r) * i - (u - n) * l + r, a[1] = (c - r) * l + (u - n) * i + n;
    }
  }
}
function ic(t, e) {
  return t[0] === e[0] && t[1] === e[1];
}
function ac(t, e, o, r = 1) {
  const n = o, s = Math.max(e, 0.1), i = t[0] && t[0][0] && typeof t[0][0] == "number" ? [t] : t, l = [0, 0];
  if (n) for (const c of i) qr(c, l, n);
  const a = function(c, u, f) {
    const h = [];
    for (const b of c) {
      const M = [...b];
      ic(M[0], M[M.length - 1]) || M.push([M[0][0], M[0][1]]), M.length > 2 && h.push(M);
    }
    const p = [];
    u = Math.max(u, 0.1);
    const y = [];
    for (const b of h) for (let M = 0; M < b.length - 1; M++) {
      const S = b[M], A = b[M + 1];
      if (S[1] !== A[1]) {
        const O = Math.min(S[1], A[1]);
        y.push({ ymin: O, ymax: Math.max(S[1], A[1]), x: O === S[1] ? S[0] : A[0], islope: (A[0] - S[0]) / (A[1] - S[1]) });
      }
    }
    if (y.sort((b, M) => b.ymin < M.ymin ? -1 : b.ymin > M.ymin ? 1 : b.x < M.x ? -1 : b.x > M.x ? 1 : b.ymax === M.ymax ? 0 : (b.ymax - M.ymax) / Math.abs(b.ymax - M.ymax)), !y.length) return p;
    let g = [], m = y[0].ymin, w = 0;
    for (; g.length || y.length; ) {
      if (y.length) {
        let b = -1;
        for (let M = 0; M < y.length && !(y[M].ymin > m); M++) b = M;
        y.splice(0, b + 1).forEach((M) => {
          g.push({ s: m, edge: M });
        });
      }
      if (g = g.filter((b) => !(b.edge.ymax <= m)), g.sort((b, M) => b.edge.x === M.edge.x ? 0 : (b.edge.x - M.edge.x) / Math.abs(b.edge.x - M.edge.x)), (f !== 1 || w % u == 0) && g.length > 1) for (let b = 0; b < g.length; b += 2) {
        const M = b + 1;
        if (M >= g.length) break;
        const S = g[b].edge, A = g[M].edge;
        p.push([[Math.round(S.x), m], [Math.round(A.x), m]]);
      }
      m += f, g.forEach((b) => {
        b.edge.x = b.edge.x + f * b.edge.islope;
      }), w++;
    }
    return p;
  }(i, s, r);
  if (n) {
    for (const c of i) qr(c, l, -n);
    (function(c, u, f) {
      const h = [];
      c.forEach((p) => h.push(...p)), qr(h, u, f);
    })(a, l, -n);
  }
  return a;
}
function $o(t, e) {
  var o;
  const r = e.hachureAngle + 90;
  let n = e.hachureGap;
  n < 0 && (n = 4 * e.strokeWidth), n = Math.round(Math.max(n, 0.1));
  let s = 1;
  return e.roughness >= 1 && (((o = e.randomizer) === null || o === void 0 ? void 0 : o.next()) || Math.random()) > 0.7 && (s = n), ac(t, n, r, s || 1);
}
class Ln {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    return this._fillPolygons(e, o);
  }
  _fillPolygons(e, o) {
    const r = $o(e, o);
    return { type: "fillSketch", ops: this.renderLines(r, o) };
  }
  renderLines(e, o) {
    const r = [];
    for (const n of e) r.push(...this.helper.doubleLineOps(n[0][0], n[0][1], n[1][0], n[1][1], o));
    return r;
  }
}
function Pr(t) {
  const e = t[0], o = t[1];
  return Math.sqrt(Math.pow(e[0] - o[0], 2) + Math.pow(e[1] - o[1], 2));
}
class lc extends Ln {
  fillPolygons(e, o) {
    let r = o.hachureGap;
    r < 0 && (r = 4 * o.strokeWidth), r = Math.max(r, 0.1);
    const n = $o(e, Object.assign({}, o, { hachureGap: r })), s = Math.PI / 180 * o.hachureAngle, i = [], l = 0.5 * r * Math.cos(s), a = 0.5 * r * Math.sin(s);
    for (const [c, u] of n) Pr([c, u]) && i.push([[c[0] - l, c[1] + a], [...u]], [[c[0] + l, c[1] - a], [...u]]);
    return { type: "fillSketch", ops: this.renderLines(i, o) };
  }
}
class cc extends Ln {
  fillPolygons(e, o) {
    const r = this._fillPolygons(e, o), n = Object.assign({}, o, { hachureAngle: o.hachureAngle + 90 }), s = this._fillPolygons(e, n);
    return r.ops = r.ops.concat(s.ops), r;
  }
}
class dc {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = $o(e, o = Object.assign({}, o, { hachureAngle: 0 }));
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
      const a = Pr(l), c = a / n, u = Math.ceil(c) - 1, f = a - u * n, h = (l[0][0] + l[1][0]) / 2 - n / 4, p = Math.min(l[0][1], l[1][1]);
      for (let y = 0; y < u; y++) {
        const g = p + f + y * n, m = h - i + 2 * Math.random() * i, w = g - i + 2 * Math.random() * i, b = this.helper.ellipse(m, w, s, s, o);
        r.push(...b.ops);
      }
    }
    return { type: "fillSketch", ops: r };
  }
}
class hc {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = $o(e, o);
    return { type: "fillSketch", ops: this.dashedLine(r, o) };
  }
  dashedLine(e, o) {
    const r = o.dashOffset < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashOffset, n = o.dashGap < 0 ? o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap : o.dashGap, s = [];
    return e.forEach((i) => {
      const l = Pr(i), a = Math.floor(l / (r + n)), c = (l + n - a * (r + n)) / 2;
      let u = i[0], f = i[1];
      u[0] > f[0] && (u = i[1], f = i[0]);
      const h = Math.atan((f[1] - u[1]) / (f[0] - u[0]));
      for (let p = 0; p < a; p++) {
        const y = p * (r + n), g = y + r, m = [u[0] + y * Math.cos(h) + c * Math.cos(h), u[1] + y * Math.sin(h) + c * Math.sin(h)], w = [u[0] + g * Math.cos(h) + c * Math.cos(h), u[1] + g * Math.sin(h) + c * Math.sin(h)];
        s.push(...this.helper.doubleLineOps(m[0], m[1], w[0], w[1], o));
      }
    }), s;
  }
}
class uc {
  constructor(e) {
    this.helper = e;
  }
  fillPolygons(e, o) {
    const r = o.hachureGap < 0 ? 4 * o.strokeWidth : o.hachureGap, n = o.zigzagOffset < 0 ? r : o.zigzagOffset, s = $o(e, o = Object.assign({}, o, { hachureGap: r + n }));
    return { type: "fillSketch", ops: this.zigzagLines(s, n, o) };
  }
  zigzagLines(e, o, r) {
    const n = [];
    return e.forEach((s) => {
      const i = Pr(s), l = Math.round(i / (2 * o));
      let a = s[0], c = s[1];
      a[0] > c[0] && (a = s[1], c = s[0]);
      const u = Math.atan((c[1] - a[1]) / (c[0] - a[0]));
      for (let f = 0; f < l; f++) {
        const h = 2 * f * o, p = 2 * (f + 1) * o, y = Math.sqrt(2 * Math.pow(o, 2)), g = [a[0] + h * Math.cos(u), a[1] + h * Math.sin(u)], m = [a[0] + p * Math.cos(u), a[1] + p * Math.sin(u)], w = [g[0] + y * Math.cos(u + Math.PI / 4), g[1] + y * Math.sin(u + Math.PI / 4)];
        n.push(...this.helper.doubleLineOps(g[0], g[1], w[0], w[1], r), ...this.helper.doubleLineOps(w[0], w[1], m[0], m[1], r));
      }
    }), n;
  }
}
const he = {};
class fc {
  constructor(e) {
    this.seed = e;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
const pc = 0, Kr = 1, Cs = 2, lr = { A: 7, a: 7, C: 6, c: 6, H: 1, h: 1, L: 2, l: 2, M: 2, m: 2, Q: 4, q: 4, S: 4, s: 4, T: 2, t: 2, V: 1, v: 1, Z: 0, z: 0 };
function Qr(t, e) {
  return t.type === e;
}
function Fn(t) {
  const e = [], o = function(i) {
    const l = new Array();
    for (; i !== ""; ) if (i.match(/^([ \t\r\n,]+)/)) i = i.substr(RegExp.$1.length);
    else if (i.match(/^([aAcChHlLmMqQsStTvVzZ])/)) l[l.length] = { type: pc, text: RegExp.$1 }, i = i.substr(RegExp.$1.length);
    else {
      if (!i.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/)) return [];
      l[l.length] = { type: Kr, text: `${parseFloat(RegExp.$1)}` }, i = i.substr(RegExp.$1.length);
    }
    return l[l.length] = { type: Cs, text: "" }, l;
  }(t);
  let r = "BOD", n = 0, s = o[n];
  for (; !Qr(s, Cs); ) {
    let i = 0;
    const l = [];
    if (r === "BOD") {
      if (s.text !== "M" && s.text !== "m") return Fn("M0,0" + t);
      n++, i = lr[s.text], r = s.text;
    } else Qr(s, Kr) ? i = lr[r] : (n++, i = lr[s.text], r = s.text);
    if (!(n + i < o.length)) throw new Error("Path data ended short");
    for (let a = n; a < n + i; a++) {
      const c = o[a];
      if (!Qr(c, Kr)) throw new Error("Param not a number: " + r + "," + c.text);
      l[l.length] = +c.text;
    }
    if (typeof lr[r] != "number") throw new Error("Bad segment: " + r);
    {
      const a = { key: r, data: l };
      e.push(a), n += i, s = o[n], r === "M" && (r = "L"), r === "m" && (r = "l");
    }
  }
  return e;
}
function ki(t) {
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
      const a = l.map((c, u) => u % 2 ? c + o : c + e);
      s.push({ key: "C", data: a }), e = a[4], o = a[5];
      break;
    }
    case "Q":
      s.push({ key: "Q", data: [...l] }), e = l[2], o = l[3];
      break;
    case "q": {
      const a = l.map((c, u) => u % 2 ? c + o : c + e);
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
      const a = l.map((c, u) => u % 2 ? c + o : c + e);
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
function vi(t) {
  const e = [];
  let o = "", r = 0, n = 0, s = 0, i = 0, l = 0, a = 0;
  for (const { key: c, data: u } of t) {
    switch (c) {
      case "M":
        e.push({ key: "M", data: [...u] }), [r, n] = u, [s, i] = u;
        break;
      case "C":
        e.push({ key: "C", data: [...u] }), r = u[4], n = u[5], l = u[2], a = u[3];
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
        let f = 0, h = 0;
        o === "C" || o === "S" ? (f = r + (r - l), h = n + (n - a)) : (f = r, h = n), e.push({ key: "C", data: [f, h, ...u] }), l = u[0], a = u[1], r = u[2], n = u[3];
        break;
      }
      case "T": {
        const [f, h] = u;
        let p = 0, y = 0;
        o === "Q" || o === "T" ? (p = r + (r - l), y = n + (n - a)) : (p = r, y = n);
        const g = r + 2 * (p - r) / 3, m = n + 2 * (y - n) / 3, w = f + 2 * (p - f) / 3, b = h + 2 * (y - h) / 3;
        e.push({ key: "C", data: [g, m, w, b, f, h] }), l = p, a = y, r = f, n = h;
        break;
      }
      case "Q": {
        const [f, h, p, y] = u, g = r + 2 * (f - r) / 3, m = n + 2 * (h - n) / 3, w = p + 2 * (f - p) / 3, b = y + 2 * (h - y) / 3;
        e.push({ key: "C", data: [g, m, w, b, p, y] }), l = f, a = h, r = p, n = y;
        break;
      }
      case "A": {
        const f = Math.abs(u[0]), h = Math.abs(u[1]), p = u[2], y = u[3], g = u[4], m = u[5], w = u[6];
        f === 0 || h === 0 ? (e.push({ key: "C", data: [r, n, m, w, m, w] }), r = m, n = w) : (r !== m || n !== w) && (Si(r, n, m, w, f, h, p, y, g).forEach(function(b) {
          e.push({ key: "C", data: b });
        }), r = m, n = w);
        break;
      }
      case "Z":
        e.push({ key: "Z", data: [] }), r = s, n = i;
    }
    o = c;
  }
  return e;
}
function Oo(t, e, o) {
  return [t * Math.cos(o) - e * Math.sin(o), t * Math.sin(o) + e * Math.cos(o)];
}
function Si(t, e, o, r, n, s, i, l, a, c) {
  const u = (f = i, Math.PI * f / 180);
  var f;
  let h = [], p = 0, y = 0, g = 0, m = 0;
  if (c) [p, y, g, m] = c;
  else {
    [t, e] = Oo(t, e, -u), [o, r] = Oo(o, r, -u);
    const et = (t - o) / 2, X = (e - r) / 2;
    let z = et * et / (n * n) + X * X / (s * s);
    z > 1 && (z = Math.sqrt(z), n *= z, s *= z);
    const K = n * n, V = s * s, tt = K * V - K * X * X - V * et * et, U = K * X * X + V * et * et, G = (l === a ? -1 : 1) * Math.sqrt(Math.abs(tt / U));
    g = G * n * X / s + (t + o) / 2, m = G * -s * et / n + (e + r) / 2, p = Math.asin(parseFloat(((e - m) / s).toFixed(9))), y = Math.asin(parseFloat(((r - m) / s).toFixed(9))), t < g && (p = Math.PI - p), o < g && (y = Math.PI - y), p < 0 && (p = 2 * Math.PI + p), y < 0 && (y = 2 * Math.PI + y), a && p > y && (p -= 2 * Math.PI), !a && y > p && (y -= 2 * Math.PI);
  }
  let w = y - p;
  if (Math.abs(w) > 120 * Math.PI / 180) {
    const et = y, X = o, z = r;
    y = a && y > p ? p + 120 * Math.PI / 180 * 1 : p + 120 * Math.PI / 180 * -1, h = Si(o = g + n * Math.cos(y), r = m + s * Math.sin(y), X, z, n, s, i, 0, a, [y, et, g, m]);
  }
  w = y - p;
  const b = Math.cos(p), M = Math.sin(p), S = Math.cos(y), A = Math.sin(y), O = Math.tan(w / 4), j = 4 / 3 * n * O, Y = 4 / 3 * s * O, _ = [t, e], J = [t + j * M, e - Y * b], dt = [o + j * A, r - Y * S], B = [o, r];
  if (J[0] = 2 * _[0] - J[0], J[1] = 2 * _[1] - J[1], c) return [J, dt, B].concat(h);
  {
    h = [J, dt, B].concat(h);
    const et = [];
    for (let X = 0; X < h.length; X += 3) {
      const z = Oo(h[X][0], h[X][1], u), K = Oo(h[X + 1][0], h[X + 1][1], u), V = Oo(h[X + 2][0], h[X + 2][1], u);
      et.push([z[0], z[1], K[0], K[1], V[0], V[1]]);
    }
    return et;
  }
}
const yc = { randOffset: function(t, e) {
  return At(t, e);
}, randOffsetWithRange: function(t, e, o) {
  return wr(t, e, o);
}, ellipse: function(t, e, o, r, n) {
  const s = Ci(o, r, n);
  return pn(t, e, n, s).opset;
}, doubleLineOps: function(t, e, o, r, n) {
  return qe(t, e, o, r, n, !0);
} };
function Mi(t, e, o, r, n) {
  return { type: "path", ops: qe(t, e, o, r, n) };
}
function gr(t, e, o) {
  const r = (t || []).length;
  if (r > 2) {
    const n = [];
    for (let s = 0; s < r - 1; s++) n.push(...qe(t[s][0], t[s][1], t[s + 1][0], t[s + 1][1], o));
    return e && n.push(...qe(t[r - 1][0], t[r - 1][1], t[0][0], t[0][1], o)), { type: "path", ops: n };
  }
  return r === 2 ? Mi(t[0][0], t[0][1], t[1][0], t[1][1], o) : { type: "path", ops: [] };
}
function gc(t, e, o, r, n) {
  return function(s, i) {
    return gr(s, !0, i);
  }([[t, e], [t + o, e], [t + o, e + r], [t, e + r]], n);
}
function Is(t, e) {
  if (t.length) {
    const o = typeof t[0][0] == "number" ? [t] : t, r = cr(o[0], 1 * (1 + 0.2 * e.roughness), e), n = e.disableMultiStroke ? [] : cr(o[0], 1.5 * (1 + 0.22 * e.roughness), Ps(e));
    for (let s = 1; s < o.length; s++) {
      const i = o[s];
      if (i.length) {
        const l = cr(i, 1 * (1 + 0.2 * e.roughness), e), a = e.disableMultiStroke ? [] : cr(i, 1.5 * (1 + 0.22 * e.roughness), Ps(e));
        for (const c of l) c.op !== "move" && r.push(c);
        for (const c of a) c.op !== "move" && n.push(c);
      }
    }
    return { type: "path", ops: r.concat(n) };
  }
  return { type: "path", ops: [] };
}
function Ci(t, e, o) {
  const r = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)), n = Math.ceil(Math.max(o.curveStepCount, o.curveStepCount / Math.sqrt(200) * r)), s = 2 * Math.PI / n;
  let i = Math.abs(t / 2), l = Math.abs(e / 2);
  const a = 1 - o.curveFitting;
  return i += At(i * a, o), l += At(l * a, o), { increment: s, rx: i, ry: l };
}
function pn(t, e, o, r) {
  const [n, s] = As(r.increment, t, e, r.rx, r.ry, 1, r.increment * wr(0.1, wr(0.4, 1, o), o), o);
  let i = kr(n, null, o);
  if (!o.disableMultiStroke && o.roughness !== 0) {
    const [l] = As(r.increment, t, e, r.rx, r.ry, 1.5, 0, o), a = kr(l, null, o);
    i = i.concat(a);
  }
  return { estimatedPoints: s, opset: { type: "path", ops: i } };
}
function zs(t, e, o, r, n, s, i, l, a) {
  const c = t, u = e;
  let f = Math.abs(o / 2), h = Math.abs(r / 2);
  f += At(0.01 * f, a), h += At(0.01 * h, a);
  let p = n, y = s;
  for (; p < 0; ) p += 2 * Math.PI, y += 2 * Math.PI;
  y - p > 2 * Math.PI && (p = 0, y = 2 * Math.PI);
  const g = 2 * Math.PI / a.curveStepCount, m = Math.min(g / 2, (y - p) / 2), w = Rs(m, c, u, f, h, p, y, 1, a);
  if (!a.disableMultiStroke) {
    const b = Rs(m, c, u, f, h, p, y, 1.5, a);
    w.push(...b);
  }
  return i && (l ? w.push(...qe(c, u, c + f * Math.cos(p), u + h * Math.sin(p), a), ...qe(c, u, c + f * Math.cos(y), u + h * Math.sin(y), a)) : w.push({ op: "lineTo", data: [c, u] }, { op: "lineTo", data: [c + f * Math.cos(p), u + h * Math.sin(p)] })), { type: "path", ops: w };
}
function Ts(t, e) {
  const o = vi(ki(Fn(t))), r = [];
  let n = [0, 0], s = [0, 0];
  for (const { key: i, data: l } of o) switch (i) {
    case "M":
      s = [l[0], l[1]], n = [l[0], l[1]];
      break;
    case "L":
      r.push(...qe(s[0], s[1], l[0], l[1], e)), s = [l[0], l[1]];
      break;
    case "C": {
      const [a, c, u, f, h, p] = l;
      r.push(...mc(a, c, u, f, h, p, s, e)), s = [h, p];
      break;
    }
    case "Z":
      r.push(...qe(s[0], s[1], n[0], n[1], e)), s = [n[0], n[1]];
  }
  return { type: "path", ops: r };
}
function Jr(t, e) {
  const o = [];
  for (const r of t) if (r.length) {
    const n = e.maxRandomnessOffset || 0, s = r.length;
    if (s > 2) {
      o.push({ op: "move", data: [r[0][0] + At(n, e), r[0][1] + At(n, e)] });
      for (let i = 1; i < s; i++) o.push({ op: "lineTo", data: [r[i][0] + At(n, e), r[i][1] + At(n, e)] });
    }
  }
  return { type: "fillPath", ops: o };
}
function wo(t, e) {
  return function(o, r) {
    let n = o.fillStyle || "hachure";
    if (!he[n]) switch (n) {
      case "zigzag":
        he[n] || (he[n] = new lc(r));
        break;
      case "cross-hatch":
        he[n] || (he[n] = new cc(r));
        break;
      case "dots":
        he[n] || (he[n] = new dc(r));
        break;
      case "dashed":
        he[n] || (he[n] = new hc(r));
        break;
      case "zigzag-line":
        he[n] || (he[n] = new uc(r));
        break;
      default:
        n = "hachure", he[n] || (he[n] = new Ln(r));
    }
    return he[n];
  }(e, yc).fillPolygons(t, e);
}
function Ps(t) {
  const e = Object.assign({}, t);
  return e.randomizer = void 0, t.seed && (e.seed = t.seed + 1), e;
}
function Ii(t) {
  return t.randomizer || (t.randomizer = new fc(t.seed || 0)), t.randomizer.next();
}
function wr(t, e, o, r = 1) {
  return o.roughness * r * (Ii(o) * (e - t) + t);
}
function At(t, e, o = 1) {
  return wr(-t, t, e, o);
}
function qe(t, e, o, r, n, s = !1) {
  const i = s ? n.disableMultiStrokeFill : n.disableMultiStroke, l = yn(t, e, o, r, n, !0, !1);
  if (i) return l;
  const a = yn(t, e, o, r, n, !0, !0);
  return l.concat(a);
}
function yn(t, e, o, r, n, s, i) {
  const l = Math.pow(t - o, 2) + Math.pow(e - r, 2), a = Math.sqrt(l);
  let c = 1;
  c = a < 200 ? 1 : a > 500 ? 0.4 : -16668e-7 * a + 1.233334;
  let u = n.maxRandomnessOffset || 0;
  u * u * 100 > l && (u = a / 10);
  const f = u / 2, h = 0.2 + 0.2 * Ii(n);
  let p = n.bowing * n.maxRandomnessOffset * (r - e) / 200, y = n.bowing * n.maxRandomnessOffset * (t - o) / 200;
  p = At(p, n, c), y = At(y, n, c);
  const g = [], m = () => At(f, n, c), w = () => At(u, n, c), b = n.preserveVertices;
  return i ? g.push({ op: "move", data: [t + (b ? 0 : m()), e + (b ? 0 : m())] }) : g.push({ op: "move", data: [t + (b ? 0 : At(u, n, c)), e + (b ? 0 : At(u, n, c))] }), i ? g.push({ op: "bcurveTo", data: [p + t + (o - t) * h + m(), y + e + (r - e) * h + m(), p + t + 2 * (o - t) * h + m(), y + e + 2 * (r - e) * h + m(), o + (b ? 0 : m()), r + (b ? 0 : m())] }) : g.push({ op: "bcurveTo", data: [p + t + (o - t) * h + w(), y + e + (r - e) * h + w(), p + t + 2 * (o - t) * h + w(), y + e + 2 * (r - e) * h + w(), o + (b ? 0 : w()), r + (b ? 0 : w())] }), g;
}
function cr(t, e, o) {
  if (!t.length) return [];
  const r = [];
  r.push([t[0][0] + At(e, o), t[0][1] + At(e, o)]), r.push([t[0][0] + At(e, o), t[0][1] + At(e, o)]);
  for (let n = 1; n < t.length; n++) r.push([t[n][0] + At(e, o), t[n][1] + At(e, o)]), n === t.length - 1 && r.push([t[n][0] + At(e, o), t[n][1] + At(e, o)]);
  return kr(r, null, o);
}
function kr(t, e, o) {
  const r = t.length, n = [];
  if (r > 3) {
    const s = [], i = 1 - o.curveTightness;
    n.push({ op: "move", data: [t[1][0], t[1][1]] });
    for (let l = 1; l + 2 < r; l++) {
      const a = t[l];
      s[0] = [a[0], a[1]], s[1] = [a[0] + (i * t[l + 1][0] - i * t[l - 1][0]) / 6, a[1] + (i * t[l + 1][1] - i * t[l - 1][1]) / 6], s[2] = [t[l + 1][0] + (i * t[l][0] - i * t[l + 2][0]) / 6, t[l + 1][1] + (i * t[l][1] - i * t[l + 2][1]) / 6], s[3] = [t[l + 1][0], t[l + 1][1]], n.push({ op: "bcurveTo", data: [s[1][0], s[1][1], s[2][0], s[2][1], s[3][0], s[3][1]] });
    }
  } else r === 3 ? (n.push({ op: "move", data: [t[1][0], t[1][1]] }), n.push({ op: "bcurveTo", data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]] })) : r === 2 && n.push(...yn(t[0][0], t[0][1], t[1][0], t[1][1], o, !0, !0));
  return n;
}
function As(t, e, o, r, n, s, i, l) {
  const a = [], c = [];
  if (l.roughness === 0) {
    t /= 4, c.push([e + r * Math.cos(-t), o + n * Math.sin(-t)]);
    for (let u = 0; u <= 2 * Math.PI; u += t) {
      const f = [e + r * Math.cos(u), o + n * Math.sin(u)];
      a.push(f), c.push(f);
    }
    c.push([e + r * Math.cos(0), o + n * Math.sin(0)]), c.push([e + r * Math.cos(t), o + n * Math.sin(t)]);
  } else {
    const u = At(0.5, l) - Math.PI / 2;
    c.push([At(s, l) + e + 0.9 * r * Math.cos(u - t), At(s, l) + o + 0.9 * n * Math.sin(u - t)]);
    const f = 2 * Math.PI + u - 0.01;
    for (let h = u; h < f; h += t) {
      const p = [At(s, l) + e + r * Math.cos(h), At(s, l) + o + n * Math.sin(h)];
      a.push(p), c.push(p);
    }
    c.push([At(s, l) + e + r * Math.cos(u + 2 * Math.PI + 0.5 * i), At(s, l) + o + n * Math.sin(u + 2 * Math.PI + 0.5 * i)]), c.push([At(s, l) + e + 0.98 * r * Math.cos(u + i), At(s, l) + o + 0.98 * n * Math.sin(u + i)]), c.push([At(s, l) + e + 0.9 * r * Math.cos(u + 0.5 * i), At(s, l) + o + 0.9 * n * Math.sin(u + 0.5 * i)]);
  }
  return [c, a];
}
function Rs(t, e, o, r, n, s, i, l, a) {
  const c = s + At(0.1, a), u = [];
  u.push([At(l, a) + e + 0.9 * r * Math.cos(c - t), At(l, a) + o + 0.9 * n * Math.sin(c - t)]);
  for (let f = c; f <= i; f += t) u.push([At(l, a) + e + r * Math.cos(f), At(l, a) + o + n * Math.sin(f)]);
  return u.push([e + r * Math.cos(i), o + n * Math.sin(i)]), u.push([e + r * Math.cos(i), o + n * Math.sin(i)]), kr(u, null, a);
}
function mc(t, e, o, r, n, s, i, l) {
  const a = [], c = [l.maxRandomnessOffset || 1, (l.maxRandomnessOffset || 1) + 0.3];
  let u = [0, 0];
  const f = l.disableMultiStroke ? 1 : 2, h = l.preserveVertices;
  for (let p = 0; p < f; p++) p === 0 ? a.push({ op: "move", data: [i[0], i[1]] }) : a.push({ op: "move", data: [i[0] + (h ? 0 : At(c[0], l)), i[1] + (h ? 0 : At(c[0], l))] }), u = h ? [n, s] : [n + At(c[p], l), s + At(c[p], l)], a.push({ op: "bcurveTo", data: [t + At(c[p], l), e + At(c[p], l), o + At(c[p], l), r + At(c[p], l), u[0], u[1]] });
  return a;
}
function Xo(t) {
  return [...t];
}
function Ds(t, e = 0) {
  const o = t.length;
  if (o < 3) throw new Error("A curve must have at least three points.");
  const r = [];
  if (o === 3) r.push(Xo(t[0]), Xo(t[1]), Xo(t[2]), Xo(t[2]));
  else {
    const n = [];
    n.push(t[0], t[0]);
    for (let l = 1; l < t.length; l++) n.push(t[l]), l === t.length - 1 && n.push(t[l]);
    const s = [], i = 1 - e;
    r.push(Xo(n[0]));
    for (let l = 1; l + 2 < n.length; l++) {
      const a = n[l];
      s[0] = [a[0], a[1]], s[1] = [a[0] + (i * n[l + 1][0] - i * n[l - 1][0]) / 6, a[1] + (i * n[l + 1][1] - i * n[l - 1][1]) / 6], s[2] = [n[l + 1][0] + (i * n[l][0] - i * n[l + 2][0]) / 6, n[l + 1][1] + (i * n[l][1] - i * n[l + 2][1]) / 6], s[3] = [n[l + 1][0], n[l + 1][1]], r.push(s[1], s[2], s[3]);
    }
  }
  return r;
}
function mr(t, e) {
  return Math.pow(t[0] - e[0], 2) + Math.pow(t[1] - e[1], 2);
}
function bc(t, e, o) {
  const r = mr(e, o);
  if (r === 0) return mr(t, e);
  let n = ((t[0] - e[0]) * (o[0] - e[0]) + (t[1] - e[1]) * (o[1] - e[1])) / r;
  return n = Math.max(0, Math.min(1, n)), mr(t, lo(e, o, n));
}
function lo(t, e, o) {
  return [t[0] + (e[0] - t[0]) * o, t[1] + (e[1] - t[1]) * o];
}
function gn(t, e, o, r) {
  const n = r || [];
  if (function(l, a) {
    const c = l[a + 0], u = l[a + 1], f = l[a + 2], h = l[a + 3];
    let p = 3 * u[0] - 2 * c[0] - h[0];
    p *= p;
    let y = 3 * u[1] - 2 * c[1] - h[1];
    y *= y;
    let g = 3 * f[0] - 2 * h[0] - c[0];
    g *= g;
    let m = 3 * f[1] - 2 * h[1] - c[1];
    return m *= m, p < g && (p = g), y < m && (y = m), p + y;
  }(t, e) < o) {
    const l = t[e + 0];
    n.length ? (s = n[n.length - 1], i = l, Math.sqrt(mr(s, i)) > 1 && n.push(l)) : n.push(l), n.push(t[e + 3]);
  } else {
    const a = t[e + 0], c = t[e + 1], u = t[e + 2], f = t[e + 3], h = lo(a, c, 0.5), p = lo(c, u, 0.5), y = lo(u, f, 0.5), g = lo(h, p, 0.5), m = lo(p, y, 0.5), w = lo(g, m, 0.5);
    gn([a, h, g, w], 0, o, n), gn([w, m, y, f], 0, o, n);
  }
  var s, i;
  return n;
}
function xc(t, e) {
  return vr(t, 0, t.length, e);
}
function vr(t, e, o, r, n) {
  const s = n || [], i = t[e], l = t[o - 1];
  let a = 0, c = 1;
  for (let u = e + 1; u < o - 1; ++u) {
    const f = bc(t[u], i, l);
    f > a && (a = f, c = u);
  }
  return Math.sqrt(a) > r ? (vr(t, e, c + 1, r, s), vr(t, c, o, r, s)) : (s.length || s.push(i), s.push(l)), s;
}
function $r(t, e = 0.15, o) {
  const r = [], n = (t.length - 1) / 3;
  for (let s = 0; s < n; s++)
    gn(t, 3 * s, e, r);
  return o && o > 0 ? vr(r, 0, r.length, o) : r;
}
const pe = "none";
class Sr {
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
    return this._d("line", [Mi(e, o, r, n, i)], i);
  }
  rectangle(e, o, r, n, s) {
    const i = this._o(s), l = [], a = gc(e, o, r, n, i);
    if (i.fill) {
      const c = [[e, o], [e + r, o], [e + r, o + n], [e, o + n]];
      i.fillStyle === "solid" ? l.push(Jr([c], i)) : l.push(wo([c], i));
    }
    return i.stroke !== pe && l.push(a), this._d("rectangle", l, i);
  }
  ellipse(e, o, r, n, s) {
    const i = this._o(s), l = [], a = Ci(r, n, i), c = pn(e, o, i, a);
    if (i.fill) if (i.fillStyle === "solid") {
      const u = pn(e, o, i, a).opset;
      u.type = "fillPath", l.push(u);
    } else l.push(wo([c.estimatedPoints], i));
    return i.stroke !== pe && l.push(c.opset), this._d("ellipse", l, i);
  }
  circle(e, o, r, n) {
    const s = this.ellipse(e, o, r, r, n);
    return s.shape = "circle", s;
  }
  linearPath(e, o) {
    const r = this._o(o);
    return this._d("linearPath", [gr(e, !1, r)], r);
  }
  arc(e, o, r, n, s, i, l = !1, a) {
    const c = this._o(a), u = [], f = zs(e, o, r, n, s, i, l, !0, c);
    if (l && c.fill) if (c.fillStyle === "solid") {
      const h = Object.assign({}, c);
      h.disableMultiStroke = !0;
      const p = zs(e, o, r, n, s, i, !0, !1, h);
      p.type = "fillPath", u.push(p);
    } else u.push(function(h, p, y, g, m, w, b) {
      const M = h, S = p;
      let A = Math.abs(y / 2), O = Math.abs(g / 2);
      A += At(0.01 * A, b), O += At(0.01 * O, b);
      let j = m, Y = w;
      for (; j < 0; ) j += 2 * Math.PI, Y += 2 * Math.PI;
      Y - j > 2 * Math.PI && (j = 0, Y = 2 * Math.PI);
      const _ = (Y - j) / b.curveStepCount, J = [];
      for (let dt = j; dt <= Y; dt += _) J.push([M + A * Math.cos(dt), S + O * Math.sin(dt)]);
      return J.push([M + A * Math.cos(Y), S + O * Math.sin(Y)]), J.push([M, S]), wo([J], b);
    }(e, o, r, n, s, i, c));
    return c.stroke !== pe && u.push(f), this._d("arc", u, c);
  }
  curve(e, o) {
    const r = this._o(o), n = [], s = Is(e, r);
    if (r.fill && r.fill !== pe) if (r.fillStyle === "solid") {
      const i = Is(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(i.ops) });
    } else {
      const i = [], l = e;
      if (l.length) {
        const a = typeof l[0][0] == "number" ? [l] : l;
        for (const c of a) c.length < 3 ? i.push(...c) : c.length === 3 ? i.push(...$r(Ds([c[0], c[0], c[1], c[2]]), 10, (1 + r.roughness) / 2)) : i.push(...$r(Ds(c), 10, (1 + r.roughness) / 2));
      }
      i.length && n.push(wo([i], r));
    }
    return r.stroke !== pe && n.push(s), this._d("curve", n, r);
  }
  polygon(e, o) {
    const r = this._o(o), n = [], s = gr(e, !0, r);
    return r.fill && (r.fillStyle === "solid" ? n.push(Jr([e], r)) : n.push(wo([e], r))), r.stroke !== pe && n.push(s), this._d("polygon", n, r);
  }
  path(e, o) {
    const r = this._o(o), n = [];
    if (!e) return this._d("path", n, r);
    e = (e || "").replace(/\n/g, " ").replace(/(-\s)/g, "-").replace("/(ss)/g", " ");
    const s = r.fill && r.fill !== "transparent" && r.fill !== pe, i = r.stroke !== pe, l = !!(r.simplification && r.simplification < 1), a = function(u, f, h) {
      const p = vi(ki(Fn(u))), y = [];
      let g = [], m = [0, 0], w = [];
      const b = () => {
        w.length >= 4 && g.push(...$r(w, f)), w = [];
      }, M = () => {
        b(), g.length && (y.push(g), g = []);
      };
      for (const { key: A, data: O } of p) switch (A) {
        case "M":
          M(), m = [O[0], O[1]], g.push(m);
          break;
        case "L":
          b(), g.push([O[0], O[1]]);
          break;
        case "C":
          if (!w.length) {
            const j = g.length ? g[g.length - 1] : m;
            w.push([j[0], j[1]]);
          }
          w.push([O[0], O[1]]), w.push([O[2], O[3]]), w.push([O[4], O[5]]);
          break;
        case "Z":
          b(), g.push([m[0], m[1]]);
      }
      if (M(), !h) return y;
      const S = [];
      for (const A of y) {
        const O = xc(A, h);
        O.length && S.push(O);
      }
      return S;
    }(e, 1, l ? 4 - 4 * (r.simplification || 1) : (1 + r.roughness) / 2), c = Ts(e, r);
    if (s) if (r.fillStyle === "solid") if (a.length === 1) {
      const u = Ts(e, Object.assign(Object.assign({}, r), { disableMultiStroke: !0, roughness: r.roughness ? r.roughness + r.fillShapeRoughnessGain : 0 }));
      n.push({ type: "fillPath", ops: this._mergedShape(u.ops) });
    } else n.push(Jr(a, r));
    else n.push(wo(a, r));
    return i && (l ? a.forEach((u) => {
      n.push(gr(u, !1, r));
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
class wc {
  constructor(e, o) {
    this.canvas = e, this.ctx = this.canvas.getContext("2d"), this.gen = new Sr(o);
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
const dr = "http://www.w3.org/2000/svg";
class kc {
  constructor(e, o) {
    this.svg = e, this.gen = new Sr(o);
  }
  draw(e) {
    const o = e.sets || [], r = e.options || this.getDefaultOptions(), n = this.svg.ownerDocument || window.document, s = n.createElementNS(dr, "g"), i = e.options.fixedDecimalPlaceDigits;
    for (const l of o) {
      let a = null;
      switch (l.type) {
        case "path":
          a = n.createElementNS(dr, "path"), a.setAttribute("d", this.opsToPath(l, i)), a.setAttribute("stroke", r.stroke), a.setAttribute("stroke-width", r.strokeWidth + ""), a.setAttribute("fill", "none"), r.strokeLineDash && a.setAttribute("stroke-dasharray", r.strokeLineDash.join(" ").trim()), r.strokeLineDashOffset && a.setAttribute("stroke-dashoffset", `${r.strokeLineDashOffset}`);
          break;
        case "fillPath":
          a = n.createElementNS(dr, "path"), a.setAttribute("d", this.opsToPath(l, i)), a.setAttribute("stroke", "none"), a.setAttribute("stroke-width", "0"), a.setAttribute("fill", r.fill || ""), e.shape !== "curve" && e.shape !== "polygon" || a.setAttribute("fill-rule", "evenodd");
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
    const s = e.createElementNS(dr, "path");
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
var vc = { canvas: (t, e) => new wc(t, e), svg: (t, e) => new kc(t, e), generator: (t) => new Sr(t), newSeed: () => Sr.newSeed() };
const Le = vc.generator();
function Sc(t) {
  let e = 0;
  for (let o = 0; o < t.length; o++) {
    const r = t.charCodeAt(o);
    e = (e << 5) - e + r, e |= 0;
  }
  return Math.abs(e);
}
function Ke(t) {
  return {
    stroke: t.stroke,
    fill: t.fill || "none",
    fillStyle: t.fill ? t.fillStyle || "hachure" : void 0,
    roughness: t.roughness,
    strokeWidth: t.strokeWidth,
    strokeLineDash: t.strokeLineDash,
    seed: t.seed ? Sc(t.seed) : void 0,
    fillWeight: t.strokeWidth / 2,
    hachureGap: Math.max(t.strokeWidth * 4, 4)
  };
}
function Qe(t) {
  var r;
  const e = t.options, o = (r = e == null ? void 0 : e.strokeLineDash) != null && r.length ? e.strokeLineDash.join(" ") : void 0;
  return Le.toPaths(t).map((n) => ({
    d: n.d,
    stroke: n.stroke,
    strokeWidth: n.strokeWidth,
    fill: n.fill,
    // Apply dash only to stroke paths, not fill paths
    strokeDasharray: n.stroke !== "none" && n.strokeWidth > 0 ? o : void 0
  }));
}
function Wo(t, e) {
  return Math.min(t, e) * 0.25;
}
function Mc(t, e, o, r, n) {
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
function Mr(t, e, o, r, n, s) {
  if (s) {
    const i = Wo(o, r);
    return Qe(Le.path(Mc(t, e, o, r, i), Ke(n)));
  }
  return Qe(Le.rectangle(t, e, o, r, Ke(n)));
}
function Nn(t, e, o, r, n) {
  return Qe(Le.ellipse(t, e, o, r, Ke(n)));
}
function Cc(t, e, o, r, n) {
  const s = t + o / 2, i = e + r / 2, l = [s, e], a = [t + o, i], c = [s, e + r], u = [t, i], f = Math.hypot(o / 2, r / 2), h = Math.min(n, f / 2) / f, p = (O, j, Y) => [
    O[0] + Y * (j[0] - O[0]),
    O[1] + Y * (j[1] - O[1])
  ], y = p(u, l, 1 - h), g = p(l, a, h), m = p(l, a, 1 - h), w = p(a, c, h), b = p(a, c, 1 - h), M = p(c, u, h), S = p(c, u, 1 - h), A = p(u, l, h);
  return [
    `M${g[0]},${g[1]}`,
    `L${m[0]},${m[1]}`,
    `Q${a[0]},${a[1]} ${w[0]},${w[1]}`,
    `L${b[0]},${b[1]}`,
    `Q${c[0]},${c[1]} ${M[0]},${M[1]}`,
    `L${S[0]},${S[1]}`,
    `Q${u[0]},${u[1]} ${A[0]},${A[1]}`,
    `L${y[0]},${y[1]}`,
    `Q${l[0]},${l[1]} ${g[0]},${g[1]}`,
    "Z"
  ].join(" ");
}
function Bn(t, e, o, r, n, s) {
  if (s) {
    const l = Wo(o, r);
    return Qe(Le.path(Cc(t, e, o, r, l), Ke(n)));
  }
  const i = [
    [t + o / 2, e],
    [t + o, e + r / 2],
    [t + o / 2, e + r],
    [t, e + r / 2]
  ];
  return Qe(Le.polygon(i, Ke(n)));
}
function Po(t, e, o, r, n) {
  return Qe(Le.line(t, e, o, r, Ke(n)));
}
function Hn(t, e, o, r, n) {
  const s = Po(t, e, o, r, n), i = Math.atan2(r - e, o - t), l = Math.max(12, n.strokeWidth * 4), a = Math.PI / 6, c = o - l * Math.cos(i - a), u = r - l * Math.sin(i - a), f = o - l * Math.cos(i + a), h = r - l * Math.sin(i + a), p = Po(o, r, c, u, n), y = Po(o, r, f, h, n);
  return [...s, ...p, ...y];
}
function Es(t, e) {
  const o = {
    ...Ke(e),
    stroke: "none"
  };
  return Qe(Le.polygon(t, o));
}
function _r(t, e) {
  return Qe(Le.path(t, Ke(e)));
}
function Je(t) {
  if (t === "dashed") return [8, 4];
  if (t === "dotted") return [2, 2];
}
function Ic(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function zc({ node: t, editingLabel: e }) {
  if (t.type === "draw") {
    const o = t;
    return o.data.tool === "vector" ? /* @__PURE__ */ d(Pc, { node: o }) : /* @__PURE__ */ d(Tc, { node: o });
  }
  return /* @__PURE__ */ d(Ac, { node: t, editingLabel: e });
}
const Cr = ue(zc), Tc = ue(function({ node: e }) {
  const o = e.data.strokeStyle === "dashed" || e.data.strokeStyle === "dotted", r = Je(e.data.strokeStyle), n = qt(
    () => o ? null : Wn(e.data.points, { size: e.data.strokeWidth }),
    [e.data.points, e.data.strokeWidth, o]
  ), s = qt(() => {
    const u = e.data.points;
    if (!u || u.length === 0) return "";
    if (u.length === 1) return `M${u[0][0]},${u[0][1]}L${u[0][0]},${u[0][1]}`;
    const f = [`M${u[0][0]},${u[0][1]}`];
    for (let h = 1; h < u.length; h++)
      f.push(`L${u[h][0]},${u[h][1]}`);
    return f.join("");
  }, [e.data.points]), i = qt(() => {
    if (!o) return null;
    const u = e.data.points;
    if (u.length < 2) return "";
    const f = ["M", u[0][0], u[0][1]];
    for (let p = 1; p < u.length; p++) {
      const [y, g] = u[p], [m, w] = u[p - 1];
      f.push("Q", m, w, (m + y) / 2, (w + g) / 2);
    }
    const h = u[u.length - 1];
    return f.push("L", h[0], h[1]), f.join(" ");
  }, [e.data.points, o]), l = qt(() => {
    if (!e.data.fill || e.data.points.length < 3) return null;
    const u = e.data.points.map((S) => [S[0], S[1]]), f = wi(u), h = f[0], p = f[f.length - 1], y = Math.hypot(h[0] - p[0], h[1] - p[1]);
    let g = 0;
    for (let S = 1; S < f.length; S++)
      g += Math.hypot(f[S][0] - f[S - 1][0], f[S][1] - f[S - 1][1]);
    const m = g >= 1 && y <= Math.max(e.data.strokeWidth * 4, 20) && y <= g * 0.1, w = e.data.fillStyle || "solid";
    if (m) {
      const S = oc(f, 0);
      return w === "solid" ? { kind: "solid", d: S, fill: e.data.fill } : { kind: "rough", paths: Es(f, {
        stroke: "none",
        fill: e.data.fill,
        fillStyle: w,
        roughness: 1,
        strokeWidth: e.data.strokeWidth
      }) };
    }
    const b = sc(f);
    if (b.length === 0) return null;
    if (w === "solid")
      return {
        kind: "solid",
        d: "",
        fill: e.data.fill,
        regions: b
      };
    const M = [];
    for (const { points: S } of b)
      S.length >= 3 && M.push(
        ...Es(S, {
          stroke: "none",
          fill: e.data.fill,
          fillStyle: w,
          roughness: 1,
          strokeWidth: e.data.strokeWidth
        })
      );
    return { kind: "rough", paths: M, regions: b };
  }, [e.data.fill, e.data.fillStyle, e.data.points, e.data.strokeWidth]), a = e.h === "auto" ? 0 : e.h, c = e.data.strokeWidth * 4;
  return /* @__PURE__ */ d(
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
      children: /* @__PURE__ */ d(
        "svg",
        {
          width: e.w + c * 2,
          height: a + c * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ v("g", { transform: `translate(${c}, ${c})`, opacity: e.data.opacity ?? 1, children: [
            (l == null ? void 0 : l.kind) === "solid" && (l.regions ? l.regions.map((u, f) => /* @__PURE__ */ d(
              "path",
              {
                d: u.pathD,
                fill: l.fill,
                stroke: "none"
              },
              f
            )) : /* @__PURE__ */ d("path", { d: l.d, fill: l.fill, stroke: "none" })),
            (l == null ? void 0 : l.kind) === "rough" && l.paths.map((u, f) => /* @__PURE__ */ d(
              "path",
              {
                d: u.d,
                stroke: u.stroke,
                strokeWidth: u.strokeWidth,
                fill: u.fill,
                strokeLinecap: "round",
                strokeLinejoin: "round"
              },
              f
            )),
            o ? /* @__PURE__ */ d(
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
            ) : /* @__PURE__ */ d(
              "path",
              {
                d: n,
                fill: e.data.color
              }
            ),
            s && /* @__PURE__ */ d(
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
}), Pc = ue(function({ node: e }) {
  const o = e.h === "auto" ? 0 : e.h, r = e.data.strokeWidth * 2, n = qt(() => {
    const l = e.data.points;
    if (!l || l.length === 0) return "";
    const a = [`M${l[0][0]},${l[0][1]}`];
    for (let c = 1; c < l.length; c++)
      a.push(`L${l[c][0]},${l[c][1]}`);
    return a.push("Z"), a.join("");
  }, [e.data.points]), s = Je(e.data.strokeStyle), i = s == null ? void 0 : s.map((l) => l * Math.max(e.data.strokeWidth, 1)).join(" ");
  return /* @__PURE__ */ d(
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
      children: /* @__PURE__ */ d(
        "svg",
        {
          width: e.w + r * 2,
          height: o + r * 2,
          style: { overflow: "visible" },
          children: /* @__PURE__ */ v("g", { transform: `translate(${r}, ${r})`, opacity: e.data.opacity ?? 1, children: [
            /* @__PURE__ */ d(
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
            /* @__PURE__ */ d(
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
}), Ac = ue(function({ node: e, editingLabel: o }) {
  var m, w, b, M;
  const r = e.h === "auto" ? 100 : e.h, n = e.data.strokeWidth * 2, s = Je(e.data.strokeStyle), i = ((m = e.data.startPoint) == null ? void 0 : m[0]) ?? 0, l = ((w = e.data.startPoint) == null ? void 0 : w[1]) ?? r / 2, a = ((b = e.data.endPoint) == null ? void 0 : b[0]) ?? e.w, c = ((M = e.data.endPoint) == null ? void 0 : M[1]) ?? r / 2, u = qt(() => {
    if (e.data.roughness === 0) return null;
    const S = {
      stroke: e.data.stroke,
      fill: e.data.fill,
      fillStyle: e.data.fillStyle,
      roughness: e.data.roughness,
      strokeWidth: e.data.strokeWidth,
      strokeLineDash: s,
      seed: e.id
    }, A = e.data.edgeStyle === "round";
    switch (e.data.shape) {
      case "rect":
        return Mr(0, 0, e.w, r, S, A);
      case "ellipse":
        return Nn(e.w / 2, r / 2, e.w, r, S);
      case "diamond":
        return Bn(0, 0, e.w, r, S, A);
      case "line":
        return Po(i, l, a, c, S);
      case "arrow":
        return Hn(i, l, a, c, S);
      default:
        return null;
    }
  }, [e, s, i, l, a, c, r]), f = e.data.fill && e.data.fillStyle === "solid" && e.data.roughness > 0, h = e.data.opacity ?? 1, p = e.data.shape === "line" || e.data.shape === "arrow", y = e.data.label, g = e.data.labelFontSize ?? 14;
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
        /* @__PURE__ */ d(
          "svg",
          {
            width: e.w + n * 2,
            height: r + n * 2,
            style: { overflow: "visible", marginLeft: -n, marginTop: -n },
            children: /* @__PURE__ */ v("g", { transform: `translate(${n}, ${n})`, opacity: h, children: [
              f && /* @__PURE__ */ d(
                Ec,
                {
                  shape: e.data.shape,
                  w: e.w,
                  h: r,
                  fill: e.data.fill,
                  rounded: e.data.edgeStyle === "round"
                }
              ),
              u ? u.map((S, A) => f && S.fill && S.fill !== "none" ? null : /* @__PURE__ */ d(
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
                A
              )) : /* @__PURE__ */ d(
                Rc,
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
              /* @__PURE__ */ d(
                Dc,
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
        !p && y && !o && /* @__PURE__ */ d(
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
            children: /* @__PURE__ */ d(
              "div",
              {
                style: {
                  textAlign: e.data.labelAlign ?? "center",
                  fontFamily: We(e.data.labelFontFamily ?? Ee),
                  fontSize: g,
                  color: e.data.fill && e.data.fillStyle === "solid" ? Ic(e.data.fill) : e.data.stroke,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  width: "100%"
                },
                children: y
              }
            )
          }
        )
      ]
    }
  );
});
function On(t, e) {
  const o = Wo(t, e), r = t / 2, n = e / 2, s = [r, 0], i = [t, n], l = [r, e], a = [0, n], c = Math.hypot(t / 2, e / 2), u = Math.min(o, c / 2) / c, f = (S, A, O) => [
    S[0] + O * (A[0] - S[0]),
    S[1] + O * (A[1] - S[1])
  ], h = f(s, i, u), p = f(s, i, 1 - u), y = f(i, l, u), g = f(i, l, 1 - u), m = f(l, a, u), w = f(l, a, 1 - u), b = f(a, s, u), M = f(a, s, 1 - u);
  return [
    `M${h[0]},${h[1]}`,
    `L${p[0]},${p[1]}`,
    `Q${i[0]},${i[1]} ${y[0]},${y[1]}`,
    `L${g[0]},${g[1]}`,
    `Q${l[0]},${l[1]} ${m[0]},${m[1]}`,
    `L${w[0]},${w[1]}`,
    `Q${a[0]},${a[1]} ${b[0]},${b[1]}`,
    `L${M[0]},${M[1]}`,
    `Q${s[0]},${s[1]} ${h[0]},${h[1]}`,
    "Z"
  ].join(" ");
}
function Rc({
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
  dashArray: u,
  rounded: f
}) {
  const h = u == null ? void 0 : u.join(",");
  switch (t) {
    case "rect": {
      const p = f ? Wo(e, o) : 0;
      return /* @__PURE__ */ d(
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
          strokeDasharray: h
        }
      );
    }
    case "ellipse":
      return /* @__PURE__ */ d(
        "ellipse",
        {
          cx: e / 2,
          cy: o / 2,
          rx: e / 2,
          ry: o / 2,
          stroke: l,
          fill: a || "none",
          strokeWidth: c,
          strokeDasharray: h
        }
      );
    case "diamond":
      return f ? /* @__PURE__ */ d(
        "path",
        {
          d: On(e, o),
          stroke: l,
          fill: a || "none",
          strokeWidth: c,
          strokeDasharray: h
        }
      ) : /* @__PURE__ */ d(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          stroke: l,
          fill: a || "none",
          strokeWidth: c,
          strokeDasharray: h
        }
      );
    case "line":
      return /* @__PURE__ */ d(
        "line",
        {
          x1: r,
          y1: n,
          x2: s,
          y2: i,
          stroke: l,
          strokeWidth: c,
          strokeDasharray: h
        }
      );
    case "arrow": {
      const p = Math.atan2(i - n, s - r), y = Math.max(12, c * 4), g = Math.PI / 6, m = s - y * Math.cos(p - g), w = i - y * Math.sin(p - g), b = s - y * Math.cos(p + g), M = i - y * Math.sin(p + g);
      return /* @__PURE__ */ v(lt, { children: [
        /* @__PURE__ */ d(
          "line",
          {
            x1: r,
            y1: n,
            x2: s,
            y2: i,
            stroke: l,
            strokeWidth: c,
            strokeDasharray: h
          }
        ),
        /* @__PURE__ */ d(
          "polyline",
          {
            points: `${m},${w} ${s},${i} ${b},${M}`,
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
function Dc({
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
  const u = l ? "painted" : "stroke", f = l ? "transparent" : "none";
  switch (t) {
    case "rect": {
      const h = c ? Wo(e, o) : 0;
      return /* @__PURE__ */ d(
        "rect",
        {
          x: 0,
          y: 0,
          width: e,
          height: o,
          rx: h || void 0,
          ry: h || void 0,
          fill: f,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: u
        }
      );
    }
    case "ellipse":
      return /* @__PURE__ */ d(
        "ellipse",
        {
          cx: e / 2,
          cy: o / 2,
          rx: e / 2,
          ry: o / 2,
          fill: f,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: u
        }
      );
    case "diamond":
      return c ? /* @__PURE__ */ d(
        "path",
        {
          d: On(e, o),
          fill: f,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: u
        }
      ) : /* @__PURE__ */ d(
        "polygon",
        {
          points: `${e / 2},0 ${e},${o / 2} ${e / 2},${o} 0,${o / 2}`,
          fill: f,
          stroke: "transparent",
          strokeWidth: a,
          pointerEvents: u
        }
      );
    case "line":
    case "arrow":
      return /* @__PURE__ */ d(
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
function Ec({
  shape: t,
  w: e,
  h: o,
  fill: r,
  rounded: n
}) {
  switch (t) {
    case "rect": {
      const s = n ? Wo(e, o) : 0;
      return /* @__PURE__ */ d("rect", { x: 0, y: 0, width: e, height: o, rx: s || void 0, ry: s || void 0, fill: r, stroke: "none" });
    }
    case "ellipse":
      return /* @__PURE__ */ d("ellipse", { cx: e / 2, cy: o / 2, rx: e / 2, ry: o / 2, fill: r, stroke: "none" });
    case "diamond":
      return n ? /* @__PURE__ */ d(
        "path",
        {
          d: On(e, o),
          fill: r,
          stroke: "none"
        }
      ) : /* @__PURE__ */ d(
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
const Wc = ue(function(e) {
  return /* @__PURE__ */ d(Cr, { node: e.node });
}), Lc = {
  type: "draw",
  component: Wc,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => zn(t, e, o, r),
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
function Fc({
  node: t
}) {
  const e = t.h === "auto" ? t.type === "draw" ? 0 : 100 : t.h, o = t.type === "draw" && e === 0 ? 24 : e, r = t.type === "draw" ? t.data.strokeWidth * 4 : t.data.strokeWidth * 2;
  return /* @__PURE__ */ d(
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
const zi = ue(Fc), Nc = ue(function(e) {
  const o = e.node, r = o.h === "auto" ? 100 : o.h, n = o.w * e.zoom, s = r * e.zoom;
  return Math.min(n, s) < 2 ? /* @__PURE__ */ d(zi, { node: o }) : /* @__PURE__ */ d(Cr, { node: o, editingLabel: e.editing });
}), Bc = {
  type: "shape",
  component: Nc,
  handlesOwnLayout: !0,
  hitTest: (t, e, o, r) => zr(t, e, o, r),
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
function Hc(t) {
  return null;
}
const Oc = {
  type: "edge",
  component: Hc,
  isSVGOnly: !0,
  handlesOwnLayout: !0,
  getClipboardText: () => null
}, hr = 0.05, Xc = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" }
];
function Yc({
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
  const c = t.h, u = t.data.crop, f = it(!1);
  f.current = !!i;
  const h = it(null), [p, y] = $(null), g = rt(() => {
    h.current && h.current.naturalWidth > 0 && y({ w: h.current.naturalWidth, h: h.current.naturalHeight });
  }, []);
  yt(() => {
    h.current && h.current.naturalWidth > 0 && y({ w: h.current.naturalWidth, h: h.current.naturalHeight });
  }, [t.data.src]);
  const [m, w] = $({ x: 0, y: 0, w: 1, h: 1 });
  yt(() => {
    i && (w(u ?? { x: 0, y: 0, w: 1, h: 1 }), !p && h.current && h.current.naturalWidth > 0 && y({ w: h.current.naturalWidth, h: h.current.naturalHeight }));
  }, [i]);
  const b = qt(() => {
    if (!p) return null;
    const U = p.w / p.h, G = t.w / c;
    let N, L;
    return U > G ? (N = t.w, L = t.w / U) : (L = c, N = c * U), { x: (t.w - N) / 2, y: (c - L) / 2, w: N, h: L };
  }, [p, t.w, c]), M = rt(() => {
    const U = m.x < 1e-3 && m.y < 1e-3 && m.w > 0.999 && m.h > 0.999;
    o.updateNodeWithHistory(t.id, {
      data: {
        ...t.data,
        crop: U ? void 0 : { x: m.x, y: m.y, w: m.w, h: m.h }
      }
    }), a == null || a();
  }, [o, t, m, a]), S = rt(() => {
    a == null || a();
  }, [a]);
  yt(() => {
    if (!i) return;
    const U = (G) => {
      G.key === "Enter" ? (M(), G.preventDefault(), G.stopPropagation()) : G.key === "Escape" && (S(), G.preventDefault(), G.stopPropagation());
    };
    return document.addEventListener("keydown", U, !0), () => document.removeEventListener("keydown", U, !0);
  }, [i, M, S]);
  const A = rt(
    (U, G) => {
      if (G.stopPropagation(), G.preventDefault(), !b) return;
      const N = G.currentTarget.ownerDocument, L = G.clientX, nt = G.clientY, st = { ...m }, pt = (kt) => {
        const Dt = (kt.clientX - L) / n / b.w, mt = (kt.clientY - nt) / n / b.h, wt = { ...st }, ct = st.x + st.w, St = st.y + st.h;
        if (U.includes("left")) {
          const vt = Math.max(0, Math.min(ct - hr, st.x + Dt));
          wt.x = vt, wt.w = ct - vt;
        }
        if (U.includes("right") && (wt.w = Math.max(
          hr,
          Math.min(1 - st.x, st.w + Dt)
        )), U.includes("top")) {
          const vt = Math.max(0, Math.min(St - hr, st.y + mt));
          wt.y = vt, wt.h = St - vt;
        }
        U.includes("bottom") && (wt.h = Math.max(
          hr,
          Math.min(1 - st.y, st.h + mt)
        )), w(wt);
      }, ut = () => {
        N.removeEventListener("pointermove", pt), N.removeEventListener("pointerup", ut);
      };
      N.addEventListener("pointermove", pt), N.addEventListener("pointerup", ut);
    },
    [m, b, n]
  ), O = rt(
    (U) => {
      if (U.stopPropagation(), U.preventDefault(), !b) return;
      const G = U.currentTarget.ownerDocument, N = U.clientX, L = U.clientY, nt = { ...m }, st = (ut) => {
        const kt = (ut.clientX - N) / n / b.w, Dt = (ut.clientY - L) / n / b.h;
        w({
          ...nt,
          x: Math.max(0, Math.min(1 - nt.w, nt.x + kt)),
          y: Math.max(0, Math.min(1 - nt.h, nt.y + Dt))
        });
      }, pt = () => {
        G.removeEventListener("pointermove", st), G.removeEventListener("pointerup", pt);
      };
      G.addEventListener("pointermove", st), G.addEventListener("pointerup", pt);
    },
    [m, b, n]
  ), j = rt(
    (U) => {
      if (f.current) return;
      const G = U.currentTarget.ownerDocument;
      if (U.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: vt, y: Et } = o.screenToCanvas(
          U.clientX,
          U.clientY
        );
        for (const Qt of o.selection) {
          const Wt = o.getNode(Qt);
          if (!Wt) continue;
          const te = Wt.h === "auto" ? 100 : Wt.h;
          if (vt >= Wt.x && vt <= Wt.x + Wt.w && Et >= Wt.y && Et <= Wt.y + te)
            return;
        }
      }
      U.stopPropagation(), U.preventDefault(), U.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const N = U.clientX, L = U.clientY, nt = Array.from(o.selection), st = nt.map((vt) => {
        const Et = o.getNode(vt);
        return { id: vt, x: Et.x, y: Et.y };
      });
      let pt = !1, ut = null, kt = N, Dt = L, mt = !1;
      const wt = () => {
        ut = null;
        const vt = (kt - N) / o.viewport.zoom, Et = (Dt - L) / o.viewport.zoom, { finalDx: Qt, finalDy: Wt } = o.computeDragSnap(
          st,
          nt,
          vt,
          Et,
          mt
        ), te = st.map((ee) => ({
          id: ee.id,
          patch: { x: ee.x + Qt, y: ee.y + Wt }
        }));
        o.updateMany(te);
      }, ct = (vt) => {
        const Et = (vt.clientX - N) / o.viewport.zoom, Qt = (vt.clientY - L) / o.viewport.zoom;
        if (!pt)
          if (Math.abs(Et) > 2 || Math.abs(Qt) > 2)
            pt = !0, o.pushHistorySnapshot();
          else
            return;
        kt = vt.clientX, Dt = vt.clientY, mt = vt.metaKey || vt.ctrlKey, ut === null && (ut = requestAnimationFrame(wt));
      }, St = () => {
        ut !== null && (cancelAnimationFrame(ut), wt()), o.clearAlignGuides(), G.removeEventListener("pointermove", ct), G.removeEventListener("pointerup", St);
      };
      G.addEventListener("pointermove", ct), G.addEventListener("pointerup", St);
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
  ], _ = 8 / n, J = _ / 2, dt = 25 / n, B = e && s && !i, et = rt(
    (U) => {
      const G = U.currentTarget.ownerDocument;
      U.stopPropagation(), U.preventDefault();
      const N = t.x + t.w / 2, L = t.y + c / 2, nt = t.rotation || 0, { x: st, y: pt } = o.screenToCanvas(
        U.clientX,
        U.clientY
      ), ut = Math.atan2(pt - L, st - N);
      o.pushHistorySnapshot();
      const kt = (mt) => {
        const { x: wt, y: ct } = o.screenToCanvas(
          mt.clientX,
          mt.clientY
        ), St = Math.atan2(ct - L, wt - N);
        let vt = nt + (St - ut) * (180 / Math.PI);
        (mt.shiftKey || o.snapToGrid) && !(mt.metaKey || mt.ctrlKey) && (vt = Math.round(vt / 15) * 15), o.updateNode(t.id, { rotation: vt });
      }, Dt = () => {
        G.removeEventListener("pointermove", kt), G.removeEventListener("pointerup", Dt);
      };
      G.addEventListener("pointermove", kt), G.addEventListener("pointerup", Dt);
    },
    [o, t.id, t.x, t.y, t.w, c, t.rotation]
  ), X = i && b ? {
    left: b.x + m.x * b.w,
    top: b.y + m.y * b.h,
    width: m.w * b.w,
    height: m.h * b.h
  } : null, z = i ? void 0 : [t.data.flipH ? "scaleX(-1)" : "", t.data.flipV ? "scaleY(-1)" : ""].filter(Boolean).join(" ") || void 0, K = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: t.data.opacity ?? 1,
    transform: z
  };
  if (!i && u) {
    const U = u.y * 100, G = (1 - u.x - u.w) * 100, N = (1 - u.y - u.h) * 100, L = u.x * 100;
    K.objectViewBox = `inset(${U}% ${G}% ${N}% ${L}%)`;
  }
  const V = 8 / n, tt = V / 2;
  return /* @__PURE__ */ v(
    "div",
    {
      onPointerDown: j,
      onDoubleClick: !i && r ? (U) => {
        U.stopPropagation(), l == null || l();
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
              /* @__PURE__ */ d(
                "img",
                {
                  ref: h,
                  src: t.data.src,
                  alt: t.data.alt ?? "",
                  onLoad: g,
                  style: K,
                  draggable: !1
                }
              ),
              i && X && /* @__PURE__ */ d(
                "div",
                {
                  onPointerDown: O,
                  style: {
                    position: "absolute",
                    left: X.left,
                    top: X.top,
                    width: X.width,
                    height: X.height,
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
        i && X && Xc.map(({ pos: U, edges: G, cx: N, cy: L, cursor: nt }) => /* @__PURE__ */ d(
          "div",
          {
            onPointerDown: (st) => A(G, st),
            style: {
              position: "absolute",
              left: X.left + N * X.width - tt,
              top: X.top + L * X.height - tt,
              width: V,
              height: V,
              background: "white",
              border: `${1.5 / n}px solid #3b82f6`,
              borderRadius: 2,
              cursor: nt,
              zIndex: 11
            }
          },
          U
        )),
        e && !i && /* @__PURE__ */ v(lt, { children: [
          /* @__PURE__ */ d(
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
          /* @__PURE__ */ d(
            "div",
            {
              onPointerDown: et,
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
        B && Y.map(({ pos: U, cx: G, cy: N }) => /* @__PURE__ */ d(
          "div",
          {
            onPointerDown: (L) => {
              L.stopPropagation(), s == null || s(t.id, U, L);
            },
            style: {
              position: "absolute",
              left: `calc(${G * 100}% - ${J}px)`,
              top: `calc(${N * 100}% - ${J}px)`,
              width: _,
              height: _,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: Tr(U, t.rotation || 0)
            }
          },
          U
        ))
      ]
    }
  );
}
const Ti = ue(Yc);
function Gc(t) {
  const e = t.node;
  return /* @__PURE__ */ d(
    Ti,
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
const jc = {
  type: "image",
  component: Gc,
  handlesOwnLayout: !0,
  onFlip: (t, e) => {
    const o = t.data;
    return e === "h" ? { flipH: !o.flipH } : { flipV: !o.flipV };
  },
  getClipboardText: (t) => t.data.src || null
};
function Vc({
  node: t,
  engine: e,
  editing: o,
  editClickPos: r,
  onStopEdit: n,
  onMeasuredHeight: s
}) {
  const i = it(null), [l, a] = $(t.data.text), c = it(!1), u = it(t.data.text), f = it(null), h = it(e);
  h.current = e;
  const p = it(t);
  p.current = t, yt(() => {
    o || a(t.data.text);
  }, [t.data.text]), In(() => {
    var A, O;
    if (o && i.current) {
      i.current.innerText = t.data.text, i.current.focus();
      const j = i.current.ownerDocument;
      let Y = !1;
      if (r) {
        const _ = j.caretRangeFromPoint(r.clientX, r.clientY);
        if (_ && i.current.contains(_.startContainer)) {
          const J = (A = j.defaultView) == null ? void 0 : A.getSelection();
          J == null || J.removeAllRanges(), J == null || J.addRange(_), Y = !0;
        }
      }
      if (!Y) {
        const _ = j.createRange(), J = (O = j.defaultView) == null ? void 0 : O.getSelection();
        i.current.childNodes.length > 0 && (_.selectNodeContents(i.current), _.collapse(!1)), J == null || J.removeAllRanges(), J == null || J.addRange(_);
      }
      u.current = t.data.text, c.current = !1;
    }
  }, [o]), yt(() => {
    if (o)
      return () => {
        if (c.current) return;
        c.current = !0;
        const A = u.current, O = e.getNode(t.id);
        if (O && O.type === "text") {
          const j = O.data;
          A !== j.text && e.updateNodeWithHistory(t.id, {
            data: { ...j, text: A }
          });
        }
      };
  }, [o, e, t.id]), yt(() => {
    if (!i.current || !s) return;
    const A = new ResizeObserver(() => {
      var j;
      const O = ((j = i.current) == null ? void 0 : j.offsetHeight) ?? 0;
      O > 0 && s(t.id, O);
    });
    return A.observe(i.current), () => A.disconnect();
  }, [t.id, s, o]);
  const y = rt(() => {
    var O;
    if (c.current) return;
    c.current = !0, f.current && (clearTimeout(f.current), f.current = null);
    const A = ((O = i.current) == null ? void 0 : O.innerText) ?? "";
    a(A), u.current = A, A !== t.data.text && e.updateNodeWithHistory(t.id, {
      data: { ...t.data, text: A }
    }), n();
  }, [e, t, n]), g = rt(
    (A) => {
      var O;
      A.key === "Escape" && (A.preventDefault(), y(), (O = i.current) == null || O.blur()), A.stopPropagation();
    },
    [y]
  ), m = rt(() => {
    y();
  }, [y]), w = rt(() => {
    if (i.current) {
      const A = i.current.innerText;
      a(A), u.current = A, f.current && clearTimeout(f.current), f.current = setTimeout(() => {
        const O = p.current;
        A !== O.data.text && h.current.updateNode(O.id, {
          data: { ...O.data, text: A }
        });
      }, 300);
    }
  }, []), b = t.h === "auto" ? void 0 : t.h, M = t.data.opacity ?? 1, S = {
    fontFamily: We(t.data.fontFamily),
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
  return /* @__PURE__ */ d(
    "div",
    {
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
      children: o ? /* @__PURE__ */ d(
        "div",
        {
          ref: i,
          contentEditable: !0,
          suppressContentEditableWarning: !0,
          onKeyDown: g,
          onBlur: m,
          onInput: w,
          onPointerDown: (A) => A.stopPropagation(),
          style: { ...S, minHeight: t.data.fontSize, cursor: "text" }
        }
      ) : /* @__PURE__ */ d("div", { ref: i, style: S, children: l || " " })
    }
  );
}
const Pi = ue(Vc);
function Uc(t) {
  const e = t.node;
  return /* @__PURE__ */ d(
    Pi,
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
const Zc = {
  type: "text",
  component: Uc,
  handlesOwnLayout: !0,
  onResize: (t, e, o) => ({ fontSize: t.data.fontSize * e }),
  getClipboardText: (t) => t.data.text || null
};
function qc(t) {
  const e = t.node, o = e.h === "auto" ? 100 : e.h, r = rt(
    (s) => {
      var l, a;
      const i = s.currentTarget.value.trim();
      t.engine.updateNodeWithHistory(e.id, {
        data: { ...e.data, label: i || void 0 }
      }), (a = (l = t.callbacks).onEditEnd) == null || a.call(l);
    },
    [e.id, e.data, t.engine, t.callbacks]
  ), n = rt(
    (s) => {
      (s.key === "Enter" || s.key === "Escape") && s.currentTarget.blur(), s.stopPropagation();
    },
    []
  );
  return /* @__PURE__ */ d(
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
      children: t.editing ? /* @__PURE__ */ d(
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
      ) : e.data.label ? /* @__PURE__ */ d(
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
const Kc = {
  type: "frame",
  component: qc,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.label || null
}, Qc = 100;
function Jc({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onEditStart: i,
  onEditEnd: l
}) {
  const a = it(null), c = it(null), u = it(""), f = it(null), h = it(null), p = it(t);
  p.current = t;
  const y = it(o);
  y.current = o, yt(() => {
    var S;
    if (s && c.current) {
      const A = c.current;
      A.innerText = t.data.text || "", u.current = t.data.text || "", A.focus();
      const O = A.ownerDocument, j = (S = O.defaultView) == null ? void 0 : S.getSelection(), Y = f.current;
      f.current = null;
      let _ = !1;
      if (Y && j && O.caretRangeFromPoint) {
        const J = O.caretRangeFromPoint(Y.x, Y.y);
        J && A.contains(J.startContainer) && (j.removeAllRanges(), j.addRange(J), _ = !0);
      }
      if (!_ && j) {
        const J = O.createRange();
        A.childNodes.length > 0 && (J.selectNodeContents(A), J.collapse(!1)), j.removeAllRanges(), j.addRange(J);
      }
    }
  }, [s]), yt(() => {
    if (s)
      return () => {
        const S = p.current, A = u.current;
        A !== S.data.text && y.current.updateNodeWithHistory(S.id, {
          data: { ...S.data, text: A }
        });
      };
  }, [s]);
  const g = rt(() => {
    h.current && (clearTimeout(h.current), h.current = null), c.current && (u.current = c.current.innerText), l();
  }, [l]), m = rt(
    (S) => {
      const A = S.currentTarget.ownerDocument;
      if (S.altKey) return;
      if (!o.selection.has(t.id) && o.selection.size > 0) {
        const { x: tt, y: U } = o.screenToCanvas(S.clientX, S.clientY);
        for (const G of o.selection) {
          const N = o.getNode(G);
          if (!N) continue;
          const L = N.h === "auto" ? 100 : N.h;
          if (tt >= N.x && tt <= N.x + N.w && U >= N.y && U <= N.y + L)
            return;
        }
      }
      if (S.stopPropagation(), s) return;
      S.shiftKey ? o.toggleSelect(t.id) : o.selection.has(t.id) || o.select(t.id);
      const O = S.clientX, j = S.clientY, Y = Array.from(o.selection), _ = [];
      for (const tt of Y) {
        const U = o.getNode(tt);
        U && _.push({ id: tt, x: U.x, y: U.y });
      }
      if (_.length === 0) return;
      let J = !1, dt = null, B = O, et = j, X = !1;
      const z = () => {
        dt = null;
        const tt = (B - O) / o.viewport.zoom, U = (et - j) / o.viewport.zoom, { finalDx: G, finalDy: N } = o.computeDragSnap(
          _,
          Y,
          tt,
          U,
          X
        ), L = _.map((nt) => ({
          id: nt.id,
          patch: { x: nt.x + G, y: nt.y + N }
        }));
        o.updateMany(L);
      }, K = (tt) => {
        const U = (tt.clientX - O) / o.viewport.zoom, G = (tt.clientY - j) / o.viewport.zoom;
        if (!J)
          if (Math.abs(U) > 2 || Math.abs(G) > 2)
            J = !0, o.pushHistorySnapshot();
          else
            return;
        B = tt.clientX, et = tt.clientY, X = tt.metaKey || tt.ctrlKey, dt === null && (dt = requestAnimationFrame(z));
      }, V = () => {
        dt !== null && (cancelAnimationFrame(dt), z()), o.clearAlignGuides(), A.removeEventListener("pointermove", K), A.removeEventListener("pointerup", V);
      };
      A.addEventListener("pointermove", K), A.addEventListener("pointerup", V);
    },
    [o, t.id, s]
  ), w = rt(
    (S) => {
      if (r) {
        if (S.stopPropagation(), t.groupId) {
          const A = [];
          let O = t.groupId;
          for (; O; )
            A.push(O), O = o.groupParent.get(O);
          if (!o.activeGroupId) {
            o.enterGroup(A[A.length - 1]), o.select(t.id);
            return;
          }
          const j = A.indexOf(o.activeGroupId);
          if (j > 0) {
            o.enterGroup(A[j - 1]), o.select(t.id);
            return;
          }
        }
        s || (f.current = { x: S.clientX, y: S.clientY }, o.select(t.id), i(t.id));
      }
    },
    [r, s, o, t.id, t.groupId, i]
  ), b = t.data.fontSize ?? 16, M = t.h === "auto" ? Qc : t.h;
  return /* @__PURE__ */ d(
    "div",
    {
      ref: a,
      className: r ? void 0 : "sb-block-inert",
      onPointerDown: r ? m : void 0,
      onDoubleClick: w,
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
      children: /* @__PURE__ */ d(
        "div",
        {
          style: {
            padding: 12,
            height: "100%",
            overflow: "auto",
            cursor: s ? "text" : "move",
            userSelect: s ? "text" : "none"
          },
          children: s ? /* @__PURE__ */ d(
            "div",
            {
              ref: c,
              contentEditable: !0,
              suppressContentEditableWarning: !0,
              onBlur: g,
              onInput: () => {
                c.current && (u.current = c.current.innerText, h.current && clearTimeout(h.current), h.current = setTimeout(() => {
                  const S = p.current, A = u.current;
                  A !== S.data.text && y.current.updateNode(S.id, {
                    data: { ...S.data, text: A }
                  });
                }, 300));
              },
              onKeyDown: (S) => {
                S.key === "Escape" && (S.stopPropagation(), g()), S.stopPropagation();
              },
              onPointerDown: (S) => S.stopPropagation(),
              style: {
                fontSize: b,
                fontFamily: We(Ee),
                lineHeight: 1.5,
                color: "#1e1e2e",
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
                outline: "none",
                minHeight: "100%"
              }
            }
          ) : /* @__PURE__ */ d(
            "div",
            {
              style: {
                fontSize: b,
                fontFamily: We(Ee),
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
const Ai = ue(Jc);
function $c(t) {
  const e = t.node;
  return /* @__PURE__ */ d(
    Ai,
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
const _c = {
  type: "sticky",
  component: $c,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.text || null
}, Ri = /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
function td(t) {
  const e = t.match(Ri);
  return e ? e[1] : null;
}
function ed(t) {
  return Ri.test(t);
}
function od(t) {
  return `https://www.youtube.com/embed/${t}`;
}
function rd(t) {
  return `https://img.youtube.com/vi/${t}/hqdefault.jpg`;
}
function nd({
  node: t,
  isSelected: e,
  engine: o,
  interactive: r,
  zoom: n,
  editing: s,
  onResizeHandleDown: i,
  onEditStart: l
}) {
  const a = t.h, { data: c } = t, u = (y) => {
    if (r && s) {
      y.stopPropagation();
      return;
    }
  }, f = c.borderColor ? `${c.borderWidth ?? 1}px ${c.borderStyle ?? "solid"} ${c.borderColor}` : "none", h = Math.max(6, 8 / n), p = [
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
      onPointerDown: u,
      onDoubleClick: !s && r ? (y) => {
        y.stopPropagation(), l == null || l();
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
              /* @__PURE__ */ d(
                "iframe",
                {
                  src: od(c.videoId),
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
              !s && /* @__PURE__ */ d(
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
        e && r && !s && p.map((y) => /* @__PURE__ */ d(
          "div",
          {
            "data-handle": y.key,
            onPointerDown: (g) => {
              g.stopPropagation(), i == null || i(t.id, y.key, g);
            },
            style: {
              position: "absolute",
              left: y.x,
              top: y.y,
              width: h,
              height: h,
              marginLeft: -h / 2,
              marginTop: -h / 2,
              background: "#fff",
              border: "1px solid #3b82f6",
              borderRadius: 2,
              cursor: y.cursor,
              zIndex: 1
            }
          },
          y.key
        ))
      ]
    }
  );
}
const sd = ue(nd);
function id(t) {
  const e = t.node;
  return /* @__PURE__ */ d(
    sd,
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
const ad = {
  type: "youtube",
  component: id,
  handlesOwnLayout: !0,
  getClipboardText: (t) => t.data.url || null
}, ld = [
  Nl,
  Lc,
  Bc,
  Oc,
  jc,
  Zc,
  Kc,
  _c,
  ad
];
function io(t, e) {
  return `${t}:${e}`;
}
class cd {
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
    return this.values.get(io(e, o)) ?? null;
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
        const u = c.data;
        if (u.toId === e && u.targetPort === i.id) {
          const f = this.values.get(
            io(u.fromId, u.sourcePort ?? "")
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
      s.direction === "output" && (r[s.id] = this.values.get(io(e, s.id)) ?? null);
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
            r[s.id] = this.values.get(io(c.fromId, c.sourcePort ?? "")) ?? s.defaultValue ?? null, l = !0;
            break;
          }
        }
        l || (r[s.id] = s.defaultValue ?? null);
      } else
        r[s.id] = this.values.get(io(e, s.id)) ?? null;
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
            this.values.delete(io(n.id, i.id));
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
    for (const y of this.spatial.nodes.values()) {
      const g = this.registry.get(y.type);
      g != null && g.ports && g.compute && e.add(y.id);
    }
    if (e.size === 0) {
      const y = this._cycleNodeIds.size > 0;
      return y && (this._cycleNodeIds = /* @__PURE__ */ new Set()), { sorted: [], cyclesChanged: y };
    }
    const o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const y of e)
      o.set(y, /* @__PURE__ */ new Set()), r.set(y, 0);
    const n = this.spatial.getAllEdges();
    for (const y of n) {
      const g = y.data;
      g.sourcePort && g.targetPort && e.has(g.fromId) && e.has(g.toId) && (o.get(g.fromId).add(g.toId), r.set(g.toId, (r.get(g.toId) ?? 0) + 1));
    }
    const s = new Set(this.dirty), i = /* @__PURE__ */ new Set(), l = (y) => {
      if (i.has(y)) return;
      i.add(y);
      const g = o.get(y);
      if (g)
        for (const m of g)
          s.add(m), l(m);
    };
    for (const y of [...this.dirty])
      l(y);
    const a = /* @__PURE__ */ new Map();
    for (const y of s)
      a.set(y, 0);
    for (const y of n) {
      const g = y.data;
      g.sourcePort && g.targetPort && s.has(g.fromId) && s.has(g.toId) && a.set(
        g.toId,
        (a.get(g.toId) ?? 0) + 1
      );
    }
    const c = [];
    for (const [y, g] of a)
      g === 0 && c.push(y);
    const u = [];
    for (; c.length > 0; ) {
      const y = c.shift();
      u.push(y);
      const g = o.get(y);
      if (g)
        for (const m of g) {
          if (!s.has(m)) continue;
          const w = (a.get(m) ?? 1) - 1;
          a.set(m, w), w === 0 && c.push(m);
        }
    }
    const f = new Set(u), h = /* @__PURE__ */ new Set();
    for (const y of s)
      f.has(y) || h.add(y);
    let p = !1;
    return (h.size !== this._cycleNodeIds.size || [...h].some((y) => !this._cycleNodeIds.has(y))) && (this._cycleNodeIds = h, p = !0), { sorted: u, cyclesChanged: p };
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
      const i = io(e, s.id), l = r[s.id] ?? null, a = this.values.get(i) ?? null;
      dd(a, l) || (this.values.set(i, l), n = !0);
    }
    return n && this.markDownstream(e), n;
  }
  /** Notify all change listeners. */
  notifyListeners() {
    for (const e of this.listeners)
      e();
  }
}
function dd(t, e) {
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
const Uo = [
  // Light
  { key: "plain-white", label: "Plain White", group: "light", canvasBg: "#ffffff", swatchColor: "#ffffff", hasGrid: !1 },
  { key: "dot-grid", label: "Dot Grid", group: "light", canvasBg: "#f8f7f5", swatchColor: "#f8f7f5", hasGrid: !0 },
  { key: "graph-paper", label: "Graph Paper", group: "light", canvasBg: "#ffffff", swatchColor: "#e8f0fe", hasGrid: !0 },
  { key: "college-ruled", label: "College Ruled", group: "light", canvasBg: "#ffffff", swatchColor: "#f0f4ff", hasGrid: !0 },
  { key: "engineering", label: "Engineering Pad", group: "light", canvasBg: "#fdf6e3", swatchColor: "#fdf6e3", hasGrid: !0 },
  { key: "isometric", label: "Isometric", group: "light", canvasBg: "#ffffff", swatchColor: "#f5f5f5", hasGrid: !0 },
  // Dark
  { key: "blueprint", label: "Blueprint", group: "dark", canvasBg: "#1e3a5f", swatchColor: "#1e3a5f", hasGrid: !0 },
  { key: "dark-grid", label: "Dark Grid", group: "dark", canvasBg: "#1a1a2e", swatchColor: "#1a1a2e", hasGrid: !0 },
  // Textured
  { key: "japanese-stationery", label: "Japanese Stationery", group: "textured", canvasBg: "#f5f0e8", swatchColor: "#f5f0e8", hasGrid: !0 },
  { key: "kraft", label: "Kraft Paper", group: "textured", canvasBg: "#d4b896", swatchColor: "#d4b896", hasGrid: !1 }
];
function Ar(t) {
  return Uo.find((e) => e.key === t) ?? Uo[1];
}
function hd(t) {
  return { defs: null, layers: [] };
}
function ud({ scaledGrid: t, patternX: e, patternY: o }) {
  return {
    defs: /* @__PURE__ */ d(
      "pattern",
      {
        id: "grid-pattern",
        x: e,
        y: o,
        width: t,
        height: t,
        patternUnits: "userSpaceOnUse",
        children: /* @__PURE__ */ d("circle", { cx: t / 2, cy: t / 2, r: 1.5, fill: "#e0ddd8" })
      }
    ),
    layers: [/* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-pattern)" }, "dots")]
  };
}
function fd({ scaledGrid: t, patternX: e, patternY: o }) {
  const r = t * 5, n = e % r, s = o % r;
  return {
    defs: /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ v(
        "pattern",
        {
          id: "grid-minor",
          x: e,
          y: o,
          width: t,
          height: t,
          patternUnits: "userSpaceOnUse",
          children: [
            /* @__PURE__ */ d("line", { x1: 0, y1: t, x2: t, y2: t, stroke: "rgba(100,149,237,0.2)", strokeWidth: 0.5 }),
            /* @__PURE__ */ d("line", { x1: t, y1: 0, x2: t, y2: t, stroke: "rgba(100,149,237,0.2)", strokeWidth: 0.5 })
          ]
        }
      ),
      /* @__PURE__ */ v(
        "pattern",
        {
          id: "grid-major",
          x: n,
          y: s,
          width: r,
          height: r,
          patternUnits: "userSpaceOnUse",
          children: [
            /* @__PURE__ */ d("line", { x1: 0, y1: r, x2: r, y2: r, stroke: "rgba(100,149,237,0.45)", strokeWidth: 1 }),
            /* @__PURE__ */ d("line", { x1: r, y1: 0, x2: r, y2: r, stroke: "rgba(100,149,237,0.45)", strokeWidth: 1 })
          ]
        }
      )
    ] }),
    layers: [
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-minor)" }, "minor"),
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-major)" }, "major")
    ]
  };
}
function pd({ scaledGrid: t, patternX: e, patternY: o }) {
  const r = e + t * 4;
  return {
    defs: /* @__PURE__ */ d(
      "pattern",
      {
        id: "grid-pattern",
        x: e,
        y: o,
        width: t,
        height: t,
        patternUnits: "userSpaceOnUse",
        children: /* @__PURE__ */ d("line", { x1: 0, y1: t, x2: t, y2: t, stroke: "rgba(100,149,237,0.3)", strokeWidth: 0.75 })
      }
    ),
    layers: [
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-pattern)" }, "lines"),
      /* @__PURE__ */ d("line", { x1: r, y1: 0, x2: r, y2: "100%", stroke: "rgba(220,80,80,0.35)", strokeWidth: 1.5 }, "margin")
    ]
  };
}
function yd({ scaledGrid: t, patternX: e, patternY: o }) {
  const r = t * 5, n = e % r, s = o % r;
  return {
    defs: /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ v(
        "pattern",
        {
          id: "grid-minor",
          x: e,
          y: o,
          width: t,
          height: t,
          patternUnits: "userSpaceOnUse",
          children: [
            /* @__PURE__ */ d("line", { x1: 0, y1: t, x2: t, y2: t, stroke: "rgba(76,140,70,0.2)", strokeWidth: 0.5 }),
            /* @__PURE__ */ d("line", { x1: t, y1: 0, x2: t, y2: t, stroke: "rgba(76,140,70,0.2)", strokeWidth: 0.5 })
          ]
        }
      ),
      /* @__PURE__ */ v(
        "pattern",
        {
          id: "grid-major",
          x: n,
          y: s,
          width: r,
          height: r,
          patternUnits: "userSpaceOnUse",
          children: [
            /* @__PURE__ */ d("line", { x1: 0, y1: r, x2: r, y2: r, stroke: "rgba(76,140,70,0.45)", strokeWidth: 1 }),
            /* @__PURE__ */ d("line", { x1: r, y1: 0, x2: r, y2: r, stroke: "rgba(76,140,70,0.45)", strokeWidth: 1 })
          ]
        }
      )
    ] }),
    layers: [
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-minor)" }, "minor"),
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-major)" }, "major")
    ]
  };
}
function gd({ scaledGrid: t, patternX: e, patternY: o }) {
  const r = t * Math.sqrt(3), n = t * 2;
  return {
    defs: /* @__PURE__ */ v(
      "pattern",
      {
        id: "grid-pattern",
        x: e % n,
        y: o % r,
        width: n,
        height: r,
        patternUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ d("line", { x1: 0, y1: r, x2: n, y2: r, stroke: "rgba(160,160,180,0.25)", strokeWidth: 0.5 }),
          /* @__PURE__ */ d("line", { x1: 0, y1: r, x2: t, y2: 0, stroke: "rgba(160,160,180,0.25)", strokeWidth: 0.5 }),
          /* @__PURE__ */ d("line", { x1: n, y1: r, x2: t, y2: 0, stroke: "rgba(160,160,180,0.25)", strokeWidth: 0.5 })
        ]
      }
    ),
    layers: [/* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-pattern)" }, "iso")]
  };
}
function md({ scaledGrid: t, patternX: e, patternY: o }) {
  return {
    defs: /* @__PURE__ */ v(
      "pattern",
      {
        id: "grid-pattern",
        x: e,
        y: o,
        width: t,
        height: t,
        patternUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ d("line", { x1: 0, y1: 0, x2: t, y2: 0, stroke: "rgba(255,255,255,0.12)", strokeWidth: 1 }),
          /* @__PURE__ */ d("line", { x1: 0, y1: 0, x2: 0, y2: t, stroke: "rgba(255,255,255,0.12)", strokeWidth: 1 })
        ]
      }
    ),
    layers: [/* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-pattern)" }, "grid")]
  };
}
function bd({ scaledGrid: t, patternX: e, patternY: o }) {
  const r = t * 5, n = e % r, s = o % r;
  return {
    defs: /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ v(
        "pattern",
        {
          id: "grid-minor",
          x: e,
          y: o,
          width: t,
          height: t,
          patternUnits: "userSpaceOnUse",
          children: [
            /* @__PURE__ */ d("line", { x1: 0, y1: t, x2: t, y2: t, stroke: "rgba(255,255,255,0.06)", strokeWidth: 0.5 }),
            /* @__PURE__ */ d("line", { x1: t, y1: 0, x2: t, y2: t, stroke: "rgba(255,255,255,0.06)", strokeWidth: 0.5 })
          ]
        }
      ),
      /* @__PURE__ */ v(
        "pattern",
        {
          id: "grid-major",
          x: n,
          y: s,
          width: r,
          height: r,
          patternUnits: "userSpaceOnUse",
          children: [
            /* @__PURE__ */ d("line", { x1: 0, y1: r, x2: r, y2: r, stroke: "rgba(255,255,255,0.14)", strokeWidth: 1 }),
            /* @__PURE__ */ d("line", { x1: r, y1: 0, x2: r, y2: r, stroke: "rgba(255,255,255,0.14)", strokeWidth: 1 })
          ]
        }
      )
    ] }),
    layers: [
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-minor)" }, "minor"),
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-major)" }, "major")
    ]
  };
}
function xd({ scaledGrid: t, patternX: e, patternY: o }) {
  return {
    defs: /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ v("filter", { id: "paper-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
        /* @__PURE__ */ d("feTurbulence", { type: "fractalNoise", baseFrequency: "0.08", numOctaves: 4, seed: 12, stitchTiles: "stitch", result: "noise" }),
        /* @__PURE__ */ d("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
        /* @__PURE__ */ d("feDiffuseLighting", { in: "bump", lightingColor: "#f7f4ee", surfaceScale: "1.2", diffuseConstant: "1", result: "lit", children: /* @__PURE__ */ d("feDistantLight", { azimuth: "225", elevation: "50" }) }),
        /* @__PURE__ */ d("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
        /* @__PURE__ */ d("feFlood", { floodColor: "#f5f0e8", result: "base" }),
        /* @__PURE__ */ d("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "paper" }),
        /* @__PURE__ */ d("feTurbulence", { type: "fractalNoise", baseFrequency: "0.6", numOctaves: 3, seed: 7, stitchTiles: "stitch", result: "grain" }),
        /* @__PURE__ */ d("feColorMatrix", { in: "grain", type: "saturate", values: "0", result: "grain-gray" }),
        /* @__PURE__ */ v("feComponentTransfer", { in: "grain-gray", result: "grain-subtle", children: [
          /* @__PURE__ */ d("feFuncR", { type: "linear", slope: "0.06", intercept: "0.47" }),
          /* @__PURE__ */ d("feFuncG", { type: "linear", slope: "0.06", intercept: "0.47" }),
          /* @__PURE__ */ d("feFuncB", { type: "linear", slope: "0.06", intercept: "0.47" })
        ] }),
        /* @__PURE__ */ d("feBlend", { in: "paper", in2: "grain-subtle", mode: "overlay", result: "paper-final" })
      ] }),
      /* @__PURE__ */ d(
        "pattern",
        {
          id: "grid-pattern",
          x: e,
          y: o,
          width: t,
          height: t,
          patternUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ d("line", { x1: 0, y1: t, x2: t, y2: t, stroke: "rgba(160,140,110,0.35)", strokeWidth: 1 })
        }
      )
    ] }),
    layers: [
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "#f5f0e8", filter: "url(#paper-texture)" }, "texture"),
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "url(#grid-pattern)" }, "lines"),
      /* @__PURE__ */ d("line", { x1: e + t * 2, y1: 0, x2: e + t * 2, y2: "100%", stroke: "rgba(190,60,60,0.28)", strokeWidth: 1.5 }, "margin")
    ]
  };
}
function wd(t) {
  return {
    defs: /* @__PURE__ */ v("filter", { id: "kraft-texture", x: "-20%", y: "-20%", width: "140%", height: "140%", children: [
      /* @__PURE__ */ d("feTurbulence", { type: "fractalNoise", baseFrequency: "0.04", numOctaves: 5, seed: 42, stitchTiles: "stitch", result: "noise" }),
      /* @__PURE__ */ d("feColorMatrix", { in: "noise", type: "saturate", values: "0", result: "bump" }),
      /* @__PURE__ */ d("feDiffuseLighting", { in: "bump", lightingColor: "#e0c9a6", surfaceScale: "1.4", diffuseConstant: "0.95", result: "lit", children: /* @__PURE__ */ d("feDistantLight", { azimuth: "200", elevation: "50" }) }),
      /* @__PURE__ */ d("feComposite", { in: "lit", in2: "bump", operator: "in", result: "lit-masked" }),
      /* @__PURE__ */ d("feFlood", { floodColor: "#d4b896", result: "base" }),
      /* @__PURE__ */ d("feBlend", { in: "base", in2: "lit-masked", mode: "overlay", result: "kraft" }),
      /* @__PURE__ */ d("feTurbulence", { type: "fractalNoise", baseFrequency: "0.35", numOctaves: 2, seed: 99, stitchTiles: "stitch", result: "fiber" }),
      /* @__PURE__ */ d("feColorMatrix", { in: "fiber", type: "saturate", values: "0", result: "fiber-gray" }),
      /* @__PURE__ */ v("feComponentTransfer", { in: "fiber-gray", result: "fiber-subtle", children: [
        /* @__PURE__ */ d("feFuncR", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ d("feFuncG", { type: "linear", slope: "0.06", intercept: "0.47" }),
        /* @__PURE__ */ d("feFuncB", { type: "linear", slope: "0.06", intercept: "0.47" })
      ] }),
      /* @__PURE__ */ d("feBlend", { in: "kraft", in2: "fiber-subtle", mode: "overlay", result: "kraft-final" })
    ] }),
    layers: [
      /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: "#d4b896", filter: "url(#kraft-texture)" }, "texture")
    ]
  };
}
const Ws = {
  "plain-white": hd,
  "dot-grid": ud,
  "graph-paper": fd,
  "college-ruled": pd,
  engineering: yd,
  isometric: gd,
  blueprint: md,
  "dark-grid": bd,
  "japanese-stationery": xd,
  kraft: wd
};
function kd(t) {
  return Ws[t] ?? Ws["dot-grid"];
}
function vd({
  viewport: t,
  gridSize: e = 20,
  background: o = "dot-grid",
  gridVisible: r = !0
}) {
  const n = e * t.zoom, s = t.x % n, i = t.y % n, l = Ar(o), a = kd(o), { defs: c, layers: u } = a({ scaledGrid: n, patternX: s, patternY: i });
  return /* @__PURE__ */ v(
    "svg",
    {
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none"
      },
      children: [
        /* @__PURE__ */ d("defs", { children: c }),
        /* @__PURE__ */ d("rect", { width: "100%", height: "100%", fill: l.canvasBg }),
        r && u
      ]
    }
  );
}
const Di = "sb-excalib-index", Xn = "sb-excalib-";
function Rr() {
  try {
    const t = localStorage.getItem(Di);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function Ei(t) {
  localStorage.setItem(Di, JSON.stringify(t));
}
function Sd(t) {
  try {
    const e = localStorage.getItem(Xn + t);
    return e ? Yn(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function Yn(t) {
  if (t.libraryItems)
    return t;
  const o = (t.library ?? []).map((r, n) => ({
    id: Rt(10),
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
function Wi() {
  return Rr();
}
function Gn(t) {
  const e = Sd(t);
  return (e == null ? void 0 : e.libraryItems) ?? [];
}
function jn(t, e) {
  const o = Yn(t), r = Rt(10), n = o.libraryItems.map((l) => l.name || "Untitled"), s = {
    id: r,
    name: (e == null ? void 0 : e.name) || "Imported Library",
    source: (e == null ? void 0 : e.source) || "local-import",
    installedAt: Date.now(),
    itemCount: o.libraryItems.length,
    itemNames: n
  };
  localStorage.setItem(Xn + r, JSON.stringify(o));
  const i = Rr();
  return i.push(s), Ei(i), s;
}
function Md(t) {
  localStorage.removeItem(Xn + t);
  const e = Rr().filter((o) => o.id !== t);
  Ei(e);
}
function Cd(t) {
  if (!t.trim()) return [];
  const e = t.toLowerCase(), o = [], r = Rr();
  for (const n of r) {
    if (!n.itemNames.some((l) => l.toLowerCase().includes(e)) && !n.name.toLowerCase().includes(e)) continue;
    const i = Gn(n.id);
    for (const l of i)
      ((l.name || "").toLowerCase().includes(e) || n.name.toLowerCase().includes(e)) && o.push({ library: n, item: l });
  }
  return o;
}
async function Id(t, e) {
  const o = await fetch(t);
  if (!o.ok) throw new Error(`Failed to fetch library: ${o.status}`);
  const r = await o.json();
  if (r.type !== "excalidrawlib")
    throw new Error("Invalid file: not an Excalidraw library");
  const n = Yn(r);
  return jn(n, { name: e, source: t });
}
const mn = {
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
}, Li = si(mn);
function Kt() {
  return ni(Li);
}
function _o(t) {
  const e = Math.round(t) / 100;
  return e < 1 ? e : void 0;
}
function uo(t) {
  if (t)
    return t * (180 / Math.PI);
}
function Fi(t) {
  if (!(!t || t === "transparent"))
    return t;
}
function Ni(t) {
  if (t === "solid") return "solid";
  if (t === "cross-hatch") return "cross-hatch";
  if (t === "hachure") return "hachure";
}
function Bi(t) {
  if (t === "dashed") return "dashed";
  if (t === "dotted") return "dotted";
}
function Hi(t) {
  switch (t) {
    case 2:
      return "sans-serif";
    case 3:
      return "monospace";
    default:
      return "Excalifont";
  }
}
function Oi(t) {
  return t === "right" ? "right" : t === "center" ? "center" : "left";
}
function zd(t) {
  if (t.roundness || t.strokeSharpness === "round") return "round";
}
function tn(t, e) {
  return {
    id: Rt(10),
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
      fill: Fi(t.backgroundColor),
      fillStyle: Ni(t.fillStyle),
      strokeWidth: t.strokeWidth || 2,
      strokeStyle: Bi(t.strokeStyle),
      roughness: Math.min(t.roughness ?? 1, 2),
      opacity: _o(t.opacity ?? 100),
      edgeStyle: e === "rect" || e === "diamond" ? zd(t) : void 0
    }
  };
}
function Ls(t, e) {
  const o = t.points ?? [[0, 0]];
  if (o.length < 2) return [];
  const r = {
    stroke: t.strokeColor || "#1e1e2e",
    fill: void 0,
    fillStyle: void 0,
    strokeWidth: t.strokeWidth || 2,
    strokeStyle: Bi(t.strokeStyle),
    roughness: Math.min(t.roughness ?? 1, 2),
    opacity: _o(t.opacity ?? 100)
  };
  if (o.length === 2) {
    const [l, a] = o, c = Math.min(l[0], a[0]), u = Math.min(l[1], a[1]), f = Math.max(l[0], a[0]), h = Math.max(l[1], a[1]), p = Math.max(f - c, 1), y = Math.max(h - u, 1);
    return [
      {
        id: Rt(10),
        type: "shape",
        x: t.x + c,
        y: t.y + u,
        w: p,
        h: y,
        z: 0,
        rotation: uo(t.angle),
        locked: t.locked || void 0,
        data: {
          ...r,
          shape: e ? "arrow" : "line",
          startPoint: [l[0] - c, l[1] - u],
          endPoint: [a[0] - c, a[1] - u]
        }
      }
    ];
  }
  if (t.backgroundColor && t.backgroundColor !== "transparent") {
    const l = Td(t);
    if (l) return [l];
  }
  const s = Rt(10), i = [];
  for (let l = 0; l < o.length - 1; l++) {
    const a = o[l], c = o[l + 1], u = Math.min(a[0], c[0]), f = Math.min(a[1], c[1]), h = Math.max(a[0], c[0]), p = Math.max(a[1], c[1]), y = Math.max(h - u, 1), g = Math.max(p - f, 1), m = l === o.length - 2;
    i.push({
      id: Rt(10),
      type: "shape",
      x: t.x + u,
      y: t.y + f,
      w: y,
      h: g,
      z: 0,
      rotation: uo(t.angle),
      locked: t.locked || void 0,
      groupId: s,
      data: {
        ...r,
        shape: e && m ? "arrow" : "line",
        startPoint: [a[0] - u, a[1] - f],
        endPoint: [c[0] - u, c[1] - f]
      }
    });
  }
  return i;
}
function Td(t) {
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
    id: Rt(10),
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
      opacity: _o(t.opacity ?? 100),
      fill: Fi(t.backgroundColor),
      fillStyle: Ni(t.fillStyle)
    }
  };
}
function Pd(t) {
  const e = t.points;
  if (!e || e.length === 0) return null;
  const o = t.pressures, r = t.simulatePressure !== !1, n = e.map((u, f) => {
    const h = !r && o && f < o.length ? o[f] : 0.5;
    return [u[0], u[1], h];
  });
  let s = 1 / 0, i = 1 / 0, l = -1 / 0, a = -1 / 0;
  for (const [u, f] of n)
    u < s && (s = u), f < i && (i = f), u > l && (l = u), f > a && (a = f);
  isFinite(s) || (s = 0, i = 0, l = 0, a = 0);
  const c = n.map(
    ([u, f, h]) => [u - s, f - i, h]
  );
  return {
    id: Rt(10),
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
      opacity: _o(t.opacity ?? 100)
    }
  };
}
function Ad(t) {
  return {
    id: Rt(10),
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
      fontFamily: Hi(t.fontFamily),
      color: t.strokeColor || "#1e1e2e",
      align: Oi(t.textAlign),
      opacity: _o(t.opacity ?? 100)
    }
  };
}
function Rd(t) {
  return {
    id: Rt(10),
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
function Xi(t) {
  return Dd(t.elements);
}
function Dd(t) {
  const e = [], o = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  for (const s of t)
    s.isDeleted || s.type === "text" && s.containerId && n.set(s.containerId, s);
  for (const s of t) {
    if (s.isDeleted || s.type === "text" && s.containerId) continue;
    let i = [];
    switch (s.type) {
      case "rectangle":
        i = [tn(s, "rect")];
        break;
      case "ellipse":
        i = [tn(s, "ellipse")];
        break;
      case "diamond":
        i = [tn(s, "diamond")];
        break;
      case "arrow":
        i = Ls(s, !0);
        break;
      case "line":
        i = Ls(s, !1);
        break;
      case "freedraw": {
        const l = Pd(s);
        l && (i = [l]);
        break;
      }
      case "text":
        i = [Ad(s)];
        break;
      case "frame":
      case "magicframe":
        i = [Rd(s)];
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
    const a = e.find((u) => u.id === l);
    if (!a || a.type !== "shape") continue;
    const c = a.data;
    c.label = i.originalText || i.text || "", c.labelFontSize = i.fontSize || 20, c.labelFontFamily = Hi(i.fontFamily), c.labelAlign = Oi(i.textAlign);
  }
  return Ed(t, e, o, r), Wd(e), { nodes: e, groupParent: r };
}
function Ed(t, e, o, r) {
  var s;
  const n = /* @__PURE__ */ new Map();
  for (const i of t) {
    if (i.isDeleted || !((s = i.groupIds) != null && s.length)) continue;
    for (let a = 0; a < i.groupIds.length - 1; a++) {
      const c = i.groupIds[a], u = i.groupIds[a + 1];
      n.has(c) || n.set(c, u);
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
function Wd(t) {
  if (t.length === 0) return;
  let e = 1 / 0, o = 1 / 0;
  for (const r of t)
    r.x < e && (e = r.x), r.y < o && (o = r.y);
  if (isFinite(e))
    for (const r of t)
      r.x -= e, r.y -= o;
}
function Vn(t, e = 60) {
  if (t.length === 0)
    return `<svg width="${e}" height="${e}" xmlns="http://www.w3.org/2000/svg"/>`;
  let o = 1 / 0, r = 1 / 0, n = -1 / 0, s = -1 / 0;
  for (const f of t) {
    const h = f.h === "auto" ? 40 : f.h;
    o = Math.min(o, f.x), r = Math.min(r, f.y), n = Math.max(n, f.x + f.w), s = Math.max(s, f.y + h);
  }
  const i = n - o || 1, l = s - r || 1, a = 4, c = `${o - a} ${r - a} ${i + a * 2} ${l + a * 2}`, u = [];
  for (const f of t)
    switch (f.type) {
      case "shape":
        u.push(Ld(f));
        break;
      case "draw":
        u.push(Fd(f));
        break;
      case "text":
        u.push(Nd(f));
        break;
    }
  return `<svg width="${e}" height="${e}" viewBox="${c}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">${u.join("")}</svg>`;
}
function Yi(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function Ld(t) {
  var h, p, y, g;
  const e = t.data, o = t.h === "auto" ? 100 : t.h, r = {
    stroke: e.stroke,
    fill: e.fill,
    fillStyle: e.fillStyle,
    roughness: Math.min(e.roughness, 1),
    // cap roughness for speed
    strokeWidth: e.strokeWidth,
    strokeLineDash: Je(e.strokeStyle),
    seed: t.id
  }, n = ((h = e.startPoint) == null ? void 0 : h[0]) ?? 0, s = ((p = e.startPoint) == null ? void 0 : p[1]) ?? o / 2, i = ((y = e.endPoint) == null ? void 0 : y[0]) ?? t.w, l = ((g = e.endPoint) == null ? void 0 : g[1]) ?? o / 2;
  let a;
  switch (e.shape) {
    case "rect":
      a = Mr(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "ellipse":
      a = Nn(t.x + t.w / 2, t.y + o / 2, t.w, o, r);
      break;
    case "diamond":
      a = Bn(t.x, t.y, t.w, o, r, e.edgeStyle === "round");
      break;
    case "line":
      a = Po(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    case "arrow":
      a = Hn(t.x + n, t.y + s, t.x + i, t.y + l, r);
      break;
    default:
      return "";
  }
  const c = e.opacity ?? 1, u = c < 1 ? `<g opacity="${c}">` : "<g>", f = a.map(
    (m) => `<path d="${Yi(m.d)}" fill="${m.fill || "none"}" stroke="${m.stroke}" stroke-width="${m.strokeWidth}"${m.strokeDasharray ? ` stroke-dasharray="${m.strokeDasharray}"` : ""} stroke-linecap="round" stroke-linejoin="round"/>`
  );
  return `${u}${f.join("")}</g>`;
}
function Fd(t) {
  const e = t.data;
  if (!e.points.length) return "";
  const o = e.points.map(([s, i]) => `${(t.x + s).toFixed(1)},${(t.y + i).toFixed(1)}`).join(" "), r = e.opacity ?? 1, n = e.tool === "vector" && e.fill ? e.fill : "none";
  return `<polygon points="${o}" fill="${n}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${r < 1 ? ` opacity="${r}"` : ""}/>`;
}
function Nd(t) {
  const e = t.data, o = Math.max(e.fontSize, 8), r = e.opacity ?? 1, n = e.text.split(`
`)[0] || "";
  return `<text x="${t.x}" y="${t.y + o}" fill="${e.color}" font-size="${o}" font-family="sans-serif"${r < 1 ? ` opacity="${r}"` : ""}>${Yi(n)}</text>`;
}
const Gi = "sb-personal-library";
function Un() {
  try {
    const t = localStorage.getItem(Gi);
    return t ? JSON.parse(t) : [];
  } catch {
    return [];
  }
}
function ji(t) {
  localStorage.setItem(Gi, JSON.stringify(t));
}
function Vi() {
  return Un();
}
function Bd(t, e, o) {
  const r = structuredClone(e);
  if (r.length > 0) {
    let a = 1 / 0, c = 1 / 0;
    for (const u of r)
      u.x < a && (a = u.x), u.y < c && (c = u.y);
    if (isFinite(a))
      for (const u of r)
        u.x -= a, u.y -= c;
  }
  const n = new Set(
    r.map((a) => a.groupId).filter(Boolean)
  ), s = [];
  for (const [a, c] of o)
    n.has(a) && s.push([a, c]);
  const i = {
    id: Rt(10),
    name: t.trim() || "Untitled",
    nodes: r,
    groupParent: s,
    createdAt: Date.now()
  }, l = Un();
  return l.unshift(i), ji(l), i;
}
function Hd(t) {
  const e = Un().filter((o) => o.id !== t);
  ji(e);
}
function Ui(t, e, o, r) {
  const { nodes: n, groupParent: s } = Xi(e);
  if (n.length === 0) return;
  const i = structuredClone(n), l = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  for (const b of i) {
    const M = Rt(10);
    l.set(b.id, M), b.id = M;
  }
  for (const b of i)
    b.groupId && (a.has(b.groupId) || a.set(b.groupId, Rt(10)), b.groupId = a.get(b.groupId));
  let c = 1 / 0, u = 1 / 0, f = -1 / 0, h = -1 / 0;
  for (const b of i) {
    const M = b.h === "auto" ? 100 : b.h;
    c = Math.min(c, b.x), u = Math.min(u, b.y), f = Math.max(f, b.x + b.w), h = Math.max(h, b.y + M);
  }
  const p = o ?? window.innerWidth / 2, y = r ?? window.innerHeight / 2, g = t.screenToCanvas(p, y), m = g.x - (c + f) / 2, w = g.y - (u + h) / 2;
  for (const b of i)
    b.x += m, b.y += w, b.z = t.nextZ();
  t.addNodes(i);
  for (const [b, M] of s) {
    const S = a.get(b) ?? b, A = a.get(M) ?? M;
    t.groupParent.set(S, A);
  }
  t.selectMultiple(i.map((b) => b.id));
}
const bn = "application/x-spatialboard-library-item", xn = "application/x-spatialboard-personal-item";
function Zi(t, e, o, r) {
  if (e.nodes.length === 0) return;
  const n = structuredClone(e.nodes), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  for (const m of n) {
    const w = Rt(10);
    s.set(m.id, w), m.id = w;
  }
  for (const m of n)
    m.groupId && (i.has(m.groupId) || i.set(m.groupId, Rt(10)), m.groupId = i.get(m.groupId));
  for (const m of n)
    if (m.type === "edge") {
      const w = m.data;
      w.fromId && s.has(w.fromId) && (w.fromId = s.get(w.fromId)), w.toId && s.has(w.toId) && (w.toId = s.get(w.toId));
    }
  let l = 1 / 0, a = 1 / 0, c = -1 / 0, u = -1 / 0;
  for (const m of n) {
    const w = m.h === "auto" ? 100 : m.h;
    l = Math.min(l, m.x), a = Math.min(a, m.y), c = Math.max(c, m.x + m.w), u = Math.max(u, m.y + w);
  }
  const f = o ?? window.innerWidth / 2, h = r ?? window.innerHeight / 2, p = t.screenToCanvas(f, h), y = p.x - (l + c) / 2, g = p.y - (a + u) / 2;
  for (const m of n)
    m.x += y, m.y += g, m.z = t.nextZ();
  t.addNodes(n);
  for (const [m, w] of e.groupParent) {
    const b = i.get(m) ?? m, M = i.get(w) ?? w;
    t.groupParent.set(b, M);
  }
  t.selectMultiple(n.map((m) => m.id));
}
const Ro = /* @__PURE__ */ new Map();
function Od({ item: t }) {
  const e = qt(() => {
    const o = Ro.get(t.id);
    if (o) return o;
    const { nodes: r } = Xi(t), n = Vn(r, 56);
    return Ro.set(t.id, n), n;
  }, [t.id]);
  return /* @__PURE__ */ d("div", { dangerouslySetInnerHTML: { __html: e } });
}
function qi({
  item: t,
  libId: e,
  onClick: o,
  theme: r
}) {
  const n = rt(
    (s) => {
      s.dataTransfer.setData(
        bn,
        JSON.stringify({ libraryId: e, itemId: t.id })
      ), s.dataTransfer.effectAllowed = "copy";
    },
    [e, t.id]
  );
  return /* @__PURE__ */ d(
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
      children: /* @__PURE__ */ d(Od, { item: t })
    }
  );
}
function Xd({ nodes: t }) {
  const e = qt(() => {
    const o = "personal-" + t.map((s) => s.id).join(","), r = Ro.get(o);
    if (r) return r;
    const n = Vn(t, 56);
    return Ro.set(o, n), n;
  }, [t]);
  return /* @__PURE__ */ d("div", { dangerouslySetInnerHTML: { __html: e } });
}
function Ki({
  item: t,
  onClick: e,
  onRemove: o,
  theme: r
}) {
  const [n, s] = $(!1), i = rt(
    (l) => {
      l.dataTransfer.setData(
        xn,
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
        /* @__PURE__ */ d(
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
            children: /* @__PURE__ */ d(Xd, { nodes: t.nodes })
          }
        ),
        n && /* @__PURE__ */ d(
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
function Yd({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  onBrowseDirectory: n
}) {
  const s = Kt(), i = it(null), l = it(null), [a, c] = $([]), [u, f] = $([]), [h, p] = $(""), [y, g] = $(/* @__PURE__ */ new Set()), m = rt(() => {
    c(Wi()), f(Vi());
  }, []);
  yt(() => {
    e && m();
  }, [e, m]), yt(() => {
    if (!e) return;
    const Y = (_) => {
      i.current && !i.current.contains(_.target) && o();
    };
    return document.addEventListener("pointerdown", Y), () => document.removeEventListener("pointerdown", Y);
  }, [e, o]);
  const w = rt(
    (Y) => {
      var dt;
      const _ = (dt = Y.target.files) == null ? void 0 : dt[0];
      if (!_) return;
      const J = new FileReader();
      J.onload = () => {
        try {
          const B = JSON.parse(J.result);
          if (B.type !== "excalidrawlib") {
            console.warn("Not an Excalidraw library file");
            return;
          }
          const et = _.name.replace(/\.excalidrawlib$/, "");
          jn(B, { name: et }), m();
        } catch (B) {
          console.error("Failed to parse library file:", B);
        }
      }, J.readAsText(_), Y.target.value = "";
    },
    [m]
  ), b = rt(
    (Y) => {
      Md(Y), Ro.clear(), m();
    },
    [m]
  ), M = rt(
    (Y) => {
      Ui(t, Y);
    },
    [t]
  ), S = rt(
    (Y) => {
      Zi(t, Y);
    },
    [t]
  ), A = rt(
    (Y) => {
      Hd(Y), Ro.clear(), m();
    },
    [m]
  ), O = rt((Y) => {
    g((_) => {
      const J = new Set(_);
      return J.has(Y) ? J.delete(Y) : J.add(Y), J;
    });
  }, []), j = qt(() => {
    if (!h.trim()) return null;
    const Y = h.toLowerCase(), _ = Cd(h), J = u.filter(
      (dt) => dt.name.toLowerCase().includes(Y)
    );
    return { excalidraw: _, personal: J };
  }, [h, u]);
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
          borderRadius: 8,
          padding: 0,
          zIndex: 99999,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          width: 280,
          maxHeight: `calc(100vh - ${r.top + 20}px)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (Y) => Y.stopPropagation(),
        children: [
          /* @__PURE__ */ v("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
            /* @__PURE__ */ d(
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
            /* @__PURE__ */ d(
              "input",
              {
                type: "text",
                placeholder: "Search library...",
                value: h,
                onChange: (Y) => p(Y.target.value),
                style: {
                  width: "100%",
                  padding: "5px 8px",
                  border: `1px solid ${s.border}`,
                  borderRadius: 4,
                  background: s.controlBg,
                  color: s.text,
                  fontSize: 11,
                  outline: "none",
                  boxSizing: "border-box"
                }
              }
            )
          ] }),
          /* @__PURE__ */ d(
            "div",
            {
              style: {
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                padding: "4px 12px"
              },
              children: j !== null ? j.excalidraw.length === 0 && j.personal.length === 0 ? /* @__PURE__ */ d(
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
                    j.personal.map((Y) => /* @__PURE__ */ d(
                      Ki,
                      {
                        item: Y,
                        onClick: () => S(Y),
                        onRemove: () => A(Y.id),
                        theme: s
                      },
                      Y.id
                    )),
                    j.excalidraw.map(({ library: Y, item: _ }) => /* @__PURE__ */ d(
                      qi,
                      {
                        item: _,
                        libId: Y.id,
                        onClick: () => M(_),
                        theme: s
                      },
                      _.id
                    ))
                  ]
                }
              ) : /* @__PURE__ */ v(lt, { children: [
                u.length > 0 && /* @__PURE__ */ d(
                  jd,
                  {
                    items: u,
                    onPlace: S,
                    onRemove: A,
                    theme: s
                  }
                ),
                a.length === 0 && u.length === 0 ? /* @__PURE__ */ v(
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
                      /* @__PURE__ */ d("br", {}),
                      "Import an .excalidrawlib file",
                      /* @__PURE__ */ d("br", {}),
                      "or browse the community directory."
                    ]
                  }
                ) : a.map((Y) => {
                  const _ = y.has(Y.id);
                  return /* @__PURE__ */ d(
                    Gd,
                    {
                      lib: Y,
                      expanded: _,
                      onToggle: () => O(Y.id),
                      onPlace: M,
                      onUninstall: () => b(Y.id),
                      theme: s
                    },
                    Y.id
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
                /* @__PURE__ */ d(
                  "button",
                  {
                    onClick: () => {
                      var Y;
                      return (Y = l.current) == null ? void 0 : Y.click();
                    },
                    style: {
                      flex: 1,
                      padding: "5px 8px",
                      border: `1px solid ${s.border}`,
                      borderRadius: 4,
                      background: s.controlBg,
                      color: s.text,
                      cursor: "pointer",
                      fontSize: 10,
                      fontWeight: 500
                    },
                    children: "Import file"
                  }
                ),
                /* @__PURE__ */ d(
                  "button",
                  {
                    onClick: n,
                    style: {
                      flex: 1,
                      padding: "5px 8px",
                      border: "none",
                      borderRadius: 4,
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
          /* @__PURE__ */ d(
            "input",
            {
              ref: l,
              type: "file",
              accept: ".excalidrawlib,.json",
              style: { display: "none" },
              onChange: w
            }
          )
        ]
      }
    ),
    document.body
  );
}
function Gd({
  lib: t,
  expanded: e,
  onToggle: o,
  onPlace: r,
  onUninstall: n,
  theme: s
}) {
  const [i, l] = $(null);
  return yt(() => {
    e && i === null && l(Gn(t.id));
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
          /* @__PURE__ */ d(
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
              children: /* @__PURE__ */ d(
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
          /* @__PURE__ */ d(
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
          /* @__PURE__ */ d(
            "span",
            {
              style: {
                fontSize: 9,
                color: s.textDisabled
              },
              children: t.itemCount
            }
          ),
          /* @__PURE__ */ d(
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
    e && i && /* @__PURE__ */ d(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: i.map((a) => /* @__PURE__ */ d(
          qi,
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
function jd({
  items: t,
  onPlace: e,
  onRemove: o,
  theme: r
}) {
  const [n, s] = $(!0);
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
          /* @__PURE__ */ d(
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
              children: /* @__PURE__ */ d(
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
          /* @__PURE__ */ d(
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
          /* @__PURE__ */ d(
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
    n && /* @__PURE__ */ d(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 4,
          padding: "2px 0 6px"
        },
        children: t.map((i) => /* @__PURE__ */ d(
          Ki,
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
async function Vd(t, e, o = 1, r = 20, n) {
  const s = `${t}/search?q=${encodeURIComponent(e)}&page=${o}&per_page=${r}`;
  return (await fetch(s, { signal: n })).json();
}
async function Fs(t, e = 1, o = 20, r) {
  const n = `${t}/trending?page=${e}&per_page=${o}`;
  return (await fetch(n, { signal: r })).json();
}
const wn = "application/x-spatialboard-gif-item";
function Qi(t, e, o, r) {
  const n = e.file.hd.gif, s = 400, i = 300;
  let l = n.width, a = n.height;
  const c = Math.min(1, s / l, i / a);
  l = Math.round(l * c), a = Math.round(a * c);
  const u = o ?? window.innerWidth / 2, f = r ?? window.innerHeight / 2, h = t.screenToCanvas(u, f), p = {
    id: Rt(10),
    type: "image",
    x: h.x - l / 2,
    y: h.y - a / 2,
    w: l,
    h: a,
    z: t.nextZ(),
    data: { src: n.url }
  };
  t.addNode(p), t.select(p.id);
}
function Ud({
  engine: t,
  open: e,
  onClose: o,
  triggerRect: r,
  baseUrl: n
}) {
  const s = Kt(), i = it(null), l = it(null), [a, c] = $(""), [u, f] = $([]), [h, p] = $(!1), [y, g] = $(1), [m, w] = $(!1), b = it();
  yt(() => {
    if (!e) return;
    const j = (Y) => {
      i.current && !i.current.contains(Y.target) && o();
    };
    return document.addEventListener("pointerdown", j), () => document.removeEventListener("pointerdown", j);
  }, [e, o]), yt(() => {
    if (!e || a.trim()) return;
    const j = new AbortController();
    return p(!0), Fs(n, 1, 30, j.signal).then((Y) => {
      f(Y.data.data.filter((_) => _.type !== "ad")), g(1), w(Y.data.has_next);
    }).catch(() => {
    }).finally(() => p(!1)), () => j.abort();
  }, [e, n, a]);
  const M = rt(
    (j, Y, _) => {
      if (!j.trim()) return;
      const J = new AbortController();
      return p(!0), Vd(n, j, Y, 30, J.signal).then((dt) => {
        const B = dt.data.data.filter((et) => et.type !== "ad");
        f((et) => _ ? [...et, ...B] : B), g(Y), w(dt.data.has_next);
      }).catch(() => {
      }).finally(() => p(!1)), J;
    },
    [n]
  ), S = rt(
    (j) => {
      if (c(j), b.current && clearTimeout(b.current), !j.trim()) {
        f([]), g(1), w(!1);
        return;
      }
      b.current = setTimeout(() => {
        M(j, 1, !1);
      }, 350);
    },
    [M]
  ), A = rt(() => {
    const j = l.current;
    !j || h || !m || j.scrollTop + j.clientHeight >= j.scrollHeight - 100 && (a.trim() ? M(a, y + 1, !0) : (p(!0), Fs(n, y + 1, 30).then((Y) => {
      const _ = Y.data.data.filter((J) => J.type !== "ad");
      f((J) => [...J, ..._]), g(y + 1), w(Y.data.has_next);
    }).catch(() => {
    }).finally(() => p(!1))));
  }, [h, m, a, y, M, n]), O = rt(
    (j) => {
      Qi(t, j);
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
          borderRadius: 8,
          padding: 0,
          zIndex: 99999,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          width: 300,
          maxHeight: `calc(100vh - ${r.top + 20}px)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        },
        onPointerDown: (j) => j.stopPropagation(),
        children: [
          /* @__PURE__ */ v("div", { style: { padding: "10px 12px 6px", flexShrink: 0 }, children: [
            /* @__PURE__ */ d(
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
            /* @__PURE__ */ d(
              "input",
              {
                type: "text",
                placeholder: "Search KLIPY",
                value: a,
                onChange: (j) => S(j.target.value),
                style: {
                  width: "100%",
                  padding: "5px 8px",
                  border: `1px solid ${s.border}`,
                  borderRadius: 4,
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
                u.length === 0 && !h ? /* @__PURE__ */ d(
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
                ) : /* @__PURE__ */ d(
                  "div",
                  {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 4
                    },
                    children: u.map((j) => /* @__PURE__ */ d(
                      Zd,
                      {
                        item: j,
                        onClick: () => O(j),
                        engine: t,
                        theme: s
                      },
                      j.id
                    ))
                  }
                ),
                h && /* @__PURE__ */ d(
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
          /* @__PURE__ */ d(
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
function Zd({
  item: t,
  onClick: e,
  engine: o,
  theme: r
}) {
  const n = t.file.sm.webp, s = n.width / n.height, i = rt(
    (l) => {
      l.dataTransfer.setData(wn, JSON.stringify(t)), l.dataTransfer.effectAllowed = "copy";
    },
    [t]
  );
  return /* @__PURE__ */ d(
    "button",
    {
      title: t.title,
      onClick: e,
      draggable: !0,
      onDragStart: i,
      style: {
        border: `1px solid ${r.border}`,
        borderRadius: 4,
        background: r.controlBg,
        cursor: "grab",
        padding: 0,
        overflow: "hidden",
        aspectRatio: s > 1.5 ? "16/9" : s < 0.7 ? "3/4" : "1"
      },
      children: /* @__PURE__ */ d(
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
function qd({
  nodes: t,
  onSave: e,
  onCancel: o
}) {
  const [r, n] = $(""), s = it(null), i = it(null);
  yt(() => {
    var f;
    (f = s.current) == null || f.focus();
  }, []);
  const l = qt(() => Vn(t, 56), [t]), a = rt(() => {
    e(r.trim() || "Untitled");
  }, [r, e]), c = rt(
    (f) => {
      f.key === "Enter" ? (f.preventDefault(), a()) : f.key === "Escape" && (f.preventDefault(), o());
    },
    [a, o]
  ), u = rt(
    (f) => {
      i.current && !i.current.contains(f.target) && o();
    },
    [o]
  );
  return fo(
    /* @__PURE__ */ d(
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
              /* @__PURE__ */ d(
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
              /* @__PURE__ */ d(
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
                  children: /* @__PURE__ */ d("div", { dangerouslySetInnerHTML: { __html: l } })
                }
              ),
              /* @__PURE__ */ d(
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
                /* @__PURE__ */ d(
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
                /* @__PURE__ */ d(
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
function kn(t) {
  const e = t.trim();
  if (!e.includes("<svg")) return null;
  const o = e.match(/<svg[\s\S]*?<\/svg>/i);
  return o ? o[0] : null;
}
function Kd(t) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
function Ji(t, e, o, r) {
  return new Promise((n) => {
    const s = Kd(t), i = new Image();
    i.onload = () => {
      let c = i.naturalWidth || 200, u = i.naturalHeight || 200;
      if (c <= 1 || u <= 1) {
        const f = t.match(/viewBox=["']([^"']+)["']/i);
        if (f) {
          const h = f[1].trim().split(/[\s,]+/).map(Number);
          h.length === 4 && h[2] > 0 && h[3] > 0 && (c = h[2], u = h[3]);
        }
      }
      if (c > 400 || u > 400) {
        const f = Math.min(400 / c, 400 / u);
        c = Math.round(c * f), u = Math.round(u * f);
      }
      n({
        id: Rt(10),
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
async function Qd(t, e, o, r) {
  const { x: n, y: s } = t.screenToCanvas(o, r), i = await Ji(e, n, s, t.nextZ());
  i && (t.addNode(i), t.select(i.id));
}
const Ns = {
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
}, Jd = ue(function({
  node: e,
  zoom: o,
  showHandles: r = !0,
  measuredHeights: n,
  onHandlePointerDown: s,
  onRotateStart: i
}) {
  const l = e.h === "auto" ? (n == null ? void 0 : n[e.id]) ?? 100 : e.h, a = e.rotation || 0, c = e.x + e.w / 2, u = e.y + l / 2, f = 8 / o, h = f / 2, p = 25 / o, y = !!e.locked, g = [
    { pos: "nw", cx: e.x, cy: e.y },
    { pos: "n", cx: e.x + e.w / 2, cy: e.y },
    { pos: "ne", cx: e.x + e.w, cy: e.y },
    { pos: "e", cx: e.x + e.w, cy: e.y + l / 2 },
    { pos: "se", cx: e.x + e.w, cy: e.y + l },
    { pos: "s", cx: e.x + e.w / 2, cy: e.y + l },
    { pos: "sw", cx: e.x, cy: e.y + l },
    { pos: "w", cx: e.x, cy: e.y + l / 2 }
  ];
  return /* @__PURE__ */ v("g", { transform: `rotate(${a}, ${c}, ${u})`, children: [
    /* @__PURE__ */ d(
      "rect",
      {
        x: e.x,
        y: e.y,
        width: e.w,
        height: l,
        fill: "none",
        stroke: y ? "#f59e0b" : "#3b82f6",
        strokeWidth: 1.5 / o,
        strokeDasharray: `${4 / o} ${3 / o}`
      }
    ),
    y && (() => {
      const m = 16 / o, w = e.x + e.w - m - 4 / o, b = e.y - m - 4 / o;
      return /* @__PURE__ */ v("g", { transform: `translate(${w}, ${b})`, children: [
        /* @__PURE__ */ d(
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
        /* @__PURE__ */ v("g", { transform: `scale(${m / 24})`, children: [
          /* @__PURE__ */ d("rect", { x: "6", y: "11", width: "12", height: "9", rx: "1", fill: "white" }),
          /* @__PURE__ */ d("path", { d: "M8 11V7a4 4 0 0 1 8 0v4", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round" })
        ] })
      ] });
    })(),
    r && !y && g.map(({ pos: m, cx: w, cy: b }) => /* @__PURE__ */ d(
      "rect",
      {
        x: w - h,
        y: b - h,
        width: f,
        height: f,
        fill: "white",
        stroke: "#3b82f6",
        strokeWidth: 1.5 / o,
        style: {
          cursor: Tr(m, a),
          pointerEvents: "auto"
        },
        onPointerDown: (M) => {
          M.stopPropagation(), s == null || s(e.id, m, M);
        }
      },
      m
    )),
    r && !y && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d(
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
      /* @__PURE__ */ d(
        "rect",
        {
          x: e.x + e.w / 2 - h,
          y: e.y - p - h,
          width: f,
          height: f,
          rx: 1.5 / o,
          transform: `rotate(45, ${e.x + e.w / 2}, ${e.y - p})`,
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
}), $d = ue(function({
  edge: e,
  fromNode: o,
  toNode: r,
  viewport: n,
  selection: s,
  measuredHeights: i,
  registry: l,
  onEdgeEndpointDown: a,
  onKinkHandleDown: c,
  edgeReconnect: u,
  eraserMarkedIds: f,
  cycleNodeIds: h
}) {
  const p = e.data.edgeType || "bezier";
  let y, g;
  if (l && e.data.sourcePort) {
    const ct = l.get(o.type);
    ct != null && ct.ports && (y = Ko(o, ct.ports, e.data.sourcePort, n.zoom, i) ?? void 0);
  }
  if (l && e.data.targetPort) {
    const ct = l.get(r.type);
    ct != null && ct.ports && (g = Ko(r, ct.ports, e.data.targetPort, n.zoom, i) ?? void 0);
  }
  const m = Ue(
    o,
    r,
    p,
    i,
    e.data.sourceHandle,
    e.data.targetHandle,
    e.data.midpointOffset,
    e.data.curveOffset,
    y,
    g
  ), { path: w, x1: b, y1: M, x2: S, y2: A, labelX: O, labelY: j, arrowAngle: Y, tailAngle: _, kinkHandle: J } = m, dt = s.has(e.id), B = e.data.strokeWidth, et = e.data.style === "dashed" ? `${8 * B},${4 * B}` : e.data.style === "dotted" ? `${2 * B},${3 * B}` : void 0, X = Math.max(8, B * 3), z = e.data.arrowHeadSize ?? X, K = e.data.arrowTailSize ?? X, V = e.data.animated, tt = f == null ? void 0 : f.has(e.id), U = (u == null ? void 0 : u.edgeId) === e.id, G = !!(h && h.size > 0 && e.data.sourcePort && e.data.targetPort && h.has(e.data.fromId) && h.has(e.data.toId)), N = G ? "#ef4444" : e.data.color, L = e.data.roughness ?? 0, nt = qt(() => L <= 0 ? null : {
    stroke: N,
    roughness: L,
    strokeWidth: B,
    strokeLineDash: e.data.style === "dashed" ? [8, 4] : e.data.style === "dotted" ? [2, 2] : void 0,
    seed: e.id
  }, [N, L, B, e.data.style, e.id]);
  let st = null, pt = null, ut = null;
  nt && (st = _r(w, nt), e.data.arrowHead === "arrow" && (pt = _r(zo(S, A, Y, z), { ...nt, strokeLineDash: void 0 })), e.data.arrowTail === "arrow" && (ut = _r(zo(b, M, _, K), { ...nt, strokeLineDash: void 0 })));
  const kt = qt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite" }),
    []
  ), Dt = qt(() => {
    if (!V) return;
    const ct = e.data.animatedDirection === "reverse" ? "edge-flow-reverse" : e.data.animatedDirection === "both" ? "edge-flow-both" : "edge-flow", St = e.data.animatedDirection === "both" ? "2s" : "1s";
    return { animation: `${ct} ${St} linear infinite` };
  }, [V, e.data.animatedDirection]), mt = qt(
    () => ({ animation: "edge-cycle-pulse 1.5s ease-in-out infinite, edge-flow 1s linear infinite" }),
    []
  ), wt = qt(
    () => tt ? { filter: "saturate(0)" } : void 0,
    [tt]
  );
  return /* @__PURE__ */ v("g", { opacity: U ? 0.15 : tt ? 0.25 : void 0, style: wt, children: [
    G && /* @__PURE__ */ d(
      "path",
      {
        d: w,
        stroke: "#ef4444",
        strokeWidth: B + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.25,
        style: kt
      }
    ),
    dt && /* @__PURE__ */ d(
      "path",
      {
        d: w,
        stroke: "#3b82f6",
        strokeWidth: B + 6 / n.zoom,
        strokeLinecap: "round",
        fill: "none",
        opacity: 0.3
      }
    ),
    st ? st.map((ct, St) => /* @__PURE__ */ d(
      "path",
      {
        d: ct.d,
        stroke: ct.stroke,
        strokeWidth: ct.strokeWidth,
        strokeDasharray: ct.strokeDasharray,
        strokeLinecap: "round",
        fill: ct.fill ?? "none",
        style: V ? Dt : void 0
      },
      St
    )) : /* @__PURE__ */ d(
      "path",
      {
        d: w,
        stroke: N,
        strokeWidth: B,
        strokeDasharray: V ? "12,8" : G ? `${6 * B},${4 * B}` : et,
        strokeLinecap: "round",
        fill: "none",
        style: G ? mt : Dt
      }
    ),
    e.data.arrowHead === "arrow" && (pt ? pt.map((ct, St) => /* @__PURE__ */ d(
      "path",
      {
        d: ct.d,
        stroke: ct.stroke,
        strokeWidth: ct.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ct.fill ?? "none"
      },
      `ah${St}`
    )) : /* @__PURE__ */ d(
      "path",
      {
        d: zo(S, A, Y, z),
        fill: "none",
        stroke: N,
        strokeWidth: B,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowHead === "filled" && /* @__PURE__ */ d(
      "path",
      {
        d: xr(S, A, Y, z),
        fill: N,
        stroke: "none"
      }
    ),
    e.data.arrowHead === "dot" && /* @__PURE__ */ d(
      "circle",
      {
        cx: S,
        cy: A,
        r: z * 0.25,
        fill: N
      }
    ),
    e.data.arrowTail === "arrow" && (ut ? ut.map((ct, St) => /* @__PURE__ */ d(
      "path",
      {
        d: ct.d,
        stroke: ct.stroke,
        strokeWidth: ct.strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: ct.fill ?? "none"
      },
      `at${St}`
    )) : /* @__PURE__ */ d(
      "path",
      {
        d: zo(b, M, _, K),
        fill: "none",
        stroke: N,
        strokeWidth: B,
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )),
    e.data.arrowTail === "filled" && /* @__PURE__ */ d(
      "path",
      {
        d: xr(b, M, _, K),
        fill: N,
        stroke: "none"
      }
    ),
    e.data.arrowTail === "dot" && /* @__PURE__ */ d(
      "circle",
      {
        cx: b,
        cy: M,
        r: K * 0.25,
        fill: N
      }
    ),
    e.data.label && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d(
        "rect",
        {
          x: O - (e.data.label.length * 3.5 + 6) / n.zoom,
          y: j - 8 / n.zoom,
          width: (e.data.label.length * 7 + 12) / n.zoom,
          height: 16 / n.zoom,
          fill: "white",
          rx: 4 / n.zoom,
          opacity: 0.9
        }
      ),
      /* @__PURE__ */ d(
        "text",
        {
          x: O,
          y: j + 4 / n.zoom,
          fill: N,
          fontSize: 12 / n.zoom,
          textAnchor: "middle",
          style: { pointerEvents: "none" },
          children: e.data.label
        }
      )
    ] }),
    dt && !U && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d(
        "circle",
        {
          cx: b,
          cy: M,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ct) => {
            ct.stopPropagation(), a == null || a(e.id, "source", ct);
          }
        }
      ),
      /* @__PURE__ */ d(
        "circle",
        {
          cx: S,
          cy: A,
          r: 5 / n.zoom,
          fill: "#3b82f6",
          stroke: "white",
          strokeWidth: 1.5 / n.zoom,
          style: { cursor: "grab", pointerEvents: "auto" },
          onPointerDown: (ct) => {
            ct.stopPropagation(), a == null || a(e.id, "target", ct);
          }
        }
      )
    ] }),
    dt && !U && J && /* @__PURE__ */ d(
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
        onPointerDown: (ct) => {
          ct.stopPropagation(), c == null || c(e.id, J.axis, J.min, J.max, ct);
        }
      }
    )
  ] });
});
function _d({
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
  onEdgeEndpointDown: u,
  onKinkHandleDown: f,
  edgePreview: h,
  edgeReconnect: p,
  eraserMarkedIds: y,
  eraserTrail: g,
  laserTrail: m,
  mode: w,
  hoveredNodeId: b,
  registry: M,
  onPortHandleDown: S,
  cycleNodeIds: A,
  containerTypes: O,
  alignGuides: j
}) {
  const Y = `translate(${e.x}, ${e.y}) scale(${e.zoom})`, _ = t.filter(
    (B) => B.type !== "edge" && B.type !== "content" && B.type !== "image"
  ), J = t.filter((B) => B.type === "edge").sort((B, et) => B.z - et.z), dt = qt(() => new Map(t.map((B) => [B.id, B])), [t]);
  return /* @__PURE__ */ d(
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
      children: /* @__PURE__ */ v("g", { transform: Y, children: [
        J.map((B) => {
          const et = dt.get(B.data.fromId), X = dt.get(B.data.toId);
          return !et || !X ? null : /* @__PURE__ */ d(
            $d,
            {
              edge: B,
              fromNode: et,
              toNode: X,
              viewport: e,
              selection: o,
              measuredHeights: r,
              registry: M,
              onEdgeEndpointDown: u,
              onKinkHandleDown: f,
              edgeReconnect: p,
              eraserMarkedIds: y,
              cycleNodeIds: A
            },
            B.id
          );
        }),
        (() => {
          var U, G;
          const B = !!h || !!p, et = (h == null ? void 0 : h.cursorX) ?? (p == null ? void 0 : p.cursorX) ?? 0, X = (h == null ? void 0 : h.cursorY) ?? (p == null ? void 0 : p.cursorY) ?? 0, z = (h == null ? void 0 : h.fromNode.id) ?? (p == null ? void 0 : p.anchorNodeId) ?? null;
          let K = null, V = null;
          const tt = /* @__PURE__ */ new Set();
          if (B) {
            let N = 1 / 0, L = !1;
            const nt = 50 / e.zoom;
            for (const st of t) {
              if (st.type === "edge" || st.id === z || (G = (U = M == null ? void 0 : M.get(st.type)) == null ? void 0 : U.ports) != null && G.length) continue;
              const pt = st.h === "auto" ? (r == null ? void 0 : r[st.id]) ?? 100 : st.h, ut = st.w * 0.2, kt = pt * 0.2;
              et >= st.x - ut && et <= st.x + st.w + ut && X >= st.y - kt && X <= st.y + pt + kt && tt.add(st.id);
              const Dt = To(st, r), mt = O ? O.has(st.type) : st.type === "frame";
              for (const wt of Dt) {
                const ct = Math.hypot(wt.x - et, wt.y - X);
                ct >= nt || mt && !L && K || (!mt && L || ct < N) && (N = ct, L = mt, K = st.id, V = wt.side);
              }
            }
          }
          return t.filter((N) => {
            var L, nt;
            return N.type === "edge" || (nt = (L = M == null ? void 0 : M.get(N.type)) == null ? void 0 : L.ports) != null && nt.length ? !1 : o.size <= 1 && o.has(N.id) || B && (N.id === z || tt.has(N.id));
          }).map((N) => {
            const L = To(N, r), nt = 4 / e.zoom, st = 26 / e.zoom, pt = N.rotation || 0, ut = N.h === "auto" ? (r == null ? void 0 : r[N.id]) ?? 100 : N.h, kt = N.x + N.w / 2, Dt = N.y + ut / 2, mt = h && h.fromNode.id === N.id || p && p.anchorNodeId === N.id, wt = o.has(N.id) && !B;
            return /* @__PURE__ */ d("g", { transform: pt ? `rotate(${pt}, ${kt}, ${Dt})` : void 0, children: L.map(({ side: ct }) => {
              const St = {
                top: [N.x + N.w / 2, N.y],
                bottom: [N.x + N.w / 2, N.y + ut],
                left: [N.x, N.y + ut / 2],
                right: [N.x + N.w, N.y + ut / 2]
              }, [vt, Et] = St[ct], Qt = ct === "top" && o.has(N.id) ? 42 / e.zoom : st;
              let Wt = vt, te = Et;
              switch (ct) {
                case "top":
                  te = Et - Qt;
                  break;
                case "bottom":
                  te = Et + Qt;
                  break;
                case "left":
                  Wt = vt - Qt;
                  break;
                case "right":
                  Wt = vt + Qt;
                  break;
              }
              const ee = B && K === N.id && V === ct;
              return /* @__PURE__ */ d(
                "circle",
                {
                  cx: Wt,
                  cy: te,
                  r: ee ? 5 / e.zoom : nt,
                  fill: mt || ee ? "#3b82f6" : "white",
                  stroke: ee ? "white" : B && !mt ? "#3b82f6" : "#94a3b8",
                  strokeWidth: 1.5 / e.zoom,
                  opacity: ee || B && !mt ? 1 : 0.8,
                  style: {
                    cursor: wt ? "crosshair" : "default",
                    pointerEvents: wt ? "auto" : "none"
                  },
                  onPointerDown: wt ? (me) => {
                    me.stopPropagation(), c == null || c(N.id, ct, me);
                  } : void 0
                },
                `ch-${N.id}-${ct}`
              );
            }) }, `conn-${N.id}`);
          });
        })(),
        M && (() => {
          var U;
          const B = !!h || !!p, et = (h == null ? void 0 : h.cursorX) ?? (p == null ? void 0 : p.cursorX) ?? 0, X = (h == null ? void 0 : h.cursorY) ?? (p == null ? void 0 : p.cursorY) ?? 0, z = (h == null ? void 0 : h.fromNode.id) ?? null, K = (h == null ? void 0 : h.sourceDirection) === "output" ? "input" : (h == null ? void 0 : h.sourceDirection) === "input" ? "output" : null;
          let V = null, tt = null;
          if (B && K) {
            let G = 40 / e.zoom;
            for (const N of t) {
              if (N.type === "edge" || N.id === z) continue;
              const L = M.get(N.type);
              if (!((U = L == null ? void 0 : L.ports) != null && U.length)) continue;
              const nt = N.h === "auto" ? (r == null ? void 0 : r[N.id]) ?? 100 : N.h, st = 14 / e.zoom, pt = L.ports.filter((ut) => ut.direction === K);
              for (let ut = 0; ut < pt.length; ut++) {
                const kt = pt[ut], Dt = N.y + nt / (pt.length + 1) * (ut + 1), mt = kt.direction === "input" ? N.x - st : N.x + N.w + st, wt = Math.hypot(mt - et, Dt - X);
                wt < G && (G = wt, V = N.id, tt = kt.id);
              }
            }
          }
          return t.filter((G) => {
            var L;
            if (G.type === "edge") return !1;
            const N = M.get(G.type);
            return !!((L = N == null ? void 0 : N.ports) != null && L.length);
          }).map((G) => {
            const L = M.get(G.type).ports, nt = G.h === "auto" ? (r == null ? void 0 : r[G.id]) ?? 100 : G.h, st = G.rotation || 0, pt = G.x + G.w / 2, ut = G.y + nt / 2, kt = 6 / e.zoom, Dt = 14 / e.zoom, mt = L.filter((Et) => Et.direction === "input"), wt = L.filter((Et) => Et.direction === "output"), ct = !B, St = (Et, Qt, Wt, te) => {
              const ee = G.y + nt / (Wt.length + 1) * (Qt + 1), me = te === "input" ? G.x - Dt : G.x + G.w + Dt, fe = Ns[Et.dataType] || Ns.any, de = V === G.id && tt === Et.id, _e = de ? 8 / e.zoom : kt, to = te === "input" ? G.x : G.x + G.w, we = te === "input" ? me - kt - 4 / e.zoom : me + kt + 4 / e.zoom;
              return /* @__PURE__ */ v("g", { children: [
                /* @__PURE__ */ d(
                  "line",
                  {
                    x1: me,
                    y1: ee,
                    x2: to,
                    y2: ee,
                    stroke: fe,
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.4,
                    style: { pointerEvents: "none" }
                  }
                ),
                de && /* @__PURE__ */ d(
                  "circle",
                  {
                    cx: me,
                    cy: ee,
                    r: 12 / e.zoom,
                    fill: "none",
                    stroke: "white",
                    strokeWidth: 1.5 / e.zoom,
                    opacity: 0.3,
                    style: { pointerEvents: "none" }
                  }
                ),
                /* @__PURE__ */ d(
                  "circle",
                  {
                    cx: me,
                    cy: ee,
                    r: _e,
                    fill: de ? "white" : fe,
                    stroke: de ? fe : "#1a1a2e",
                    strokeWidth: 2 / e.zoom,
                    style: {
                      cursor: ct ? "crosshair" : "default",
                      pointerEvents: ct ? "auto" : "none",
                      transition: "r 0.1s, fill 0.1s"
                    },
                    onPointerDown: ct ? (ke) => {
                      ke.stopPropagation(), S == null || S(G.id, Et.id, te, ke);
                    } : void 0
                  }
                ),
                (() => {
                  const ke = Et.label || Et.id, be = 9 / e.zoom, Fe = 5 / e.zoom, Ne = 2.5 / e.zoom, ie = ke.length * be * 0.62 + Fe * 2, ce = be + Ne * 2, eo = te === "input" ? we - ie : we, oo = ee - ce / 2, k = ce / 2, ot = de ? fe : "#1a1a2e", Ut = de ? fe : "#2a2a40", oe = de ? "#fff" : "#94a3b8";
                  return /* @__PURE__ */ v("g", { style: { pointerEvents: "none" }, children: [
                    /* @__PURE__ */ d(
                      "rect",
                      {
                        x: eo,
                        y: oo,
                        width: ie,
                        height: ce,
                        rx: k,
                        ry: k,
                        fill: ot,
                        fillOpacity: de ? 0.9 : 0.85,
                        stroke: Ut,
                        strokeWidth: 1 / e.zoom
                      }
                    ),
                    /* @__PURE__ */ d(
                      "text",
                      {
                        x: eo + ie / 2,
                        y: ee + be * 0.35,
                        fill: oe,
                        fontSize: be,
                        fontWeight: 600,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        textAnchor: "middle",
                        style: { userSelect: "none" },
                        children: ke
                      }
                    )
                  ] });
                })()
              ] }, `port-${G.id}-${Et.id}`);
            }, vt = A == null ? void 0 : A.has(G.id);
            return /* @__PURE__ */ v("g", { transform: st ? `rotate(${st}, ${pt}, ${ut})` : void 0, children: [
              mt.map((Et, Qt) => St(Et, Qt, mt, "input")),
              wt.map((Et, Qt) => St(Et, Qt, wt, "output")),
              vt && (() => {
                const Et = 10 / e.zoom, Qt = G.x + G.w + Et * 0.3, Wt = G.y - Et * 0.3;
                return /* @__PURE__ */ v("g", { style: { pointerEvents: "none" }, children: [
                  /* @__PURE__ */ d(
                    "circle",
                    {
                      cx: Qt,
                      cy: Wt,
                      r: Et,
                      fill: "#ef4444",
                      stroke: "#1a1a2e",
                      strokeWidth: 2 / e.zoom
                    }
                  ),
                  /* @__PURE__ */ d(
                    "text",
                    {
                      x: Qt,
                      y: Wt + 4 / e.zoom,
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
            ] }, `ports-${G.id}`);
          });
        })(),
        h && (() => {
          let B, et;
          if (h.sourcePort && M) {
            const X = h.fromNode, z = M.get(X.type), K = z != null && z.ports ? Ko(X, z.ports, h.sourcePort, e.zoom, r) : null;
            if (K)
              B = K.x, et = K.y;
            else {
              const V = jr(X, h.cursorX, h.cursorY, r);
              B = V.x, et = V.y;
            }
          } else if (h.sourceHandle) {
            const X = h.fromNode, z = X.h === "auto" ? (r == null ? void 0 : r[X.id]) ?? 100 : X.h, K = {
              top: [X.x + X.w / 2, X.y],
              bottom: [X.x + X.w / 2, X.y + z],
              left: [X.x, X.y + z / 2],
              right: [X.x + X.w, X.y + z / 2]
            }, V = h.sourceHandle, tt = V === "top" ? 42 / e.zoom : 26 / e.zoom, [U, G] = K[V];
            let N = U, L = G;
            switch (V) {
              case "top":
                L = G - tt;
                break;
              case "bottom":
                L = G + tt;
                break;
              case "left":
                N = U - tt;
                break;
              case "right":
                N = U + tt;
                break;
            }
            if (X.rotation) {
              const nt = X.x + X.w / 2, st = X.y + z / 2, pt = X.rotation * Math.PI / 180, ut = Math.cos(pt), kt = Math.sin(pt), Dt = N - nt, mt = L - st;
              B = nt + Dt * ut - mt * kt, et = st + Dt * kt + mt * ut;
            } else
              B = N, et = L;
          } else {
            const X = jr(h.fromNode, h.cursorX, h.cursorY, r);
            B = X.x, et = X.y;
          }
          return /* @__PURE__ */ d(
            "line",
            {
              x1: B,
              y1: et,
              x2: h.cursorX,
              y2: h.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        p && (() => {
          const B = dt.get(p.anchorNodeId);
          if (!B) return null;
          let et, X;
          if (p.anchorHandle) {
            const z = B.h === "auto" ? (r == null ? void 0 : r[B.id]) ?? 100 : B.h, K = {
              top: [B.x + B.w / 2, B.y],
              bottom: [B.x + B.w / 2, B.y + z],
              left: [B.x, B.y + z / 2],
              right: [B.x + B.w, B.y + z / 2]
            }, V = p.anchorHandle, tt = V === "top" ? 42 / e.zoom : 26 / e.zoom, [U, G] = K[V];
            let N = U, L = G;
            switch (V) {
              case "top":
                L = G - tt;
                break;
              case "bottom":
                L = G + tt;
                break;
              case "left":
                N = U - tt;
                break;
              case "right":
                N = U + tt;
                break;
            }
            if (B.rotation) {
              const nt = B.x + B.w / 2, st = B.y + z / 2, pt = B.rotation * Math.PI / 180, ut = Math.cos(pt), kt = Math.sin(pt), Dt = N - nt, mt = L - st;
              et = nt + Dt * ut - mt * kt, X = st + Dt * kt + mt * ut;
            } else
              et = N, X = L;
          } else {
            const z = jr(B, p.cursorX, p.cursorY, r);
            et = z.x, X = z.y;
          }
          return /* @__PURE__ */ d(
            "line",
            {
              x1: et,
              y1: X,
              x2: p.cursorX,
              y2: p.cursorY,
              stroke: "#3b82f6",
              strokeWidth: 2 / e.zoom,
              strokeDasharray: `${4 / e.zoom}`,
              strokeLinecap: "round"
            }
          );
        })(),
        o.size === 1 && _.filter((B) => o.has(B.id)).map((B) => /* @__PURE__ */ d(
          Jd,
          {
            node: B,
            zoom: e.zoom,
            showHandles: o.size === 1,
            measuredHeights: r,
            onHandlePointerDown: l,
            onRotateStart: a
          },
          `sel-${B.id}`
        )),
        n && n.points.length > 1 && (() => {
          if (n.strokeStyle === "dashed" || n.strokeStyle === "dotted") {
            const et = n.points, X = ["M", et[0][0], et[0][1]];
            for (let V = 1; V < et.length; V++) {
              const [tt, U] = et[V], [G, N] = et[V - 1];
              X.push("Q", G, N, (G + tt) / 2, (N + U) / 2);
            }
            const z = et[et.length - 1];
            X.push("L", z[0], z[1]);
            const K = Je(n.strokeStyle);
            return /* @__PURE__ */ d(
              "path",
              {
                d: X.join(" "),
                fill: "none",
                stroke: n.color,
                strokeWidth: n.width,
                strokeDasharray: K == null ? void 0 : K.map((V) => V * Math.max(n.width, 1)).join(" "),
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            );
          }
          return /* @__PURE__ */ d(
            "path",
            {
              d: Wn(n.points, {
                size: n.width
              }),
              fill: n.color
            }
          );
        })(),
        s && i && (() => {
          const B = Math.min(s.startX, s.endX), et = Math.min(s.startY, s.endY), X = Math.abs(s.endX - s.startX), z = Math.abs(s.endY - s.startY);
          if (X < 2 && z < 2) return null;
          const K = i, V = K.shapeType || "rect";
          if (V === "ellipse")
            return /* @__PURE__ */ d(
              "ellipse",
              {
                cx: B + X / 2,
                cy: et + z / 2,
                rx: X / 2,
                ry: z / 2,
                stroke: K.stroke,
                strokeWidth: K.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (V === "diamond")
            return /* @__PURE__ */ d(
              "polygon",
              {
                points: `${B + X / 2},${et} ${B + X},${et + z / 2} ${B + X / 2},${et + z} ${B},${et + z / 2}`,
                stroke: K.stroke,
                strokeWidth: K.strokeWidth,
                fill: "none",
                strokeDasharray: "4"
              }
            );
          if (V === "line" || V === "arrow") {
            const tt = s.startX, U = s.startY, G = s.endX, N = s.endY;
            return /* @__PURE__ */ v(lt, { children: [
              /* @__PURE__ */ d(
                "line",
                {
                  x1: tt,
                  y1: U,
                  x2: G,
                  y2: N,
                  stroke: K.stroke,
                  strokeWidth: K.strokeWidth,
                  strokeDasharray: "4"
                }
              ),
              V === "arrow" && (() => {
                const L = Math.atan2(N - U, G - tt), nt = Math.max(12, K.strokeWidth * 4), st = Math.PI / 6, pt = G - nt * Math.cos(L - st), ut = N - nt * Math.sin(L - st), kt = G - nt * Math.cos(L + st), Dt = N - nt * Math.sin(L + st);
                return /* @__PURE__ */ d(
                  "polyline",
                  {
                    points: `${pt},${ut} ${G},${N} ${kt},${Dt}`,
                    stroke: K.stroke,
                    strokeWidth: K.strokeWidth,
                    fill: "none",
                    strokeDasharray: "4"
                  }
                );
              })()
            ] });
          }
          return /* @__PURE__ */ d(
            "rect",
            {
              x: B,
              y: et,
              width: X,
              height: z,
              stroke: K.stroke,
              strokeWidth: K.strokeWidth,
              fill: "none",
              strokeDasharray: "4"
            }
          );
        })(),
        g && g.length > 1 && (() => {
          const B = performance.now(), et = 400, X = 6 / e.zoom, z = [`M${g[0][0]},${g[0][1]}`];
          if (g.length === 2)
            z.push(`L${g[1][0]},${g[1][1]}`);
          else {
            for (let nt = 0; nt < g.length - 1; nt++) {
              const st = (g[nt][0] + g[nt + 1][0]) / 2, pt = (g[nt][1] + g[nt + 1][1]) / 2;
              z.push(`Q${g[nt][0]},${g[nt][1]},${st},${pt}`);
            }
            const L = g[g.length - 1];
            z.push(`L${L[0]},${L[1]}`);
          }
          const K = z.join(" "), V = (B - g[g.length - 1][2]) / et, tt = (B - g[0][2]) / et, U = Math.max(0, 0.85 * (1 - V)), G = Math.max(0, 0.85 * (1 - tt)), N = (U + G) / 2;
          return N <= 0 ? null : /* @__PURE__ */ v(lt, { children: [
            /* @__PURE__ */ d(
              "path",
              {
                d: K,
                fill: "none",
                stroke: "#9ca3af",
                strokeWidth: X * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: N * 0.35
              }
            ),
            /* @__PURE__ */ d(
              "path",
              {
                d: K,
                fill: "none",
                stroke: "#d1d5db",
                strokeWidth: X,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: N
              }
            )
          ] });
        })(),
        m && m.length > 1 && (() => {
          const B = performance.now(), et = 1560, X = 6 / e.zoom, z = [];
          let K = !1, V = !1;
          for (let pt = 0; pt < m.length; pt++) {
            const ut = m[pt];
            if (isNaN(ut[0])) {
              K = !1, V = !1;
              continue;
            }
            if (!K)
              z.push(`M${ut[0]},${ut[1]}`), K = !0, V = !0;
            else if (V) {
              const kt = pt + 1 < m.length && !isNaN(m[pt + 1][0]) ? m[pt + 1] : null;
              if (kt) {
                const Dt = (ut[0] + kt[0]) / 2, mt = (ut[1] + kt[1]) / 2;
                z.push(`Q${ut[0]},${ut[1]},${Dt},${mt}`);
              } else
                z.push(`L${ut[0]},${ut[1]}`);
            }
          }
          if (z.length === 0) return null;
          const tt = z.join(" "), U = m.filter((pt) => !isNaN(pt[0]));
          if (U.length === 0) return null;
          const G = (B - U[U.length - 1][2]) / et, N = (B - U[0][2]) / et, L = Math.max(0, 0.85 * (1 - G)), nt = Math.max(0, 0.85 * (1 - N)), st = (L + nt) / 2;
          return st <= 0 ? null : /* @__PURE__ */ v(lt, { children: [
            /* @__PURE__ */ d(
              "path",
              {
                d: tt,
                fill: "none",
                stroke: "#ef4444",
                strokeWidth: X * 3,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: st * 0.35
              }
            ),
            /* @__PURE__ */ d(
              "path",
              {
                d: tt,
                fill: "none",
                stroke: "#ff6b6b",
                strokeWidth: X,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                opacity: st
              }
            )
          ] });
        })(),
        j && j.length > 0 && j.map((B, et) => /* @__PURE__ */ d(
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
          `guide-${et}`
        ))
      ] })
    }
  );
}
function th({
  x: t,
  y: e,
  sections: o,
  onClose: r
}) {
  const n = it(null);
  yt(() => {
    var y;
    const f = (g) => {
      n.current && !n.current.contains(g.target) && r();
    }, h = (g) => {
      g.key === "Escape" && r();
    }, p = ((y = n.current) == null ? void 0 : y.ownerDocument) ?? document;
    return p.addEventListener("pointerdown", f, !0), p.addEventListener("keydown", h), () => {
      p.removeEventListener("pointerdown", f, !0), p.removeEventListener("keydown", h);
    };
  }, [r]), yt(() => {
    const f = n.current;
    if (!f) return;
    const h = f.getBoundingClientRect(), p = f.ownerDocument.defaultView ?? window;
    let y = t, g = e;
    h.right > p.innerWidth && (y = t - h.width), h.bottom > p.innerHeight && (g = e - h.height), y = Math.max(0, y), g = Math.max(0, g), f.style.left = `${y}px`, f.style.top = `${g}px`;
  }, [t, e]);
  const s = rt(
    (f) => {
      f.disabled || (f.action(), r());
    },
    [r]
  ), i = navigator.platform.includes("Mac"), l = i ? "⌘" : "Ctrl+", a = i ? "⌥" : "Alt+", c = i ? "⇧" : "Shift+", u = (f) => f.replace("Mod+", l).replace("Alt+", a).replace("Shift+", c);
  return /* @__PURE__ */ d(
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
      children: o.map((f, h) => /* @__PURE__ */ v("div", { children: [
        h > 0 && /* @__PURE__ */ d(
          "div",
          {
            style: {
              height: 1,
              background: "#333",
              margin: "4px 0"
            }
          }
        ),
        f.items.map((p, y) => /* @__PURE__ */ v(
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
            onMouseEnter: (g) => {
              p.disabled || (g.currentTarget.style.background = "rgba(255,255,255,0.08)");
            },
            onMouseLeave: (g) => {
              g.currentTarget.style.background = "transparent";
            },
            children: [
              /* @__PURE__ */ v("span", { children: [
                p.checked !== void 0 && /* @__PURE__ */ d("span", { style: { display: "inline-block", width: 16, marginRight: 4 }, children: p.checked ? "✓" : "" }),
                p.label
              ] }),
              p.shortcut && /* @__PURE__ */ d(
                "span",
                {
                  style: {
                    marginLeft: 32,
                    fontSize: 12,
                    color: "#888"
                  },
                  children: u(p.shortcut)
                }
              )
            ]
          },
          y
        ))
      ] }, h))
    }
  );
}
const $i = "sbd-clipboard", eh = "sbd-nodes:";
function _i(t) {
  const e = JSON.stringify(t), o = new TextEncoder().encode(e);
  let r = "";
  for (let n = 0; n < o.length; n++) r += String.fromCharCode(o[n]);
  return btoa(r);
}
function Bs(t) {
  try {
    const e = atob(t), o = new Uint8Array(e.length);
    for (let n = 0; n < e.length; n++) o[n] = e.charCodeAt(n);
    const r = new TextDecoder().decode(o);
    return JSON.parse(r);
  } catch {
    return null;
  }
}
function ta(t) {
  const e = t.match(/data-sbd-nodes="([A-Za-z0-9+/=]+)"/);
  if (e) return Bs(e[1]);
  const o = t.match(
    new RegExp(`<!--${eh}([A-Za-z0-9+/=]+)-->`)
  );
  return o ? Bs(o[1]) : null;
}
function ur(t) {
  return !!t.closest(".bn-editor") || t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA";
}
function ea(t) {
  return t.map((e) => {
    var n;
    const o = (e.content || []).filter((s) => s.type === "text").map((s) => s.text ?? "").join(""), r = (n = e.children) != null && n.length ? `
` + ea(e.children) : "";
    return o + r;
  }).filter(Boolean).join(`
`);
}
function oh(t) {
  var o;
  const e = [];
  for (const r of t)
    switch (r.type) {
      case "content": {
        const n = r.data;
        (o = n.blocks) != null && o.length ? e.push(ea(n.blocks)) : n.markdown && e.push(n.markdown);
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
function Hs(t, e) {
  const o = oh(e), r = o.split(`
`).filter(Boolean).map((s) => `<p>${s}</p>`).join(""), n = _i(e);
  return t.setData(
    "text/html",
    `<!--${$i}--><div data-sbd-nodes="${n}">${r || "<p></p>"}</div>`
  ), t.setData("text/plain", o), o;
}
function rh(t, e) {
  let o = (e == null ? void 0 : e.ownerDocument) ?? document, r = o.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, i = null;
  const l = (g) => {
    n = g.clientX, s = g.clientY;
  }, a = (g) => {
    ur(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = Hs(
      g.clipboardData,
      t.getClipboardNodes()
    ));
  }, c = (g) => {
    ur(g.target) || t.selection.size !== 0 && (g.preventDefault(), t.copySelected(), i = Hs(
      g.clipboardData,
      t.getClipboardNodes()
    ), t.deleteSelected());
  }, u = async (g) => {
    var Y, _, J;
    if (ur(g.target)) return;
    const { x: m, y: w } = t.screenToCanvas(n, s), b = ((Y = g.clipboardData) == null ? void 0 : Y.getData("text/html")) || "", M = ((_ = g.clipboardData) == null ? void 0 : _.getData("text/plain")) || "";
    if (b.includes($i) || b.includes("data-sbd-nodes=") || i !== null && M === i) {
      if (i !== null && M === i && t.hasClipboard()) {
        g.preventDefault(), t.pasteClipboard(m, w);
        return;
      }
      const B = ta(b);
      if (B) {
        g.preventDefault(), t.setClipboard(B), t.pasteClipboard(m, w);
        return;
      }
    }
    const A = (J = g.clipboardData) == null ? void 0 : J.items;
    if (A) {
      for (const dt of Array.from(A))
        if (dt.type.startsWith("image/")) {
          g.preventDefault();
          const B = dt.getAsFile();
          if (!B) continue;
          const et = new FileReader();
          et.onload = () => {
            const X = et.result, z = new Image();
            z.onload = () => {
              const K = t.screenToCanvas(n, s), V = 400, tt = 300, U = z.naturalWidth / z.naturalHeight, G = Math.min(z.naturalWidth, V), N = Math.min(z.naturalHeight, tt), L = U >= 1 ? G : N * U, nt = U >= 1 ? G / U : N;
              let st = X;
              if (b) {
                const ut = b.match(/<img[^>]+src=["']([^"']+)["']/i);
                ut && /\.(gif|webp|apng)(\?|#|$)/i.test(ut[1]) && (st = ut[1].replace(/&amp;/g, "&"));
              }
              const pt = {
                id: Rt(10),
                type: "image",
                x: K.x,
                y: K.y,
                w: L,
                h: nt,
                z: t.nextZ(),
                data: { src: st }
              };
              t.addNode(pt), t.select(pt.id);
            }, z.src = X;
          }, et.readAsDataURL(B);
          return;
        }
    }
    const O = kn(M) ?? kn(b);
    if (O) {
      g.preventDefault();
      const dt = t.screenToCanvas(n, s), B = await Ji(
        O,
        dt.x,
        dt.y,
        t.nextZ()
      );
      B && (t.addNode(B), t.select(B.id));
      return;
    }
    if (ed(M)) {
      const dt = td(M);
      if (dt) {
        g.preventDefault();
        const B = {
          id: Rt(10),
          type: "youtube",
          x: m,
          y: w,
          w: 560,
          h: 315,
          z: t.nextZ(),
          data: { videoId: dt, url: M.trim() }
        };
        t.addNode(B), t.select(B.id);
        return;
      }
    }
    const j = b.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
    if (j)
      try {
        const dt = hi(j);
        if (dt.length > 0) {
          g.preventDefault();
          const B = {
            id: Rt(10),
            type: "content",
            x: m,
            y: w,
            w: 300,
            h: "auto",
            z: t.nextZ(),
            data: { blocks: dt, markdown: M, borderColor: "#1e1e2e" }
          };
          t.addNode(B), t.select(B.id);
          return;
        }
      } catch {
      }
    if (M.trim()) {
      g.preventDefault();
      const dt = await An(M), B = {
        id: Rt(10),
        type: "content",
        x: m,
        y: w,
        w: 300,
        h: "auto",
        z: t.nextZ(),
        data: { blocks: dt, markdown: M, borderColor: "#1e1e2e" }
      };
      t.addNode(B), t.select(B.id);
      return;
    }
    t.hasClipboard() && (g.preventDefault(), t.pasteClipboard(m, w));
  }, f = (g) => {
    const m = g.target;
    if (ur(m)) return;
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
    const w = g.ctrlKey || g.metaKey;
    if (w && g.key === "c") {
      t.copySelected();
      return;
    }
    if (w && g.key === "x") {
      t.copySelected();
      return;
    }
    if (w && g.key === "d") {
      g.preventDefault(), t.duplicateSelected();
      return;
    }
    if (w && g.key === "g") {
      g.preventDefault(), g.shiftKey ? t.ungroupSelected() : t.groupSelected();
      return;
    }
    if (g.shiftKey && !w && g.key === "H") {
      g.preventDefault(), t.flipSelectedHorizontal();
      return;
    }
    if (g.shiftKey && !w && g.key === "V") {
      g.preventDefault(), t.flipSelectedVertical();
      return;
    }
    if (w && g.key === "]") {
      g.preventDefault();
      const b = Array.from(t.selection);
      g.altKey ? t.bringToFront(b) : t.bringForward(b);
      return;
    }
    if (w && g.key === "[") {
      g.preventDefault();
      const b = Array.from(t.selection);
      g.altKey ? t.sendToBack(b) : t.sendBackward(b);
      return;
    }
    if (!w && !g.altKey && !g.shiftKey) {
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
    if (w && g.key === "z") {
      g.preventDefault(), g.shiftKey ? t.redo() : t.undo();
      return;
    }
    if (w && g.key === "a") {
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
    if (w && (g.key === "=" || g.key === "+")) {
      g.preventDefault(), t.zoomIn();
      return;
    }
    if (w && g.key === "-") {
      g.preventDefault(), t.zoomOut();
      return;
    }
    if (w && g.key === "0") {
      g.preventDefault(), t.fitToContent();
      return;
    }
  };
  function h(g, m) {
    g.addEventListener("pointermove", l), g.addEventListener("copy", a), g.addEventListener("cut", c), g.addEventListener("paste", u), m.addEventListener("keydown", f);
  }
  function p(g, m) {
    g.removeEventListener("pointermove", l), g.removeEventListener("copy", a), g.removeEventListener("cut", c), g.removeEventListener("paste", u), m.removeEventListener("keydown", f);
  }
  h(o, r);
  const y = setInterval(() => {
    if (!e) return;
    const g = e.ownerDocument;
    g !== o && (p(o, r), o = g, r = g.defaultView ?? window, n = r.innerWidth / 2, s = r.innerHeight / 2, h(o, r));
  }, 500);
  return () => {
    clearInterval(y), p(o, r);
  };
}
async function Os(t, e) {
  const o = t.getAllNodes();
  if (o.length === 0) return;
  const r = t.measuredHeights, n = nh(o, r, t), s = e.padding ?? 40, i = e.background !== !1, l = e.format === "png", a = n.w + s * 2, c = n.h + s * 2, u = n.x - s, f = n.y - s, h = await oa(o, t, r, u, f, l), p = i ? Ar(t.boardBackground).canvasBg : "transparent", y = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${c}" viewBox="0 0 ${a} ${c}">`,
    `<rect width="${a}" height="${c}" fill="${p}"/>`,
    ...h,
    "</svg>"
  ].join(`
`);
  if (e.format === "svg")
    Xs(new Blob([y], { type: "image/svg+xml" }), "board.svg");
  else {
    const g = e.scale ?? 4, m = await mh(y, a, c, g);
    Xs(m, "board.png");
  }
}
function nh(t, e, o) {
  let r = 1 / 0, n = 1 / 0, s = -1 / 0, i = -1 / 0;
  for (const a of t) {
    if (a.type === "edge") continue;
    const c = o.resolveHeight(a);
    r = Math.min(r, a.x), n = Math.min(n, a.y), s = Math.max(s, a.x + a.w), i = Math.max(i, a.y + c);
  }
  const l = new Map(t.map((a) => [a.id, a]));
  for (const a of t) {
    if (a.type !== "edge") continue;
    const c = a, u = l.get(c.data.fromId), f = l.get(c.data.toId);
    if (!u || !f) continue;
    const h = Ue(
      u,
      f,
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
async function oa(t, e, o, r, n, s) {
  const i = new Map(t.map((c) => [c.id, c])), l = [...t].sort((c, u) => c.z - u.z), a = [];
  for (const c of l) {
    const u = c.x - r, f = c.y - n, h = e.resolveHeight(c);
    switch (c.type) {
      case "frame":
        a.push(sh(c, u, f, h));
        break;
      case "content":
        a.push(ih(c, u, f, c.w, h));
        break;
      case "draw":
        a.push(ah(c, r, n));
        break;
      case "shape":
        a.push(ch(c, u, f, c.w, h));
        break;
      case "text":
        a.push(dh(c, u, f, c.w, h));
        break;
      case "sticky":
        a.push(hh(c, u, f, c.w, h));
        break;
      case "image":
        a.push(await uh(c, u, f, c.w, h, s));
        break;
      case "youtube":
        a.push(await fh(c, u, f, c.w, h, s));
        break;
      case "edge": {
        const p = c, y = i.get(p.data.fromId), g = i.get(p.data.toId);
        y && g && a.push(yh(p, y, g, o, r, n));
        break;
      }
    }
  }
  return a;
}
function $e(t, e, o, r, n, s, i) {
  const l = [];
  if (s) {
    const a = e + r / 2, c = o + n / 2;
    l.push(`transform="rotate(${s}, ${a}, ${c})"`);
  }
  return i !== void 0 && i !== 1 && l.push(`opacity="${i}"`), `<g ${l.join(" ")}>${t}</g>`;
}
function sh(t, e, o, r) {
  const n = t.data, s = n.backgroundColor || "rgba(0,0,0,0.02)", i = n.borderColor || "#d1d5db", l = n.borderWidth ?? 1, a = Dr(n.borderStyle, l), c = n.label ? Do(n.label) : "";
  let u = `<rect x="${e}" y="${o}" width="${t.w}" height="${r}" rx="4" fill="${s}" stroke="${i}" stroke-width="${l}"` + (a ? ` stroke-dasharray="${a}"` : "") + "/>";
  return c && (u += `<text x="${e + 8}" y="${o - 6}" font-size="12" fill="#6b7280" font-family="sans-serif">${c}</text>`), $e(u, e, o, t.w, r, t.rotation, n.opacity);
}
function ih(t, e, o, r, n) {
  var f;
  const s = t.data, i = ((f = s.markdown) == null ? void 0 : f.trim()) || "", l = s.borderColor, a = s.borderWidth ?? 0, c = Dr(s.borderStyle, a);
  let u = "";
  return l && a > 0 ? u += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white" stroke="${l}" stroke-width="${a}"` + (c ? ` stroke-dasharray="${c}"` : "") + "/>" : u += `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="white"/>`, i && (u += Zn(i, e + 12, o + 20, r - 24, 14, 1.6, "#374151", "left", "sans-serif")), $e(u, e, o, r, n, t.rotation, s.opacity);
}
function ah(t, e, o) {
  const r = t.data, n = r.points.map(
    ([l, a, c]) => [l + t.x - e, a + t.y - o, c]
  );
  if (n.length === 0) return "";
  if (r.tool === "vector")
    return lh(n, r, t);
  const s = Je(r.strokeStyle);
  let i = "";
  if (r.fill) {
    const l = n.map(([a, c]) => [a, c]);
    if (l.length > 2) {
      const a = l.map((c, u) => `${u === 0 ? "M" : "L"}${c[0]},${c[1]}`).join(" ") + " Z";
      i += `<path d="${a}" fill="${r.fill}" fill-opacity="0.4" stroke="none"/>`;
    }
  }
  if (s) {
    const l = n.map((c, u) => `${u === 0 ? "M" : "L"}${c[0].toFixed(1)},${c[1].toFixed(1)}`).join(" "), a = s.map((c) => c * Math.max(r.strokeWidth, 1)).join(" ");
    i += `<path d="${l}" fill="none" stroke="${r.color}" stroke-width="${r.strokeWidth}" stroke-dasharray="${a}" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else {
    const l = Wn(n, { size: r.strokeWidth });
    l && (i += `<path d="${l}" fill="${r.color}" stroke="none"/>`);
  }
  return r.opacity !== void 0 && r.opacity !== 1 ? `<g opacity="${r.opacity}">${i}</g>` : i;
}
function lh(t, e, o) {
  const r = t.map((a, c) => `${c === 0 ? "M" : "L"}${a[0].toFixed(2)},${a[1].toFixed(2)}`).join(" ") + " Z", n = Je(e.strokeStyle), s = n ? ` stroke-dasharray="${n.map((a) => a * Math.max(e.strokeWidth, 1)).join(" ")}"` : "", i = `<path d="${r}" fill="${e.fill || "none"}" stroke="${e.color}" stroke-width="${e.strokeWidth}" stroke-linecap="round" stroke-linejoin="round"${s}/>`, l = o.h === "auto" ? 0 : o.h;
  return $e(i, o.x, o.y, o.w, l, o.rotation, e.opacity);
}
function ch(t, e, o, r, n) {
  const s = t.data, i = {
    stroke: s.stroke,
    fill: s.fill,
    fillStyle: s.fillStyle,
    roughness: s.roughness,
    strokeWidth: s.strokeWidth,
    strokeLineDash: Je(s.strokeStyle),
    seed: t.id
  };
  let l;
  const a = s.edgeStyle === "round";
  switch (s.shape) {
    case "rect":
      l = Mr(e, o, r, n, i, a);
      break;
    case "ellipse":
      l = Nn(e + r / 2, o + n / 2, r, n, i);
      break;
    case "diamond":
      l = Bn(e, o, r, n, i, a);
      break;
    case "line": {
      const u = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = Po(e + u[0], o + u[1], e + f[0], o + f[1], i);
      break;
    }
    case "arrow": {
      const u = s.startPoint ?? [0, 0], f = s.endPoint ?? [r, n];
      l = Hn(e + u[0], o + u[1], e + f[0], o + f[1], i);
      break;
    }
    default:
      l = Mr(e, o, r, n, i);
  }
  const c = l.map(
    (u) => `<path d="${u.d}" fill="${u.fill || "none"}" stroke="${u.stroke}" stroke-width="${u.strokeWidth}"` + (u.strokeDasharray ? ` stroke-dasharray="${u.strokeDasharray}"` : "") + "/>"
  ).join(`
`);
  return $e(c, e, o, r, n, t.rotation, s.opacity);
}
function dh(t, e, o, r, n) {
  const s = t.data, i = n || s.text.split(`
`).length * s.fontSize * 1, l = We(s.fontFamily), a = !!s.borderColor, c = a ? 6 : 0;
  let u = "";
  if (a) {
    const h = s.borderWidth ?? 1, p = Dr(s.borderStyle, h);
    u += `<rect x="${e}" y="${o}" width="${r}" height="${i}" rx="4" fill="none" stroke="${s.borderColor}" stroke-width="${h}"` + (p ? ` stroke-dasharray="${p}"` : "") + "/>";
  }
  const f = s.align === "center" ? e + r / 2 : s.align === "right" ? e + r - c : e + c;
  return u += Zn(
    s.text,
    f,
    o + c + s.fontSize,
    r - c * 2,
    s.fontSize,
    1,
    s.color,
    s.align,
    l
  ), $e(u, e, o, r, i, t.rotation, s.opacity);
}
function hh(t, e, o, r, n) {
  const s = t.data, i = s.fontSize ?? 16, l = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="2" fill="${s.color}"/>` + Zn(s.text, e + 12, o + 12 + i, r - 24, i, 1.4, "#1e1e2e", "left", "sans-serif");
  return $e(l, e, o, r, n, t.rotation, s.opacity);
}
async function uh(t, e, o, r, n, s) {
  const i = t.data;
  let l = i.src;
  if (s && l && !l.startsWith("data:"))
    try {
      l = await Ir(l);
    } catch {
    }
  const a = i.borderColor, c = i.borderWidth ?? 0, u = Dr(i.borderStyle, c);
  let f = `<image href="${Do(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  return a && c > 0 && (f += `<rect x="${e}" y="${o}" width="${r}" height="${n}" fill="none" stroke="${a}" stroke-width="${c}"` + (u ? ` stroke-dasharray="${u}"` : "") + "/>"), $e(f, e, o, r, n, t.rotation, i.opacity);
}
async function fh(t, e, o, r, n, s) {
  const i = t.data;
  let l = rd(i.videoId);
  if (s)
    try {
      l = await Ir(l);
    } catch {
    }
  let a = `<rect x="${e}" y="${o}" width="${r}" height="${n}" rx="4" fill="#1a1a1a"/><image href="${Do(l)}" x="${e}" y="${o}" width="${r}" height="${n}" preserveAspectRatio="xMidYMid slice"/>`;
  const c = e + r / 2, u = o + n / 2, f = Math.min(r, n) * 0.12;
  return a += `<circle cx="${c}" cy="${u}" r="${f}" fill="rgba(0,0,0,0.6)"/><path d="${ph(c, u, f * 0.5)}" fill="white"/>`, $e(a, e, o, r, n, t.rotation, i.opacity);
}
function ph(t, e, o) {
  const r = o * 0.15, n = t - o * 0.7 + r, s = e - o, i = t + o + r, l = e, a = n, c = e + o;
  return `M${n},${s} L${i},${l} L${a},${c} Z`;
}
function yh(t, e, o, r, n, s) {
  const i = t.data, l = Ue(
    e,
    o,
    i.edgeType,
    r,
    i.sourceHandle,
    i.targetHandle,
    i.midpointOffset,
    i.curveOffset
  ), a = `translate(${-n}, ${-s})`, c = i.style === "dashed" ? "8 4" : i.style === "dotted" ? "2 3" : void 0, u = i.strokeWidth;
  let f = `<path d="${l.path}" fill="none" stroke="${i.color}" stroke-width="${u}"` + (c ? ` stroke-dasharray="${c}"` : "") + ' stroke-linecap="round" stroke-linejoin="round"/>';
  const h = i.arrowHeadSize ?? Math.max(8, u * 3), p = i.arrowTailSize ?? Math.max(8, u * 3);
  if (i.arrowHead && i.arrowHead !== "none") {
    if (i.arrowHead === "arrow")
      f += `<path d="${zo(l.x2, l.y2, l.arrowAngle, h)}" fill="none" stroke="${i.color}" stroke-width="${u}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowHead === "filled")
      f += `<path d="${xr(l.x2, l.y2, l.arrowAngle, h)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowHead === "dot") {
      const y = h / 3;
      f += `<circle cx="${l.x2}" cy="${l.y2}" r="${y}" fill="${i.color}"/>`;
    }
  }
  if (i.arrowTail && i.arrowTail !== "none") {
    if (i.arrowTail === "arrow")
      f += `<path d="${zo(l.x1, l.y1, l.tailAngle, p)}" fill="none" stroke="${i.color}" stroke-width="${u}" stroke-linecap="round" stroke-linejoin="round"/>`;
    else if (i.arrowTail === "filled")
      f += `<path d="${xr(l.x1, l.y1, l.tailAngle, p)}" fill="${i.color}" stroke="none"/>`;
    else if (i.arrowTail === "dot") {
      const y = p / 3;
      f += `<circle cx="${l.x1}" cy="${l.y1}" r="${y}" fill="${i.color}"/>`;
    }
  }
  return i.label && (f += `<text x="${l.labelX}" y="${l.labelY}" font-size="12" fill="${i.color}" text-anchor="middle" dominant-baseline="central" font-family="sans-serif">${Do(i.label)}</text>`), `<g transform="${a}">${f}</g>`;
}
function Zn(t, e, o, r, n, s, i, l, a) {
  if (!t) return "";
  const c = l === "center" ? "middle" : l === "right" ? "end" : "start", u = gh(t, r, n), f = n * s, h = u.map(
    (p, y) => `<tspan x="${e}" dy="${y === 0 ? 0 : f}">${Do(p)}</tspan>`
  ).join("");
  return `<text x="${e}" y="${o}" font-size="${n}" fill="${i}" font-family="${Do(a)}" text-anchor="${c}">${h}</text>`;
}
function gh(t, e, o) {
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
      const u = a ? a + " " + c : c;
      u.length > n && a ? (s.push(a), a = c) : a = u;
    }
    a && s.push(a);
  }
  return s;
}
function Dr(t, e) {
  const o = e ?? 1;
  if (t === "dashed") return `${8 * o} ${4 * o}`;
  if (t === "dotted") return `${2 * o} ${2 * o}`;
}
function Do(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
async function Ir(t) {
  const o = await (await fetch(t)).blob();
  return new Promise((r, n) => {
    const s = new FileReader();
    s.onloadend = () => r(s.result), s.onerror = n, s.readAsDataURL(o);
  });
}
function mh(t, e, o, r) {
  return new Promise((n, s) => {
    const i = new Image(), l = new Blob([t], { type: "image/svg+xml;charset=utf-8" }), a = URL.createObjectURL(l);
    i.onload = () => {
      const c = document.createElement("canvas");
      c.width = e * r, c.height = o * r;
      const u = c.getContext("2d");
      u.scale(r, r), u.drawImage(i, 0, 0, e, o), URL.revokeObjectURL(a), c.toBlob((f) => {
        f ? n(f) : s(new Error("Canvas toBlob failed"));
      }, "image/png");
    }, i.onerror = () => {
      URL.revokeObjectURL(a), s(new Error("Failed to load SVG as image"));
    }, i.src = a;
  });
}
const bh = /* @__PURE__ */ new Set(["sans-serif", "serif", "monospace"]), ko = /* @__PURE__ */ new Map(), xh = 12;
function wh(t) {
  const e = /* @__PURE__ */ new Set();
  for (const o of t)
    if (o.type === "text") {
      const r = o.data.fontFamily;
      r && !bh.has(r) && e.add(r);
    }
  return [...e];
}
async function kh(t) {
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
        r = await Ir(ui);
      else {
        const l = (await (await fetch(
          `https://fonts.googleapis.com/css2?family=${encodeURIComponent(o)}&display=swap`
        )).text()).match(/url\((https:\/\/[^)]+\.woff2)\)/);
        if (!l) continue;
        r = await Ir(l[1]);
      }
      const n = `@font-face { font-family: '${o}'; src: url('${r}') format('woff2'); }`;
      if (ko.size >= xh) {
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
async function vh(t, e) {
  const o = t.getNode(e);
  if (!o || o.type !== "frame") return "";
  const r = t.resolveHeight(o), n = 0, s = o.w + n * 2, i = r + n * 2, l = o.x - n, a = o.y - n, c = [o], u = /* @__PURE__ */ new Set([e]), f = (b) => {
    u.has(b.id) || b.type === "edge" || (u.add(b.id), c.push(b));
  };
  for (const b of t.getNodesInRect({ x: o.x, y: o.y, w: o.w, h: r }))
    f(b);
  for (const b of t.getFrameChildren(e))
    f(b);
  for (const b of t.getAllNodes())
    if (b.type === "edge") {
      const M = b;
      u.has(M.data.fromId) && u.has(M.data.toId) && c.push(b);
    }
  const h = t.measuredHeights, p = await oa(c, t, h, l, a, !0), y = wh(c), g = await kh(y), m = Ar(t.boardBackground).canvasBg, w = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${i}" viewBox="0 0 ${s} ${i}">`,
    g ? `<defs><style>${g}</style></defs>` : "",
    `<rect width="${s}" height="${i}" fill="${m}"/>`,
    ...p,
    "</svg>"
  ].join(`
`);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(w)}`;
}
function Xs(t, e) {
  const o = URL.createObjectURL(t), r = document.createElement("a");
  r.href = o, r.download = e, document.body.appendChild(r), r.click(), document.body.removeChild(r), URL.revokeObjectURL(o);
}
const Ys = [
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
], Gs = [
  { key: "ipad-mini", label: "iPad Mini", w: 768, h: 1024, group: "tablet" },
  { key: "ipad-air", label: "iPad Air", w: 820, h: 1180, group: "tablet" },
  { key: "ipad-pro", label: "iPad Pro", w: 1024, h: 1366, group: "tablet" },
  { key: "surface-pro-7", label: "Surface Pro 7", w: 912, h: 1368, group: "tablet" },
  { key: "surface-duo", label: "Surface Duo", w: 540, h: 720, group: "tablet" },
  { key: "zenbook-fold", label: "Asus Zenbook Fold", w: 853, h: 1280, group: "tablet" }
];
function js(t, e) {
  return t.map((o) => ({
    key: `${o.key}-landscape`,
    label: `${o.label} ↔`,
    w: o.h,
    h: o.w,
    group: e
  }));
}
const ra = [
  ...Ys,
  ...js(Ys, "phone-landscape"),
  ...Gs,
  ...js(Gs, "tablet-landscape"),
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
], Sh = new Map(ra.map((t) => [t.key, t]));
function vn(t) {
  return Sh.get(t);
}
function na(t) {
  return t.w / t.h;
}
const Mh = {
  phone: "Phones",
  "phone-landscape": "Phones (Landscape)",
  tablet: "Tablets",
  "tablet-landscape": "Tablets (Landscape)",
  other: "Devices",
  standard: "Standard"
};
function Ch() {
  const t = /* @__PURE__ */ new Map();
  for (const e of ra) {
    const o = t.get(e.group);
    o ? o.push(e) : t.set(e.group, [e]);
  }
  return Array.from(t.entries()).map(([e, o]) => ({
    label: Mh[e] ?? e,
    presets: o
  }));
}
function Ih(t) {
  const e = t.replace("#", ""), o = parseInt(e.substring(0, 2), 16) || 0, r = parseInt(e.substring(2, 4), 16) || 0, n = parseInt(e.substring(4, 6), 16) || 0;
  return (0.299 * o + 0.587 * r + 0.114 * n) / 255 > 0.5 ? "#1e1e2e" : "#ffffff";
}
function en(t, e, o) {
  let r = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const [i, l] = o[n], [a, c] = o[s];
    l > e != c > e && t < (a - i) * (e - l) / (c - l) + i && (r = !r);
  }
  return r;
}
async function zh(t, e, o) {
  try {
    const r = await navigator.clipboard.read();
    let n = null;
    for (const i of r)
      if (i.types.includes("text/html")) {
        const l = await (await i.getType("text/html")).text();
        if (l.includes("sbd-clipboard") || l.includes("data-sbd-nodes=")) {
          const a = ta(l);
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
        const a = await i.getType(l), c = await new Promise((b) => {
          const M = new FileReader();
          M.onload = () => b(M.result), M.readAsDataURL(a);
        }), u = new Image();
        await new Promise((b) => {
          u.onload = () => b(), u.src = c;
        });
        const f = u.naturalWidth / u.naturalHeight, h = Math.min(u.naturalWidth, 400), p = Math.min(u.naturalHeight, 300), y = f >= 1 ? h : p * f, g = f >= 1 ? h / f : p;
        let m = c;
        if (n) {
          const b = n.match(/<img[^>]+src=["']([^"']+)["']/i);
          b && /\.(gif|webp|apng)(\?|#|$)/i.test(b[1]) && (m = b[1].replace(/&amp;/g, "&"));
        }
        const w = {
          id: Rt(10),
          type: "image",
          x: e,
          y: o,
          w: y,
          h: g,
          z: t.nextZ(),
          data: { src: m }
        };
        t.addNode(w), t.select(w.id);
        return;
      }
    }
    const s = await navigator.clipboard.readText();
    if (n) {
      const i = n.replace(/^<meta[^>]*>/i, "").replace(/<!--StartFragment-->|<!--EndFragment-->/g, "").trim();
      try {
        const l = hi(i);
        if (l.length > 0) {
          const a = {
            id: Rt(10),
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
      const i = await An(s), l = {
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
async function Vs(t) {
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
`).filter(Boolean).map((l) => `<p>${l}</p>`).join(""), i = `<!--sbd-clipboard--><div data-sbd-nodes="${_i(e)}">${n || "<p></p>"}</div>`;
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
function fr(t) {
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
const vo = `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' stroke='%23e0e0e0' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3a7 7 0 0 1 4.5 12.4l-2 2'/><path d='M14.5 15.4q.5 1.5.5 2.6c0 2-1.5 3-3 3s-2-1-2-2c0-.8.5-1.5 1-2'/><circle cx='12' cy='3' r='1.5' fill='%23e0e0e0' stroke='none'/></svg>") 12 3, crosshair`;
function Th({
  node: t,
  isInteractive: e,
  measuredH: o,
  onMeasuredHeight: r,
  observeElement: n,
  unobserveElement: s,
  isContainer: i,
  children: l
}) {
  const a = it(null);
  yt(() => {
    if (t.h !== "auto") return;
    const f = a.current;
    if (!f) return;
    const h = f.offsetHeight;
    return h > 0 && r(t.id, h), n(f, () => {
      const p = f.offsetHeight;
      p > 0 && r(t.id, p);
    }), () => s(f);
  }, [t.id, t.h, r, n, s]);
  const c = t.h === "auto" ? o ?? "auto" : t.h, u = qt(() => ({
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
  return /* @__PURE__ */ d(
    "div",
    {
      ref: a,
      "data-node-id": t.id,
      className: e ? void 0 : "sb-block-inert",
      style: u,
      children: l
    }
  );
}
function Ph({
  node: t,
  engine: e,
  onDone: o
}) {
  const r = it(null), n = it(t.data.label ?? ""), s = it(t);
  s.current = t, yt(() => () => {
    const c = s.current, u = n.current.trim();
    if (u !== (c.data.label ?? "")) {
      const h = { data: { ...c.data, label: u || void 0 } }, p = r.current;
      if (p && u) {
        const g = c.h === "auto" ? 100 : c.h, m = p.scrollHeight + 24;
        m > g && (h.h = m);
      }
      e.updateNodeWithHistory(c.id, h);
    }
  }, []);
  const i = t.h === "auto" ? 100 : t.h, l = t.data.labelFontSize ?? 14, a = t.data.fill && t.data.fillStyle === "solid" ? Ih(t.data.fill) : t.data.stroke;
  return /* @__PURE__ */ d(
    "div",
    {
      style: {
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.w,
        height: i,
        zIndex: 999998,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "auto",
        padding: "8px 12px",
        boxSizing: "border-box"
      },
      children: /* @__PURE__ */ d(
        "textarea",
        {
          ref: r,
          autoFocus: !0,
          defaultValue: t.data.label ?? "",
          placeholder: "",
          rows: 1,
          onBlur: () => o(),
          onKeyDown: (c) => {
            c.key === "Escape" && c.currentTarget.blur(), c.stopPropagation();
          },
          onInput: (c) => {
            const u = c.currentTarget;
            n.current = u.value, u.style.height = "auto", u.style.height = u.scrollHeight + "px";
            const h = u.scrollHeight + 24;
            h > i && e.updateNode(t.id, { h });
          },
          onPointerDown: (c) => c.stopPropagation(),
          style: {
            textAlign: t.data.labelAlign ?? "center",
            fontSize: l,
            fontFamily: We(t.data.labelFontFamily ?? Ee),
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
function Ah({
  engine: t,
  schema: e,
  registry: o,
  dataFlow: r
}) {
  const n = it(null), s = () => {
    var x;
    return ((x = n.current) == null ? void 0 : x.ownerDocument) ?? document;
  }, [i, l] = $({ w: 0, h: 0 }), [a, c] = $({ ...t.viewport }), [u, f] = $(t.getAllNodes()), [h, p] = $(
    new Set(t.selection)
  ), [y, g] = $(t.mode), [m, w] = $(t.activeGroupId), [b, M] = $(t.snapToGrid), [S, A] = $(t.gridSize), [O, j] = $(t.smartGuides), [Y, _] = $([]), [J, dt] = $(t.boardBackground), B = it(!1), et = it(!1);
  yt(() => {
    const x = (C) => {
      var R, I;
      if (C.key === " " && !C.repeat && !B.current) {
        const P = (R = C.target) == null ? void 0 : R.tagName;
        if (P === "INPUT" || P === "TEXTAREA" || (I = C.target) != null && I.isContentEditable) return;
        B.current = !0;
        const D = n.current;
        D && (D.style.cursor = "grab"), C.preventDefault();
      }
    }, T = (C) => {
      if (C.key === " ") {
        B.current = !1, et.current = !1;
        const R = n.current;
        R && (R.style.cursor = t.lassoSelect ? vo : fr(t.mode));
      }
    };
    return window.addEventListener("keydown", x), window.addEventListener("keyup", T), () => {
      window.removeEventListener("keydown", x), window.removeEventListener("keyup", T);
    };
  }, []);
  const [X, z] = $(null), [K, V] = $(null), [tt, U] = $(null), [G, N] = $(null);
  yt(() => {
    const x = n.current;
    if (!x) return;
    t.setContainer(x);
    const T = () => {
      const R = x.getBoundingClientRect();
      t.containerOffset = { x: R.left, y: R.top };
    };
    T();
    const C = new ResizeObserver((R) => {
      var D;
      const { width: I, height: P } = ((D = R[0]) == null ? void 0 : D.contentRect) ?? { width: 0, height: 0 };
      l((H) => H.w === I && H.h === P ? H : { w: I, h: P }), t.setContainerSize(I, P), T();
    });
    return C.observe(x), () => C.disconnect();
  }, [t]);
  const [L, nt] = $({}), st = rt((x, T) => {
    nt(
      (C) => C[x] === T ? C : { ...C, [x]: T }
    ), t.updateMeasuredHeight(x, T);
  }, [t]), pt = it(null), ut = it(/* @__PURE__ */ new Map());
  function kt() {
    return pt.current || (pt.current = new ResizeObserver((x) => {
      var T;
      for (const C of x)
        (T = ut.current.get(C.target)) == null || T(C);
    })), pt.current;
  }
  const Dt = rt((x, T) => {
    ut.current.set(x, T), kt().observe(x);
  }, []), mt = rt((x) => {
    var T;
    ut.current.delete(x), (T = pt.current) == null || T.unobserve(x);
  }, []);
  yt(() => () => {
    var x;
    (x = pt.current) == null || x.disconnect(), pt.current = null, ut.current.clear();
  }, []);
  const wt = qt(() => new Set(u.map((x) => x.id)), [u]);
  yt(() => {
    nt((x) => {
      let T = !1;
      const C = {};
      for (const [R, I] of Object.entries(x))
        wt.has(R) ? C[R] = I : T = !0;
      return T ? C : x;
    });
  }, [wt]);
  const ct = rt(
    (x, T, C) => {
      let R, I;
      if (o && x.data.sourcePort) {
        const P = o.get(T.type);
        P != null && P.ports && (R = Ko(T, P.ports, x.data.sourcePort, a.zoom, L) ?? void 0);
      }
      if (o && x.data.targetPort) {
        const P = o.get(C.type);
        P != null && P.ports && (I = Ko(C, P.ports, x.data.targetPort, a.zoom, L) ?? void 0);
      }
      return { sourcePortPos: R, targetPortPos: I };
    },
    [o, a.zoom, L]
  );
  rt(
    (x) => t.zoomToNode(x),
    [t]
  );
  const St = rt(
    (x, T) => {
      if (!x.rotation)
        return { minX: x.x, minY: x.y, maxX: x.x + x.w, maxY: x.y + T };
      const C = x.x + x.w / 2, R = x.y + T / 2, I = x.rotation * Math.PI / 180, P = Math.cos(I), D = Math.sin(I), H = [
        [x.w / 2, T / 2],
        [-x.w / 2, T / 2],
        [-x.w / 2, -T / 2],
        [x.w / 2, -T / 2]
      ];
      let E = 1 / 0, W = 1 / 0, F = -1 / 0, Z = -1 / 0;
      for (const [q, Q] of H) {
        const at = C + q * P - Q * D, ht = R + q * D + Q * P;
        E = Math.min(E, at), W = Math.min(W, ht), F = Math.max(F, at), Z = Math.max(Z, ht);
      }
      return { minX: E, minY: W, maxX: F, maxY: Z };
    },
    []
  ), vt = 8, Et = rt(
    (x, T) => T.filter((C) => {
      if (C.type === "edge") {
        const P = C.data, D = t.getNode(P.fromId), H = t.getNode(P.toId);
        if (!D || !H) return !1;
        const { x1: E, y1: W, x2: F, y2: Z } = Gr(D, H, L);
        return E >= x.x && E <= x.x + x.w && W >= x.y && W <= x.y + x.h && F >= x.x && F <= x.x + x.w && Z >= x.y && Z <= x.y + x.h;
      }
      const R = C.h === "auto" ? L[C.id] ?? 100 : C.h, I = St(C, R);
      return I.minX >= x.x && I.maxX <= x.x + x.w && I.minY >= x.y && I.maxY <= x.y + x.h;
    }),
    [St, L]
  ), Qt = rt(
    (x, T) => x.length < 3 ? [] : T.filter((C) => {
      if (C.type === "edge") {
        const D = C, H = t.getNode(D.data.fromId), E = t.getNode(D.data.toId);
        if (!H || !E) return !1;
        const { x1: W, y1: F, x2: Z, y2: q } = Gr(H, E, L);
        return en(W, F, x) && en(Z, q, x);
      }
      const R = C.h === "auto" ? L[C.id] ?? 100 : C.h, I = C.x + C.w / 2, P = C.y + R / 2;
      return en(I, P, x);
    }),
    [t, L]
  ), Wt = qt(() => {
    if (h.size < 2) return null;
    let x = 1 / 0, T = 1 / 0, C = -1 / 0, R = -1 / 0;
    for (const I of h) {
      const P = u.find((E) => E.id === I);
      if (!P || P.type === "edge") continue;
      const D = P.h === "auto" ? L[P.id] ?? 100 : P.h, H = St(P, D);
      x = Math.min(x, H.minX), T = Math.min(T, H.minY), C = Math.max(C, H.maxX), R = Math.max(R, H.maxY);
    }
    return x === 1 / 0 ? null : {
      x: x - vt,
      y: T - vt,
      w: C - x + vt * 2,
      h: R - T + vt * 2
    };
  }, [h, u, L, St]), te = qt(() => {
    if (!m) return null;
    const x = t.getAllGroupDescendantNodes(m);
    if (x.length === 0) return null;
    let T = 1 / 0, C = 1 / 0, R = -1 / 0, I = -1 / 0;
    for (const D of x) {
      if (D.type === "edge") continue;
      const H = D.h === "auto" ? L[D.id] ?? 100 : D.h, E = St(D, H);
      T = Math.min(T, E.minX), C = Math.min(C, E.minY), R = Math.max(R, E.maxX), I = Math.max(I, E.maxY);
    }
    if (T === 1 / 0) return null;
    const P = 8;
    return { x: T - P, y: C - P, w: R - T + P * 2, h: I - C + P * 2 };
  }, [m, u, L, St, t]), ee = qt(() => {
    const x = u.filter(
      (W) => {
        if (o) {
          const F = o.get(W.type);
          return F && !F.isSVGOnly;
        }
        return W.type === "content" || W.type === "draw" || W.type === "shape" || W.type === "image" || W.type === "text" || W.type === "frame" || W.type === "sticky";
      }
    ), T = a.zoom < 0.5 ? 15 : a.zoom < 1 ? 25 : 30;
    if (i.w <= 0 || i.h <= 0 || x.length < T)
      return null;
    const { zoom: C, x: R, y: I } = a, P = 500, D = {
      x: -R / C - P,
      y: -I / C - P,
      w: i.w / C + P * 2,
      h: i.h / C + P * 2
    }, H = t.getNodesInRect(D), E = /* @__PURE__ */ new Map();
    for (const W of H) {
      const F = t.getNode(W.id);
      F && E.set(W.id, F);
    }
    for (const W of h) {
      const F = t.getNode(W);
      F && E.set(F.id, F);
    }
    for (const W of u) {
      if (W.type !== "edge" || E.has(W.id)) continue;
      const F = W.data, Z = t.getNode(F.fromId), q = t.getNode(F.toId);
      if (!Z || !q) continue;
      let Q = E.has(F.fromId) || E.has(F.toId);
      if (!Q) {
        const { x1: at, y1: ht, x2: gt, y2: Mt } = Gr(Z, q, L);
        Q = Sl(at, ht, gt, Mt, D);
      }
      Q && (E.set(W.id, W), E.has(Z.id) || E.set(Z.id, Z), E.has(q.id) || E.set(q.id, q));
    }
    return Array.from(E.values());
  }, [a, i, u, h, t]), me = qt(() => ee || u, [u, ee]);
  yt(() => {
    let x = null;
    const T = () => {
      x === null && (x = requestAnimationFrame(() => {
        x = null, f([...t.getAllNodes()]);
      }));
    };
    let C = null;
    const R = () => {
      C === null && (C = requestAnimationFrame(() => {
        C = null, c({ ...t.viewport });
      }));
    }, I = () => {
      p((Z) => {
        const q = new Set(t.selection);
        return Z.size !== q.size || [...Z].some((Q) => !q.has(Q)) ? (Ut((Q) => Q && !q.has(Q) ? null : Q), Ie((Q) => Q && !q.has(Q) ? null : Q), xe((Q) => Q && !q.has(Q) ? null : Q), Be((Q) => Q && !q.has(Q) ? null : Q), yo((Q) => Q && !q.has(Q) ? null : Q), Fe(null), q) : Z;
      });
    }, P = () => {
      g(t.mode), t.mode === "text" && (Ho.current = !1);
    }, D = () => dt(t.boardBackground), H = () => _([...t.alignGuides]);
    t.on("change", T), t.on("viewport", R), t.on("selection", I), t.on("mode", P), t.on("background", D), t.on("guides", H);
    const E = (Z) => w(Z), W = () => w(null), F = () => {
      const Z = n.current;
      Z && (Z.style.cursor = t.lassoSelect ? vo : fr(t.mode));
    };
    return t.on("group:enter", E), t.on("group:exit", W), t.on("lassoToggle", F), () => {
      x !== null && cancelAnimationFrame(x), C !== null && cancelAnimationFrame(C), t.off("change", T), t.off("viewport", R), t.off("selection", I), t.off("mode", P), t.off("background", D), t.off("guides", H), t.off("group:enter", E), t.off("group:exit", W), t.off("lassoToggle", F);
    };
  }, [t]), yt(() => {
    const x = n.current;
    if (!x) return;
    const T = (C) => {
      if (!C.ctrlKey && !C.metaKey) {
        const I = C.target.closest(".sb-editor-wrap");
        if (I && I.scrollHeight > I.clientHeight) {
          const P = I.scrollTop <= 0 && C.deltaY < 0, D = I.scrollTop + I.clientHeight >= I.scrollHeight && C.deltaY > 0;
          if (!P && !D) return;
        }
      }
      C.preventDefault(), C.ctrlKey || C.metaKey ? t.zoomByWheel(C.deltaY, C.clientX, C.clientY) : t.pan(-C.deltaX, -C.deltaY);
    };
    return x.addEventListener("wheel", T, { passive: !1 }), () => x.removeEventListener("wheel", T);
  }, [t]);
  const [fe, de] = $(null), [_e, to] = $(null), [we, ke] = $(null), [be, Fe] = $(null), Ne = it({
    x: 0,
    y: 0,
    index: -1
  }), [ie, ce] = $(null), [eo, oo] = $(null), k = it(null), [ot, Ut] = $(null), oe = it(null), [Ce, Ie] = $(null), [po, xe] = $(null), [ro, Be] = $(null), [No, yo] = $(null), [la, ts] = $(null);
  yt(() => {
    const x = (T) => yo(T);
    return t.on("image:cropRequest", x), () => t.off("image:cropRequest", x);
  }, [t]);
  const es = ot || po || Ce || ro || No || la, [ae, or] = $(null), no = it(null), Wr = it(!1), [Lr, Fr] = $(/* @__PURE__ */ new Set()), so = it(/* @__PURE__ */ new Set()), [os, Bo] = $([]), [rr, Nr] = $(null), ze = it([]), He = it(null), [rs, nr] = $([]), le = it([]), go = it(null), Ho = it(!1);
  In(() => {
    ae && no.current && (Wr.current = !1, no.current.focus());
  }, [ae]);
  const ns = rt(
    (x, T, C, R = "auto") => {
      t.addNode({
        id: Rt(10),
        type: "content",
        x,
        y: T,
        w: C,
        h: R,
        z: t.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" }
      });
    },
    [t]
  ), ss = rt(
    (x, T, C) => {
      const { x: R, y: I } = t.screenToCanvas(x, T);
      if (C) {
        const W = t.hitTestAll(R, I, L);
        if (W.length > 0) {
          const F = Ne.current, Z = Math.abs(R - F.x) + Math.abs(I - F.y);
          let q = 0;
          Z < 5 && (q = (F.index + 1) % W.length), Ne.current = { x: R, y: I, index: q }, t.select(W[q].id);
        } else
          t.deselectAll();
      } else {
        let W = !1;
        for (const F of t.selection) {
          const Z = t.getNode(F);
          if (!Z) continue;
          const q = Z.h === "auto" ? 100 : Z.h;
          if (R >= Z.x && R <= Z.x + Z.w && I >= Z.y && I <= Z.y + q) {
            W = !0;
            break;
          }
        }
        if (!W && t.selection.size >= 2) {
          let F = 1 / 0, Z = 1 / 0, q = -1 / 0, Q = -1 / 0;
          for (const at of t.selection) {
            const ht = t.getNode(at);
            if (!ht || ht.type === "edge") continue;
            const gt = ht.h === "auto" ? 100 : ht.h;
            F = Math.min(F, ht.x), Z = Math.min(Z, ht.y), q = Math.max(q, ht.x + ht.w), Q = Math.max(Q, ht.y + gt);
          }
          F !== 1 / 0 && R >= F && R <= q && I >= Z && I <= Q && (W = !0);
        }
        if (!W) {
          const F = t.hitTest(R, I, L);
          F ? t.select(F.id) : t.deselectAll();
        }
      }
      const P = Array.from(t.selection), D = P.length > 0, H = [];
      if (H.push({
        items: [
          {
            label: "Cut",
            shortcut: "Mod+X",
            disabled: !D,
            action: () => {
              t.cutSelected(), Vs(t);
            }
          },
          {
            label: "Copy",
            shortcut: "Mod+C",
            disabled: !D,
            action: () => {
              t.copySelected(), Vs(t);
            }
          },
          {
            label: "Paste",
            shortcut: "Mod+V",
            disabled: !1,
            action: () => {
              zh(t, R, I);
            }
          }
        ]
      }), H.push({
        items: [
          {
            label: "Duplicate",
            shortcut: "Mod+D",
            disabled: !D,
            action: () => t.duplicateSelected()
          }
        ]
      }), D && H.push({
        items: [
          {
            label: "Add to Personal Library",
            action: () => {
              const W = P.map((q) => t.getNode(q)).filter((q) => !!q).map((q) => structuredClone(q)), F = new Set(
                W.map((q) => q.groupId).filter(Boolean)
              ), Z = /* @__PURE__ */ new Map();
              for (const [q, Q] of t.groupParent)
                F.has(q) && Z.set(q, Q);
              Nr({
                nodes: W,
                groupParent: Z
              });
            }
          }
        ]
      }), P.length >= 2 || D && t.selectionHasGroup()) {
        const W = [];
        P.length >= 2 && W.push({
          label: "Group selection",
          shortcut: "Mod+G",
          action: () => t.groupSelected()
        }), t.selectionHasGroup() && W.push({
          label: "Ungroup selection",
          shortcut: "Mod+Shift+G",
          action: () => t.ungroupSelected()
        }), H.push({ items: W });
      }
      if (D && P.every((F) => {
        const Z = t.getNode(F);
        return Z && (Z.type === "draw" || Z.type === "shape");
      }) && H.push({
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
      }), D && H.push({
        items: [
          {
            label: "Bring forward",
            shortcut: "Mod+]",
            action: () => t.bringForward(P)
          },
          {
            label: "Send backward",
            shortcut: "Mod+[",
            action: () => t.sendBackward(P)
          },
          {
            label: "Bring to front",
            shortcut: "Mod+Alt+]",
            action: () => t.bringToFront(P)
          },
          {
            label: "Send to back",
            shortcut: "Mod+Alt+[",
            action: () => t.sendToBack(P)
          }
        ]
      }), D) {
        const W = P.some((q) => {
          var Q;
          return (Q = t.getNode(q)) == null ? void 0 : Q.locked;
        }), F = P.some((q) => {
          var Q;
          return !((Q = t.getNode(q)) != null && Q.locked);
        }), Z = [];
        F && Z.push({
          label: "Lock",
          action: () => {
            for (const q of P) t.updateNode(q, { locked: !0 });
          }
        }), W && Z.push({
          label: "Unlock",
          action: () => {
            for (const q of P) t.updateNode(q, { locked: void 0 });
          }
        }), H.push({ items: Z });
      }
      D && H.push({
        items: [
          {
            label: "Delete",
            shortcut: "Delete",
            danger: !0,
            action: () => t.deleteSelected()
          }
        ]
      });
      const E = [10, 20, 40, 80];
      return H.push({
        items: [
          {
            label: "Toggle Grid",
            checked: t.snapToGrid,
            action: () => {
              t.toggleSnapToGrid(), M(t.snapToGrid);
            }
          },
          {
            label: "Smart Guides",
            checked: t.smartGuides,
            action: () => {
              t.toggleSmartGuides(), j(t.smartGuides);
            }
          },
          ...E.map((W) => ({
            label: `${W}px`,
            checked: t.gridSize === W,
            action: () => {
              t.gridSize = W, A(W);
            }
          }))
        ]
      }), H.push({
        items: [
          {
            label: "Export as PNG",
            action: () => Os(t, { format: "png" })
          },
          {
            label: "Export as SVG",
            action: () => Os(t, { format: "svg" })
          }
        ]
      }), H;
    },
    [t]
  ), ca = rt(
    (x) => {
      if (x.preventDefault(), t.presentationMode) return;
      const T = ss(x.clientX, x.clientY, x.altKey);
      ke({ x: x.clientX, y: x.clientY, sections: T });
    },
    [t, ss]
  ), mo = rt(() => {
    var R;
    if (Wr.current) return;
    const x = ae, T = no.current;
    if (!x) return;
    Wr.current = !0;
    const C = ((R = T == null ? void 0 : T.innerText) == null ? void 0 : R.trim()) ?? "";
    if (C) {
      const I = x.w === "auto" && T ? Math.ceil(T.scrollWidth) + 2 : x.w, P = {
        id: Rt(10),
        type: "text",
        x: x.x,
        y: x.y,
        w: I,
        h: "auto",
        z: t.nextZ(),
        data: {
          text: C,
          fontSize: t.activeTool.fontSize ?? 20,
          fontFamily: t.activeTool.fontFamily ?? Ee,
          color: t.activeTool.color,
          align: t.activeTool.textAlign ?? "left",
          opacity: t.activeTool.opacity
        }
      };
      t.addNode(P), t.pushHistorySnapshot(), Ho.current = !0, n.current && (n.current.style.cursor = "crosshair");
    }
    or(null);
  }, [ae, t]), da = rt(
    (x) => {
      if (t.presentationMode) return;
      if (t.mode === "text" && Ho.current) {
        ae && no.current && mo(), Ho.current = !1, n.current && (n.current.style.cursor = "text"), t.deselectAll();
        const { x: P, y: D } = t.screenToCanvas(x.clientX, x.clientY);
        or({ x: P, y: D, w: "auto" });
        return;
      }
      if (t.mode !== "select") return;
      const { x: T, y: C } = t.screenToCanvas(x.clientX, x.clientY), R = t.hitTestAll(T, C, L), I = R.find((P) => !t.isContainerType(P.type)) ?? R[0] ?? null;
      if (I != null && I.groupId) {
        const P = [];
        let D = I.groupId;
        for (; D; )
          P.push(D), D = t.groupParent.get(D);
        if (!t.activeGroupId) {
          t.enterGroup(P[P.length - 1]), t.select(I.id);
          return;
        }
        const H = P.indexOf(t.activeGroupId);
        if (H > 0) {
          t.enterGroup(P[H - 1]), t.select(I.id);
          return;
        }
      }
      if (I && I.type === "text") {
        t.select(I.id), oe.current = { clientX: x.clientX, clientY: x.clientY }, Ut(I.id);
        return;
      }
      if (I && I.type === "sticky") {
        t.select(I.id), xe(I.id);
        return;
      }
      if (I && I.type === "frame") {
        t.select(I.id), Ie(I.id);
        return;
      }
      if (I && I.type === "shape") {
        const P = I.data, D = P.shape === "line" || P.shape === "arrow";
        t.select(I.id), D || Be(I.id);
        return;
      }
      if (I && I.type === "draw") {
        t.select(I.id);
        return;
      }
      if (!I || I.type === "draw") {
        const D = t.getAllNodes().filter((H) => H.type === "shape").sort((H, E) => E.z - H.z).find((H) => !(H.data.shape === "line" || H.data.shape === "arrow") && zr(H, T, C, t.viewport.zoom, !0));
        if (D) {
          t.select(D.id), Be(D.id);
          return;
        }
      }
      I || (t.deselectAll(), or({ x: T, y: C, w: "auto" }));
    },
    [t, L, ae, mo]
  ), ha = rt(
    (x) => {
      if (t.presentationMode && !(x.button === 1 || x.button === 0 && B.current))
        return;
      if (we && ke(null), ae && t.mode !== "text" && mo(), x.button === 1 || x.button === 0 && B.current) {
        x.preventDefault(), et.current = !0;
        const R = t.viewport.x, I = t.viewport.y, P = x.clientX, D = x.clientY, H = n.current;
        H && (H.style.cursor = "grabbing");
        const E = (F) => {
          t.viewport.x = R + (F.clientX - P), t.viewport.y = I + (F.clientY - D), c({ ...t.viewport });
        }, W = () => {
          et.current = !1, H && (H.style.cursor = B.current ? "grab" : t.lassoSelect ? vo : ""), s().removeEventListener("pointermove", E), s().removeEventListener("pointerup", W);
        };
        s().addEventListener("pointermove", E), s().addEventListener("pointerup", W);
        return;
      }
      const { x: T, y: C } = t.screenToCanvas(x.clientX, x.clientY);
      if (t.mode === "select") {
        if (x.button !== 0) return;
        if (x.altKey) {
          const P = t.hitTestAll(T, C, L);
          if (P.length > 0) {
            const D = Ne.current, H = Math.abs(T - D.x) + Math.abs(C - D.y);
            let E = 0;
            H < 5 && (E = (D.index + 1) % P.length), Ne.current = { x: T, y: C, index: E }, t.select(P[E].id);
          }
          return;
        }
        let R = !1;
        !t.lassoSelect && t.selection.size >= 2 && Wt && T >= Wt.x && T <= Wt.x + Wt.w && C >= Wt.y && C <= Wt.y + Wt.h && (R = !0);
        let I = null;
        if (!t.lassoSelect) {
          const P = t.hitTestAll(T, C, L);
          I = P.find((D) => t.selection.has(D.id) && !t.isContainerType(D.type)) ?? P.find((D) => !t.isContainerType(D.type)) ?? P[0] ?? null, !I && !R && (I = Il(t.nodes, T, C, t.viewport.zoom, L, ct));
        }
        if (I || R) {
          I && (t.activeGroupId && !t.isNodeInActiveGroup(I.id) && t.exitAllGroups(), x.shiftKey ? t.toggleSelect(I.id) : t.selection.has(I.id) || t.select(I.id));
          const P = Array.from(t.selection).filter(
            (zt) => {
              var It;
              return !((It = t.getNode(zt)) != null && It.locked);
            }
          );
          if (P.length === 0) return;
          const D = x.clientX, H = x.clientY, E = /* @__PURE__ */ new Set(), W = /* @__PURE__ */ new Set();
          for (const zt of P) {
            const It = t.getNode(zt);
            if (It && t.isContainerType(It.type)) {
              W.add(zt);
              for (const Pt of t.getFrameDescendantIds(zt))
                t.selection.has(Pt) || E.add(Pt);
            }
          }
          const F = [...P, ...E], Z = F.map((zt) => {
            const It = t.getNode(zt);
            return { id: zt, x: It.x, y: It.y };
          }), q = t.selectionGroupId(), Q = q ? t.groupRotations.get(q) : null, at = Q == null ? void 0 : Q.cx, ht = Q == null ? void 0 : Q.cy;
          Fe(null);
          let gt = !1, Mt = null, Ct = D, Tt = H, Yt = !1;
          const Ht = new Set(F), ft = () => {
            Mt = null;
            const zt = (Ct - D) / t.viewport.zoom, It = (Tt - H) / t.viewport.zoom, { finalDx: Pt, finalDy: Gt } = t.computeDragSnap(
              Z,
              Ht,
              zt,
              It,
              Yt
            ), Vt = Z.map((Jt) => ({
              id: Jt.id,
              patch: { x: Jt.x + Pt, y: Jt.y + Gt }
            }));
            t.updateMany(Vt), Q && q && t.groupRotations.set(q, {
              angle: Q.angle,
              cx: at + Pt,
              cy: ht + Gt
            });
          }, Ot = (zt) => {
            const It = (zt.clientX - D) / t.viewport.zoom, Pt = (zt.clientY - H) / t.viewport.zoom;
            if (!gt)
              if (Math.abs(It) > 2 || Math.abs(Pt) > 2)
                gt = !0, t.pushHistorySnapshot();
              else
                return;
            Ct = zt.clientX, Tt = zt.clientY, Yt = zt.metaKey || zt.ctrlKey, Mt === null && (Mt = requestAnimationFrame(ft));
          }, bt = () => {
            if (Mt !== null && (cancelAnimationFrame(Mt), ft()), t.clearAlignGuides(), s().removeEventListener("pointermove", Ot), s().removeEventListener("pointerup", bt), gt) {
              const zt = P.filter(
                (It) => !E.has(It)
              );
              zt.length > 0 && t.updateFrameMembership(zt);
            }
          };
          s().addEventListener("pointermove", Ot), s().addEventListener("pointerup", bt);
        } else {
          if (t.activeGroupId) {
            t.exitGroup();
            return;
          }
          x.shiftKey || t.deselectAll();
          const P = new Set(t.selection);
          if (t.lassoSelect) {
            const D = [[T, C]];
            to([...D]);
            let H = null, E = 0;
            const W = (q = !1) => {
              H = null;
              const Q = q || E % 2 === 0;
              if (E++, Q && D.length >= 3) {
                const ht = Qt(D, t.getAllNodes()).map((Mt) => Mt.id), gt = x.shiftKey ? [.../* @__PURE__ */ new Set([...P, ...ht])] : ht;
                (gt.length !== t.selection.size || gt.some((Mt) => !t.selection.has(Mt))) && t.selectMultiple(gt);
              }
              to([...D]);
            }, F = (q) => {
              const { x: Q, y: at } = t.screenToCanvas(q.clientX, q.clientY);
              D.push([Q, at]), H === null && (H = requestAnimationFrame(() => W(!1)));
            }, Z = () => {
              H !== null && cancelAnimationFrame(H), W(!0), s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", Z), to(null), t.toggleLassoSelect();
            };
            s().addEventListener("pointermove", F), s().addEventListener("pointerup", Z);
          } else {
            const D = { startX: T, startY: C, endX: T, endY: C };
            de(D);
            let H = null, E = 0;
            const W = (q = !1, Q = !1) => {
              H = null;
              const at = Math.min(D.startX, D.endX), ht = Math.min(D.startY, D.endY), gt = Math.abs(D.endX - D.startX), Mt = Math.abs(D.endY - D.startY), Ct = Q || q || E % 2 === 0;
              if (E++, Ct) {
                const Yt = Et(
                  { x: at, y: ht, w: gt, h: Mt },
                  t.getAllNodes()
                ).map((ft) => ft.id), Ht = x.shiftKey ? [.../* @__PURE__ */ new Set([...P, ...Yt])] : Yt;
                (Ht.length !== t.selection.size || Ht.some((ft) => !t.selection.has(ft))) && t.selectMultiple(Ht);
              }
              de({ ...D });
            }, F = (q) => {
              const { x: Q, y: at } = t.screenToCanvas(q.clientX, q.clientY);
              D.endX = Q, D.endY = at, H === null && (H = requestAnimationFrame(() => W(!1)));
            }, Z = () => {
              H !== null && cancelAnimationFrame(H), W(!0), s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", Z), de(null);
            };
            s().addEventListener("pointermove", F), s().addEventListener("pointerup", Z);
          }
        }
      } else if (t.mode === "text") {
        if (ae && no.current && mo(), Ho.current) return;
        t.deselectAll();
        const R = T, I = C, P = {
          startX: T,
          startY: C,
          endX: T,
          endY: C
        };
        let D = !1;
        ce(P);
        const H = (W) => {
          const { x: F, y: Z } = t.screenToCanvas(W.clientX, W.clientY);
          P.endX = F, P.endY = Z;
          const q = Math.abs(P.endX - P.startX), Q = Math.abs(P.endY - P.startY);
          (q > 10 || Q > 10) && (D = !0), ce({ ...P });
        }, E = () => {
          s().removeEventListener("pointermove", H), s().removeEventListener("pointerup", E), ce(null);
          const W = D ? Math.max(Math.abs(P.endX - P.startX), 60) : "auto", F = D ? Math.min(P.startX, P.endX) : R, Z = D ? Math.min(P.startY, P.endY) : I;
          or({ x: F, y: Z, w: W });
        };
        s().addEventListener("pointermove", H), s().addEventListener("pointerup", E);
      } else if (t.mode === "note") {
        t.deselectAll();
        const R = T, I = C, P = {
          startX: T,
          startY: C,
          endX: T,
          endY: C
        };
        let D = !1;
        ce(P);
        const H = (W) => {
          const { x: F, y: Z } = t.screenToCanvas(W.clientX, W.clientY);
          P.endX = F, P.endY = Z;
          const q = Math.abs(P.endX - P.startX), Q = Math.abs(P.endY - P.startY);
          (q > 10 || Q > 10) && (D = !0), ce({ ...P });
        }, E = () => {
          s().removeEventListener("pointermove", H), s().removeEventListener("pointerup", E), ce(null);
          const W = D ? Math.max(Math.abs(P.endX - P.startX), 100) : 300, F = D ? Math.max(Math.abs(P.endY - P.startY), 40) : "auto", Z = D ? Math.min(P.startX, P.endX) : R, q = D ? Math.min(P.startY, P.endY) : I;
          ns(Z, q, W, F), t.setMode("select");
        };
        s().addEventListener("pointermove", H), s().addEventListener("pointerup", E);
      } else if (t.mode === "sticky") {
        t.deselectAll();
        const R = T, I = C, P = {
          startX: T,
          startY: C,
          endX: T,
          endY: C
        };
        let D = !1;
        ce(P);
        const H = (W) => {
          const { x: F, y: Z } = t.screenToCanvas(W.clientX, W.clientY);
          P.endX = F, P.endY = Z, Math.abs(P.endX - P.startX) > 10 && (D = !0), ce({ ...P });
        }, E = () => {
          s().removeEventListener("pointermove", H), s().removeEventListener("pointerup", E), ce(null);
          const W = D ? Math.max(Math.abs(P.endX - P.startX), 100) : 200, F = D ? Math.min(P.startX, P.endX) : R, Z = D ? Math.min(P.startY, P.endY) : I, q = Rt(10), Q = D ? Math.max(Math.abs(P.endY - P.startY), 100) : 150;
          t.addNode({
            id: q,
            type: "sticky",
            x: F,
            y: Z,
            w: W,
            h: Q,
            z: t.nextZ(),
            data: { text: "", color: "#FEF3C7" }
          }), t.select(q), xe(q), t.setMode("select");
        };
        s().addEventListener("pointermove", H), s().addEventListener("pointerup", E);
      } else if (t.mode === "draw") {
        const R = x.pressure || 0.5, I = {
          points: [[T, C, R]],
          color: t.activeTool.color,
          width: t.activeTool.width,
          strokeStyle: t.activeTool.strokeStyle
        };
        z(I), t.notifyDrawProgress(I);
        const P = (H) => {
          const { x: E, y: W } = t.screenToCanvas(H.clientX, H.clientY), F = H.pressure || 0.5;
          I.points.push([E, W, F]), z({ ...I, points: [...I.points] }), t.notifyDrawProgress({ ...I, points: [...I.points] });
        }, D = () => {
          if (s().removeEventListener("pointermove", P), s().removeEventListener("pointerup", D), t.notifyDrawEnd(), I.points.length < 2) {
            z(null);
            return;
          }
          let H = 1 / 0, E = 1 / 0, W = -1 / 0, F = -1 / 0;
          for (const [q, Q] of I.points)
            q < H && (H = q), Q < E && (E = Q), q > W && (W = q), Q > F && (F = Q);
          const Z = I.points.map(
            ([q, Q, at]) => [q - H, Q - E, at]
          );
          t.addNode({
            id: Rt(10),
            type: "draw",
            x: H,
            y: E,
            w: W - H,
            h: F - E,
            z: t.nextZ(),
            data: {
              tool: "pen",
              points: Z,
              color: I.color,
              strokeWidth: I.width,
              opacity: t.activeTool.opacity,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle || void 0,
              strokeStyle: t.activeTool.strokeStyle || void 0
            }
          }), requestAnimationFrame(() => z(null));
        };
        s().addEventListener("pointermove", P), s().addEventListener("pointerup", D);
      } else if (t.mode === "shape") {
        const R = {
          startX: T,
          startY: C,
          endX: T,
          endY: C
        };
        V(R);
        const I = {
          shapeType: t.activeTool.shapeType || "rect",
          stroke: t.activeTool.color,
          strokeWidth: t.activeTool.width
        }, P = (H) => {
          const { x: E, y: W } = t.screenToCanvas(H.clientX, H.clientY);
          R.endX = E, R.endY = W, V({ ...R }), t.notifyShapeProgress({ ...R, ...I });
        }, D = () => {
          s().removeEventListener("pointermove", P), s().removeEventListener("pointerup", D), t.notifyShapeEnd();
          const H = t.activeTool.shapeType || "rect", E = H === "line" || H === "arrow", W = Math.min(R.startX, R.endX);
          let F = Math.min(R.startY, R.endY);
          const Z = Math.abs(R.endX - R.startX), q = Math.abs(R.endY - R.startY);
          let Q;
          if (E) {
            const gt = t.activeTool.width * 2;
            Q = Math.max(q, gt), q < gt && (F -= (gt - q) / 2);
          } else
            Q = q;
          if (Z < 5 && (E ? Z < 5 && Math.abs(R.endY - R.startY) < 5 : Q < 5)) {
            V(null);
            return;
          }
          const at = {};
          E && (at.startPoint = [
            R.startX - W,
            R.startY - F
          ], at.endPoint = [
            R.endX - W,
            R.endY - F
          ]);
          const ht = Rt(10);
          t.addNode({
            id: ht,
            type: "shape",
            x: W,
            y: F,
            w: Z,
            h: Q,
            z: t.nextZ(),
            data: {
              shape: H,
              stroke: t.activeTool.color,
              fill: t.activeTool.fillColor || void 0,
              fillStyle: t.activeTool.fillStyle,
              strokeWidth: t.activeTool.width,
              strokeStyle: t.activeTool.strokeStyle,
              roughness: t.activeTool.roughness ?? 1,
              opacity: t.activeTool.opacity ?? 1,
              ...at
            }
          }), V(null), t.setMode("select"), t.select(ht);
        };
        s().addEventListener("pointermove", P), s().addEventListener("pointerup", D);
      } else if (t.mode === "edge") {
        const R = t.hitTest(T, C, L);
        if (!R || R.type === "edge") return;
        U({ fromNode: R, cursorX: T, cursorY: C });
        const I = (D) => {
          const { x: H, y: E } = t.screenToCanvas(D.clientX, D.clientY);
          U(
            (W) => W ? { ...W, cursorX: H, cursorY: E } : null
          );
        }, P = (D) => {
          s().removeEventListener("pointermove", I), s().removeEventListener("pointerup", P), U(null);
          const { x: H, y: E } = t.screenToCanvas(D.clientX, D.clientY);
          let W = t.hitTest(H, E, L);
          if (!W || W.type === "edge" || t.isContainerType(W.type)) {
            const at = 50 / t.viewport.zoom;
            let ht = 1 / 0, gt = !1, Mt = null;
            for (const Ct of t.getAllNodes()) {
              if (Ct.type === "edge" || Ct.id === R.id) continue;
              const Tt = t.isContainerType(Ct.type), Yt = To(Ct, L);
              for (const Ht of Yt) {
                const ft = Math.hypot(Ht.x - H, Ht.y - E);
                ft >= at || Tt && !gt && Mt || (!Tt && gt || ft < ht) && (ht = ft, gt = Tt, Mt = Ct);
              }
            }
            Mt && (W = Mt);
          }
          if (!W || W.type === "edge" || W.id === R.id || t.getAllNodes().some(
            (at) => at.type === "edge" && (at.data.fromId === R.id && at.data.toId === W.id || at.data.fromId === W.id && at.data.toId === R.id)
          )) return;
          const Z = ar(R, T, C, L), q = ar(W, H, E, L), Q = {
            id: Rt(10),
            type: "edge",
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z: t.nextZ(),
            data: {
              fromId: R.id,
              toId: W.id,
              style: "solid",
              color: t.activeTool.color,
              strokeWidth: 2,
              arrowHead: "arrow",
              arrowTail: "none",
              edgeType: "bezier",
              sourceHandle: Z,
              targetHandle: q
            }
          };
          t.addNode(Q), t.select(Q.id);
        };
        s().addEventListener("pointermove", I), s().addEventListener("pointerup", P);
      } else if (t.mode === "frame") {
        const R = {
          startX: T,
          startY: C,
          endX: T,
          endY: C
        };
        V(R);
        const I = (D) => {
          const { x: H, y: E } = t.screenToCanvas(D.clientX, D.clientY);
          R.endX = H, R.endY = E, V({ ...R });
        }, P = () => {
          s().removeEventListener("pointermove", I), s().removeEventListener("pointerup", P);
          const D = Math.min(R.startX, R.endX), H = Math.min(R.startY, R.endY), E = Math.abs(R.endX - R.startX), W = Math.abs(R.endY - R.startY);
          if (E < 20 || W < 20) {
            V(null);
            return;
          }
          const F = Rt(10);
          t.addNode({
            id: F,
            type: "frame",
            x: D,
            y: H,
            w: E,
            h: W,
            z: t.nextZ(),
            data: {
              label: "Frame",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              borderColor: "#1e1e2e",
              borderWidth: 1,
              borderStyle: "dashed"
            }
          }), t.adoptNodesIntoNewFrame(F), V(null), t.select(F), t.setMode("select");
        };
        s().addEventListener("pointermove", I), s().addEventListener("pointerup", P);
      } else if (t.mode === "erase") {
        if (x.button !== 0) return;
        const R = (at, ht) => {
          const gt = t.hitTestAll(at, ht, L), Mt = Cl(
            t.nodes,
            at,
            ht,
            t.viewport.zoom,
            L,
            ct
          );
          let Ct = !1;
          for (const Tt of [...gt, ...Mt])
            so.current.has(Tt.id) || (so.current.add(Tt.id), Ct = !0);
          Ct && Fr(new Set(so.current));
        }, I = 400;
        so.current = /* @__PURE__ */ new Set();
        const P = performance.now();
        ze.current = [[T, C, P]], Bo([[T, C, P]]), R(T, C);
        let D = T, H = C;
        const E = () => {
          const at = performance.now(), ht = ze.current.length;
          ze.current = ze.current.filter(
            (gt) => at - gt[2] < I
          ), ze.current.length !== ht && Bo([...ze.current]), He.current = requestAnimationFrame(E);
        };
        He.current = requestAnimationFrame(E);
        const W = (at) => {
          const { x: ht, y: gt } = t.screenToCanvas(at.clientX, at.clientY);
          D = ht, H = gt;
          const Mt = performance.now();
          ze.current.push([D, H, Mt]), Bo([...ze.current]), R(D, H);
        }, F = () => {
          He.current !== null && (cancelAnimationFrame(He.current), He.current = null), so.current = /* @__PURE__ */ new Set(), Fr(/* @__PURE__ */ new Set()), ze.current = [], Bo([]);
        }, Z = () => {
          Q();
          const at = Array.from(so.current);
          F(), at.length > 0 && t.deleteNodes(at);
        }, q = (at) => {
          at.key === "Escape" && (Q(), F());
        }, Q = () => {
          s().removeEventListener("pointermove", W), s().removeEventListener("pointerup", Z), s().removeEventListener("keydown", q);
        };
        s().addEventListener("pointermove", W), s().addEventListener("pointerup", Z), s().addEventListener("keydown", q);
      } else if (t.mode === "laser") {
        if (x.button !== 0) return;
        const R = 1560;
        go.current !== null && (cancelAnimationFrame(go.current), go.current = null);
        const I = performance.now();
        le.current.length > 0 && le.current.push([NaN, NaN, I]), le.current.push([T, C, I]), nr([...le.current]), t.notifyLaserProgress([[T, C]]);
        let P = I;
        const D = () => {
          const W = performance.now(), F = le.current.length;
          le.current = le.current.filter(
            (Z) => W - Z[2] < R
          ), (le.current.length !== F || le.current.length > 0) && nr([...le.current]), W - P >= 60 && (P = W, le.current.length > 0 && t.notifyLaserProgress(
            le.current.map((Z) => [Z[0], Z[1]])
          )), le.current.length > 0 ? go.current = requestAnimationFrame(D) : (go.current = null, nr([]), t.notifyLaserEnd());
        };
        go.current = requestAnimationFrame(D);
        const H = (W) => {
          const { x: F, y: Z } = t.screenToCanvas(W.clientX, W.clientY), q = performance.now();
          le.current.push([F, Z, q]), nr([...le.current]), t.notifyLaserProgress(
            le.current.map((Q) => [Q[0], Q[1]])
          );
        }, E = () => {
          s().removeEventListener("pointermove", H), s().removeEventListener("pointerup", E);
        };
        s().addEventListener("pointermove", H), s().addEventListener("pointerup", E);
      } else if (t.mode === "hand") {
        if (x.button !== 0) return;
        x.preventDefault();
        const R = t.viewport.x, I = t.viewport.y, P = x.clientX, D = x.clientY, H = n.current;
        H && (H.style.cursor = "grabbing");
        const E = (F) => {
          t.viewport.x = R + (F.clientX - P), t.viewport.y = I + (F.clientY - D), c({ ...t.viewport });
        }, W = () => {
          H && (H.style.cursor = t.lassoSelect ? vo : fr(t.mode)), s().removeEventListener("pointermove", E), s().removeEventListener("pointerup", W);
        };
        s().addEventListener("pointermove", E), s().addEventListener("pointerup", W);
      }
    },
    [
      t,
      ns,
      we,
      Wt,
      L,
      St,
      Et,
      ae,
      mo
    ]
  ), Br = rt(
    (x, T, C) => {
      if (C.preventDefault(), t.presentationMode) return;
      const R = t.getNode(x);
      if (!R || R.locked) return;
      const I = C.clientX, P = C.clientY, D = R.x, H = R.y, E = R.w, W = R.h === "auto", F = W ? L[x] ?? 100 : R.h, Z = R.type === "draw" ? R.data.points.map(
        (Mt) => [...Mt]
      ) : null, q = R.type === "shape" ? R.data.startPoint : void 0, Q = R.type === "shape" ? R.data.endPoint : void 0, at = R.type === "text" ? R.data.fontSize : 0;
      t.pushHistorySnapshot();
      const ht = (Mt) => {
        const Ct = (Mt.clientX - I) / t.viewport.zoom, Tt = (Mt.clientY - P) / t.viewport.zoom;
        let Yt = D, Ht = H, ft = E, Ot = F;
        if ((T === "nw" || T === "w" || T === "sw") && (Yt = D + Ct, ft = E - Ct), (T === "ne" || T === "e" || T === "se") && (ft = E + Ct), (T === "nw" || T === "n" || T === "ne") && (Ht = H + Tt, Ot = F - Tt), (T === "sw" || T === "s" || T === "se") && (Ot = F + Tt), t.snapToGrid && !(Mt.metaKey || Mt.ctrlKey)) {
          const It = t.gridSize, Pt = (Gt) => Math.round(Gt / It) * It;
          (T === "nw" || T === "w" || T === "sw") && (Yt = Pt(Yt), ft = D + E - Yt), (T === "ne" || T === "e" || T === "se") && (ft = Pt(Yt + ft) - Yt), (T === "nw" || T === "n" || T === "ne") && (Ht = Pt(Ht), Ot = H + F - Ht), (T === "sw" || T === "s" || T === "se") && (Ot = Pt(Ht + Ot) - Ht);
        }
        const bt = 10;
        if (ft < bt && (ft = bt, (T === "nw" || T === "w" || T === "sw") && (Yt = D + E - bt)), Ot < bt && (Ot = bt, (T === "nw" || T === "n" || T === "ne") && (Ht = H + F - bt)), R.type === "frame") {
          const It = R.data.devicePreset;
          if (It) {
            const Pt = vn(It);
            if (Pt) {
              const Gt = na(Pt);
              if (T === "nw" || T === "ne" || T === "sw" || T === "se" || (T === "e" || T === "w")) {
                const re = Math.round(ft / Gt);
                (T === "nw" || T === "ne") && (Ht = H + F - re), Ot = re;
              } else
                ft = Math.round(Ot * Gt);
            }
          }
        }
        const zt = {
          x: Yt,
          y: Ht,
          w: ft,
          h: W ? "auto" : Ot
        };
        if (Z && R.type === "draw") {
          const It = E > 0 ? ft / E : 1, Pt = F > 0 ? Ot / F : 1, Gt = Z.map(
            ([Vt, Jt, re]) => [Vt * It, Jt * Pt, re]
          );
          zt.data = { ...R.data, points: Gt };
        }
        if (R.type === "shape" && (q || Q)) {
          const It = E > 0 ? ft / E : 1, Pt = F > 0 ? Ot / F : 1, Gt = { ...R.data };
          q && (Gt.startPoint = [
            q[0] * It,
            q[1] * Pt
          ]), Q && (Gt.endPoint = [
            Q[0] * It,
            Q[1] * Pt
          ]), zt.data = Gt;
        }
        if (R.type === "text" && at > 0 && T !== "e" && T !== "w") {
          const It = T === "n" || T === "s" ? F > 0 ? Ot / F : 1 : E > 0 ? ft / E : 1, Pt = Math.max(8, Math.round(at * It));
          zt.data = { ...R.data, fontSize: Pt };
        }
        t.updateNode(x, zt);
      }, gt = () => {
        s().removeEventListener("pointermove", ht), s().removeEventListener("pointerup", gt), t.isContainerType(R.type) && t.syncFrameChildrenAfterResize(x);
      };
      s().addEventListener("pointermove", ht), s().addEventListener("pointerup", gt);
    },
    [t, L]
  ), ua = rt(
    (x, T) => {
      T.stopPropagation(), T.preventDefault();
      const C = t.getNode(x);
      if (!C || C.locked) return;
      const R = C.h === "auto" ? L[x] ?? 100 : C.h, I = C.x + C.w / 2, P = C.y + R / 2, D = C.rotation || 0, { x: H, y: E } = t.screenToCanvas(
        T.clientX,
        T.clientY
      ), W = Math.atan2(E - P, H - I);
      t.pushHistorySnapshot();
      const F = (q) => {
        const { x: Q, y: at } = t.screenToCanvas(q.clientX, q.clientY), ht = Math.atan2(at - P, Q - I);
        let gt = D + (ht - W) * (180 / Math.PI);
        (q.shiftKey || t.snapToGrid) && !(q.metaKey || q.ctrlKey) && (gt = Math.round(gt / 15) * 15), t.updateNode(x, { rotation: gt });
      }, Z = () => {
        s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", Z);
      };
      s().addEventListener("pointermove", F), s().addEventListener("pointerup", Z);
    },
    [t, L]
  ), is = rt(
    (x, T, C) => {
      C.stopPropagation(), C.preventDefault();
      const R = t.getNode(x);
      if (!R) return;
      const { x: I, y: P } = t.screenToCanvas(C.clientX, C.clientY);
      U({ fromNode: R, cursorX: I, cursorY: P, sourceHandle: T });
      const D = (E) => {
        const { x: W, y: F } = t.screenToCanvas(E.clientX, E.clientY);
        U(
          (Z) => Z ? { ...Z, cursorX: W, cursorY: F } : null
        );
      }, H = (E) => {
        s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", H), U(null);
        const { x: W, y: F } = t.screenToCanvas(E.clientX, E.clientY);
        let Z = t.hitTest(W, F, L);
        if (!Z || Z.type === "edge" || t.isContainerType(Z.type)) {
          const ht = 50 / t.viewport.zoom;
          let gt = 1 / 0, Mt = !1, Ct = null;
          for (const Tt of t.getAllNodes()) {
            if (Tt.type === "edge" || Tt.id === R.id) continue;
            const Yt = t.isContainerType(Tt.type), Ht = To(Tt, L);
            for (const ft of Ht) {
              const Ot = Math.hypot(ft.x - W, ft.y - F);
              Ot >= ht || Yt && !Mt && Ct || (!Yt && Mt || Ot < gt) && (gt = Ot, Mt = Yt, Ct = Tt);
            }
          }
          Ct && (Z = Ct);
        }
        if (!Z || Z.type === "edge" || Z.id === R.id || t.getAllNodes().some(
          (ht) => ht.type === "edge" && (ht.data.fromId === R.id && ht.data.toId === Z.id || ht.data.fromId === Z.id && ht.data.toId === R.id)
        )) return;
        const Q = ar(Z, W, F, L), at = {
          id: Rt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: R.id,
            toId: Z.id,
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
        t.addNode(at), t.select(at.id);
      };
      s().addEventListener("pointermove", D), s().addEventListener("pointerup", H);
    },
    [t, L]
  ), fa = rt(
    (x) => {
      let T = null, C = x === "top" || x === "left" ? 1 / 0 : -1 / 0;
      for (const R of t.selection) {
        const I = t.getNode(R);
        if (!I || I.type === "edge") continue;
        const P = I.h === "auto" ? L[I.id] ?? 100 : I.h;
        let D;
        switch (x) {
          case "top":
            D = I.y;
            break;
          case "bottom":
            D = I.y + P;
            break;
          case "left":
            D = I.x;
            break;
          case "right":
            D = I.x + I.w;
            break;
        }
        (x === "top" || x === "left" ? D < C : D > C) && (C = D, T = R);
      }
      return T;
    },
    [t, L]
  ), pa = rt(
    (x, T, C, R) => {
      var q;
      R.stopPropagation(), R.preventDefault();
      const I = t.getNode(x);
      if (!I || !o) return;
      const P = o.get(I.type), D = (q = P == null ? void 0 : P.ports) == null ? void 0 : q.find((Q) => Q.id === T);
      if (!D) return;
      const H = C === "input" ? "left" : "right", { x: E, y: W } = t.screenToCanvas(R.clientX, R.clientY);
      U({
        fromNode: I,
        cursorX: E,
        cursorY: W,
        sourceHandle: H,
        sourcePort: T,
        sourceDirection: C
      });
      const F = (Q) => {
        const { x: at, y: ht } = t.screenToCanvas(Q.clientX, Q.clientY);
        U(
          (gt) => gt ? { ...gt, cursorX: at, cursorY: ht } : null
        );
      }, Z = (Q) => {
        var Re;
        s().removeEventListener("pointermove", F), s().removeEventListener("pointerup", Z), U(null);
        const { x: at, y: ht } = t.screenToCanvas(Q.clientX, Q.clientY), gt = C === "output" ? "input" : "output", Mt = 40 / t.viewport.zoom;
        let Ct = null, Tt = null, Yt = 1 / 0;
        for (const _t of t.getAllNodes()) {
          if (_t.type === "edge" || _t.id === I.id) continue;
          const ne = o.get(_t.type);
          if (!((Re = ne == null ? void 0 : ne.ports) != null && Re.length)) continue;
          const bo = _t.h === "auto" ? t.measuredHeights[_t.id] ?? 100 : _t.h;
          for (const ve of ne.ports) {
            if (ve.direction !== gt || D.dataType !== "any" && ve.dataType !== "any" && D.dataType !== ve.dataType) continue;
            const xo = ne.ports.filter((Ia) => Ia.direction === ve.direction), Or = xo.indexOf(ve), sr = 14 / t.viewport.zoom, Ma = _t.y + bo / (xo.length + 1) * (Or + 1), Ca = ve.direction === "input" ? _t.x - sr : _t.x + _t.w + sr, Xr = Math.hypot(Ca - at, Ma - ht);
            Xr < Mt && Xr < Yt && (Yt = Xr, Ct = _t, Tt = ve);
          }
        }
        if (!Ct || !Tt) return;
        const Ht = Tt.id, ft = C === "output" ? Ct.id : I.id, Ot = C === "output" ? Ht : T;
        if (t.getAllNodes().some((_t) => {
          if (_t.type !== "edge") return !1;
          const ne = _t.data;
          return ne.toId === ft && ne.targetPort === Ot;
        })) return;
        const zt = C === "output" ? I.id : Ct.id, It = C === "output" ? Ct.id : I.id, Pt = C === "output" ? T : Ht, Gt = C === "output" ? Ht : T, re = {
          id: Rt(10),
          type: "edge",
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          z: t.nextZ(),
          data: {
            fromId: zt,
            toId: It,
            style: "solid",
            color: "#6b7280",
            strokeWidth: 2,
            arrowHead: "filled",
            arrowTail: "none",
            edgeType: "bezier",
            sourceHandle: "right",
            targetHandle: "left",
            sourcePort: Pt,
            targetPort: Gt
          }
        };
        t.addNode(re), t.select(re.id);
      };
      s().addEventListener("pointermove", F), s().addEventListener("pointerup", Z);
    },
    [t, o, L]
  ), [as, ya] = $(0);
  yt(() => {
    if (r)
      return r.onChange(() => ya((x) => x + 1));
  }, [r]);
  const ga = rt(
    (x, T, C, R, I) => {
      I.stopPropagation(), I.preventDefault();
      const P = t.getNode(x);
      if (!P || P.type !== "edge") return;
      t.pushHistorySnapshot();
      const D = (E) => {
        const W = t.screenToCanvas(E.clientX, E.clientY), F = t.getNode(x);
        if (!F) return;
        const Z = t.getNode(F.data.fromId), q = t.getNode(F.data.toId);
        if (!(!Z || !q))
          if (T === "xy") {
            const Q = Ue(
              Z,
              q,
              F.data.edgeType || "bezier",
              L,
              F.data.sourceHandle,
              F.data.targetHandle,
              void 0,
              void 0
              // no offsets → natural midpoint
            );
            if (!Q.kinkHandle) return;
            const at = W.x - Q.kinkHandle.x, ht = W.y - Q.kinkHandle.y;
            t.updateNode(x, {
              data: { ...F.data, curveOffset: [at, ht] }
            });
          } else {
            const Q = T === "x" ? W.x : W.y, at = Ue(
              Z,
              q,
              F.data.edgeType || "bezier",
              L,
              F.data.sourceHandle,
              F.data.targetHandle,
              0.5
              // default to get range
            );
            if (!at.kinkHandle) return;
            const ht = at.kinkHandle.min, gt = at.kinkHandle.max, Mt = gt - ht;
            if (Mt === 0) return;
            const Tt = (Math.max(ht, Math.min(gt, Q)) - ht) / Mt;
            t.updateNode(x, {
              data: { ...F.data, midpointOffset: Tt }
            });
          }
      }, H = () => {
        s().removeEventListener("pointermove", D), s().removeEventListener("pointerup", H);
      };
      s().addEventListener("pointermove", D), s().addEventListener("pointerup", H);
    },
    [t, L]
  ), ma = rt(
    (x, T, C) => {
      C.stopPropagation(), C.preventDefault();
      const R = t.getNode(x);
      if (!R || R.type !== "edge") return;
      const { fromId: I, toId: P, sourceHandle: D, targetHandle: H } = R.data, E = T === "source" ? P : I, W = T === "source" ? H : D, F = t.getNode(I), Z = t.getNode(P);
      if (!F || !Z) return;
      const q = Ue(
        F,
        Z,
        R.data.edgeType || "bezier",
        L,
        D,
        H
      ), Q = T === "source" ? { x: q.x1, y: q.y1 } : { x: q.x2, y: q.y2 };
      N({
        edgeId: x,
        endpoint: T,
        anchorNodeId: E,
        anchorHandle: W,
        cursorX: Q.x,
        cursorY: Q.y
      });
      const at = (gt) => {
        const { x: Mt, y: Ct } = t.screenToCanvas(gt.clientX, gt.clientY);
        N(
          (Tt) => Tt ? { ...Tt, cursorX: Mt, cursorY: Ct } : null
        );
      }, ht = (gt) => {
        s().removeEventListener("pointermove", at), s().removeEventListener("pointerup", ht), N(null);
        const { x: Mt, y: Ct } = t.screenToCanvas(gt.clientX, gt.clientY);
        let Tt = t.hitTest(Mt, Ct, L);
        if (!Tt || Tt.type === "edge" || t.isContainerType(Tt.type)) {
          const It = 50 / t.viewport.zoom;
          let Pt = 1 / 0, Gt = !1, Vt = null;
          for (const Jt of t.getAllNodes()) {
            if (Jt.type === "edge") continue;
            const re = t.isContainerType(Jt.type), Re = To(Jt, L);
            for (const _t of Re) {
              const ne = Math.hypot(_t.x - Mt, _t.y - Ct);
              ne >= It || re && !Gt && Vt || (!re && Gt || ne < Pt) && (Pt = ne, Gt = re, Vt = Jt);
            }
          }
          Vt && (Tt = Vt);
        }
        if (!Tt || Tt.type === "edge") return;
        const Yt = T === "source" ? Tt.id : I, Ht = T === "target" ? Tt.id : P;
        if (Yt === Ht) return;
        const ft = T === "source" ? I : P;
        if (Tt.id === ft || t.getAllNodes().some((It) => {
          if (It.type !== "edge" || It.id === x) return !1;
          const Pt = It.data;
          return Pt.fromId === Yt && Pt.toId === Ht || Pt.fromId === Ht && Pt.toId === Yt;
        })) return;
        const bt = ar(Tt, Mt, Ct, L), zt = T === "source" ? { fromId: Tt.id, sourceHandle: bt } : { toId: Tt.id, targetHandle: bt };
        t.updateNodeWithHistory(x, { data: zt });
      };
      s().addEventListener("pointermove", at), s().addEventListener("pointerup", ht);
    },
    [t, L]
  ), ba = rt(
    (x) => {
      if (x.stopPropagation(), x.preventDefault(), t.presentationMode) return;
      const T = Array.from(t.selection).map((bt) => t.getNode(bt)).filter(Boolean);
      if (T.length < 2) return;
      const R = t.selectionIsSingleGroup() ? t.selectionGroupId() ?? null : null, I = R ? t.groupRotations.get(R) : null;
      let P, D;
      if (I)
        P = I.cx, D = I.cy;
      else {
        let bt = 1 / 0, zt = 1 / 0, It = -1 / 0, Pt = -1 / 0;
        for (const Gt of T) {
          const Vt = Gt.h === "auto" ? L[Gt.id] ?? 100 : Gt.h, Jt = St(Gt, Vt);
          bt = Math.min(bt, Jt.minX), zt = Math.min(zt, Jt.minY), It = Math.max(It, Jt.maxX), Pt = Math.max(Pt, Jt.maxY);
        }
        P = (bt + It) / 2, D = (zt + Pt) / 2;
      }
      const H = (I == null ? void 0 : I.angle) ?? 0, W = T.filter((bt) => !bt.locked).map((bt) => {
        const zt = bt.h === "auto" ? L[bt.id] ?? 100 : bt.h;
        return {
          id: bt.id,
          cx: bt.x + bt.w / 2,
          cy: bt.y + zt / 2,
          w: bt.w,
          h: zt,
          rotation: bt.rotation || 0
        };
      }), F = -H * Math.PI / 180, Z = Math.cos(F), q = Math.sin(F);
      let Q = 1 / 0, at = 1 / 0, ht = -1 / 0, gt = -1 / 0;
      for (const bt of W) {
        const zt = bt.cx - P, It = bt.cy - D, Pt = P + zt * Z - It * q, Gt = D + zt * q + It * Z;
        Q = Math.min(Q, Pt - bt.w / 2), at = Math.min(at, Gt - bt.h / 2), ht = Math.max(ht, Pt + bt.w / 2), gt = Math.max(gt, Gt + bt.h / 2);
      }
      const Mt = {
        x: Q - vt,
        y: at - vt,
        w: ht - Q + vt * 2,
        h: gt - at + vt * 2
      }, { x: Ct, y: Tt } = t.screenToCanvas(x.clientX, x.clientY), Yt = Math.atan2(Tt - D, Ct - P);
      t.pushHistorySnapshot();
      let Ht = H;
      const ft = (bt) => {
        const { x: zt, y: It } = t.screenToCanvas(bt.clientX, bt.clientY);
        let Gt = (Math.atan2(It - D, zt - P) - Yt) * (180 / Math.PI);
        (bt.shiftKey || t.snapToGrid) && !(bt.metaKey || bt.ctrlKey) && (Gt = Math.round(Gt / 15) * 15), Ht = H + Gt, Fe({ angle: Ht, cx: P, cy: D, bounds: Mt });
        const Vt = Gt * Math.PI / 180, Jt = Math.cos(Vt), re = Math.sin(Vt), Re = W.map((_t) => {
          const ne = _t.cx - P, bo = _t.cy - D, ve = P + ne * Jt - bo * re, xo = D + ne * re + bo * Jt;
          return {
            id: _t.id,
            patch: {
              x: ve - _t.w / 2,
              y: xo - _t.h / 2,
              rotation: Ht
            }
          };
        });
        t.updateMany(Re);
      }, Ot = () => {
        R && t.groupRotations.set(R, { angle: Ht, cx: P, cy: D }), Fe({ angle: Ht, cx: P, cy: D, bounds: Mt }), s().removeEventListener("pointermove", ft), s().removeEventListener("pointerup", Ot);
      };
      s().addEventListener("pointermove", ft), s().addEventListener("pointerup", Ot);
    },
    [t, L, St]
  ), xa = rt(
    (x, T) => {
      if (T.stopPropagation(), T.preventDefault(), t.presentationMode) return;
      const C = Array.from(t.selection).map((ft) => t.getNode(ft)).filter(Boolean);
      if (C.length < 2) return;
      const R = (ft) => ft.h === "auto" ? L[ft.id] ?? 100 : ft.h;
      let I = 1 / 0, P = 1 / 0, D = -1 / 0, H = -1 / 0;
      for (const ft of C) {
        const Ot = R(ft), bt = St(ft, Ot);
        I = Math.min(I, bt.minX), P = Math.min(P, bt.minY), D = Math.max(D, bt.maxX), H = Math.max(H, bt.maxY);
      }
      const E = { x: I, y: P, w: D - I, h: H - P }, W = E.w || 1, F = E.h || 1, q = C.filter((ft) => !ft.locked).map((ft) => {
        const Ot = R(ft);
        return {
          id: ft.id,
          type: ft.type,
          isAutoH: ft.h === "auto",
          relX: (ft.x - E.x) / W,
          relY: (ft.y - E.y) / F,
          relW: ft.w / W,
          relH: Ot / F,
          origW: ft.w,
          origH: Ot,
          origPoints: ft.type === "draw" ? ft.data.points.map((bt) => [...bt]) : null,
          drawData: ft.type === "draw" ? { ...ft.data } : null
        };
      }), Q = T.clientX, at = T.clientY;
      t.pushHistorySnapshot();
      let ht = null, gt = Q, Mt = at, Ct = !1;
      const Tt = () => {
        ht = null;
        const ft = (gt - Q) / t.viewport.zoom, Ot = (Mt - at) / t.viewport.zoom;
        let bt = E.x, zt = E.y, It = E.w, Pt = E.h;
        if ((x === "nw" || x === "w" || x === "sw") && (bt = E.x + ft, It = E.w - ft), (x === "ne" || x === "e" || x === "se") && (It = E.w + ft), (x === "nw" || x === "n" || x === "ne") && (zt = E.y + Ot, Pt = E.h - Ot), (x === "sw" || x === "s" || x === "se") && (Pt = E.h + Ot), t.snapToGrid && !Ct) {
          const Vt = t.gridSize, Jt = (re) => Math.round(re / Vt) * Vt;
          (x === "nw" || x === "w" || x === "sw") && (bt = Jt(bt), It = E.x + E.w - bt), (x === "ne" || x === "e" || x === "se") && (It = Jt(bt + It) - bt), (x === "nw" || x === "n" || x === "ne") && (zt = Jt(zt), Pt = E.y + E.h - zt), (x === "sw" || x === "s" || x === "se") && (Pt = Jt(zt + Pt) - zt);
        }
        It < 20 && (It = 20, (x === "nw" || x === "w" || x === "sw") && (bt = E.x + E.w - 20)), Pt < 20 && (Pt = 20, (x === "nw" || x === "n" || x === "ne") && (zt = E.y + E.h - 20));
        const Gt = q.map((Vt) => {
          const Jt = bt + Vt.relX * It, re = zt + Vt.relY * Pt, Re = Vt.relW * It, _t = Vt.relH * Pt, ne = {
            x: Jt,
            y: re,
            w: Re,
            h: Vt.isAutoH ? "auto" : _t
          };
          if (Vt.origPoints && Vt.drawData) {
            const bo = Vt.origW > 0 ? Re / Vt.origW : 1, ve = Vt.origH > 0 ? _t / Vt.origH : 1;
            ne.data = {
              ...Vt.drawData,
              points: Vt.origPoints.map(
                ([xo, Or, sr]) => [xo * bo, Or * ve, sr]
              )
            };
          }
          return { id: Vt.id, patch: ne };
        });
        t.updateMany(Gt);
      }, Yt = (ft) => {
        gt = ft.clientX, Mt = ft.clientY, Ct = ft.metaKey || ft.ctrlKey, ht === null && (ht = requestAnimationFrame(Tt));
      }, Ht = () => {
        ht !== null && (cancelAnimationFrame(ht), Tt()), s().removeEventListener("pointermove", Yt), s().removeEventListener("pointerup", Ht);
        for (const ft of C)
          t.isContainerType(ft.type) && t.syncFrameChildrenAfterResize(ft.id);
      };
      s().addEventListener("pointermove", Yt), s().addEventListener("pointerup", Ht);
    },
    [t, L, St]
  );
  yt(() => {
    n.current && (n.current.style.cursor = t.lassoSelect ? vo : fr(y)), y !== "select" && y !== "edge" && (k.current = null, oo(null)), y !== "erase" && (He.current !== null && (cancelAnimationFrame(He.current), He.current = null), so.current = /* @__PURE__ */ new Set(), Fr(/* @__PURE__ */ new Set()), ze.current = [], Bo([]));
  }, [y]);
  const Hr = it(null), ls = it(null), wa = rt(
    (x) => {
      t.mode !== "select" && t.mode !== "edge" || (ls.current = { clientX: x.clientX, clientY: x.clientY }, Hr.current === null && (Hr.current = requestAnimationFrame(() => {
        Hr.current = null;
        const T = n.current, C = ls.current;
        if (!T || !C) return;
        const { x: R, y: I } = t.screenToCanvas(C.clientX, C.clientY);
        if (t.lassoSelect) {
          T.style.cursor = vo;
          return;
        }
        if (t.mode === "edge") {
          const H = t.hitTest(R, I, L), E = H && H.type !== "edge" ? H.id : null;
          E !== k.current && (k.current = E, oo(E));
          return;
        }
        if (t.selection.size >= 2 && Wt && R >= Wt.x && R <= Wt.x + Wt.w && I >= Wt.y && I <= Wt.y + Wt.h) {
          T.style.cursor = "move";
          return;
        }
        const P = t.hitTest(R, I, L), D = P ? P.id : null;
        if (D !== k.current && (k.current = D, oo(D)), P) {
          T.style.cursor = "move";
          return;
        }
        T.style.cursor = "default";
      })));
    },
    [t, Wt, L, St]
  ), ka = rt((x) => {
    (x.dataTransfer.types.includes("Files") || x.dataTransfer.types.includes(bn) || x.dataTransfer.types.includes(xn) || x.dataTransfer.types.includes(wn)) && (x.preventDefault(), x.dataTransfer.dropEffect = "copy");
  }, []), va = rt(
    (x) => {
      if (x.preventDefault(), t.presentationMode) return;
      const T = x.dataTransfer.getData(wn);
      if (T) {
        try {
          const E = JSON.parse(T);
          Qi(t, E, x.clientX, x.clientY);
        } catch (E) {
          console.error("Failed to place GIF:", E);
        }
        return;
      }
      const C = x.dataTransfer.getData(xn);
      if (C) {
        try {
          const { itemId: E } = JSON.parse(C), F = Vi().find((Z) => Z.id === E);
          F && Zi(t, F, x.clientX, x.clientY);
        } catch (E) {
          console.error("Failed to place personal library item:", E);
        }
        return;
      }
      const R = x.dataTransfer.getData(bn);
      if (R) {
        try {
          const { libraryId: E, itemId: W } = JSON.parse(R), Z = Gn(E).find((q) => q.id === W);
          Z && Ui(t, Z, x.clientX, x.clientY);
        } catch (E) {
          console.error("Failed to place library item:", E);
        }
        return;
      }
      const I = x.dataTransfer.files[0];
      if (!I) return;
      if (I.name.endsWith(".excalidrawlib") || I.name.endsWith(".excalidrawlib.json")) {
        const E = new FileReader();
        E.onload = () => {
          try {
            const W = JSON.parse(E.result);
            if (W.type === "excalidrawlib") {
              const F = I.name.replace(/\.excalidrawlib(\.json)?$/, "");
              jn(W, { name: F });
            }
          } catch (W) {
            console.error("Failed to import library:", W);
          }
        }, E.readAsText(I);
        return;
      }
      if (I.type === "image/svg+xml" || I.name.endsWith(".svg")) {
        const E = new FileReader();
        E.onload = () => {
          const W = E.result, F = kn(W);
          F && Qd(t, F, x.clientX, x.clientY);
        }, E.readAsText(I);
        return;
      }
      if (!I.type.startsWith("image/")) return;
      const { x: P, y: D } = t.screenToCanvas(x.clientX, x.clientY), H = new FileReader();
      H.onload = () => {
        const E = H.result, W = new Image();
        W.onload = () => {
          const F = Math.min(W.naturalWidth, 400), Z = Math.min(W.naturalHeight, 300), q = W.naturalWidth / W.naturalHeight, Q = q >= 1 ? F : Z * q, at = q >= 1 ? F / q : Z;
          t.addNode({
            id: Rt(10),
            type: "image",
            x: P,
            y: D,
            w: Q,
            h: at,
            z: t.nextZ(),
            data: { src: E }
          });
        }, W.src = E;
      }, H.readAsDataURL(I);
    },
    [t]
  ), Sa = `translate(${a.x}px, ${a.y}px) scale(${a.zoom})`;
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
        background: Ar(J).canvasBg
      },
      onPointerDown: ha,
      onPointerMove: wa,
      onDoubleClick: da,
      onContextMenu: ca,
      onDragOver: ka,
      onDrop: va,
      children: [
        /* @__PURE__ */ d(vd, { viewport: a, gridSize: S, background: J, gridVisible: b }),
        /* @__PURE__ */ v(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transform: Sa,
              transformOrigin: "0 0",
              pointerEvents: "none"
            },
            children: [
              (ee || u).filter((x) => {
                if (o) {
                  const T = o.get(x.type);
                  return T && !T.isSVGOnly;
                }
                return x.type === "content" || x.type === "draw" || x.type === "shape" || x.type === "image" || x.type === "text" || x.type === "frame" || x.type === "sticky";
              }).sort((x, T) => x.z - T.z).map((x) => {
                var R;
                const T = Lr.has(x.id);
                let C;
                if (o) {
                  const I = o.get(x.type);
                  if (I) {
                    const P = I.component, D = h.has(x.id), H = y === "select" || y === "text" || y === "note" || y === "sticky", E = /* @__PURE__ */ d(
                      P,
                      {
                        node: x,
                        data: x.data,
                        isSelected: D,
                        multiSelected: h.size > 1 && D && !t.selectionIsSingleGroup(),
                        engine: t,
                        interactive: H,
                        zoom: a.zoom,
                        editing: es === x.id,
                        editClickPos: es === x.id ? oe.current : null,
                        callbacks: {
                          onMeasuredHeight: st,
                          onResizeHandleDown: Br,
                          onEditStart: (W) => {
                            const F = t.getNode(W);
                            F && (F.type === "text" ? Ut(W) : F.type === "sticky" ? xe(W) : F.type === "frame" ? Ie(W) : F.type === "shape" ? Be(W) : F.type === "image" ? yo(W) : F.type === "youtube" && ts(W));
                          },
                          onEditEnd: () => {
                            Ut(null), xe(null), Ie(null), Be(null), yo(null), ts(null);
                          }
                        },
                        portValues: r && ((R = I.ports) != null && R.length) && as >= 0 ? r.getAllPortValues(x.id) : void 0,
                        updateData: (W) => {
                          t.updateNodeWithHistory(x.id, {
                            data: { ...x.data, ...W }
                          });
                        }
                      },
                      I.handlesOwnLayout ? x.id : void 0
                    );
                    I.handlesOwnLayout ? C = E : C = /* @__PURE__ */ d(
                      Th,
                      {
                        node: x,
                        isInteractive: H,
                        measuredH: L[x.id],
                        onMeasuredHeight: st,
                        observeElement: Dt,
                        unobserveElement: mt,
                        isContainer: I.isContainer,
                        children: E
                      },
                      x.id
                    );
                  }
                } else if (x.type === "content")
                  C = /* @__PURE__ */ d(
                    yi,
                    {
                      node: x,
                      isSelected: h.has(x.id),
                      multiSelected: h.size > 1 && h.has(x.id) && !t.selectionIsSingleGroup(),
                      engine: t,
                      schema: e,
                      interactive: y === "select" || y === "text" || y === "note",
                      zoom: a.zoom,
                      onMeasuredHeight: st
                    },
                    x.id
                  );
                else if (x.type === "text")
                  C = /* @__PURE__ */ d(
                    Pi,
                    {
                      node: x,
                      engine: t,
                      editing: ot === x.id,
                      editClickPos: ot === x.id ? oe.current : null,
                      onStopEdit: () => Ut(null),
                      onMeasuredHeight: st
                    },
                    x.id
                  );
                else if (x.type === "image")
                  C = /* @__PURE__ */ d(
                    Ti,
                    {
                      node: x,
                      isSelected: h.has(x.id),
                      engine: t,
                      interactive: y === "select",
                      zoom: a.zoom,
                      onResizeHandleDown: Br,
                      cropping: No === x.id,
                      onCropStart: () => yo(x.id),
                      onCropEnd: () => yo(null)
                    },
                    x.id
                  );
                else if (x.type === "sticky")
                  C = /* @__PURE__ */ d(
                    Ai,
                    {
                      node: x,
                      isSelected: h.has(x.id),
                      engine: t,
                      interactive: y === "select" || y === "sticky",
                      zoom: a.zoom,
                      editing: po === x.id,
                      onEditStart: xe,
                      onEditEnd: () => xe(null)
                    },
                    x.id
                  );
                else if (x.type === "frame") {
                  const I = x, P = I.h === "auto" ? 100 : I.h;
                  C = /* @__PURE__ */ d(
                    "div",
                    {
                      style: {
                        position: "absolute",
                        left: I.x,
                        top: I.y,
                        width: I.w,
                        height: P,
                        zIndex: I.z,
                        background: I.data.backgroundColor || "rgba(0,0,0,0.02)",
                        border: `${I.data.borderWidth || 1}px ${I.data.borderStyle || "dashed"} ${I.data.borderColor || "#ccc"}`,
                        boxSizing: "border-box",
                        borderRadius: 8,
                        opacity: I.data.opacity ?? 1,
                        pointerEvents: "none",
                        overflow: "visible",
                        transform: I.rotation ? `rotate(${I.rotation}deg)` : void 0,
                        transformOrigin: "center center"
                      },
                      children: Ce === x.id ? /* @__PURE__ */ d(
                        "input",
                        {
                          autoFocus: !0,
                          defaultValue: I.data.label ?? "",
                          placeholder: "Frame label...",
                          onBlur: (D) => {
                            const H = D.currentTarget.value.trim();
                            t.updateNodeWithHistory(x.id, {
                              data: { ...I.data, label: H || void 0 }
                            }), Ie(null);
                          },
                          onKeyDown: (D) => {
                            (D.key === "Enter" || D.key === "Escape") && D.currentTarget.blur(), D.stopPropagation();
                          },
                          onPointerDown: (D) => D.stopPropagation(),
                          style: {
                            position: "absolute",
                            top: -24,
                            left: 0,
                            fontSize: 12,
                            color: I.data.borderColor || "#999",
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
                      ) : I.data.label ? /* @__PURE__ */ d(
                        "div",
                        {
                          onDoubleClick: (D) => {
                            D.stopPropagation(), t.select(x.id), Ie(x.id);
                          },
                          style: {
                            position: "absolute",
                            top: -20,
                            left: 4,
                            fontSize: 12,
                            color: I.data.borderColor || "#999",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                            userSelect: "none",
                            pointerEvents: "auto",
                            cursor: "default"
                          },
                          children: I.data.label
                        }
                      ) : null
                    },
                    x.id
                  );
                } else {
                  const I = x;
                  if (I.type === "draw")
                    C = /* @__PURE__ */ d(Cr, { node: I }, x.id);
                  else {
                    const P = I.h === "auto" ? 100 : I.h, D = I.w * a.zoom, H = P * a.zoom;
                    C = Math.min(D, H) < 2 ? /* @__PURE__ */ d(
                      zi,
                      {
                        node: I
                      },
                      x.id
                    ) : /* @__PURE__ */ d(Cr, { node: I, editingLabel: ro === x.id }, x.id);
                  }
                }
                return T ? /* @__PURE__ */ d("div", { style: { opacity: 0.25, filter: "saturate(0)" }, children: C }, x.id) : C;
              }),
              ro && (() => {
                const x = t.getNode(ro);
                if (!x || x.type !== "shape") return null;
                const T = x.data;
                return T.shape === "line" || T.shape === "arrow" ? null : /* @__PURE__ */ d(
                  Ph,
                  {
                    node: x,
                    engine: t,
                    onDone: () => Be(null)
                  },
                  ro
                );
              })(),
              ae && /* @__PURE__ */ d(
                "div",
                {
                  style: {
                    position: "absolute",
                    left: ae.x,
                    top: ae.y,
                    width: ae.w === "auto" ? void 0 : ae.w,
                    zIndex: 999999,
                    pointerEvents: "auto"
                  },
                  children: /* @__PURE__ */ d(
                    "div",
                    {
                      ref: no,
                      contentEditable: !0,
                      suppressContentEditableWarning: !0,
                      onBlur: mo,
                      onKeyDown: (x) => {
                        var T;
                        x.key === "Escape" && (x.preventDefault(), (T = no.current) == null || T.blur()), x.stopPropagation();
                      },
                      onInput: () => {
                      },
                      onPointerDown: (x) => x.stopPropagation(),
                      style: {
                        fontFamily: We(t.activeTool.fontFamily ?? Ee),
                        fontSize: t.activeTool.fontSize ?? 20,
                        color: t.activeTool.color,
                        textAlign: t.activeTool.textAlign ?? "left",
                        opacity: t.activeTool.opacity ?? 1,
                        lineHeight: 1,
                        outline: "none",
                        whiteSpace: ae.w === "auto" ? "pre" : "pre-wrap",
                        wordBreak: ae.w === "auto" ? void 0 : "break-word",
                        minWidth: 1,
                        minHeight: t.activeTool.fontSize ?? 20,
                        cursor: "text"
                      }
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ d(
          _d,
          {
            nodes: me,
            viewport: a,
            selection: h,
            measuredHeights: L,
            activeStroke: X,
            shapePreview: K,
            shapePreviewStyle: K ? {
              stroke: t.mode === "frame" ? "#1e1e2e" : t.activeTool.color,
              strokeWidth: t.mode === "frame" ? 1 : t.activeTool.width,
              roughness: t.mode === "frame" ? 0 : t.activeTool.roughness ?? 1,
              shapeType: t.mode === "frame" ? "rect" : t.activeTool.shapeType || "rect"
            } : null,
            onResizeHandleDown: Br,
            onRotateStart: ua,
            onConnectionHandleDown: is,
            onEdgeEndpointDown: ma,
            onKinkHandleDown: ga,
            edgePreview: tt,
            edgeReconnect: G,
            eraserMarkedIds: Lr.size > 0 ? Lr : void 0,
            eraserTrail: os.length > 1 ? os : void 0,
            laserTrail: rs.length > 1 ? rs : void 0,
            mode: y,
            hoveredNodeId: eo,
            registry: o,
            onPortHandleDown: pa,
            cycleNodeIds: r && as >= 0 ? r.cycleNodeIds : void 0,
            containerTypes: t.containerTypes,
            alignGuides: Y
          }
        ),
        Wt && (() => {
          const x = t.selectionGroupId(), T = x ? t.groupRotations.get(x) : void 0;
          let C, R, I, P;
          if (be)
            C = be.bounds, R = be.angle, I = be.cx, P = be.cy;
          else if (T && T.angle !== 0) {
            const F = -T.angle * Math.PI / 180, Z = Math.cos(F), q = Math.sin(F);
            let Q = 1 / 0, at = 1 / 0, ht = -1 / 0, gt = -1 / 0;
            for (const Mt of t.selection) {
              const Ct = t.getNode(Mt);
              if (!Ct || Ct.type === "edge") continue;
              const Tt = Ct.h === "auto" ? L[Ct.id] ?? 100 : Ct.h, Yt = Ct.x + Ct.w / 2, Ht = Ct.y + Tt / 2, ft = Yt - T.cx, Ot = Ht - T.cy, bt = T.cx + ft * Z - Ot * q, zt = T.cy + ft * q + Ot * Z;
              Q = Math.min(Q, bt - Ct.w / 2), at = Math.min(at, zt - Tt / 2), ht = Math.max(ht, bt + Ct.w / 2), gt = Math.max(gt, zt + Tt / 2);
            }
            C = {
              x: Q - vt,
              y: at - vt,
              w: ht - Q + vt * 2,
              h: gt - at + vt * 2
            }, R = T.angle, I = T.cx, P = T.cy;
          } else
            C = Wt, R = 0, I = 0, P = 0;
          const D = 8 / a.zoom, H = D / 2, E = [
            { pos: "nw", cx: C.x, cy: C.y },
            { pos: "n", cx: C.x + C.w / 2, cy: C.y },
            { pos: "ne", cx: C.x + C.w, cy: C.y },
            { pos: "e", cx: C.x + C.w, cy: C.y + C.h / 2 },
            { pos: "se", cx: C.x + C.w, cy: C.y + C.h },
            { pos: "s", cx: C.x + C.w / 2, cy: C.y + C.h },
            { pos: "sw", cx: C.x, cy: C.y + C.h },
            { pos: "w", cx: C.x, cy: C.y + C.h / 2 }
          ], W = R !== 0 ? ` rotate(${R}, ${I}, ${P})` : "";
          return /* @__PURE__ */ d(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ d("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ v("g", { transform: W, children: [
                /* @__PURE__ */ d(
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
                R === 0 && E.map(({ pos: F, cx: Z, cy: q }) => /* @__PURE__ */ d(
                  "rect",
                  {
                    x: Z - H,
                    y: q - H,
                    width: D,
                    height: D,
                    fill: "white",
                    stroke: "#3b82f6",
                    strokeWidth: 1.5 / a.zoom,
                    style: { cursor: Tr(F, R), pointerEvents: "auto" },
                    onPointerDown: (Q) => {
                      Q.stopPropagation(), xa(F, Q);
                    }
                  },
                  F
                )),
                (() => {
                  const F = 25 / a.zoom, Z = C.x + C.w / 2, q = C.y;
                  return /* @__PURE__ */ v(lt, { children: [
                    /* @__PURE__ */ d(
                      "line",
                      {
                        x1: Z,
                        y1: q,
                        x2: Z,
                        y2: q - F,
                        stroke: "#3b82f6",
                        strokeWidth: 1.5 / a.zoom,
                        style: { pointerEvents: "none" }
                      }
                    ),
                    (() => {
                      const Q = 8 / a.zoom, at = Q / 2;
                      return /* @__PURE__ */ d(
                        "rect",
                        {
                          x: Z - at,
                          y: q - F - at,
                          width: Q,
                          height: Q,
                          rx: 1.5 / a.zoom,
                          transform: `rotate(45, ${Z}, ${q - F})`,
                          fill: "white",
                          stroke: "#3b82f6",
                          strokeWidth: 1.5 / a.zoom,
                          style: { cursor: "grab", pointerEvents: "auto" },
                          onPointerDown: (ht) => ba(ht)
                        }
                      );
                    })()
                  ] });
                })(),
                (() => {
                  const F = 26 / a.zoom, Z = 42 / a.zoom, q = 4 / a.zoom;
                  return [
                    { side: "top", cx: C.x + C.w / 2, cy: C.y - Z },
                    { side: "right", cx: C.x + C.w + F, cy: C.y + C.h / 2 },
                    { side: "bottom", cx: C.x + C.w / 2, cy: C.y + C.h + F },
                    { side: "left", cx: C.x - F, cy: C.y + C.h / 2 }
                  ].map(({ side: at, cx: ht, cy: gt }) => /* @__PURE__ */ d(
                    "circle",
                    {
                      cx: ht,
                      cy: gt,
                      r: q,
                      fill: "white",
                      stroke: "#94a3b8",
                      strokeWidth: 1.5 / a.zoom,
                      opacity: 0.8,
                      style: { cursor: "crosshair", pointerEvents: "auto" },
                      onPointerDown: (Mt) => {
                        Mt.stopPropagation();
                        const Ct = fa(at);
                        Ct && is(Ct, at, Mt);
                      }
                    },
                    `conn-${at}`
                  ));
                })()
              ] }) })
            }
          );
        })(),
        te && /* @__PURE__ */ d(
          "svg",
          {
            "data-sb-overlay": !0,
            style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
            children: /* @__PURE__ */ d("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ d(
              "rect",
              {
                x: te.x,
                y: te.y,
                width: te.w,
                height: te.h,
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
        fe && (() => {
          const x = t.canvasToScreen(fe.startX, fe.startY), T = t.canvasToScreen(fe.endX, fe.endY), C = Math.min(x.x, T.x), R = Math.min(x.y, T.y), I = Math.abs(T.x - x.x), P = Math.abs(T.y - x.y);
          return I < 2 && P < 2 ? null : /* @__PURE__ */ d(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ d(
                "rect",
                {
                  x: C,
                  y: R,
                  width: I,
                  height: P,
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
          const T = _e.map(([C, R]) => t.canvasToScreen(C, R)).map((C) => `${C.x},${C.y}`).join(" ");
          return /* @__PURE__ */ d(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ d(
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
        ie && (() => {
          const x = Math.min(ie.startX, ie.endX), T = Math.min(ie.startY, ie.endY), C = Math.abs(ie.endX - ie.startX), R = Math.abs(ie.endY - ie.startY);
          return C < 2 && R < 2 ? null : /* @__PURE__ */ d(
            "svg",
            {
              "data-sb-overlay": !0,
              style: { position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" },
              children: /* @__PURE__ */ d("g", { transform: `translate(${a.x}, ${a.y}) scale(${a.zoom})`, children: /* @__PURE__ */ d(
                "rect",
                {
                  x,
                  y: T,
                  width: C,
                  height: R,
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
        we && /* @__PURE__ */ d(
          th,
          {
            x: we.x,
            y: we.y,
            sections: we.sections,
            onClose: () => ke(null)
          }
        ),
        rr && /* @__PURE__ */ d(
          qd,
          {
            nodes: rr.nodes,
            onSave: (x) => {
              Bd(x, rr.nodes, rr.groupParent), Nr(null);
            },
            onCancel: () => Nr(null)
          }
        )
      ]
    }
  );
}
const tr = 48, jo = 270, hf = tr + jo, Rh = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], qn = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Dh = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], Kn = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Eh = [1, 2.5, 5, 10, 20], sa = [14, 20, 28, 36], Qn = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], Wh = [
  "#FEF3C7",
  "#FCE7F3",
  "#DBEAFE",
  "#D1FAE5",
  "#EDE9FE",
  "#FFEDD5"
], Se = [
  { name: "Standard", colors: Rh },
  { name: "Pastel", colors: ["#F8B4B4", "#FDBA74", "#FDE68A", "#86EFAC", "#93C5FD", "#C4B5FD"] },
  { name: "Earth", colors: ["#78350F", "#92400E", "#6B7280", "#065F46", "#1E3A5F", "#7C2D12"] },
  { name: "Neon", colors: ["#FF1493", "#39FF14", "#00FFFF", "#FF6600", "#FFFF00", "#BF00FF"] },
  { name: "Crayon", colors: ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#A855F7"] },
  { name: "Mono", colors: ["#000000", "#404040", "#737373", "#A3A3A3", "#D4D4D4", "#FFFFFF"] }
], Jn = Se, Lh = [
  { name: "Standard", colors: Wh },
  { name: "Bright", colors: ["#FDE047", "#FB923C", "#F87171", "#4ADE80", "#60A5FA", "#C084FC"] },
  { name: "Earth", colors: ["#D6CFC7", "#E8D5B7", "#C4B5A0", "#B8C5A3", "#A3B5C4", "#C7B8A8"] },
  { name: "Cool", colors: ["#BFDBFE", "#A5F3FC", "#C7D2FE", "#DDD6FE", "#BAE6FD", "#E0E7FF"] }
], Lt = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Ft = {
  width: 52,
  fontSize: 10,
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
}, Fh = {
  fontSize: 9,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  padding: "4px 0 2px",
  marginTop: 4
}, Nh = "https://libraries.excalidraw.com/libraries.json", Sn = "https://libraries.excalidraw.com/libraries";
function Bh({
  onClose: t,
  onInstalled: e
}) {
  const o = Kt(), [r, n] = $([]), [s, i] = $(!0), [l, a] = $(null), [c, u] = $(""), [f, h] = $(null), [p, y] = $(/* @__PURE__ */ new Set()), g = rt(() => {
    const b = Wi(), M = new Set(b.map((S) => S.source));
    y(M);
  }, []);
  yt(() => {
    let b = !1;
    return (async () => {
      try {
        const M = await fetch(Nh);
        if (!M.ok) throw new Error(`HTTP ${M.status}`);
        const S = await M.json();
        b || (n(S), i(!1));
      } catch (M) {
        b || (a(String(M)), i(!1));
      }
    })(), g(), () => {
      b = !0;
    };
  }, [g]);
  const m = qt(() => {
    if (!c.trim()) return r;
    const b = c.toLowerCase();
    return r.filter(
      (M) => {
        var S, A;
        return M.name.toLowerCase().includes(b) || ((S = M.description) == null ? void 0 : S.toLowerCase().includes(b)) || ((A = M.itemNames) == null ? void 0 : A.some((O) => O.toLowerCase().includes(b)));
      }
    );
  }, [r, c]), w = rt(
    async (b) => {
      h(b.id);
      try {
        const M = `${Sn}/${b.source}`;
        await Id(M, b.name), g(), e();
      } catch (M) {
        console.error("Failed to install library:", M);
      } finally {
        h(null);
      }
    },
    [e, g]
  );
  return fo(
    /* @__PURE__ */ d(
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
        onPointerDown: (b) => {
          b.target === b.currentTarget && t();
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
            onPointerDown: (b) => b.stopPropagation(),
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
                          /* @__PURE__ */ d(
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
                          /* @__PURE__ */ d(
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
                    /* @__PURE__ */ d(
                      "input",
                      {
                        type: "text",
                        placeholder: "Search libraries...",
                        value: c,
                        onChange: (b) => u(b.target.value),
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
                    s && /* @__PURE__ */ d(
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
                    !s && !l && m.length === 0 && /* @__PURE__ */ d(
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
                    m.map((b, M) => {
                      const S = p.has(
                        `${Sn}/${b.source}`
                      ), A = f === b.id;
                      return /* @__PURE__ */ d(
                        Hh,
                        {
                          entry: b,
                          isInstalled: S,
                          isInstalling: A,
                          onInstall: () => w(b),
                          theme: o
                        },
                        b.id || `dir-${M}`
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
function Hh({
  entry: t,
  isInstalled: e,
  isInstalling: o,
  onInstall: r,
  theme: n
}) {
  var i;
  const s = t.preview ? `${Sn}/${t.preview}` : null;
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
        s && /* @__PURE__ */ d(
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
          /* @__PURE__ */ d(
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
          t.description && /* @__PURE__ */ d(
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
        /* @__PURE__ */ d(
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
const Oh = [
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
], Jo = {
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, Xt = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Eo({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ d("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M15 5l4 4", ...Xt })
    ] }),
    t === "shape" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...Xt }),
    t === "text" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M7 4h10", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M12 4v16", ...Xt })
    ] }),
    t === "note" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M4 3h16v14l-4 4H4z", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...Xt }),
      /* @__PURE__ */ d("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...Xt, opacity: 0.5 }),
      /* @__PURE__ */ d("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...Xt, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ d("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...Xt, strokeDasharray: "4,2" }),
    t === "hand" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M8 13V5.5a1.5 1.5 0 0 1 3 0V12", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M11 5.5v-2a1.5 1.5 0 0 1 3 0V12", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M14 5.5a1.5 1.5 0 0 1 3 0V12", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M17 7.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6V9.5a1.5 1.5 0 0 1 3 0", ...Xt })
    ] }),
    t === "erase" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M12.5 4.5l8 8", ...Xt })
    ] }),
    t === "laser" && /* @__PURE__ */ d("circle", { cx: "12", cy: "12", r: "4", fill: "currentColor", opacity: 0.9 }),
    t === "lasso" && /* @__PURE__ */ d("path", { d: "M18 4c-3 0-5 2-8 5S5 14 4 16c-1 3 1 4 3 4s4-2 6-4 4-4 6-5 3-2 3-4-1-3-3-3z", ...Xt, strokeDasharray: "3,2" }),
    t === "undo" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...Xt, fill: "none" }),
      /* @__PURE__ */ d("polyline", { points: "8,5 4,9 8,13", ...Xt, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...Xt, fill: "none" }),
      /* @__PURE__ */ d("polyline", { points: "16,5 20,9 16,13", ...Xt, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M6 9V3h12v6", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...Xt }),
      /* @__PURE__ */ d("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...Xt })
    ] }),
    t === "fit" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M15 3h6v6M9 21H3v-6", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M21 3l-7 7M3 21l7-7", ...Xt })
    ] }),
    t === "paper" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "4", y: "2", width: "16", height: "20", rx: "1", ...Xt }),
      /* @__PURE__ */ d("line", { x1: "8", y1: "7", x2: "16", y2: "7", ...Xt, opacity: 0.4 }),
      /* @__PURE__ */ d("line", { x1: "8", y1: "11", x2: "16", y2: "11", ...Xt, opacity: 0.4 }),
      /* @__PURE__ */ d("line", { x1: "8", y1: "15", x2: "13", y2: "15", ...Xt, opacity: 0.4 })
    ] }),
    t === "template" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "3", y: "3", width: "8", height: "8", rx: "1", ...Xt }),
      /* @__PURE__ */ d("rect", { x: "13", y: "3", width: "8", height: "8", rx: "1", ...Xt }),
      /* @__PURE__ */ d("rect", { x: "3", y: "13", width: "8", height: "8", rx: "1", ...Xt }),
      /* @__PURE__ */ d("rect", { x: "13", y: "13", width: "8", height: "8", rx: "1", ...Xt })
    ] }),
    t === "library" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20", ...Xt }),
      /* @__PURE__ */ d("path", { d: "M8 7h6", ...Xt, opacity: 0.5 }),
      /* @__PURE__ */ d("path", { d: "M8 11h4", ...Xt, opacity: 0.5 })
    ] }),
    t === "gif" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ...Xt }),
      /* @__PURE__ */ d("text", { x: "12", y: "14.5", textAnchor: "middle", fontSize: "7", fontWeight: "700", fill: "currentColor", stroke: "none", children: "GIF" })
    ] })
  ] });
}
const Xh = {
  light: "Light",
  dark: "Dark",
  textured: "Textured"
};
function Yh({
  engine: t,
  background: e
}) {
  const o = Kt(), [r, n] = $(!1), s = it(null), i = it(null);
  yt(() => {
    if (!r) return;
    const c = (u) => {
      i.current && !i.current.contains(u.target) && s.current && !s.current.contains(u.target) && n(!1);
    };
    return document.addEventListener("pointerdown", c), () => document.removeEventListener("pointerdown", c);
  }, [r]);
  const l = Uo.find((c) => c.key === e) ?? Uo[1], a = r && s.current ? (() => {
    const c = s.current.getBoundingClientRect();
    return fo(
      /* @__PURE__ */ d(
        "div",
        {
          ref: i,
          style: {
            position: "fixed",
            left: c.right + 8,
            top: c.top,
            background: o.panelBg,
            border: `1px solid ${o.border}`,
            borderRadius: 8,
            padding: 8,
            zIndex: 99999,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            width: 180,
            maxHeight: 400,
            overflowY: "auto"
          },
          onPointerDown: (u) => u.stopPropagation(),
          children: ["light", "dark", "textured"].map((u) => {
            const f = Uo.filter((h) => h.group === u);
            return f.length === 0 ? null : /* @__PURE__ */ v("div", { style: { marginBottom: 6 }, children: [
              /* @__PURE__ */ d(
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
                  children: Xh[u]
                }
              ),
              f.map((h) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    t.setBoardBackground(h.key), n(!1);
                  },
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "5px 6px",
                    border: "none",
                    borderRadius: 4,
                    background: e === h.key ? o.controlBgActive : "transparent",
                    color: o.text,
                    cursor: "pointer",
                    fontSize: 12,
                    textAlign: "left"
                  },
                  children: [
                    /* @__PURE__ */ d(
                      "span",
                      {
                        style: {
                          width: 18,
                          height: 18,
                          borderRadius: 3,
                          background: h.swatchColor,
                          border: `1.5px solid ${o.border}`,
                          flexShrink: 0
                        }
                      }
                    ),
                    h.label
                  ]
                },
                h.key
              ))
            ] }, u);
          })
        }
      ),
      document.body
    );
  })() : null;
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ v(
      "button",
      {
        ref: s,
        title: "Paper type",
        onClick: () => n((c) => !c),
        style: {
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
          width: 36,
          height: 36,
          background: r ? o.controlBgActive : "transparent",
          color: o.text,
          position: "relative"
        },
        children: [
          /* @__PURE__ */ d(Eo, { name: "paper" }),
          /* @__PURE__ */ d(
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
function Gh({ engine: t }) {
  const e = Kt(), [o, r] = $(!1), n = it(null), s = it(null);
  yt(() => {
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
            /* @__PURE__ */ d(
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
            ii.map((a) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => {
                  const c = typeof window < "u" ? window : void 0;
                  if (!c) return;
                  const u = c.innerWidth / 2, f = c.innerHeight / 2, h = Vo(t.viewport, u, f);
                  t.applyTemplate(a.id, h.x, h.y), r(!1);
                },
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "6px 6px",
                  border: "none",
                  borderRadius: 4,
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
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      "button",
      {
        ref: n,
        title: "Templates",
        onClick: () => r((l) => !l),
        style: {
          ...Jo,
          width: 36,
          height: 36,
          background: o ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ d(Eo, { name: "template" })
      }
    ),
    i
  ] });
}
function jh({ engine: t }) {
  const e = Kt(), [o, r] = $(!1), [n, s] = $(!1), i = it(null), [l, a] = $(null), c = rt(() => {
    r((h) => (!h && i.current && a(i.current.getBoundingClientRect()), !h));
  }, []), u = rt(() => r(!1), []), f = rt(() => {
    s(!0);
  }, []);
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      "button",
      {
        ref: i,
        title: "Libraries",
        onClick: c,
        style: {
          ...Jo,
          width: 36,
          height: 36,
          background: o ? e.controlBgActive : "transparent",
          color: e.text
        },
        children: /* @__PURE__ */ d(Eo, { name: "library" })
      }
    ),
    /* @__PURE__ */ d(
      Yd,
      {
        engine: t,
        open: o,
        onClose: u,
        triggerRect: l,
        onBrowseDirectory: f
      }
    ),
    n && /* @__PURE__ */ d(
      Bh,
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
function Vh({ engine: t, baseUrl: e }) {
  const o = Kt(), [r, n] = $(!1), s = it(null), [i, l] = $(null), a = rt(() => {
    n((u) => (!u && s.current && l(s.current.getBoundingClientRect()), !u));
  }, []), c = rt(() => n(!1), []);
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      "button",
      {
        ref: s,
        title: "GIF Search",
        onClick: a,
        style: {
          ...Jo,
          width: 36,
          height: 36,
          background: r ? o.controlBgActive : "transparent",
          color: o.text
        },
        children: /* @__PURE__ */ d(Eo, { name: "gif" })
      }
    ),
    /* @__PURE__ */ d(
      Ud,
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
function Uh({ engine: t, gifApiBaseUrl: e }) {
  const o = Kt(), [r, n] = $(t.mode), [s, i] = $(t.boardBackground), [l, a] = $(t.lassoSelect);
  return yt(() => {
    const c = () => n(t.mode), u = () => i(t.boardBackground), f = () => a(t.lassoSelect);
    return t.on("mode", c), t.on("background", u), t.on("lassoToggle", f), () => {
      t.off("mode", c), t.off("background", u), t.off("lassoToggle", f);
    };
  }, [t]), /* @__PURE__ */ v(
    "div",
    {
      "data-sb-toolbar": !0,
      style: {
        width: tr,
        flexShrink: 0,
        background: o.panelBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 0",
        gap: 4
      },
      children: [
        Oh.map((c) => {
          const u = r === c.key && !(c.key === "select" && l);
          return /* @__PURE__ */ v(
            "button",
            {
              title: `${c.label} (${c.shortcut}${c.num ? ` / ${c.num}` : ""})`,
              onClick: () => {
                l && (t.toggleLassoSelect(), a(!1)), t.setMode(c.key);
              },
              style: {
                ...Jo,
                width: 36,
                height: 36,
                background: u ? o.controlBgActive : "transparent",
                color: o.text,
                position: "relative"
              },
              children: [
                /* @__PURE__ */ d(Eo, { name: c.key }),
                /* @__PURE__ */ d(
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
        /* @__PURE__ */ d("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ v(
          "button",
          {
            title: "Lasso Select (L)",
            onClick: () => {
              l ? (t.toggleLassoSelect(), a(!1)) : (t.setMode("select"), t.lassoSelect || t.toggleLassoSelect(), a(!0));
            },
            style: {
              ...Jo,
              width: 36,
              height: 36,
              background: l ? o.controlBgActive : "transparent",
              color: o.text,
              position: "relative"
            },
            children: [
              /* @__PURE__ */ d(Eo, { name: "lasso" }),
              /* @__PURE__ */ d(
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
        /* @__PURE__ */ d("div", { style: { width: 28, height: 1, background: o.separator, margin: "8px 0" } }),
        /* @__PURE__ */ d(Yh, { engine: t, background: s }),
        /* @__PURE__ */ d(Gh, { engine: t }),
        /* @__PURE__ */ d(jh, { engine: t }),
        e && /* @__PURE__ */ d(Vh, { engine: t, baseUrl: e })
      ]
    }
  );
}
const Zh = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky"]), qh = /* @__PURE__ */ new Set(["text", "image", "content", "frame"]);
function Us(t) {
  return t.data.opacity ?? 1;
}
function So(t, e) {
  return t.data[e];
}
function Kh(t) {
  const e = {}, o = t.filter((n) => Zh.has(n.type));
  if (o.length > 0) {
    const n = Us(o[0]), s = o.every((i) => Us(i) === n);
    e.opacity = s ? n : "mixed";
  }
  const r = t.filter((n) => qh.has(n.type));
  if (r.length > 0) {
    const n = So(r[0], "borderColor"), s = r.every(
      (u) => So(u, "borderColor") === n
    );
    e.borderColor = s ? n ?? null : "mixed";
    const i = So(r[0], "borderWidth") ?? 1, l = r.every(
      (u) => (So(u, "borderWidth") ?? 1) === i
    );
    e.borderWidth = l ? i : "mixed";
    const a = So(r[0], "borderStyle") ?? "solid", c = r.every(
      (u) => (So(u, "borderStyle") ?? "solid") === a
    );
    e.borderStyle = c ? a : "mixed";
  }
  return e;
}
function Qh(t) {
  const [e, o] = $(t.mode), [r, n] = $(new Set(t.selection)), [, s] = $(0);
  if (yt(() => {
    const u = () => o(t.mode), f = () => {
      n(new Set(t.selection)), s((p) => p + 1);
    }, h = () => s((p) => p + 1);
    return t.on("mode", u), t.on("selection", f), t.on("change", h), () => {
      t.off("mode", u), t.off("selection", f), t.off("change", h);
    };
  }, [t]), r.size === 0)
    return e === "draw" || e === "shape" || e === "text" ? { target: { kind: "tool", mode: e }, commonProps: {} } : { target: { kind: "none" }, commonProps: {} };
  const i = [];
  for (const u of r) {
    const f = t.getNode(u);
    f && i.push(f);
  }
  if (i.length === 0)
    return { target: { kind: "none" }, commonProps: {} };
  if (i.length === 1)
    return { target: { kind: "single", node: i[0] }, commonProps: {} };
  const l = /* @__PURE__ */ new Map();
  for (const u of i) {
    const f = l.get(u.type);
    f ? f.push(u) : l.set(u.type, [u]);
  }
  const a = [];
  for (const [u, f] of l)
    a.push({ type: u, nodes: f });
  const c = Kh(i);
  return {
    target: { kind: "multi", nodes: i, typeGroups: a },
    commonProps: c
  };
}
const ia = si(null);
function Ae(t, e) {
  const o = ni(ia);
  return rt(
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
function Me({
  value: t,
  onChange: e,
  mixed: o
}) {
  const r = Kt(), n = o || t === void 0 ? 100 : Math.round(t * 100);
  return /* @__PURE__ */ v("div", { style: Lt, children: [
    /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Opacity" }),
    /* @__PURE__ */ d(
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
    /* @__PURE__ */ d("span", { style: { width: 28, textAlign: "right", fontSize: 10, color: o ? r.textFaint : r.text }, children: o ? "--" : n })
  ] });
}
const Jh = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
function ge({
  label: t,
  palettes: e,
  value: o,
  onChange: r,
  allowNull: n,
  mixed: s
}) {
  const i = Kt(), [l, a] = $(""), [c, u] = $(0), [f, h] = $(!1), p = it(null), y = e[c] ?? e[0], g = o == null ? void 0 : o.toLowerCase();
  yt(() => {
    if (!f) return;
    const b = (M) => {
      p.current && !p.current.contains(M.target) && h(!1);
    };
    return document.addEventListener("mousedown", b), () => document.removeEventListener("mousedown", b);
  }, [f]);
  const m = () => {
    const b = l.trim();
    if (!b) return;
    const M = b.startsWith("#") ? b : `#${b}`;
    Jh.test(M) && (r(M), a(""));
  }, w = e.some(
    (b) => b.colors.some((M) => M.toLowerCase() === g)
  );
  return /* @__PURE__ */ v("div", { style: { display: "flex", flexDirection: "column", gap: 3 }, children: [
    /* @__PURE__ */ v("div", { style: { ...Lt, margin: 0, flexWrap: "wrap", gap: 4 }, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: i.textMuted }, children: t }),
      n && /* @__PURE__ */ d(
        "button",
        {
          onClick: () => r(null),
          title: "None",
          style: {
            ...Zt,
            width: 20,
            height: 20,
            background: "transparent",
            border: !s && o == null ? `2px solid ${i.swatchBorderActive}` : `2px solid ${i.textDisabled}`,
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden"
          },
          children: /* @__PURE__ */ d(
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
      y.colors.map((b) => {
        const M = !s && g === b.toLowerCase();
        return /* @__PURE__ */ d(
          "button",
          {
            onClick: () => r(b),
            style: {
              ...Zt,
              width: 20,
              height: 20,
              background: b,
              border: M ? `2px solid ${i.swatchBorderActive}` : "2px solid transparent",
              borderRadius: "50%"
            }
          },
          b
        );
      }),
      o && !w && !s && /* @__PURE__ */ d(
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
      s && /* @__PURE__ */ d("span", { style: { fontSize: 9, color: i.textMuted, fontStyle: "italic" }, children: "Mixed" }),
      e.length > 1 && /* @__PURE__ */ v("div", { ref: p, style: { position: "relative", marginLeft: "auto" }, children: [
        /* @__PURE__ */ v(
          "button",
          {
            onClick: () => h((b) => !b),
            title: "Switch palette",
            style: {
              ...Zt,
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
              y.name,
              /* @__PURE__ */ d("span", { style: { fontSize: 7 }, children: f ? "▲" : "▼" })
            ]
          }
        ),
        f && /* @__PURE__ */ d(
          "div",
          {
            style: {
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: 2,
              background: i.panelBg,
              border: `1px solid ${i.border}`,
              borderRadius: 6,
              padding: 4,
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              minWidth: 120,
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
            },
            children: e.map((b, M) => /* @__PURE__ */ v(
              "button",
              {
                onClick: () => {
                  u(M), h(!1);
                },
                style: {
                  ...Zt,
                  height: 28,
                  padding: "0 8px",
                  background: M === c ? i.controlBgActive : "transparent",
                  color: i.text,
                  fontSize: 10,
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                  justifyContent: "flex-start"
                },
                children: [
                  /* @__PURE__ */ d("span", { style: { display: "flex", gap: 2 }, children: b.colors.slice(0, 6).map((S) => /* @__PURE__ */ d(
                    "span",
                    {
                      style: {
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: S,
                        display: "inline-block"
                      }
                    },
                    S
                  )) }),
                  /* @__PURE__ */ d("span", { children: b.name })
                ]
              },
              b.name
            ))
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ d("div", { style: { display: "flex", alignItems: "center", gap: 4, paddingLeft: 52 }, children: /* @__PURE__ */ d(
      "input",
      {
        type: "text",
        value: l,
        onChange: (b) => a(b.target.value),
        onKeyDown: (b) => {
          b.key === "Enter" && m();
        },
        onBlur: m,
        placeholder: o ?? "#000000",
        style: {
          width: 72,
          height: 20,
          background: i.controlBg,
          border: `1px solid ${i.border}`,
          borderRadius: 4,
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
function Lo({
  label: t,
  value: e,
  onChange: o,
  mixed: r
}) {
  const n = Kt();
  return /* @__PURE__ */ v("div", { style: Lt, children: [
    /* @__PURE__ */ d("span", { style: { ...Ft, color: n.textMuted }, children: t }),
    Dh.map((s) => /* @__PURE__ */ d(
      "button",
      {
        title: s.label,
        onClick: () => o(s.key),
        style: {
          ...Zt,
          width: 36,
          height: 28,
          background: !r && e === s.key ? n.controlBgActive : n.controlBg,
          borderRadius: n.controlBorderRadius
        },
        children: /* @__PURE__ */ d("svg", { width: 24, height: 12, children: /* @__PURE__ */ d(
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
function Fo({
  label: t,
  widths: e = Eh,
  value: o,
  onChange: r,
  mixed: n
}) {
  const s = Kt();
  return /* @__PURE__ */ v("div", { style: Lt, children: [
    /* @__PURE__ */ d("span", { style: { ...Ft, color: s.textMuted }, children: t }),
    e.map((i) => /* @__PURE__ */ d(
      "button",
      {
        title: `${i}px`,
        onClick: () => r(i),
        style: {
          ...Zt,
          width: 36,
          height: 24,
          background: !n && o === i ? s.controlBgActive : s.controlBg,
          borderRadius: s.controlBorderRadius
        },
        children: /* @__PURE__ */ d(
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
function er({
  borderColor: t,
  borderStyle: e,
  borderWidth: o,
  mixed: r,
  onChange: n
}) {
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      ge,
      {
        label: "Border",
        palettes: Se,
        value: t,
        onChange: (s) => n("borderColor", s ?? void 0),
        allowNull: !0,
        mixed: r == null ? void 0 : r.color
      }
    ),
    (t || (r == null ? void 0 : r.color)) && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d(
        Lo,
        {
          label: "Style",
          value: e ?? "solid",
          onChange: (s) => n("borderStyle", s),
          mixed: r == null ? void 0 : r.style
        }
      ),
      /* @__PURE__ */ d(
        Fo,
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
function $n({ style: t }) {
  const e = Kt();
  return t === "hachure" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ d("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ d("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.5 }),
    /* @__PURE__ */ d("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ d("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: e.text, strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: e.text, strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ d("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ d("rect", { x: 2, y: 2, width: 16, height: 12, fill: e.text, rx: 2 }) });
}
const $h = /* @__PURE__ */ v("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
  /* @__PURE__ */ d("circle", { cx: "11", cy: "11", r: "8" }),
  /* @__PURE__ */ d("path", { d: "m21 21-4.35-4.35" })
] });
function Er({
  value: t,
  onChange: e,
  fontsInScene: o,
  triggerStyle: r
}) {
  var b, M;
  const n = Kt(), [s, i] = $(!1), [l, a] = $(""), c = it(null), u = it(null), [f, h] = $(null), p = l.trim().toLowerCase(), y = qt(
    () => o.filter((S) => S.toLowerCase().includes(p)),
    [o, p]
  ), g = qt(
    () => yr.filter(
      (S) => !o.includes(S.key) && (S.key.toLowerCase().includes(p) || S.label.toLowerCase().includes(p))
    ),
    [o, p]
  );
  yt(() => {
    if (!s || !u.current) return;
    const S = u.current.getBoundingClientRect(), A = 260, O = 16;
    let j = S.left;
    j + A > window.innerWidth - O && (j = window.innerWidth - A - O), j < O && (j = O), h({ top: S.bottom + 4, left: j });
  }, [s]), yt(() => {
    var O;
    if (!s) return;
    const S = (j) => {
      var dt, B;
      const Y = j.target;
      if ((dt = c.current) != null && dt.contains(Y)) return;
      const J = (((B = c.current) == null ? void 0 : B.ownerDocument) ?? document).getElementById("font-picker-popover");
      J != null && J.contains(Y) || i(!1);
    }, A = ((O = c.current) == null ? void 0 : O.ownerDocument) ?? document;
    return A.addEventListener("mousedown", S), () => A.removeEventListener("mousedown", S);
  }, [s]);
  const m = (S) => {
    e(S), i(!1), a("");
  }, w = (S, A) => {
    const O = (A == null ? void 0 : A.label) ?? S, j = A == null ? void 0 : A.category, Y = t === S;
    return /* @__PURE__ */ v(
      "button",
      {
        type: "button",
        onClick: () => m(S),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "8px 12px",
          border: "none",
          background: Y ? "rgba(139, 92, 246, 0.15)" : "transparent",
          color: "#1e1e2e",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: We(S),
          fontSize: 14,
          borderRadius: 6
        },
        onMouseEnter: (_) => {
          Y || (_.currentTarget.style.background = "rgba(0,0,0,0.05)");
        },
        onMouseLeave: (_) => {
          Y || (_.currentTarget.style.background = "transparent");
        },
        children: [
          /* @__PURE__ */ d(
            "span",
            {
              style: {
                width: 24,
                flexShrink: 0,
                fontSize: 12,
                color: "#64748b",
                fontFamily: "sans-serif"
              },
              children: dl(j)
            }
          ),
          /* @__PURE__ */ d("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis" }, children: O })
        ]
      },
      S
    );
  };
  return /* @__PURE__ */ v("div", { ref: c, style: { position: "relative", flex: 1, minWidth: 0 }, children: [
    /* @__PURE__ */ v(
      "button",
      {
        ref: u,
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
          fontFamily: We(t),
          cursor: "pointer",
          textAlign: "left",
          justifyContent: "space-between",
          ...r
        },
        children: [
          /* @__PURE__ */ d("span", { style: { overflow: "hidden", textOverflow: "ellipsis" }, children: ((b = yr.find((S) => S.key === t)) == null ? void 0 : b.label) ?? t }),
          /* @__PURE__ */ d(
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
                  /* @__PURE__ */ d("span", { style: { color: "#64748b", display: "flex" }, children: $h }),
                  /* @__PURE__ */ d(
                    "input",
                    {
                      type: "text",
                      placeholder: "Quick search",
                      value: l,
                      onChange: (S) => a(S.target.value),
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
              y.length > 0 && /* @__PURE__ */ v("div", { style: { marginBottom: 12 }, children: [
                /* @__PURE__ */ d(
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
                y.map((S) => w(S, yr.find((A) => A.key === S)))
              ] }),
              /* @__PURE__ */ v("div", { children: [
                /* @__PURE__ */ d(
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
                g.length > 0 ? g.map((S) => w(S.key, S)) : /* @__PURE__ */ d(
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
      (((M = c.current) == null ? void 0 : M.ownerDocument) ?? document).body
    )
  ] });
}
function _n({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "sharp" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", ...o }),
    t === "round" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", rx: "4", ...o })
  ] });
}
const _h = [
  { label: "S", size: 14 },
  { label: "M", size: 20 },
  { label: "L", size: 28 },
  { label: "XL", size: 36 }
], tu = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function eu({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ d("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ d("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ d("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function ou({ engine: t, node: e, fontsInScene: o }) {
  const r = Kt(), n = Ae(t, e), { data: s } = e, i = s.fill ?? null, l = s.fillStyle ?? "hachure", a = s.strokeStyle ?? "solid";
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Shape" }),
      tu.map((c) => /* @__PURE__ */ d(
        "button",
        {
          title: c.label,
          onClick: () => n({ shape: c.key }),
          style: {
            ...Zt,
            width: 28,
            height: 28,
            background: s.shape === c.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ d(eu, { name: c.key })
        },
        c.key
      ))
    ] }),
    (s.shape === "rect" || s.shape === "diamond") && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((c) => /* @__PURE__ */ d(
        "button",
        {
          title: c.label,
          onClick: () => n({ edgeStyle: c.key === "sharp" ? void 0 : c.key }),
          style: {
            ...Zt,
            width: 28,
            height: 28,
            background: (s.edgeStyle ?? "sharp") === c.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ d(_n, { name: c.key })
        },
        c.key
      ))
    ] }),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Label" }),
      /* @__PURE__ */ d(
        "input",
        {
          type: "text",
          value: s.label ?? "",
          placeholder: "Add label...",
          onChange: (c) => n({ label: c.target.value || void 0 }),
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
    s.label && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Font" }),
      /* @__PURE__ */ d(
        Er,
        {
          value: s.labelFontFamily ?? "Excalifont",
          onChange: (c) => n({ labelFontFamily: c === "Excalifont" ? void 0 : c }),
          fontsInScene: o
        }
      )
    ] }),
    s.label && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Size" }),
      _h.map((c) => /* @__PURE__ */ d(
        "button",
        {
          onClick: () => n({ labelFontSize: c.size === 14 ? void 0 : c.size }),
          style: {
            ...Zt,
            width: 36,
            height: 28,
            background: (s.labelFontSize ?? 14) === c.size ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 10,
            fontWeight: 600,
            borderRadius: r.controlBorderRadius
          },
          children: c.label
        },
        c.size
      ))
    ] }),
    s.label && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Align" }),
      Qn.map((c) => /* @__PURE__ */ d(
        "button",
        {
          title: c.key,
          onClick: () => n({ labelAlign: c.key === "center" ? void 0 : c.key }),
          style: {
            ...Zt,
            width: 36,
            height: 28,
            background: (s.labelAlign ?? "center") === c.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 12,
            borderRadius: r.controlBorderRadius
          },
          children: c.label
        },
        c.key
      ))
    ] }),
    /* @__PURE__ */ d(
      ge,
      {
        label: "Stroke",
        palettes: Se,
        value: s.stroke,
        onChange: (c) => n({ stroke: c })
      }
    ),
    /* @__PURE__ */ d(
      ge,
      {
        label: "Fill",
        palettes: Jn,
        value: i,
        onChange: (c) => n({ fill: c ?? void 0 }),
        allowNull: !0
      }
    ),
    i && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Fill pattern" }),
      qn.map((c) => /* @__PURE__ */ d(
        "button",
        {
          title: c.label,
          onClick: () => n({ fillStyle: c.key }),
          style: {
            ...Zt,
            width: 36,
            height: 28,
            background: l === c.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ d($n, { style: c.key })
        },
        c.key
      ))
    ] }),
    /* @__PURE__ */ d(
      Lo,
      {
        label: "Stroke style",
        value: a,
        onChange: (c) => n({ strokeStyle: c })
      }
    ),
    /* @__PURE__ */ d(
      Fo,
      {
        label: "Stroke width",
        value: s.strokeWidth,
        onChange: (c) => n({ strokeWidth: c })
      }
    ),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Roughness" }),
      Kn.map((c) => /* @__PURE__ */ d(
        "button",
        {
          title: c.label,
          onClick: () => n({ roughness: c.value }),
          style: {
            ...Zt,
            height: 28,
            padding: "0 8px",
            background: s.roughness === c.value ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: c.label
        },
        c.value
      ))
    ] }),
    /* @__PURE__ */ d(
      Me,
      {
        value: s.opacity ?? 1,
        onChange: (c) => n({ opacity: c })
      }
    )
  ] });
}
function ru({ engine: t, node: e }) {
  const o = Kt(), r = Ae(t, e), { data: n } = e, s = n.fill ?? null, i = n.fillStyle ?? "hachure", l = n.strokeStyle ?? "solid";
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      ge,
      {
        label: "Stroke",
        palettes: Se,
        value: n.color,
        onChange: (a) => r({ color: a })
      }
    ),
    /* @__PURE__ */ d(
      ge,
      {
        label: "Fill",
        palettes: Jn,
        value: s,
        onChange: (a) => r({ fill: a ?? void 0 }),
        allowNull: !0
      }
    ),
    s && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Fill pattern" }),
      qn.map((a) => /* @__PURE__ */ d(
        "button",
        {
          title: a.label,
          onClick: () => r({ fillStyle: a.key }),
          style: {
            ...Zt,
            width: 36,
            height: 28,
            background: i === a.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            fontSize: 9,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ d($n, { style: a.key })
        },
        a.key
      ))
    ] }),
    /* @__PURE__ */ d(
      Lo,
      {
        label: "Stroke style",
        value: l,
        onChange: (a) => r({ strokeStyle: a })
      }
    ),
    /* @__PURE__ */ d(
      Fo,
      {
        label: "Stroke width",
        value: n.strokeWidth,
        onChange: (a) => r({ strokeWidth: a })
      }
    ),
    /* @__PURE__ */ d(
      Me,
      {
        value: n.opacity ?? 1,
        onChange: (a) => r({ opacity: a })
      }
    )
  ] });
}
function nu({ engine: t, node: e, fontsInScene: o }) {
  const r = Kt(), n = Ae(t, e), { data: s } = e;
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Font" }),
      /* @__PURE__ */ d(
        Er,
        {
          value: s.fontFamily,
          onChange: (i) => n({ fontFamily: i }),
          fontsInScene: o
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Size" }),
      sa.map((i) => /* @__PURE__ */ d(
        "button",
        {
          onClick: () => n({ fontSize: i }),
          style: {
            ...Zt,
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
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Align" }),
      Qn.map((i) => /* @__PURE__ */ d(
        "button",
        {
          title: i.key,
          onClick: () => n({ align: i.key }),
          style: {
            ...Zt,
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
    /* @__PURE__ */ d(
      ge,
      {
        label: "Color",
        palettes: Se,
        value: s.color,
        onChange: (i) => n({ color: i })
      }
    ),
    /* @__PURE__ */ d(
      er,
      {
        borderColor: s.borderColor ?? null,
        borderStyle: s.borderStyle,
        borderWidth: s.borderWidth,
        onChange: (i, l) => n({ [i]: l })
      }
    ),
    /* @__PURE__ */ d(
      Me,
      {
        value: s.opacity ?? 1,
        onChange: (i) => n({ opacity: i })
      }
    )
  ] });
}
function su({ engine: t, node: e }) {
  const o = Kt(), r = Ae(t, e), { data: n } = e;
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      ge,
      {
        label: "Color",
        palettes: Se,
        value: n.color,
        onChange: (s) => r({ color: s })
      }
    ),
    /* @__PURE__ */ d(
      Lo,
      {
        label: "Style",
        value: n.style,
        onChange: (s) => r({ style: s })
      }
    ),
    /* @__PURE__ */ d(
      Fo,
      {
        label: "Width",
        value: n.strokeWidth,
        onChange: (s) => r({ strokeWidth: s })
      }
    ),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Roughness" }),
      Kn.map((s) => /* @__PURE__ */ d(
        "button",
        {
          title: s.label,
          onClick: () => r({ roughness: s.value }),
          style: {
            ...Zt,
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
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Head" }),
      ["none", "arrow", "filled", "dot"].map((s) => /* @__PURE__ */ d(
        "button",
        {
          onClick: () => r({ arrowHead: s }),
          style: {
            ...Zt,
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
    (n.arrowHead ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Head size" }),
      /* @__PURE__ */ d(
        "input",
        {
          type: "range",
          min: 4,
          max: 40,
          step: 1,
          value: n.arrowHeadSize ?? Math.max(8, n.strokeWidth * 3),
          onChange: (s) => r({ arrowHeadSize: Number(s.target.value) }),
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ d("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: n.arrowHeadSize ?? Math.max(8, n.strokeWidth * 3) })
    ] }),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Tail" }),
      ["none", "arrow", "filled", "dot"].map((s) => /* @__PURE__ */ d(
        "button",
        {
          onClick: () => r({ arrowTail: s }),
          style: {
            ...Zt,
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
    (n.arrowTail ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Tail size" }),
      /* @__PURE__ */ d(
        "input",
        {
          type: "range",
          min: 4,
          max: 40,
          step: 1,
          value: n.arrowTailSize ?? Math.max(8, n.strokeWidth * 3),
          onChange: (s) => r({ arrowTailSize: Number(s.target.value) }),
          style: { flex: 1 }
        }
      ),
      /* @__PURE__ */ d("span", { style: { color: o.textMuted, fontSize: 11, minWidth: 24, textAlign: "right" }, children: n.arrowTailSize ?? Math.max(8, n.strokeWidth * 3) })
    ] }),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Label" }),
      /* @__PURE__ */ d(
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
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Path" }),
      [
        { key: "bezier", label: "Bezier" },
        { key: "straight", label: "Straight" },
        { key: "smoothstep", label: "Smooth" },
        { key: "step", label: "Step" }
      ].map((s) => /* @__PURE__ */ d(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeType: s.key }),
          style: {
            ...Zt,
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
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Animate" }),
      /* @__PURE__ */ d(
        "button",
        {
          onClick: () => r({ animated: !n.animated }),
          style: {
            ...Zt,
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
    n.animated && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Direction" }),
      ["forward", "reverse", "both"].map((s) => /* @__PURE__ */ d(
        "button",
        {
          onClick: () => r({ animatedDirection: s }),
          style: {
            ...Zt,
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
function iu({ engine: t, node: e }) {
  const o = Kt(), [r, n] = $("idle"), s = Ae(t, e), { data: i } = e, l = !!i.crop;
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      er,
      {
        borderColor: i.borderColor ?? null,
        borderStyle: i.borderStyle,
        borderWidth: i.borderWidth,
        onChange: (a, c) => s({ [a]: c })
      }
    ),
    /* @__PURE__ */ v("div", { style: { ...Lt, marginTop: 4 }, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Crop" }),
      /* @__PURE__ */ d(
        "button",
        {
          onClick: () => t.requestImageCrop(e.id),
          style: {
            ...Zt,
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
      l && /* @__PURE__ */ d(
        "button",
        {
          onClick: () => s({ crop: void 0 }),
          style: {
            ...Zt,
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
    /* @__PURE__ */ v("div", { style: { ...Lt, marginTop: 4 }, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Background" }),
      /* @__PURE__ */ d(
        "button",
        {
          onClick: async () => {
            if (r !== "loading") {
              n("loading");
              try {
                const { removeBackground: a } = await import("@imgly/background-removal"), u = await (await fetch(i.src)).blob(), f = await a(u), h = new FileReader(), p = await new Promise((y, g) => {
                  h.onload = () => y(h.result), h.onerror = g, h.readAsDataURL(f);
                });
                s({ src: p }), n("idle");
              } catch (a) {
                console.error("Background removal failed:", a), n("error"), setTimeout(() => n("idle"), 3e3);
              }
            }
          },
          disabled: r === "loading",
          style: {
            ...Zt,
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
    /* @__PURE__ */ d(
      Me,
      {
        value: i.opacity ?? 1,
        onChange: (a) => s({ opacity: a })
      }
    )
  ] });
}
function au({ engine: t, node: e }) {
  const o = Kt(), r = Ae(t, e), { data: n } = e;
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      er,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ d(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...Zt,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ d(_n, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ d(
      Me,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
const Zo = {
  pan: 400,
  fade: 500,
  dissolve: 400,
  zoom: 600,
  fold: 700,
  cube: 1200,
  none: 0
}, lu = Ch();
function cu({
  value: t,
  onChange: e,
  theme: o
}) {
  const [r, n] = $(String(t));
  yt(() => n(String(t)), [t]);
  const s = () => {
    const i = parseInt(r, 10);
    !isNaN(i) && i >= 100 && i <= 5e3 ? e(i) : n(String(t));
  };
  return /* @__PURE__ */ v("div", { style: Lt, children: [
    /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Duration" }),
    /* @__PURE__ */ d(
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
    /* @__PURE__ */ d("span", { style: { fontSize: 10, color: o.textMuted }, children: "ms" })
  ] });
}
function du({ engine: t, node: e }) {
  const o = Kt(), r = Ae(t, e), { data: n } = e, s = rt(
    (l) => {
      var h;
      if (!l) {
        r({ devicePreset: void 0 });
        return;
      }
      const a = vn(l);
      if (!a) return;
      const c = na(a), u = Math.round(e.w / c), f = { devicePreset: l };
      (!n.label || ((h = vn(n.devicePreset ?? "")) == null ? void 0 : h.label) === n.label) && (f.label = a.label), r(f), t.updateNodeWithHistory(e.id, { h: u });
    },
    [t, e, n.label, n.devicePreset, r]
  ), i = qt(() => {
    const l = t.getAllNodes().filter((h) => h.type === "frame"), a = l.length, c = /* @__PURE__ */ new Set();
    for (const h of l)
      h.id !== e.id && h.data.slideOrder != null && c.add(h.data.slideOrder);
    const u = [];
    for (let h = 1; h <= a; h++)
      c.has(h) || u.push(h);
    const f = e.data.slideOrder;
    return f != null && !u.includes(f) && (u.push(f), u.sort((h, p) => h - p)), u;
  }, [t, e]);
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Label" }),
      /* @__PURE__ */ d(
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
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Device" }),
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
            /* @__PURE__ */ d("option", { value: "", children: "Freeform" }),
            lu.map((l) => /* @__PURE__ */ d("optgroup", { label: l.label, children: l.presets.map((a) => /* @__PURE__ */ v("option", { value: a.key, children: [
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
    /* @__PURE__ */ d(
      ge,
      {
        label: "Background",
        palettes: Se,
        value: (() => {
          const l = n.backgroundColor;
          if (!l) return null;
          for (const a of Se) {
            const c = a.colors.find((u) => l === `${u}15`);
            if (c) return c;
          }
          return l.length === 9 && l.endsWith("15") ? l.slice(0, 7) : null;
        })(),
        onChange: (l) => r({ backgroundColor: l ? `${l}15` : void 0 }),
        allowNull: !0
      }
    ),
    /* @__PURE__ */ d(
      ge,
      {
        label: "Border",
        palettes: Se,
        value: n.borderColor,
        onChange: (l) => r({ borderColor: l })
      }
    ),
    /* @__PURE__ */ d(
      Lo,
      {
        label: "Style",
        value: n.borderStyle ?? "dashed",
        onChange: (l) => r({ borderStyle: l })
      }
    ),
    /* @__PURE__ */ d(
      Fo,
      {
        label: "Width",
        value: n.borderWidth ?? 1,
        onChange: (l) => r({ borderWidth: l })
      }
    ),
    /* @__PURE__ */ d(
      Me,
      {
        value: n.opacity ?? 1,
        onChange: (l) => r({ opacity: l })
      }
    ),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Slide #" }),
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
            /* @__PURE__ */ d("option", { value: "", children: "Auto" }),
            i.map((l) => /* @__PURE__ */ d("option", { value: l, children: l }, l))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Transition" }),
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
            /* @__PURE__ */ d("option", { value: "pan", children: "Pan" }),
            /* @__PURE__ */ d("option", { value: "fade", children: "Fade to Black" }),
            /* @__PURE__ */ d("option", { value: "dissolve", children: "Dissolve" }),
            /* @__PURE__ */ d("option", { value: "zoom", children: "Zoom" }),
            /* @__PURE__ */ d("option", { value: "fold", children: "Fold" }),
            /* @__PURE__ */ d("option", { value: "cube", children: "Cube" }),
            /* @__PURE__ */ d("option", { value: "none", children: "None (instant)" })
          ]
        }
      )
    ] }),
    (n.transition ?? "pan") !== "none" && /* @__PURE__ */ d(
      cu,
      {
        value: n.transitionDuration ?? Zo[n.transition ?? "pan"],
        onChange: (l) => r({ transitionDuration: l === Zo[n.transition ?? "pan"] ? void 0 : l }),
        theme: o
      }
    )
  ] });
}
function hu({ engine: t, node: e }) {
  const o = Kt(), r = Ae(t, e), { data: n } = e;
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      ge,
      {
        label: "Color",
        palettes: Lh,
        value: n.color,
        onChange: (s) => {
          s && r({ color: s });
        }
      }
    ),
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Size" }),
      [12, 14, 16, 20, 24].map((s) => /* @__PURE__ */ d(
        "button",
        {
          onClick: () => r({ fontSize: s }),
          style: {
            ...Zt,
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
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Edges" }),
      [
        { key: "sharp", label: "Sharp" },
        { key: "round", label: "Round" }
      ].map((s) => /* @__PURE__ */ d(
        "button",
        {
          title: s.label,
          onClick: () => r({ edgeStyle: s.key === "sharp" ? void 0 : s.key }),
          style: {
            ...Zt,
            width: 28,
            height: 28,
            background: (n.edgeStyle ?? "sharp") === s.key ? o.controlBgActive : o.controlBg,
            color: o.text,
            borderRadius: o.controlBorderRadius
          },
          children: /* @__PURE__ */ d(_n, { name: s.key })
        },
        s.key
      ))
    ] }),
    /* @__PURE__ */ d(
      Me,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function uu({ engine: t, node: e }) {
  const o = Kt(), r = Ae(t, e), { data: n } = e;
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "URL" }),
      /* @__PURE__ */ d(
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
    /* @__PURE__ */ d(
      er,
      {
        borderColor: n.borderColor ?? null,
        borderStyle: n.borderStyle,
        borderWidth: n.borderWidth,
        onChange: (s, i) => r({ [s]: i })
      }
    ),
    /* @__PURE__ */ d(
      Me,
      {
        value: n.opacity ?? 1,
        onChange: (s) => r({ opacity: s })
      }
    )
  ] });
}
function fu({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ d("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ d("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ d("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
const pu = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
];
function yu({ engine: t, mode: e, fontsInScene: o }) {
  const r = Kt(), [, n] = $(0), s = rt(() => n((y) => y + 1), []), i = t.activeTool;
  if (e === "text") {
    const y = i.fontFamily ?? Ee, g = i.fontSize ?? 20, m = i.textAlign ?? "left", w = i.color;
    return /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ v("div", { style: Lt, children: [
        /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Font" }),
        /* @__PURE__ */ d(
          Er,
          {
            value: y,
            onChange: (b) => {
              i.fontFamily = b, s();
            },
            fontsInScene: o
          }
        )
      ] }),
      /* @__PURE__ */ v("div", { style: Lt, children: [
        /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Size" }),
        sa.map((b) => /* @__PURE__ */ d(
          "button",
          {
            onClick: () => {
              i.fontSize = b, s();
            },
            style: {
              ...Zt,
              width: 36,
              height: 28,
              background: g === b ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 10,
              borderRadius: r.controlBorderRadius
            },
            children: b
          },
          b
        ))
      ] }),
      /* @__PURE__ */ v("div", { style: Lt, children: [
        /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Align" }),
        Qn.map((b) => /* @__PURE__ */ d(
          "button",
          {
            title: b.key,
            onClick: () => {
              i.textAlign = b.key, s();
            },
            style: {
              ...Zt,
              width: 36,
              height: 28,
              background: m === b.key ? r.controlBgActive : r.controlBg,
              color: r.text,
              fontSize: 12,
              borderRadius: r.controlBorderRadius
            },
            children: b.label
          },
          b.key
        ))
      ] }),
      /* @__PURE__ */ d(
        ge,
        {
          label: "Color",
          palettes: Se,
          value: w,
          onChange: (b) => {
            i.color = b, s();
          }
        }
      ),
      /* @__PURE__ */ d(
        Me,
        {
          value: i.opacity ?? 1,
          onChange: (b) => {
            i.opacity = b, s();
          }
        }
      )
    ] });
  }
  const l = e === "shape", a = i.color, c = i.fillColor ?? null, u = i.fillStyle ?? "hachure", f = i.strokeStyle ?? "solid", h = i.width, p = i.roughness ?? 1;
  return /* @__PURE__ */ v(lt, { children: [
    l && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Shape" }),
      pu.map((y) => /* @__PURE__ */ d(
        "button",
        {
          title: y.label,
          onClick: () => {
            i.shapeType = y.key, s();
          },
          style: {
            ...Zt,
            width: 28,
            height: 28,
            background: (i.shapeType ?? "rect") === y.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ d(fu, { name: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ d(
      ge,
      {
        label: "Stroke",
        palettes: Se,
        value: a,
        onChange: (y) => {
          i.color = y, s();
        }
      }
    ),
    /* @__PURE__ */ d(
      ge,
      {
        label: "Fill",
        palettes: Jn,
        value: c,
        onChange: (y) => {
          i.fillColor = y ?? void 0, s();
        },
        allowNull: !0
      }
    ),
    c && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Fill pattern" }),
      qn.map((y) => /* @__PURE__ */ d(
        "button",
        {
          title: y.label,
          onClick: () => {
            i.fillStyle = y.key, s();
          },
          style: {
            ...Zt,
            width: 36,
            height: 28,
            background: u === y.key ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: /* @__PURE__ */ d($n, { style: y.key })
        },
        y.key
      ))
    ] }),
    /* @__PURE__ */ d(
      Lo,
      {
        label: "Stroke style",
        value: f,
        onChange: (y) => {
          i.strokeStyle = y, s();
        }
      }
    ),
    /* @__PURE__ */ d(
      Fo,
      {
        label: "Stroke width",
        value: h,
        onChange: (y) => {
          i.width = y, s();
        }
      }
    ),
    l && /* @__PURE__ */ v("div", { style: Lt, children: [
      /* @__PURE__ */ d("span", { style: { ...Ft, color: r.textMuted }, children: "Roughness" }),
      Kn.map((y) => /* @__PURE__ */ d(
        "button",
        {
          title: y.label,
          onClick: () => {
            i.roughness = y.value, s();
          },
          style: {
            ...Zt,
            height: 28,
            padding: "0 8px",
            background: p === y.value ? r.controlBgActive : r.controlBg,
            color: r.text,
            fontSize: 9,
            borderRadius: r.controlBorderRadius
          },
          children: y.label
        },
        y.value
      ))
    ] }),
    /* @__PURE__ */ d(
      Me,
      {
        value: i.opacity ?? 1,
        onChange: (y) => {
          i.opacity = y, s();
        }
      }
    )
  ] });
}
function gu({ engine: t, node: e, PanelComponent: o }) {
  const r = Ae(t, e);
  return /* @__PURE__ */ d(o, { node: e, data: e.data, engine: t, updateData: r });
}
const Mn = {
  shape: "Shape",
  draw: "Drawing",
  text: "Text",
  edge: "Edge",
  image: "Image",
  content: "Content",
  frame: "Frame",
  sticky: "Sticky Note",
  youtube: "YouTube"
}, mu = /* @__PURE__ */ new Set(["shape", "draw", "text", "image", "content", "frame", "sticky", "youtube"]), bu = /* @__PURE__ */ new Set(["text", "image", "content", "frame", "youtube"]);
function xu(t) {
  const e = /* @__PURE__ */ new Set(), o = [];
  for (const r of t.getAllNodes()) {
    let n;
    r.type === "text" ? n = r.data.fontFamily : r.type === "shape" && (n = r.data.labelFontFamily), n && !e.has(n) && (e.add(n), o.push(n));
  }
  return o;
}
function wu({ label: t }) {
  const e = Kt();
  return /* @__PURE__ */ d(
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
function aa({
  engine: t,
  node: e,
  registry: o,
  fontsInScene: r
}) {
  switch (e.type) {
    case "shape":
      return /* @__PURE__ */ d(ou, { engine: t, node: e, fontsInScene: r });
    case "draw":
      return /* @__PURE__ */ d(ru, { engine: t, node: e });
    case "text":
      return /* @__PURE__ */ d(nu, { engine: t, node: e, fontsInScene: r });
    case "edge":
      return /* @__PURE__ */ d(su, { engine: t, node: e });
    case "image":
      return /* @__PURE__ */ d(iu, { engine: t, node: e });
    case "content":
      return /* @__PURE__ */ d(au, { engine: t, node: e });
    case "frame":
      return /* @__PURE__ */ d(du, { engine: t, node: e });
    case "sticky":
      return /* @__PURE__ */ d(hu, { engine: t, node: e });
    case "youtube":
      return /* @__PURE__ */ d(uu, { engine: t, node: e });
    default: {
      const n = o == null ? void 0 : o.get(e.type);
      return n != null && n.propertiesPanel ? /* @__PURE__ */ d(gu, { engine: t, node: e, PanelComponent: n.propertiesPanel }) : null;
    }
  }
}
function Zs({
  engine: t,
  nodes: e
}) {
  const o = Kt(), r = Math.round(e[0].rotation ?? 0), s = e.every(
    (c) => Math.round(c.rotation ?? 0) === r
  ) ? r : null, [i, l] = $(null), a = rt(
    (c) => {
      l(null);
      const u = parseFloat(c);
      if (isNaN(u)) return;
      const f = Math.max(-360, Math.min(360, u)), h = e.map((p) => ({
        id: p.id,
        patch: { rotation: f }
      }));
      t.batchUpdateWithHistory(h);
    },
    [t, e]
  );
  return /* @__PURE__ */ v("div", { style: Lt, children: [
    /* @__PURE__ */ d("span", { style: { ...Ft, color: o.textMuted }, children: "Rotation" }),
    /* @__PURE__ */ d(
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
    /* @__PURE__ */ d("span", { style: { fontSize: 10, color: o.textMuted }, children: "°" })
  ] });
}
function ku({
  engine: t,
  nodes: e,
  commonProps: o
}) {
  const r = rt(
    (n, s) => {
      const i = n === "opacity" ? mu : bu, l = e.filter((a) => i.has(a.type)).map((a) => ({
        id: a.id,
        patch: {
          data: { ...a.data, [n]: s }
        }
      }));
      t.batchUpdateWithHistory(l);
    },
    [t, e]
  );
  return /* @__PURE__ */ v(lt, { children: [
    o.opacity !== void 0 && /* @__PURE__ */ d(
      Me,
      {
        value: o.opacity === "mixed" ? void 0 : o.opacity,
        mixed: o.opacity === "mixed",
        onChange: (n) => r("opacity", n)
      }
    ),
    o.borderColor !== void 0 && /* @__PURE__ */ d(
      er,
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
function vu({
  engine: t,
  group: e,
  registry: o,
  fontsInScene: r
}) {
  const n = Mn[e.type] ?? e.type, s = e.nodes.length, i = e.nodes[0], l = Kt();
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ v("div", { style: { ...Fh, color: l.textFaint, borderTop: `1px solid ${l.border}` }, children: [
      n,
      " (",
      s,
      ")"
    ] }),
    /* @__PURE__ */ d(ia.Provider, { value: e.nodes, children: /* @__PURE__ */ d(
      aa,
      {
        engine: t,
        node: i,
        registry: o,
        fontsInScene: r
      }
    ) })
  ] });
}
function Su(t) {
  switch (t.kind) {
    case "none":
      return "No selection";
    case "tool":
      return `${t.mode.charAt(0).toUpperCase() + t.mode.slice(1)} tool`;
    case "single":
      return Mn[t.node.type] ?? t.node.type;
    case "multi":
      return t.typeGroups.map(
        (o) => `${o.nodes.length} ${(Mn[o.type] ?? o.type).toLowerCase()}${o.nodes.length > 1 ? "s" : ""}`
      ).join(", ");
  }
}
function Mu({
  engine: t,
  registry: e,
  target: o,
  commonProps: r
}) {
  const n = qt(() => xu(t), [t, o]), s = Su(o);
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(wu, { label: s }),
    o.kind === "tool" && /* @__PURE__ */ d(yu, { engine: t, mode: o.mode, fontsInScene: n }),
    o.kind === "single" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d(
        aa,
        {
          engine: t,
          node: o.node,
          registry: e,
          fontsInScene: n
        }
      ),
      /* @__PURE__ */ d(Zs, { engine: t, nodes: [o.node] })
    ] }),
    o.kind === "multi" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d(ku, { engine: t, nodes: o.nodes, commonProps: r }),
      /* @__PURE__ */ d(Zs, { engine: t, nodes: o.nodes }),
      o.typeGroups.map((i) => /* @__PURE__ */ d(
        vu,
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
function Cu({ engine: t, registry: e }) {
  const o = Kt(), { target: r, commonProps: n } = Qh(t), s = r.kind !== "none", i = it(null), [l, a] = $(null), c = it(null), [u, f] = $(!1), h = rt(() => {
    var M, S;
    const w = (M = i.current) == null ? void 0 : M.offsetParent;
    if (w) return { width: w.clientWidth, height: w.clientHeight };
    const b = ((S = i.current) == null ? void 0 : S.ownerDocument.defaultView) ?? window;
    return { width: b.innerWidth, height: b.innerHeight };
  }, []), p = rt(() => {
    const { width: w } = h();
    return { x: w - jo - 16, y: 12 };
  }, [h]), y = l ?? p(), g = it(!1);
  In(() => {
    if (!g.current && i.current && !l) {
      g.current = !0;
      const w = i.current.offsetParent;
      w && a({ x: w.clientWidth - jo - 16, y: 12 });
    }
  });
  const m = rt(
    (w) => {
      w.stopPropagation(), f(!0);
      const b = l ? l.x : p().x, M = l ? l.y : p().y;
      c.current = {
        startX: w.clientX,
        startY: w.clientY,
        startLeft: b,
        startTop: M
      }, w.currentTarget.setPointerCapture(w.pointerId);
    },
    [l, p]
  );
  return yt(() => {
    var S;
    const w = (A) => {
      if (!c.current) return;
      const O = A.clientX - c.current.startX, j = A.clientY - c.current.startY, { width: Y, height: _ } = h(), J = Math.max(
        tr,
        Math.min(Y - jo - 8, c.current.startLeft + O)
      ), dt = Math.max(
        8,
        Math.min(_ - 100, c.current.startTop + j)
      );
      a({ x: J, y: dt });
    }, b = () => {
      c.current = null, f(!1);
    }, M = ((S = i.current) == null ? void 0 : S.ownerDocument) ?? document;
    return M.addEventListener("pointermove", w), M.addEventListener("pointerup", b), M.addEventListener("pointercancel", b), () => {
      M.removeEventListener("pointermove", w), M.removeEventListener("pointerup", b), M.removeEventListener("pointercancel", b);
    };
  }, []), s ? /* @__PURE__ */ v(
    "div",
    {
      ref: i,
      "data-sb-props-panel": !0,
      style: {
        position: "absolute",
        left: y.x,
        top: y.y,
        width: jo,
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
      onPointerDown: (w) => w.stopPropagation(),
      children: [
        /* @__PURE__ */ v(
          "div",
          {
            onPointerDown: m,
            style: {
              cursor: u ? "grabbing" : "grab",
              padding: "8px 16px",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              borderBottom: `1px solid ${o.border}`,
              color: o.textMuted,
              fontSize: 10,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ d("span", { style: { opacity: 0.6 }, children: "⋮⋮" }),
              /* @__PURE__ */ d("span", { children: "Drag to move" })
            ]
          }
        ),
        /* @__PURE__ */ d(
          "div",
          {
            style: {
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 8
            },
            children: /* @__PURE__ */ d(
              Mu,
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
function Iu({ engine: t, registry: e, gifApiBaseUrl: o }) {
  return /* @__PURE__ */ v(lt, { children: [
    /* @__PURE__ */ d(
      "div",
      {
        "data-sb-sidebar": !0,
        style: {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: tr,
          zIndex: 100
        },
        onPointerDown: (r) => r.stopPropagation(),
        children: /* @__PURE__ */ d(Uh, { engine: t, gifApiBaseUrl: o })
      }
    ),
    /* @__PURE__ */ d(Cu, { engine: t, registry: e })
  ] });
}
const qo = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 3, 4];
function zu(t) {
  const e = t.viewport.zoom, o = qo.find((r) => r > e + 1e-3) ?? qo[qo.length - 1];
  t.viewport.zoom = o, t.pan(0, 0);
}
function Tu(t) {
  const e = t.viewport.zoom, o = [...qo].reverse().find((r) => r < e - 1e-3) ?? qo[0];
  t.viewport.zoom = o, t.pan(0, 0);
}
const pr = {
  display: "flex",
  alignItems: "center",
  borderRadius: 8,
  overflow: "hidden"
}, De = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
}, ye = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Ge({ name: t, size: e = 16 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "minus" && /* @__PURE__ */ d("path", { d: "M5 12h14", ...ye }),
    t === "plus" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M12 5v14", ...ye }),
      /* @__PURE__ */ d("path", { d: "M5 12h14", ...ye })
    ] }),
    t === "undo" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...ye, fill: "none" }),
      /* @__PURE__ */ d("polyline", { points: "8,5 4,9 8,13", ...ye, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...ye, fill: "none" }),
      /* @__PURE__ */ d("polyline", { points: "16,5 20,9 16,13", ...ye, fill: "none" })
    ] }),
    t === "fit" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M15 3h6v6M9 21H3v-6", ...ye }),
      /* @__PURE__ */ d("path", { d: "M21 3l-7 7M3 21l7-7", ...ye })
    ] }),
    t === "play" && /* @__PURE__ */ d("path", { d: "M6 4l14 8-14 8z", fill: "currentColor" }),
    t === "slides" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...ye, strokeDasharray: "4,2" }),
      /* @__PURE__ */ d("path", { d: "M8 9h8M8 13h5", ...ye, opacity: 0.5 })
    ] }),
    t === "home" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M3 12l9-8 9 8", ...ye, fill: "none" }),
      /* @__PURE__ */ d("path", { d: "M5 12v7a1 1 0 001 1h12a1 1 0 001-1v-7", ...ye, fill: "none" })
    ] })
  ] });
}
function Pu({ engine: t, framesPanelOpen: e, onToggleFramesPanel: o }) {
  const r = Kt(), [n, s] = $(t.viewport.zoom), [i, l] = $(!1), [a, c] = $(!1), [u, f] = $(() => t.originView != null), [h, p] = $(!1), [y, g] = $(
    () => t.getAllNodes().filter((M) => M.type === "frame").length
  );
  yt(() => {
    const M = () => s(t.viewport.zoom), S = () => {
      l(t.canUndo()), c(t.canRedo());
    }, A = () => {
      g(t.getAllNodes().filter((O) => O.type === "frame").length), f(t.originView != null);
    };
    return t.on("viewport", M), t.on("history", S), t.on("change", A), t.on("node:create", A), t.on("node:delete", A), () => {
      t.off("viewport", M), t.off("history", S), t.off("change", A), t.off("node:create", A), t.off("node:delete", A);
    };
  }, [t]);
  const m = r.panelBg, w = `1px solid ${r.border}`, b = {
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
      onPointerDown: (M) => M.stopPropagation(),
      children: [
        /* @__PURE__ */ v("div", { style: { ...pr, background: m, border: w, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }, children: [
          /* @__PURE__ */ d(
            "button",
            {
              title: "Zoom out",
              onClick: () => Tu(t),
              style: { ...De, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ d(Ge, { name: "minus" })
            }
          ),
          /* @__PURE__ */ d("div", { style: b }),
          /* @__PURE__ */ v(
            "button",
            {
              title: "Reset zoom to 100%",
              onClick: () => {
                t.viewport.zoom = 1, t.pan(0, 0);
              },
              style: {
                ...De,
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
          /* @__PURE__ */ d("div", { style: b }),
          /* @__PURE__ */ d(
            "button",
            {
              title: "Zoom in",
              onClick: () => zu(t),
              style: { ...De, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ d(Ge, { name: "plus" })
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { style: { ...pr, background: m, border: w, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }, children: [
          /* @__PURE__ */ d(
            "button",
            {
              title: "Fit to content (Ctrl+0)",
              onClick: () => t.fitToContent(),
              style: { ...De, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ d(Ge, { name: "fit" })
            }
          ),
          /* @__PURE__ */ d("div", { style: b }),
          /* @__PURE__ */ d(
            "button",
            {
              title: u ? "Go to origin view (click) · Right-click to clear" : "Set current view as origin",
              onClick: () => {
                u ? t.goToOriginView() : (t.setOriginView(), f(!0));
              },
              onContextMenu: (M) => {
                M.preventDefault(), p(!0), setTimeout(() => p(!1), 150), u ? (t.clearOriginView(), f(!1)) : (t.setOriginView(), f(!0));
              },
              style: {
                ...De,
                width: 32,
                height: 32,
                color: u ? r.text : r.textFaint,
                transform: h ? "scale(0.85)" : void 0,
                transition: "transform 0.1s ease"
              },
              children: /* @__PURE__ */ d(Ge, { name: "home" })
            }
          )
        ] }),
        /* @__PURE__ */ v("div", { style: { ...pr, background: m, border: w, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }, children: [
          /* @__PURE__ */ d(
            "button",
            {
              title: "Present (frames as slides)",
              onClick: () => t.enterPresentation(),
              style: { ...De, width: 32, height: 32, color: r.text },
              children: /* @__PURE__ */ d(Ge, { name: "play" })
            }
          ),
          o && /* @__PURE__ */ v(lt, { children: [
            /* @__PURE__ */ d("div", { style: b }),
            /* @__PURE__ */ v(
              "button",
              {
                title: "Toggle slides panel",
                onClick: o,
                style: {
                  ...De,
                  width: 32,
                  height: 32,
                  color: e ? r.text : r.textMuted,
                  position: "relative"
                },
                children: [
                  /* @__PURE__ */ d(Ge, { name: "slides" }),
                  y > 0 && /* @__PURE__ */ d(
                    "span",
                    {
                      style: {
                        position: "absolute",
                        top: 2,
                        right: 2,
                        fontSize: 8,
                        lineHeight: 1,
                        fontWeight: 700,
                        color: r.textMuted,
                        pointerEvents: "none"
                      },
                      children: y
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ v("div", { style: { ...pr, background: m, border: w, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }, children: [
          /* @__PURE__ */ d(
            "button",
            {
              title: "Undo (Ctrl+Z)",
              onClick: () => t.undo(),
              disabled: !i,
              style: { ...De, width: 32, height: 32, color: i ? r.text : r.textFaint },
              children: /* @__PURE__ */ d(Ge, { name: "undo" })
            }
          ),
          /* @__PURE__ */ d("div", { style: b }),
          /* @__PURE__ */ d(
            "button",
            {
              title: "Redo (Ctrl+Shift+Z)",
              onClick: () => t.redo(),
              disabled: !a,
              style: { ...De, width: 32, height: 32, color: a ? r.text : r.textFaint },
              children: /* @__PURE__ */ d(Ge, { name: "redo" })
            }
          )
        ] })
      ]
    }
  );
}
const qs = 240, Ks = 6;
function on(t) {
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
  })), n = r.filter((u) => u.slideOrder != null).sort((u, f) => u.slideOrder - f.slideOrder), s = r.filter((u) => u.slideOrder == null), i = 100;
  s.sort((u, f) => u.y - f.y);
  const l = [];
  for (const u of s) {
    const f = l[l.length - 1];
    f && Math.abs(u.y - f[0].y) < i ? f.push(u) : l.push([u]);
  }
  const a = l.flatMap((u) => u.sort((f, h) => f.x - h.x));
  return [...n, ...a].map((u, f) => ({
    id: u.id,
    label: u.label || `Frame ${f + 1}`,
    order: f + 1,
    slideOrder: u.slideOrder,
    borderColor: u.borderColor,
    transition: u.transition,
    transitionDuration: u.transitionDuration
  }));
}
const Au = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function Ru() {
  return /* @__PURE__ */ d("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ d("path", { d: "M18 6L6 18M6 6l12 12", ...Au }) });
}
function Du(t, e, o) {
  const [r, n] = $("");
  return yt(() => {
    let s = !1;
    return vh(t, e).then((i) => {
      s || n(i);
    }), () => {
      s = !0;
    };
  }, [t, e, o]), r;
}
function Eu({ engine: t, frameId: e, tick: o }) {
  const r = Du(t, e, o);
  return r ? /* @__PURE__ */ d(
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
  ) : /* @__PURE__ */ d(
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
const Qs = [
  { key: "pan", label: "Pan" },
  { key: "fade", label: "Fade" },
  { key: "dissolve", label: "Dissolve" },
  { key: "zoom", label: "Zoom" },
  { key: "fold", label: "Fold" },
  { key: "cube", label: "Cube" },
  { key: "none", label: "Cut" }
];
function Js({ type: t, size: e = 12 }) {
  const o = { stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 16 16", fill: "none", children: [
    t === "pan" && /* @__PURE__ */ d("path", { d: "M3 8h10M10 5l3 3-3 3", ...o }),
    t === "fade" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, opacity: 0.4 }),
      /* @__PURE__ */ d("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "dissolve" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "2", y: "3", width: "5", height: "10", rx: "1", ...o, strokeDasharray: "2,1" }),
      /* @__PURE__ */ d("rect", { x: "9", y: "3", width: "5", height: "10", rx: "1", ...o })
    ] }),
    t === "zoom" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("circle", { cx: "8", cy: "8", r: "3", ...o }),
      /* @__PURE__ */ d("path", { d: "M5 3L3 1M11 3l2-2M5 13l-2 2M11 13l2 2", ...o })
    ] }),
    t === "fold" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M2 3v10l6-5z", ...o }),
      /* @__PURE__ */ d("path", { d: "M14 3v10l-6-5z", ...o })
    ] }),
    t === "cube" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M3 4h7v8H3z", ...o }),
      /* @__PURE__ */ d("path", { d: "M10 4l3-2v8l-3 2", ...o }),
      /* @__PURE__ */ d("path", { d: "M3 4l3-2h7l-3 2", ...o })
    ] }),
    t === "none" && /* @__PURE__ */ d("path", { d: "M4 4l8 8M12 4l-8 8", ...o })
  ] });
}
const Wu = [200, 300, 400, 500, 600, 800, 1e3, 1500, 2e3];
function Lu({
  value: t,
  durationMs: e,
  onChange: o,
  onDurationChange: r,
  theme: n
}) {
  var y;
  const [s, i] = $(!1), [l, a] = $(!1), c = it(null), u = it(null), f = t !== "none", h = e ?? Zo[t];
  yt(() => {
    if (!s && !l) return;
    const g = (m) => {
      s && c.current && !c.current.contains(m.target) && i(!1), l && u.current && !u.current.contains(m.target) && a(!1);
    };
    return document.addEventListener("mousedown", g), () => document.removeEventListener("mousedown", g);
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
        /* @__PURE__ */ d("div", { style: { position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: n.border } }),
        /* @__PURE__ */ v("div", { ref: c, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ v("button", { onClick: () => {
            i((g) => !g), a(!1);
          }, style: p, children: [
            /* @__PURE__ */ d(Js, { type: t }),
            /* @__PURE__ */ d("span", { children: ((y = Qs.find((g) => g.key === t)) == null ? void 0 : y.label) ?? "Pan" }),
            /* @__PURE__ */ d("span", { style: { fontSize: 7 }, children: s ? "▲" : "▼" })
          ] }),
          s && /* @__PURE__ */ d(
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
              children: Qs.map((g) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    o(g.key), i(!1);
                  },
                  style: {
                    border: "none",
                    background: g.key === t ? n.controlBgActive : "transparent",
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
                    /* @__PURE__ */ d(Js, { type: g.key }),
                    g.label
                  ]
                },
                g.key
              ))
            }
          )
        ] }),
        f && /* @__PURE__ */ v("div", { ref: u, style: { position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ v("button", { onClick: () => {
            a((g) => !g), i(!1);
          }, style: p, children: [
            /* @__PURE__ */ v("span", { children: [
              h,
              "ms"
            ] }),
            /* @__PURE__ */ d("span", { style: { fontSize: 7 }, children: l ? "▲" : "▼" })
          ] }),
          l && /* @__PURE__ */ d(
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
              children: Wu.map((g) => /* @__PURE__ */ v(
                "button",
                {
                  onClick: () => {
                    r(g === Zo[t] ? void 0 : g), a(!1);
                  },
                  style: {
                    border: "none",
                    background: g === h ? n.controlBgActive : "transparent",
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
                    g === Zo[t] ? " •" : ""
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
function Fu({ engine: t, open: e, onClose: o }) {
  const r = Kt(), [n, s] = $(() => on(t)), [i, l] = $(() => new Set(t.selection)), [a, c] = $(0), u = it(null), f = it(null), h = it(0), p = it(n);
  p.current = n;
  const y = it(!1), g = it(!1), [m, w] = $(null), [b, M] = $(null), [S, A] = $(0), O = it([]), j = it(null), Y = rt(() => {
    if (y.current) return;
    const X = on(t);
    s(X);
  }, [t]), _ = rt(() => {
    l(new Set(t.selection));
  }, [t]), J = it(null), dt = rt(() => {
    J.current && clearTimeout(J.current), J.current = setTimeout(() => c((X) => X + 1), 500);
  }, []);
  yt(() => {
    Y(), _();
    const X = setTimeout(() => c((K) => K + 1), 200), z = () => {
      Y(), dt();
    };
    return t.on("change", z), t.on("node:create", z), t.on("node:delete", z), t.on("node:data", z), t.on("selection", _), t.on("history", z), () => {
      clearTimeout(X), t.off("change", z), t.off("node:create", z), t.off("node:delete", z), t.off("node:data", z), t.off("selection", _), t.off("history", z), J.current && clearTimeout(J.current);
    };
  }, [t, Y, _, dt]), yt(() => {
    if (!j.current) return;
    const X = j.current.querySelectorAll("[data-frame-card]");
    O.current = Array.from(X).map((z) => z.offsetHeight + Ks);
  }, [n]);
  const B = rt(
    (X) => {
      t.select(X), t.zoomToNode(X, 0.8);
    },
    [t]
  ), et = rt(
    (X, z) => {
      X.preventDefault(), X.stopPropagation(), h.current = X.clientY, u.current = z, f.current = z, w(z), M(z), A(0);
    },
    []
  );
  return yt(() => {
    const X = (K) => {
      if (u.current === null) return;
      const V = K.clientY - h.current;
      A(V);
      const tt = O.current, U = u.current;
      let G = U;
      if (V > 0) {
        let N = 0;
        for (let L = U + 1; L < p.current.length && (N += tt[L] || 0, V > N - (tt[L] || 0) / 2); L++)
          G = L;
      } else if (V < 0) {
        let N = 0;
        for (let L = U - 1; L >= 0 && (N -= tt[L] || 0, V < N + (tt[L] || 0) / 2); L--)
          G = L;
      }
      f.current = G, M(G);
    }, z = () => {
      const K = u.current, V = f.current;
      if (K !== null && V !== null && K !== V) {
        y.current = !0;
        const tt = [...p.current], [U] = tt.splice(K, 1);
        tt.splice(V, 0, U);
        let G = !0;
        for (let N = 0; N < tt.length; N++) {
          const L = tt[N], nt = t.getNode(L.id);
          nt && (G ? (t.updateNodeWithHistory(L.id, {
            data: { ...nt.data, slideOrder: N + 1 }
          }), G = !1) : t.updateNode(L.id, {
            data: { ...nt.data, slideOrder: N + 1 }
          }));
        }
        y.current = !1, g.current = !0, s(on(t)), c((N) => N + 1);
      }
      u.current = null, f.current = null, w(null), M(null), A(0), g.current && requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          g.current = !1;
        });
      });
    };
    return document.addEventListener("pointermove", X), document.addEventListener("pointerup", z), document.addEventListener("pointercancel", z), () => {
      document.removeEventListener("pointermove", X), document.removeEventListener("pointerup", z), document.removeEventListener("pointercancel", z);
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
        width: qs,
        background: r.panelBg,
        borderLeft: `1px solid ${r.border}`,
        zIndex: 98,
        display: "flex",
        flexDirection: "column",
        transform: e ? "translateX(0)" : `translateX(${qs}px)`,
        transition: "transform 0.2s ease-in-out",
        pointerEvents: e ? "auto" : "none"
      },
      onPointerDown: (X) => X.stopPropagation(),
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
              /* @__PURE__ */ d(
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
                  children: /* @__PURE__ */ d(Ru, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ v(
          "div",
          {
            ref: j,
            style: {
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              padding: "8px 12px",
              display: "flex",
              flexDirection: "column",
              gap: Ks
            },
            children: [
              n.length === 0 && /* @__PURE__ */ d("div", { style: { padding: "20px 8px", textAlign: "center", color: r.textMuted, fontSize: 11 }, children: "No frames yet. Use the Frame tool (F) to create slides." }),
              n.map((X, z) => {
                const K = i.has(X.id), V = m === z;
                let tt = 0;
                if (V)
                  tt = S;
                else if (m !== null && b !== null) {
                  const N = O.current;
                  m < b ? z > m && z <= b && (tt = -(N[m] || 0)) : m > b && z >= b && z < m && (tt = N[m] || 0);
                }
                const U = (N) => {
                  t.updateNodeWithHistory(X.id, {
                    data: { transition: N === "pan" ? void 0 : N, transitionDuration: void 0 }
                  });
                }, G = (N) => {
                  t.updateNodeWithHistory(X.id, {
                    data: { transitionDuration: N }
                  });
                };
                return /* @__PURE__ */ v(Da.Fragment, { children: [
                  m === null && /* @__PURE__ */ d(
                    Lu,
                    {
                      value: X.transition ?? "pan",
                      durationMs: X.transitionDuration,
                      onChange: U,
                      onDurationChange: G,
                      theme: r
                    }
                  ),
                  /* @__PURE__ */ d(
                    "div",
                    {
                      "data-frame-card": !0,
                      onPointerDown: (N) => et(N, z),
                      onDoubleClick: () => B(X.id),
                      style: {
                        borderRadius: 6,
                        border: K ? `2px solid ${X.borderColor || r.text}` : `1px solid ${r.border}`,
                        background: K ? r.controlBgActive : "transparent",
                        cursor: V ? "grabbing" : "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transition: V || g.current ? "none" : "transform 0.15s ease, border-color 0.1s ease",
                        transform: `translateY(${tt}px)`,
                        zIndex: V ? 10 : 1,
                        opacity: V ? 0.92 : 1,
                        boxShadow: V ? "0 4px 12px rgba(0,0,0,0.18)" : "none",
                        overflow: "hidden",
                        position: "relative",
                        flexShrink: 0
                      },
                      children: /* @__PURE__ */ d(Eu, { engine: t, frameId: X.id, tick: a })
                    }
                  )
                ] }, X.id);
              })
            ]
          }
        )
      ]
    }
  );
}
const ao = 50, rn = 30, Nu = `
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
`, Bu = `
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
function $s(t, e, o) {
  const r = t.createShader(e);
  return r ? (t.shaderSource(r, o), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : (t.deleteShader(r), null)) : null;
}
function Hu(t, e, o) {
  const r = $s(t, t.VERTEX_SHADER, e), n = $s(t, t.FRAGMENT_SHADER, o);
  if (!r || !n) return null;
  const s = t.createProgram();
  return t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), t.getProgramParameter(s, t.LINK_STATUS) ? s : null;
}
function Ou() {
  const t = [], e = [];
  for (let o = 0; o <= rn; o++)
    for (let r = 0; r <= ao; r++)
      t.push(r / ao, o / rn * 2 - 1);
  for (let o = 0; o < rn; o++)
    for (let r = 0; r < ao; r++) {
      const n = o * (ao + 1) + r;
      e.push(n, n + ao + 1, n + 1, n + 1, n + ao + 1, n + ao + 2);
    }
  return { vertices: new Float32Array(t), indices: new Uint16Array(e) };
}
function Xu({ phase: t, progress: e }) {
  const o = it(null), r = it(null);
  return yt(() => {
    const n = o.current;
    if (!n) return;
    const s = window.devicePixelRatio || 1;
    n.width = n.clientWidth * s, n.height = n.clientHeight * s;
    const i = n.getContext("webgl", { alpha: !0, premultipliedAlpha: !1, antialias: !0 });
    if (!i) return;
    const l = Hu(i, Nu, Bu);
    if (!l) return;
    i.useProgram(l);
    const { vertices: a, indices: c } = Ou(), u = i.createBuffer();
    i.bindBuffer(i.ARRAY_BUFFER, u), i.bufferData(i.ARRAY_BUFFER, a, i.STATIC_DRAW);
    const f = i.createBuffer();
    i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, f), i.bufferData(i.ELEMENT_ARRAY_BUFFER, c, i.STATIC_DRAW);
    const h = i.getAttribLocation(l, "aUV");
    i.enableVertexAttribArray(h), i.vertexAttribPointer(h, 2, i.FLOAT, !1, 0, 0), i.enable(i.DEPTH_TEST), i.clearColor(0, 0, 0, 0);
    const p = (y) => i.getUniformLocation(l, y);
    return r.current = {
      gl: i,
      locs: { uLayPos: p("uLayPos"), uRadius: p("uRadius"), uSide: p("uSide"), uColor: p("uColor") },
      count: c.length
    }, () => {
      i.deleteProgram(l), i.deleteBuffer(u), i.deleteBuffer(f), r.current = null;
    };
  }, []), yt(() => {
    const n = r.current;
    if (!n) return;
    const { gl: s, locs: i, count: l } = n, a = t === "out" ? 1 - Math.pow(1 - e, 3) : Math.pow(e, 3), c = t === "out" ? 1 - a : a, u = 0.07 + 0.16 * c;
    s.viewport(0, 0, s.canvas.width, s.canvas.height), s.clear(s.COLOR_BUFFER_BIT | s.DEPTH_BUFFER_BIT), s.uniform1f(i.uLayPos, c), s.uniform1f(i.uRadius, u), s.uniform1f(i.uSide, 1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, l, s.UNSIGNED_SHORT, 0), s.uniform1f(i.uSide, -1), s.uniform3f(i.uColor, 0.09, 0.09, 0.17), s.drawElements(s.TRIANGLES, l, s.UNSIGNED_SHORT, 0);
  }, [t, e]), /* @__PURE__ */ d(
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
const Yu = {
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
}, nn = {
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
}, Cn = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
function _s({ dir: t }) {
  return /* @__PURE__ */ v("svg", { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", children: [
    t === "left" && /* @__PURE__ */ d("polyline", { points: "15,18 9,12 15,6", ...Cn }),
    t === "right" && /* @__PURE__ */ d("polyline", { points: "9,6 15,12 9,18", ...Cn })
  ] });
}
function Gu() {
  return /* @__PURE__ */ d("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ d("path", { d: "M18 6L6 18M6 6l12 12", ...Cn }) });
}
function ti(t) {
  return 1 - Math.pow(1 - t, 3);
}
function ei(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function oi(t, e) {
  let r;
  t <= 0.2 ? r = 1 + (0.55 - 1) * ti(t / 0.2) : t >= 0.8 ? r = 0.55 + (1 - 0.55) * ti((t - 0.8) / 0.2) : r = 0.55;
  let n;
  return t <= 0.1 ? n = 0 : t <= 0.5 ? n = -e * 90 * ei((t - 0.1) / 0.4) : t <= 0.9 ? n = e * 90 * (1 - ei((t - 0.5) / 0.4)) : n = 0, { zoom: r, angle: n };
}
function ju(t, e, o, r) {
  t.style.transform = `perspective(1200px) scale(${o}) rotateY(${r}deg)`, t.style.transformOrigin = "50% 50%", t.style.backfaceVisibility = "hidden", t.style.overflow = "visible", e.style.background = "#0a0a15";
}
function ri(t, e) {
  t.style.transform = "", t.style.transformOrigin = "", t.style.backfaceVisibility = "", t.style.overflow = "", e.style.background = "";
}
function Vu({ engine: t }) {
  const [e, o] = $(t.presentationMode), [r, n] = $(t.presentationIndex), [s, i] = $(t.presentationSlides.length), [l, a] = $(""), [c, u] = $(t.transitionOverlay), f = it(null), h = it(null);
  if (yt(() => {
    const y = document.querySelector("[data-sb-canvas]");
    f.current = y, h.current = (y == null ? void 0 : y.parentElement) ?? null;
    const g = () => {
      var M;
      if (o(t.presentationMode), n(t.presentationIndex), i(t.presentationSlides.length), u(t.transitionOverlay), t.presentationMode && t.presentationSlides.length > 0) {
        const S = t.presentationSlides[t.presentationIndex], A = t.getNode(S);
        a(((M = A == null ? void 0 : A.data) == null ? void 0 : M.label) || "");
      } else
        a("");
      const m = t.transitionOverlay, w = f.current, b = h.current;
      if (w && b && m && m.type === "cube" && m.t != null) {
        const S = m.direction ?? 1, { zoom: A, angle: O } = oi(m.t, S);
        ju(w, b, A, O);
      } else w && b && ri(w, b);
    };
    return t.on("presentation", g), () => {
      t.off("presentation", g);
      const m = f.current, w = h.current;
      m && w && ri(m, w);
    };
  }, [t]), !e || s === 0) return null;
  const p = c && c.type === "cube" && c.t != null ? (() => {
    const y = c.direction ?? 1, { angle: g } = oi(c.t, y);
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
        c && c.type !== "fold" && c.type !== "cube" && /* @__PURE__ */ d(
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
        c && c.type === "fold" && /* @__PURE__ */ d(Xu, { phase: c.phase, progress: c.progress }),
        p > 0.01 && /* @__PURE__ */ d(
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
        /* @__PURE__ */ v("div", { style: Yu, onPointerDown: (y) => y.stopPropagation(), children: [
          /* @__PURE__ */ d(
            "button",
            {
              style: { ...nn, position: "absolute", right: 16 },
              title: "Exit presentation (Esc)",
              onClick: () => t.exitPresentation(),
              children: /* @__PURE__ */ d(Gu, {})
            }
          ),
          /* @__PURE__ */ d(
            "button",
            {
              style: { ...nn, opacity: r <= 0 ? 0.3 : 1 },
              title: "Previous slide (←)",
              onClick: () => t.presentationPrev(),
              disabled: r <= 0,
              children: /* @__PURE__ */ d(_s, { dir: "left" })
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
          /* @__PURE__ */ d(
            "button",
            {
              style: { ...nn, opacity: r >= s - 1 ? 0.3 : 1 },
              title: "Next slide (→)",
              onClick: () => t.presentationNext(),
              disabled: r >= s - 1,
              children: /* @__PURE__ */ d(_s, { dir: "right" })
            }
          )
        ] })
      ]
    }
  );
}
const Uu = La(() => import("./DebugPanel-9JU85xLA.js"));
function uf({
  nodeTypes: t = ld,
  engine: e,
  keyboardShortcuts: o = !0,
  style: r,
  initialData: n,
  toolbar: s = !0,
  debugPanel: i = !1,
  debugBoards: l,
  theme: a,
  onPresentationChange: c,
  gifApiBaseUrl: u
}) {
  const f = qt(
    () => e ?? new Tl(),
    [e]
  ), h = qt(() => new Pl(t), [t]);
  yt(() => hl(), []), yt(() => {
    f.setRegistry(h);
  }, [f, h]), yt(() => {
    for (const A of t)
      A.isContainer && f.registerContainerType(A.type);
  }, [f, t]);
  const p = it(!1);
  yt(() => {
    n && !p.current && (p.current = !0, f.fromSBD(n));
  }, [f, n]);
  const y = it(null);
  yt(() => {
    if (o)
      return rh(f, y.current);
  }, [f, o]);
  const g = qt(() => t.some((O) => {
    var j;
    return (j = O.ports) == null ? void 0 : j.length;
  }) ? new cd(f, h) : null, [f, h, t]);
  yt(() => {
    if (g)
      return g.connect();
  }, [g]);
  const m = qt(
    () => a ? { ...mn, ...a } : mn,
    [a]
  ), [w, b] = $(!1), [M, S] = $(!1);
  return yt(() => {
    const A = () => {
      const O = f.presentationMode;
      b(O), c == null || c(O);
    };
    return f.on("presentation", A), () => f.off("presentation", A);
  }, [f, c]), /* @__PURE__ */ d(Li.Provider, { value: m, children: /* @__PURE__ */ v(
    "div",
    {
      ref: y,
      style: {
        width: "100%",
        height: "100%",
        position: "relative",
        ...r
      },
      children: [
        s && !w && /* @__PURE__ */ d(Iu, { engine: f, registry: h, gifApiBaseUrl: u }),
        i && /* @__PURE__ */ d(Wa, { fallback: null, children: /* @__PURE__ */ d(Uu, { engine: f, extraBoards: l }) }),
        /* @__PURE__ */ v(
          "div",
          {
            style: {
              position: "absolute",
              left: s && !w ? tr : 0,
              top: 0,
              right: 0,
              bottom: 0
            },
            children: [
              /* @__PURE__ */ d(Ah, { engine: f, schema: Tn, registry: h, dataFlow: g }),
              !w && /* @__PURE__ */ d(
                Pu,
                {
                  engine: f,
                  framesPanelOpen: M,
                  onToggleFramesPanel: () => S((A) => !A)
                }
              ),
              !w && /* @__PURE__ */ d(
                Fu,
                {
                  engine: f,
                  open: M,
                  onClose: () => S(!1)
                }
              ),
              /* @__PURE__ */ d(Vu, { engine: f })
            ]
          }
        )
      ]
    }
  ) });
}
const Zu = [
  { key: "select", label: "Select", shortcut: "V" },
  { key: "draw", label: "Draw", shortcut: "D" },
  { key: "shape", label: "Shape", shortcut: "S" },
  { key: "text", label: "Text", shortcut: "T" },
  { key: "note", label: "Note", shortcut: "N" },
  { key: "sticky", label: "Sticky", shortcut: "P" },
  { key: "frame", label: "Frame", shortcut: "F" },
  { key: "erase", label: "Eraser", shortcut: "X" }
], Mo = {
  border: "none",
  borderRadius: 6,
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
function Yo({ name: t, size: e = 18 }) {
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "select" && /* @__PURE__ */ d("path", { d: "M6 2v17l4-4.5L13.5 21l2.5-1.5L12.5 13H18z", fill: "currentColor" }),
    t === "draw" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M17 3l4 4L7.5 20.5 2 22l1.5-5.5z", ...$t }),
      /* @__PURE__ */ d("path", { d: "M15 5l4 4", ...$t })
    ] }),
    t === "shape" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...$t }),
    t === "text" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M7 4h10", ...$t }),
      /* @__PURE__ */ d("path", { d: "M12 4v16", ...$t })
    ] }),
    t === "note" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M4 3h16v14l-4 4H4z", ...$t }),
      /* @__PURE__ */ d("path", { d: "M16 17v4l4-4z", fill: "currentColor", opacity: 0.4 })
    ] }),
    t === "sticky" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("rect", { x: "3", y: "3", width: "18", height: "18", rx: "1", fill: "currentColor", opacity: 0.15, ...$t }),
      /* @__PURE__ */ d("line", { x1: "7", y1: "9", x2: "17", y2: "9", ...$t, opacity: 0.5 }),
      /* @__PURE__ */ d("line", { x1: "7", y1: "13", x2: "14", y2: "13", ...$t, opacity: 0.5 })
    ] }),
    t === "frame" && /* @__PURE__ */ d("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", ...$t, strokeDasharray: "4,2" }),
    t === "erase" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M20 20H9L3 14l9.5-9.5 8 8L16 17", ...$t }),
      /* @__PURE__ */ d("path", { d: "M12.5 4.5l8 8", ...$t })
    ] }),
    t === "rect" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...$t }),
    t === "ellipse" && /* @__PURE__ */ d("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...$t }),
    t === "diamond" && /* @__PURE__ */ d("path", { d: "M12 3l9 9-9 9-9-9z", ...$t }),
    t === "line" && /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...$t }),
    t === "arrow" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...$t }),
      /* @__PURE__ */ d("polyline", { points: "12,5 19,5 19,12", ...$t, fill: "none" })
    ] }),
    t === "undo" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M4 9h11a4 4 0 0 1 0 8h-4", ...$t, fill: "none" }),
      /* @__PURE__ */ d("polyline", { points: "8,5 4,9 8,13", ...$t, fill: "none" })
    ] }),
    t === "redo" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M20 9H9a4 4 0 0 0 0 8h4", ...$t, fill: "none" }),
      /* @__PURE__ */ d("polyline", { points: "16,5 20,9 16,13", ...$t, fill: "none" })
    ] }),
    t === "print" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M6 9V3h12v6", ...$t }),
      /* @__PURE__ */ d("path", { d: "M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2", ...$t }),
      /* @__PURE__ */ d("rect", { x: "6", y: "14", width: "12", height: "7", rx: "1", ...$t })
    ] }),
    t === "fit" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("path", { d: "M15 3h6v6M9 21H3v-6", ...$t }),
      /* @__PURE__ */ d("path", { d: "M21 3l-7 7M3 21l7-7", ...$t })
    ] })
  ] });
}
function ff({ engine: t }) {
  const [e, o] = $(t.mode), [r, n] = $(!1), [s, i] = $(!1), [l, a] = $(t.boardBackground);
  return yt(() => {
    const c = () => o(t.mode), u = () => {
      n(t.canUndo()), i(t.canRedo());
    }, f = () => a(t.boardBackground);
    return t.on("mode", c), t.on("history", u), t.on("background", f), () => {
      t.off("mode", c), t.off("history", u), t.off("background", f);
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
        Zu.map((c) => /* @__PURE__ */ d(
          "button",
          {
            title: `${c.label} (${c.shortcut})`,
            onClick: () => t.setMode(c.key),
            style: {
              ...Mo,
              width: 36,
              height: 36,
              background: e === c.key ? "#3b82f6" : "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ d(Yo, { name: c.key })
          },
          c.key
        )),
        /* @__PURE__ */ d(
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
        ].map((c) => /* @__PURE__ */ d(
          "button",
          {
            title: c.label,
            onClick: () => t.setBoardBackground(c.key),
            style: {
              ...Mo,
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
        /* @__PURE__ */ d("div", { style: { flex: 1 } }),
        /* @__PURE__ */ d(
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
              ...Mo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ d(Yo, { name: "print" })
          }
        ),
        /* @__PURE__ */ d(
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
        /* @__PURE__ */ d(
          "button",
          {
            title: "Undo (Ctrl+Z)",
            onClick: () => t.undo(),
            disabled: !r,
            style: {
              ...Mo,
              width: 36,
              height: 36,
              background: "transparent",
              color: r ? "white" : "#666"
            },
            children: /* @__PURE__ */ d(Yo, { name: "undo" })
          }
        ),
        /* @__PURE__ */ d(
          "button",
          {
            title: "Redo (Ctrl+Shift+Z)",
            onClick: () => t.redo(),
            disabled: !s,
            style: {
              ...Mo,
              width: 36,
              height: 36,
              background: "transparent",
              color: s ? "white" : "#666"
            },
            children: /* @__PURE__ */ d(Yo, { name: "redo" })
          }
        ),
        /* @__PURE__ */ d(
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
        /* @__PURE__ */ d(
          "button",
          {
            title: "Fit to content (Ctrl+0)",
            onClick: () => t.fitToContent(),
            style: {
              ...Mo,
              width: 36,
              height: 36,
              background: "transparent",
              color: "white"
            },
            children: /* @__PURE__ */ d(Yo, { name: "fit" })
          }
        )
      ]
    }
  );
}
const je = [
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], qu = [
  null,
  // no fill
  "#1e1e2e",
  "#e74c3c",
  "#2ecc71",
  "#3498db",
  "#f39c12",
  "#9b59b6"
], Ku = [
  { key: "hachure", label: "Hachure" },
  { key: "cross-hatch", label: "Cross-hatch" },
  { key: "solid", label: "Solid" }
], Co = [
  { key: "solid", label: "Solid", dash: "" },
  { key: "dashed", label: "Dashed", dash: "6,3" },
  { key: "dotted", label: "Dotted", dash: "2,2" }
], Qu = [
  { value: 0, label: "Architect" },
  { value: 1, label: "Artist" },
  { value: 2, label: "Cartoonist" }
], Io = [1, 2.5, 5, 10, 20], Ju = [
  { key: "rect", label: "Rectangle" },
  { key: "ellipse", label: "Ellipse" },
  { key: "diamond", label: "Diamond" },
  { key: "line", label: "Line" },
  { key: "arrow", label: "Arrow" }
], $u = [14, 20, 28, 36], _u = [
  { key: "left", label: "←" },
  { key: "center", label: "↔" },
  { key: "right", label: "→" }
], sn = 300, Nt = {
  display: "flex",
  alignItems: "center",
  gap: 4
}, Bt = {
  width: 64,
  fontSize: 10,
  color: "#999",
  flexShrink: 0
}, jt = {
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
  const [o, r] = $(t.mode), [n, s] = $(t.selection), [, i] = $(0), [l, a] = $(null), c = it(null), u = it(null), [f, h] = $(!1), p = rt(() => {
    var ot;
    return { x: (((ot = c.current) == null ? void 0 : ot.ownerDocument.defaultView) ?? window).innerWidth - sn - 12, y: 12 };
  }, []), y = l ?? p();
  yt(() => {
    const k = () => r(t.mode), ot = () => {
      s(new Set(t.selection)), i((oe) => oe + 1);
    }, Ut = () => i((oe) => oe + 1);
    return t.on("mode", k), t.on("selection", ot), t.on("change", Ut), () => {
      t.off("mode", k), t.off("selection", ot), t.off("change", Ut);
    };
  }, [t]);
  const g = rt((k) => {
    k.stopPropagation(), h(!0);
    const ot = l ? l.x : p().x, Ut = l ? l.y : p().y;
    u.current = { startX: k.clientX, startY: k.clientY, startLeft: ot, startTop: Ut }, k.currentTarget.setPointerCapture(k.pointerId);
  }, [l, p]);
  yt(() => {
    var oe;
    const k = (Ce) => {
      var No;
      if (!u.current) return;
      const Ie = Ce.clientX - u.current.startX, po = Ce.clientY - u.current.startY, xe = ((No = c.current) == null ? void 0 : No.ownerDocument.defaultView) ?? window, ro = Math.max(48, Math.min(xe.innerWidth - sn - 8, u.current.startLeft + Ie)), Be = Math.max(8, Math.min(xe.innerHeight - 100, u.current.startTop + po));
      a({ x: ro, y: Be });
    }, ot = () => {
      u.current = null, h(!1);
    }, Ut = ((oe = c.current) == null ? void 0 : oe.ownerDocument) ?? document;
    return Ut.addEventListener("pointermove", k), Ut.addEventListener("pointerup", ot), Ut.addEventListener("pointercancel", ot), () => {
      Ut.removeEventListener("pointermove", k), Ut.removeEventListener("pointerup", ot), Ut.removeEventListener("pointercancel", ot);
    };
  }, []);
  const m = (() => {
    if (n.size === 1) {
      const k = Array.from(n)[0], ot = t.getNode(k);
      if ((ot == null ? void 0 : ot.type) === "shape") return { kind: "shape", node: ot };
      if ((ot == null ? void 0 : ot.type) === "draw") return { kind: "draw", node: ot };
      if ((ot == null ? void 0 : ot.type) === "text") return { kind: "text", node: ot };
      if ((ot == null ? void 0 : ot.type) === "edge") return { kind: "edge", node: ot };
      if ((ot == null ? void 0 : ot.type) === "image") return { kind: "image", node: ot };
      if ((ot == null ? void 0 : ot.type) === "content") return { kind: "content", node: ot };
      if ((ot == null ? void 0 : ot.type) === "frame") return { kind: "frame", node: ot };
      if ((ot == null ? void 0 : ot.type) === "sticky") return { kind: "sticky", node: ot };
      if (ot && e) {
        const Ut = e.get(ot.type);
        if (Ut != null && Ut.propertiesPanel)
          return { kind: "custom", node: ot, PanelComponent: Ut.propertiesPanel };
      }
    }
    return o === "draw" || o === "shape" || o === "text" ? { kind: "tool" } : null;
  })(), w = rt(
    (k) => {
      !m || m.kind !== "shape" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), b = rt(
    (k) => {
      !m || m.kind !== "draw" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), M = rt(
    (k) => {
      !m || m.kind !== "text" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), S = rt(
    (k) => {
      !m || m.kind !== "edge" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), A = rt(
    (k) => {
      !m || m.kind !== "image" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), O = rt(
    (k) => {
      !m || m.kind !== "content" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), j = rt(
    (k) => {
      !m || m.kind !== "frame" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), Y = rt(
    (k) => {
      !m || m.kind !== "sticky" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), _ = rt(
    (k) => {
      !m || m.kind !== "custom" || t.updateNodeWithHistory(m.node.id, {
        data: { ...m.node.data, ...k }
      });
    },
    [t, m]
  ), [J, dt] = $("idle");
  if (!m) return null;
  const B = m.kind === "custom", et = m.kind === "shape", X = m.kind === "draw", z = m.kind === "text", K = m.kind === "edge", V = m.kind === "image", tt = m.kind === "content", U = m.kind === "frame", G = m.kind === "sticky", N = m.kind === "tool", L = N && o === "shape", nt = N && o === "text", st = z ? m.node.data.fontFamily : t.activeTool.fontFamily ?? Ee, pt = z ? m.node.data.fontSize : t.activeTool.fontSize ?? 20, ut = z ? m.node.data.align : t.activeTool.textAlign ?? "left", kt = z ? m.node.data.color : t.activeTool.color, Dt = et ? m.node.data.stroke : X ? m.node.data.color : t.activeTool.color, mt = et || X ? m.node.data.fill ?? null : t.activeTool.fillColor ?? null, wt = et || X ? m.node.data.fillStyle ?? "hachure" : t.activeTool.fillStyle ?? "hachure", ct = et || X ? m.node.data.strokeStyle ?? "solid" : t.activeTool.strokeStyle ?? "solid", St = et || X ? m.node.data.strokeWidth : t.activeTool.width, vt = et ? m.node.data.roughness : t.activeTool.roughness ?? 1, Et = et || X || z || V || tt || U || G ? m.node.data.opacity ?? 1 : t.activeTool.opacity ?? 1, Qt = (() => {
    const k = /* @__PURE__ */ new Set(), ot = [];
    for (const Ut of t.getAllNodes())
      if (Ut.type === "text") {
        const oe = Ut.data.fontFamily;
        oe && !k.has(oe) && (k.add(oe), ot.push(oe));
      }
    return ot;
  })(), Wt = !z && !nt && !K && !V && !tt && !U && !G && !B, te = Wt, ee = Wt, me = et || L, fe = z || nt, de = (k) => {
    et ? w({ stroke: k }) : X ? b({ color: k }) : (t.activeTool.color = k, i((ot) => ot + 1));
  }, _e = (k) => {
    et ? w({ fill: k ?? void 0 }) : X ? b({ fill: k ?? void 0 }) : (t.activeTool.fillColor = k ?? void 0, i((ot) => ot + 1));
  }, to = (k) => {
    et ? w({ fillStyle: k }) : X ? b({ fillStyle: k }) : (t.activeTool.fillStyle = k, i((ot) => ot + 1));
  }, we = (k) => {
    et ? w({ strokeStyle: k }) : X ? b({ strokeStyle: k }) : (t.activeTool.strokeStyle = k, i((ot) => ot + 1));
  }, ke = (k) => {
    et ? w({ strokeWidth: k }) : X ? b({ strokeWidth: k }) : (t.activeTool.width = k, i((ot) => ot + 1));
  }, be = (k) => {
    et ? w({ roughness: k }) : (t.activeTool.roughness = k, i((ot) => ot + 1));
  }, Fe = (k) => {
    et ? w({ opacity: k }) : X ? b({ opacity: k }) : z ? M({ opacity: k }) : V ? A({ opacity: k }) : tt ? O({ opacity: k }) : U ? j({ opacity: k }) : G ? Y({ opacity: k }) : (t.activeTool.opacity = k, i((ot) => ot + 1));
  }, Ne = (k) => {
    z ? M({ fontFamily: k }) : (t.activeTool.fontFamily = k, i((ot) => ot + 1));
  }, ie = (k) => {
    z ? M({ fontSize: k }) : (t.activeTool.fontSize = k, i((ot) => ot + 1));
  }, ce = (k) => {
    z ? M({ align: k }) : (t.activeTool.textAlign = k, i((ot) => ot + 1));
  }, eo = (k) => {
    z ? M({ color: k }) : (t.activeTool.color = k, i((ot) => ot + 1));
  }, oo = {
    position: "fixed",
    left: y.x,
    top: y.y,
    width: sn,
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
      style: oo,
      onPointerDown: (k) => k.stopPropagation(),
      children: [
        /* @__PURE__ */ v(
          "div",
          {
            onPointerDown: g,
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
              /* @__PURE__ */ d("span", { style: { opacity: 0.6 }, children: "⋮⋮" }),
              /* @__PURE__ */ d("span", { children: "Drag to move" })
            ]
          }
        ),
        fe && /* @__PURE__ */ v(lt, { children: [
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Font" }),
            /* @__PURE__ */ d(
              Er,
              {
                value: st,
                onChange: Ne,
                fontsInScene: Qt
              }
            )
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Size" }),
            $u.map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => ie(k),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: pt === k ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: k
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Align" }),
            _u.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.key,
                onClick: () => ce(k.key),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: ut === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 12,
                  borderRadius: 6
                },
                children: k.label
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Color" }),
            je.map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => eo(k),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: kt === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          z && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Border" }),
            [null, ...je].map((k, ot) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => M({ borderColor: k ?? void 0 }),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (m.node.data.borderColor ?? null) === k ? "2px solid white" : `2px solid ${ot === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ot === 0 && /* @__PURE__ */ d(
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
          z && m.node.data.borderColor && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Style" }),
            Co.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => M({ borderStyle: k.key }),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "solid") === k.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d("svg", { width: 24, height: 12, children: /* @__PURE__ */ d(
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
          z && m.node.data.borderColor && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Width" }),
            Io.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: `${k}px`,
                onClick: () => M({ borderWidth: k }),
                style: {
                  ...jt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(
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
        Wt && /* @__PURE__ */ v(lt, { children: [
          L && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Shape" }),
            Ju.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => {
                  t.activeTool.shapeType = k.key, i((ot) => ot + 1);
                },
                style: {
                  ...jt,
                  width: 28,
                  height: 28,
                  background: (t.activeTool.shapeType ?? "rect") === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(tf, { name: k.key })
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Stroke" }),
            je.map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => de(k),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: Dt === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          te && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Fill" }),
            qu.map((k, ot) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => _e(k),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: mt === k ? "2px solid white" : `2px solid ${ot === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ot === 0 && /* @__PURE__ */ d(
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
          te && mt && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Fill pattern" }),
            Ku.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => to(k.key),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: wt === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 9,
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(ef, { style: k.key })
              },
              k.key
            ))
          ] }),
          ee && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Stroke style" }),
            Co.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => we(k.key),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: ct === k.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d("svg", { width: 24, height: 12, children: /* @__PURE__ */ d(
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
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Stroke width" }),
            Io.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: `${k}px`,
                onClick: () => ke(k),
                style: {
                  ...jt,
                  width: 36,
                  height: 24,
                  background: St === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(
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
          me && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Roughness" }),
            Qu.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => be(k.value),
                style: {
                  ...jt,
                  height: 28,
                  padding: "0 8px",
                  background: vt === k.value ? "#3b82f6" : "#2a2a3e",
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
        K && /* @__PURE__ */ v(lt, { children: [
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Color" }),
            je.map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => S({ color: k }),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: m.node.data.color === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Style" }),
            Co.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => S({ style: k.key }),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: m.node.data.style === k.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d("svg", { width: 24, height: 12, children: /* @__PURE__ */ d(
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
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Width" }),
            Io.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: `${k}px`,
                onClick: () => S({ strokeWidth: k }),
                style: {
                  ...jt,
                  width: 36,
                  height: 24,
                  background: m.node.data.strokeWidth === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(
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
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Head" }),
            ["none", "arrow", "filled", "dot"].map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => S({ arrowHead: k }),
                style: {
                  ...jt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.arrowHead ?? "none") === k ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: k === "none" ? "None" : k === "arrow" ? "▷" : k === "filled" ? "▶" : "●"
              },
              k
            ))
          ] }),
          (m.node.data.arrowHead ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Head size" }),
            /* @__PURE__ */ d(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: m.node.data.arrowHeadSize ?? Math.max(8, m.node.data.strokeWidth * 3),
                onChange: (k) => S({ arrowHeadSize: Number(k.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ d("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: m.node.data.arrowHeadSize ?? Math.max(8, m.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Tail" }),
            ["none", "arrow", "filled", "dot"].map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => S({ arrowTail: k }),
                style: {
                  ...jt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.arrowTail ?? "none") === k ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 11,
                  borderRadius: 6
                },
                children: k === "none" ? "None" : k === "arrow" ? "◁" : k === "filled" ? "◀" : "●"
              },
              k
            ))
          ] }),
          (m.node.data.arrowTail ?? "none") !== "none" && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Tail size" }),
            /* @__PURE__ */ d(
              "input",
              {
                type: "range",
                min: 4,
                max: 40,
                step: 1,
                value: m.node.data.arrowTailSize ?? Math.max(8, m.node.data.strokeWidth * 3),
                onChange: (k) => S({ arrowTailSize: Number(k.target.value) }),
                style: { flex: 1 }
              }
            ),
            /* @__PURE__ */ d("span", { style: { color: "#999", fontSize: 11, minWidth: 24, textAlign: "right" }, children: m.node.data.arrowTailSize ?? Math.max(8, m.node.data.strokeWidth * 3) })
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Label" }),
            /* @__PURE__ */ d(
              "input",
              {
                type: "text",
                value: m.node.data.label ?? "",
                onChange: (k) => S({ label: k.target.value || void 0 }),
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
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Path" }),
            [
              { key: "bezier", label: "Bezier" },
              { key: "straight", label: "Straight" },
              { key: "smoothstep", label: "Smooth" },
              { key: "step", label: "Step" }
            ].map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => S({ edgeType: k.key }),
                style: {
                  ...jt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.edgeType ?? "bezier") === k.key ? "#3b82f6" : "#2a2a3e",
                  color: "white",
                  fontSize: 10,
                  borderRadius: 6
                },
                children: k.label
              },
              k.key
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Animate" }),
            /* @__PURE__ */ d(
              "button",
              {
                onClick: () => S({ animated: !m.node.data.animated }),
                style: {
                  ...jt,
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
          m.node.data.animated && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Direction" }),
            ["forward", "reverse", "both"].map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => S({ animatedDirection: k }),
                style: {
                  ...jt,
                  height: 28,
                  padding: "0 8px",
                  background: (m.node.data.animatedDirection ?? "forward") === k ? "#3b82f6" : "#2a2a3e",
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
        V && /* @__PURE__ */ v(lt, { children: [
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Border" }),
            [null, ...je].map((k, ot) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => A({ borderColor: k ?? void 0 }),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (m.node.data.borderColor ?? null) === k ? "2px solid white" : `2px solid ${ot === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ot === 0 && /* @__PURE__ */ d(
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
          m.node.data.borderColor && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Style" }),
            Co.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => A({ borderStyle: k.key }),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "solid") === k.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d("svg", { width: 24, height: 12, children: /* @__PURE__ */ d(
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
          m.node.data.borderColor && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Width" }),
            Io.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: `${k}px`,
                onClick: () => A({ borderWidth: k }),
                style: {
                  ...jt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(
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
          /* @__PURE__ */ v("div", { style: { ...Nt, marginTop: 4 }, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Background" }),
            /* @__PURE__ */ d(
              "button",
              {
                onClick: async () => {
                  if (!(J === "loading" || m.kind !== "image")) {
                    dt("loading");
                    try {
                      const { removeBackground: k } = await import("@imgly/background-removal"), Ut = await (await fetch(m.node.data.src)).blob(), oe = await k(Ut), Ce = new FileReader(), Ie = await new Promise((po, xe) => {
                        Ce.onload = () => po(Ce.result), Ce.onerror = xe, Ce.readAsDataURL(oe);
                      });
                      A({ src: Ie }), dt("idle");
                    } catch (k) {
                      console.error("Background removal failed:", k), dt("error"), setTimeout(() => dt("idle"), 3e3);
                    }
                  }
                },
                disabled: J === "loading",
                style: {
                  ...jt,
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
        tt && /* @__PURE__ */ v(lt, { children: [
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Border" }),
            [null, ...je].map((k, ot) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => O({ borderColor: k ?? void 0 }),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (m.node.data.borderColor ?? null) === k ? "2px solid white" : `2px solid ${ot === 0 ? "#555" : "transparent"}`,
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ot === 0 && /* @__PURE__ */ d(
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
          m.node.data.borderColor && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Style" }),
            Co.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => O({ borderStyle: k.key }),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "solid") === k.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d("svg", { width: 24, height: 12, children: /* @__PURE__ */ d(
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
          m.node.data.borderColor && /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Width" }),
            Io.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: `${k}px`,
                onClick: () => O({ borderWidth: k }),
                style: {
                  ...jt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(
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
        U && /* @__PURE__ */ v(lt, { children: [
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Label" }),
            /* @__PURE__ */ d(
              "input",
              {
                type: "text",
                value: m.node.data.label ?? "",
                onChange: (k) => j({ label: k.target.value || void 0 }),
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
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Background" }),
            [null, ...je].map((k, ot) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => j({ backgroundColor: k ? `${k}15` : void 0 }),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k ?? "transparent",
                  border: (() => {
                    const Ut = m.node.data.backgroundColor;
                    return (k === null ? !Ut : Ut === `${k}15`) ? "2px solid white" : `2px solid ${ot === 0 ? "#555" : "transparent"}`;
                  })(),
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden"
                },
                children: ot === 0 && /* @__PURE__ */ d(
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
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Border" }),
            je.map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => j({ borderColor: k }),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: m.node.data.borderColor === k ? "2px solid white" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Style" }),
            Co.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: k.label,
                onClick: () => j({ borderStyle: k.key }),
                style: {
                  ...jt,
                  width: 36,
                  height: 28,
                  background: (m.node.data.borderStyle ?? "dashed") === k.key ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d("svg", { width: 24, height: 12, children: /* @__PURE__ */ d(
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
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Width" }),
            Io.map((k) => /* @__PURE__ */ d(
              "button",
              {
                title: `${k}px`,
                onClick: () => j({ borderWidth: k }),
                style: {
                  ...jt,
                  width: 36,
                  height: 24,
                  background: (m.node.data.borderWidth ?? 1) === k ? "#3b82f6" : "#2a2a3e",
                  borderRadius: 6
                },
                children: /* @__PURE__ */ d(
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
        G && /* @__PURE__ */ v(lt, { children: [
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Color" }),
            [
              "#FEF3C7",
              "#FCE7F3",
              "#DBEAFE",
              "#D1FAE5",
              "#EDE9FE",
              "#FFEDD5"
            ].map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => Y({ color: k }),
                style: {
                  ...jt,
                  width: 20,
                  height: 20,
                  background: k,
                  border: m.node.data.color === k ? "2px solid #1e1e2e" : "2px solid transparent",
                  borderRadius: "50%"
                }
              },
              k
            ))
          ] }),
          /* @__PURE__ */ v("div", { style: Nt, children: [
            /* @__PURE__ */ d("span", { style: Bt, children: "Size" }),
            [12, 14, 16, 20, 24].map((k) => /* @__PURE__ */ d(
              "button",
              {
                onClick: () => Y({ fontSize: k }),
                style: {
                  ...jt,
                  width: 32,
                  height: 24,
                  background: (m.node.data.fontSize ?? 16) === k ? "#3b82f6" : "#2a2a3e",
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
        B && (() => {
          const { node: k, PanelComponent: ot } = m;
          return /* @__PURE__ */ d(ot, { node: k, data: k.data, engine: t, updateData: _ });
        })(),
        !K && !B && /* @__PURE__ */ v("div", { style: Nt, children: [
          /* @__PURE__ */ d("span", { style: Bt, children: "Opacity" }),
          /* @__PURE__ */ d(
            "input",
            {
              type: "range",
              min: 0,
              max: 100,
              value: Math.round(Et * 100),
              onChange: (k) => Fe(parseInt(k.target.value) / 100),
              style: { flex: 1, accentColor: "#3b82f6" }
            }
          ),
          /* @__PURE__ */ d("span", { style: { width: 28, textAlign: "right", fontSize: 10 }, children: Math.round(Et * 100) })
        ] })
      ]
    }
  );
}
function tf({ name: t, size: e = 16 }) {
  const o = {
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  return /* @__PURE__ */ v("svg", { width: e, height: e, viewBox: "0 0 24 24", fill: "none", children: [
    t === "rect" && /* @__PURE__ */ d("rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", ...o }),
    t === "ellipse" && /* @__PURE__ */ d("ellipse", { cx: "12", cy: "12", rx: "9", ry: "8", ...o }),
    t === "diamond" && /* @__PURE__ */ d("path", { d: "M12 3l9 9-9 9-9-9z", ...o }),
    t === "line" && /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
    t === "arrow" && /* @__PURE__ */ v(lt, { children: [
      /* @__PURE__ */ d("line", { x1: "5", y1: "19", x2: "19", y2: "5", ...o }),
      /* @__PURE__ */ d("polyline", { points: "12,5 19,5 19,12", ...o, fill: "none" })
    ] })
  ] });
}
function ef({ style: t }) {
  return t === "hachure" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ d("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ d("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.5 }),
    /* @__PURE__ */ d("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.5 })
  ] }) : t === "cross-hatch" ? /* @__PURE__ */ v("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: [
    /* @__PURE__ */ d("line", { x1: 2, y1: 14, x2: 8, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 8, y1: 14, x2: 14, y2: 2, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 14, y1: 14, x2: 18, y2: 6, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 2, y1: 2, x2: 8, y2: 14, stroke: "white", strokeWidth: 1.2 }),
    /* @__PURE__ */ d("line", { x1: 8, y1: 2, x2: 14, y2: 14, stroke: "white", strokeWidth: 1.2 })
  ] }) : /* @__PURE__ */ d("svg", { width: 20, height: 16, viewBox: "0 0 20 16", children: /* @__PURE__ */ d("rect", { x: 2, y: 2, width: 16, height: 12, fill: "white", rx: 2 }) });
}
export {
  Ee as D,
  Pl as N,
  Uo as P,
  hf as S,
  ff as T,
  mn as a,
  cd as b,
  pf as c,
  Iu as d,
  uf as e,
  Ah as f,
  Tl as g,
  ld as h,
  Nl as i,
  Lc as j,
  Oc as k,
  Kc as l,
  Ar as m,
  Rt as n,
  Wn as o,
  jc as p,
  An as q,
  fl as r,
  io as s,
  al as t,
  rh as u,
  Bc as v,
  _c as w,
  Zc as x,
  Kt as y
};
