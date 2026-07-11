import { jsxs as f, jsx as i } from "react/jsx-runtime";
import { useState as y, useEffect as $ } from "react";
import { n as v } from "./index-DjNLPF6Q.js";
async function I(n) {
  console.log("Starting Benchmark...");
  const a = 1e4, t = 1e3, s = 5e3;
  n.fromJSON({ nodes: [] }), await new Promise((o) => setTimeout(o, 100)), console.time(`Insert ${a} nodes`);
  const r = [];
  for (let o = 0; o < a; o++)
    r.push({
      id: v(),
      type: "shape",
      x: Math.random() * s - s / 2,
      y: Math.random() * s - s / 2,
      w: 100,
      h: 100,
      z: o,
      data: {
        shape: "rect",
        color: "#000000",
        stroke: "#000000",
        strokeWidth: 2,
        roughness: 1
      }
    });
  const k = performance.now();
  n.addNodes ? n.addNodes(r) : r.forEach((o) => n.addNode(o));
  const d = performance.now();
  console.timeEnd(`Insert ${a} nodes`), console.log(`Insert took ${(d - k).toFixed(2)}ms`), console.time(`Query ${t} times (Large Rect)`);
  const l = { x: -1e3, y: -1e3, w: 2e3, h: 2e3 };
  let b = 0;
  const m = performance.now();
  for (let o = 0; o < t; o++) {
    const p = o * 1, x = n.getNodesInRect({
      x: l.x + p,
      y: l.y + p,
      w: l.w,
      h: l.h
    });
    b += x.length;
  }
  const c = performance.now();
  console.timeEnd(`Query ${t} times (Large Rect)`), console.log(`Query (Large) took ${(c - m).toFixed(2)}ms. Avg: ${((c - m) / t).toFixed(3)}ms`), console.log(`Total nodes found in queries: ${b}`), console.time(`Query ${t} times (Small Rect)`);
  const h = performance.now();
  for (let o = 0; o < t; o++) {
    const p = Math.random() * s - s / 2, x = Math.random() * s - s / 2;
    n.getNodesInRect({ x: p, y: x, w: 10, h: 10 });
  }
  const w = performance.now();
  console.timeEnd(`Query ${t} times (Small Rect)`), console.log(`Query (Small) took ${(w - h).toFixed(2)}ms. Avg: ${((w - h) / t).toFixed(3)}ms`), console.time(`HitTest ${t} times`);
  const u = performance.now();
  for (let o = 0; o < t; o++) {
    const p = Math.random() * s - s / 2, x = Math.random() * s - s / 2;
    n.hitTest(p, x);
  }
  const g = performance.now();
  console.timeEnd(`HitTest ${t} times`), console.log(`HitTest took ${(g - u).toFixed(2)}ms. Avg: ${((g - u) / t).toFixed(3)}ms`);
  const e = `Benchmark Complete!\\nCheck console for details.\\n\\nInsert: ${(d - k).toFixed(0)}ms\\nQuery (Large): avg ${((c - m) / t).toFixed(3)}ms\\nHitTest: avg ${((g - u) / t).toFixed(3)}ms`;
  typeof alert < "u" ? alert(e) : (console.log("---------------------------------------------------"), console.log(e.replace(/\\n/g, `
`)), console.log("---------------------------------------------------"));
}
const S = {
  padding: "4px 10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 11
};
function F({ engine: n, extraBoards: a }) {
  const [t, s] = y(""), [r, k] = y(!1), [d, l] = y(""), [b, m] = y(!1), [c, h] = y(!1);
  $(() => {
    const e = () => {
      n.toSBD().then(s);
    };
    return n.on("change", e), e(), () => n.off("change", e);
  }, [n]);
  const w = () => {
    navigator.clipboard.writeText(t), m(!0), setTimeout(() => m(!1), 1500);
  }, u = () => {
    d.trim() && n.fromSBD(d).then(() => l(""));
  }, g = async () => {
    h(!0);
    try {
      await I(n);
    } catch (e) {
      console.error(e), alert("Benchmark failed: " + e);
    } finally {
      h(!1);
    }
  };
  return /* @__PURE__ */ f(
    "div",
    {
      style: {
        position: "absolute",
        bottom: 0,
        left: 48,
        right: 0,
        maxHeight: r ? 300 : 32,
        background: "#1e1e2e",
        color: "#e0e0e0",
        fontFamily: "monospace",
        fontSize: 11,
        overflow: "hidden",
        transition: "max-height 0.2s ease",
        zIndex: 100,
        borderTop: "1px solid #333"
      },
      children: [
        /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              padding: "6px 12px",
              gap: 8,
              cursor: "pointer",
              userSelect: "none"
            },
            onClick: () => k(!r),
            children: [
              /* @__PURE__ */ f("span", { children: [
                r ? "▼" : "▲",
                " SBD Output"
              ] }),
              /* @__PURE__ */ f("span", { style: { color: "#888", fontSize: 10 }, children: [
                n.getAllNodes().length,
                " nodes"
              ] }),
              /* @__PURE__ */ i("div", { style: { flex: 1 } }),
              /* @__PURE__ */ i(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), g();
                  },
                  style: { ...S, background: c ? "#f59e0b" : "#ef4444" },
                  disabled: c,
                  children: c ? "Running..." : "Run Benchmark"
                }
              ),
              /* @__PURE__ */ i(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), w();
                  },
                  style: S,
                  children: b ? "Copied!" : "Copy SBD"
                }
              ),
              a == null ? void 0 : a.map((e) => /* @__PURE__ */ i(
                "button",
                {
                  onClick: (o) => {
                    o.stopPropagation(), e.load(n);
                  },
                  style: { ...S, background: e.color },
                  children: e.label
                },
                e.label
              ))
            ]
          }
        ),
        r && /* @__PURE__ */ f(
          "div",
          {
            style: {
              display: "flex",
              gap: 12,
              padding: "0 12px 12px",
              height: 250
            },
            children: [
              /* @__PURE__ */ i(
                "pre",
                {
                  style: {
                    flex: 1,
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    background: "#2a2a3e",
                    padding: 8,
                    borderRadius: 4,
                    margin: 0,
                    fontSize: 11,
                    lineHeight: 1.4
                  },
                  children: t
                }
              ),
              /* @__PURE__ */ f(
                "div",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ i(
                      "textarea",
                      {
                        value: d,
                        onChange: (e) => l(e.target.value),
                        placeholder: "Paste SBD markdown here to import...",
                        style: {
                          flex: 1,
                          fontFamily: "monospace",
                          fontSize: 11,
                          background: "#2a2a3e",
                          color: "#e0e0e0",
                          border: "1px solid #444",
                          borderRadius: 4,
                          padding: 8,
                          resize: "none",
                          outline: "none"
                        }
                      }
                    ),
                    /* @__PURE__ */ i("button", { onClick: u, style: S, children: "Load SBD" })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  F as default
};
