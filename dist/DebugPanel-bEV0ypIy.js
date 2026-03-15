import { jsxs as p, jsx as r } from "react/jsx-runtime";
import { useState as b, useEffect as E } from "react";
import { n as S } from "./index-BCKM38sU.js";
const v = "```", F = `<!--@meta canvas_w="4000" canvas_h="3000" grid="20" snap="false" -->

<!--@text id="title" x="60" y="40" w="600" z="50" fontSize="48" fontFamily="sans-serif" color="#1e1e2e" align="left" -->
Product Roadmap

<!--@text id="subtitle" x="60" y="110" w="500" z="49" fontSize="18" fontFamily="sans-serif" color="#94a3b8" align="left" -->
Q2 2026 — Planning workspace

<!--@block id="vision" x="60" y="180" w="520" h="auto" z="30" -->
## Vision

Build the **spatial thinking tool** people didn't know they needed.

> "The best way to predict the future is to invent it." — Alan Kay

Key principles:
1. *Clarity over complexity*
2. *Speed is a feature*
3. *Delight in every interaction*

<!--@block id="tech-stack" x="620" y="180" w="380" h="auto" z="28" -->
### Tech stack

| Layer | Choice |
|-------|--------|
| Frontend | React + Vite |
| Canvas | Custom engine |
| State | Event-driven |
| Format | .sbd (markdown) |

<!--@block id="sprint-1" x="60" y="560" w="340" h="auto" z="25" group="sprints" -->
### Sprint 1 — Foundation

- [x] Canvas pan & zoom
- [x] Content blocks (BlockNote)
- [x] Draw tool (pen, highlighter)
- [x] Undo / redo
- [x] SBD serialization

<!--@block id="sprint-2" x="420" y="560" w="340" h="auto" z="25" group="sprints" -->
### Sprint 2 — Shapes & Edges

- [x] Shape tool (rect, ellipse, diamond)
- [x] Line & arrow shapes
- [x] Edge connections
- [x] Bezier / step / smoothstep edges
- [x] Edge labels & animations

<!--@block id="sprint-3" x="780" y="560" w="340" h="auto" z="25" group="sprints" -->
### Sprint 3 — Polish

- [x] Text nodes
- [x] Sticky notes
- [x] Image paste & drag
- [x] Frame nodes
- [x] Properties panel
- [ ] Collaborative editing

<!--@sticky id="remind-1" x="1200" y="180" w="200" h="150" z="35" color="#FEF3C7" rotation="-3" -->
Don't forget to ship something small every week!

<!--@sticky id="remind-2" x="1420" y="180" w="200" h="150" z="35" color="#FCE7F3" rotation="2" -->
Talk to users before writing code

<!--@sticky id="remind-3" x="1200" y="360" w="200" h="150" z="35" color="#DBEAFE" rotation="1" -->
Performance is a feature, not an afterthought

<!--@sticky id="remind-4" x="1420" y="360" w="200" h="150" z="35" color="#D1FAE5" rotation="-2" -->
Every pixel counts. Sweat the details.

<!--@sticky id="remind-5" x="1310" y="540" w="200" h="150" z="35" color="#EDE9FE" rotation="4" -->
Sleep on it. The best ideas need time.

<!--@text id="zone-stickies" x="1230" y="140" w="360" z="40" fontSize="14" fontFamily="sans-serif" color="#f59e0b" align="center" -->
Reminders

<!--@text id="zone-sprints" x="60" y="520" w="400" z="40" fontSize="14" fontFamily="sans-serif" color="#6366f1" align="left" -->
Sprint tracker

<!--@block id="api-design" x="60" y="940" w="440" h="auto" z="22" -->
### API sketch

${v}typescript
interface Board {
  id: string;
  nodes: SpatialNode[];
  viewport: Viewport;
  createdAt: Date;
}

async function saveBoard(board: Board) {
  const sbd = await serializeToSBD(board.nodes);
  await fs.writeFile(board.id + '.sbd', sbd);
}
${v}

<!--@block id="data-model" x="540" y="940" w="400" h="auto" z="22" -->
### Data model

Each node has:
- **Position** — x, y (canvas coordinates)
- **Size** — w, h (or \`"auto"\` for content-fit)
- **Layer** — z-index for stacking
- **Type** — content, draw, shape, text, sticky, image, edge
- **Data** — type-specific payload

<!--@block id="design-notes" x="980" y="940" w="380" h="auto" z="22" rotation="-1" -->
### Design notes

The **SBD format** is human-readable markdown with spatial annotations. This means:
- Version control friendly (plain text diffs)
- Editable in any text editor
- Git-mergeable (mostly)
- *Zero vendor lock-in*

<!--@text id="big-number" x="1680" y="180" w="300" z="45" fontSize="72" fontFamily="sans-serif" color="#6366f1" align="center" -->
42

<!--@text id="big-label" x="1680" y="280" w="300" z="44" fontSize="16" fontFamily="sans-serif" color="#94a3b8" align="center" -->
nodes on this board

<!--@block id="inspiration" x="1680" y="380" w="320" h="auto" z="20" -->
### Inspiration

Tools that shaped our thinking:

- **Miro** — collaborative canvas
- **Excalidraw** — hand-drawn feel
- **Obsidian** — linked thinking
- **Figma** — multiplayer design
- **tldraw** — developer-friendly

<!--@block id="quote-box" x="1680" y="720" w="320" h="auto" z="20" rotation="1" -->
> "Simplicity is the ultimate sophistication."

— Leonardo da Vinci

<!--@sticky id="idea-1" x="2080" y="180" w="220" h="180" z="30" color="#FEF3C7" rotation="-2" -->
What if boards could be embedded inside other boards? Nested canvases!

<!--@sticky id="idea-2" x="2320" y="180" w="220" h="180" z="30" color="#FFEDD5" rotation="3" -->
AI assistant that reads the board and suggests connections between ideas

<!--@sticky id="idea-3" x="2080" y="400" w="220" h="180" z="30" color="#FCE7F3" rotation="1" -->
Presentation mode — step through frames like slides

<!--@sticky id="idea-4" x="2320" y="400" w="220" h="180" z="30" color="#DBEAFE" rotation="-3" -->
Export to PDF with spatial layout preserved

<!--@text id="zone-ideas" x="2080" y="140" w="460" z="40" fontSize="14" fontFamily="sans-serif" color="#ec4899" align="center" -->
Future ideas

<!--@block id="metrics" x="2080" y="640" w="460" h="auto" z="22" -->
### Metrics we care about

| Metric | Target | Current |
|--------|--------|---------|
| Time to first node | < 2s | 1.2s |
| Canvas FPS (1000 nodes) | 60fps | 58fps |
| SBD parse time | < 50ms | 12ms |
| Bundle size | < 500kb | 380kb |
| Undo latency | < 16ms | 8ms |

<!--@block id="risks" x="2080" y="1000" w="340" h="auto" z="20" rotation="-1" -->
### Risks

- Performance at scale (10k+ nodes)
- BlockNote upgrade breaking changes
- Browser compat edge cases
- Scope creep (always)

<!--@block id="mitigations" x="2440" y="1000" w="340" h="auto" z="20" rotation="1" -->
### Mitigations

- QuadTree spatial indexing
- Pin BlockNote version
- Progressive enhancement
- Ruthless prioritization

<!--@draw id="underline-title" x="60" y="42" z="2" tool="pen" color="#6366f1" width="3" -->
60.0,92.0,0.50 160.0,91.0,0.50 340.0,90.0,0.50 500.0,91.0,0.50 620.0,92.0,0.50

<!--@draw id="hl-vision" x="55" y="178" z="1" tool="highlighter" color="#6366f1" width="24" opacity="0.12" -->
55.0,188.0,0.50 200.0,188.0,0.50 400.0,188.0,0.50 580.0,188.0,0.50

<!--@draw id="hl-sprints" x="55" y="518" z="1" tool="highlighter" color="#6366f1" width="20" opacity="0.10" -->
55.0,528.0,0.50 200.0,528.0,0.50 350.0,528.0,0.50

<!--@draw id="doodle-spiral" x="1130" y="160" z="4" tool="pen" color="#ec4899" width="1.5" -->
1150.0,200.0,0.50 1155.0,190.0,0.50 1165.0,185.0,0.50 1175.0,188.0,0.50 1178.0,198.0,0.50 1172.0,208.0,0.50 1160.0,212.0,0.50 1148.0,206.0,0.50 1142.0,194.0,0.50 1145.0,182.0,0.50 1156.0,174.0,0.50 1170.0,172.0,0.50 1182.0,178.0,0.50

<!--@draw id="wave-divider" x="60" y="900" z="2" tool="pen" color="#10b981" width="2" -->
60.0,920.0,0.50 90.0,910.0,0.50 120.0,920.0,0.50 150.0,930.0,0.50 180.0,920.0,0.50 210.0,910.0,0.50 240.0,920.0,0.50 270.0,930.0,0.50 300.0,920.0,0.50

<!--@draw id="wave-divider-2" x="330" y="900" z="2" tool="pen" color="#10b981" width="2" -->
330.0,920.0,0.50 360.0,910.0,0.50 390.0,920.0,0.50 420.0,930.0,0.50 450.0,920.0,0.50 480.0,910.0,0.50 510.0,920.0,0.50 540.0,930.0,0.50 570.0,920.0,0.50 600.0,910.0,0.50

<!--@draw id="arrow-doodle" x="1600" y="240" z="3" tool="pen" color="#f59e0b" width="2" -->
1610.0,280.0,0.50 1630.0,260.0,0.50 1650.0,250.0,0.50 1670.0,248.0,0.50 1640.0,240.0,0.50 1650.0,250.0,0.50 1640.0,260.0,0.50

<!--@draw id="lightbulb" x="2020" y="60" z="6" tool="pen" color="#f59e0b" width="2" -->
2040.0,60.0,0.50 2032.0,65.0,0.50 2027.0,74.0,0.50 2025.0,85.0,0.50 2028.0,96.0,0.50 2034.0,104.0,0.50 2037.0,110.0,0.50 2037.0,118.0,0.50 2035.0,122.0,0.50 2045.0,122.0,0.50 2043.0,118.0,0.50 2043.0,110.0,0.50 2046.0,104.0,0.50 2052.0,96.0,0.50 2055.0,85.0,0.50 2053.0,74.0,0.50 2048.0,65.0,0.50 2040.0,60.0,0.50

<!--@draw id="lightbulb-base" x="2033" y="122" z="6" tool="pen" color="#f59e0b" width="1.5" -->
2035.0,126.0,0.50 2045.0,126.0,0.50 2035.0,130.0,0.50 2045.0,130.0,0.50 2038.0,134.0,0.50 2042.0,134.0,0.50

<!--@draw id="lightbulb-rays-1" x="2015" y="75" z="5" tool="pen" color="#fbbf24" width="1" -->
2020.0,82.0,0.50 2010.0,80.0,0.50 2005.0,78.0,0.50

<!--@draw id="lightbulb-rays-2" x="2050" y="75" z="5" tool="pen" color="#fbbf24" width="1" -->
2058.0,82.0,0.50 2068.0,80.0,0.50 2073.0,78.0,0.50

<!--@draw id="lightbulb-rays-3" x="2035" y="48" z="5" tool="pen" color="#fbbf24" width="1" -->
2040.0,56.0,0.50 2040.0,48.0,0.50

<!--@draw id="rocket" x="1120" y="520" z="6" tool="pen" color="#6366f1" width="2" -->
1140.0,520.0,0.50 1144.0,528.0,0.50 1146.0,540.0,0.50 1146.0,555.0,0.50 1143.0,565.0,0.50 1138.0,572.0,0.50 1130.0,575.0,0.50 1128.0,570.0,0.50 1132.0,560.0,0.50 1130.0,555.0,0.50 1124.0,558.0,0.50 1120.0,555.0,0.50 1124.0,548.0,0.50 1128.0,540.0,0.50 1130.0,528.0,0.50 1134.0,522.0,0.50 1140.0,520.0,0.50

<!--@draw id="rocket-flame" x="1126" y="575" z="5" tool="pen" color="#f59e0b" width="1.5" -->
1130.0,575.0,0.50 1128.0,582.0,0.50 1132.0,588.0,0.50 1134.0,582.0,0.50 1136.0,588.0,0.50 1138.0,575.0,0.50

<!--@draw id="star-1" x="690" y="40" z="5" tool="pen" color="#f59e0b" width="1.5" -->
700.0,40.0,0.50 703.0,50.0,0.50 713.0,50.0,0.50 705.0,56.0,0.50 708.0,66.0,0.50 700.0,60.0,0.50 692.0,66.0,0.50 695.0,56.0,0.50 687.0,50.0,0.50 697.0,50.0,0.50 700.0,40.0,0.50

<!--@draw id="star-2" x="730" y="55" z="5" tool="pen" color="#f59e0b" width="1" -->
738.0,55.0,0.50 740.0,61.0,0.50 746.0,61.0,0.50 741.0,65.0,0.50 743.0,71.0,0.50 738.0,67.0,0.50 733.0,71.0,0.50 735.0,65.0,0.50 730.0,61.0,0.50 736.0,61.0,0.50 738.0,55.0,0.50

<!--@draw id="star-3" x="2570" y="160" z="5" tool="pen" color="#ec4899" width="1" -->
2578.0,160.0,0.50 2580.0,166.0,0.50 2586.0,166.0,0.50 2581.0,170.0,0.50 2583.0,176.0,0.50 2578.0,172.0,0.50 2573.0,176.0,0.50 2575.0,170.0,0.50 2570.0,166.0,0.50 2576.0,166.0,0.50 2578.0,160.0,0.50

<!--@draw id="coffee-cup" x="1040" y="48" z="5" tool="pen" color="#94a3b8" width="1.5" -->
1048.0,65.0,0.50 1046.0,75.0,0.50 1048.0,85.0,0.50 1060.0,88.0,0.50 1072.0,85.0,0.50 1074.0,75.0,0.50 1072.0,65.0,0.50 1048.0,65.0,0.50

<!--@draw id="coffee-handle" x="1074" y="68" z="5" tool="pen" color="#94a3b8" width="1.5" -->
1074.0,70.0,0.50 1080.0,72.0,0.50 1082.0,77.0,0.50 1080.0,82.0,0.50 1074.0,82.0,0.50

<!--@draw id="coffee-steam-1" x="1052" y="48" z="5" tool="pen" color="#94a3b8" width="1" opacity="0.4" -->
1055.0,62.0,0.50 1053.0,56.0,0.50 1056.0,51.0,0.50 1054.0,48.0,0.50

<!--@draw id="coffee-steam-2" x="1060" y="48" z="5" tool="pen" color="#94a3b8" width="1" opacity="0.4" -->
1065.0,62.0,0.50 1063.0,56.0,0.50 1066.0,51.0,0.50 1064.0,48.0,0.50

<!--@draw id="check-1" x="28" y="565" z="6" tool="pen" color="#10b981" width="2.5" -->
30.0,580.0,0.50 38.0,590.0,0.50 52.0,568.0,0.50

<!--@draw id="bracket-left" x="40" y="940" z="3" tool="pen" color="#94a3b8" width="1.5" -->
52.0,940.0,0.50 44.0,945.0,0.50 40.0,960.0,0.50 40.0,1020.0,0.50 40.0,1080.0,0.50 40.0,1140.0,0.50 44.0,1155.0,0.50 52.0,1160.0,0.50

<!--@draw id="bracket-dot" x="36" y="1045" z="3" tool="pen" color="#94a3b8" width="3" -->
38.0,1050.0,0.50 38.0,1051.0,0.50

<!--@draw id="cloud" x="2590" y="380" z="4" tool="pen" color="#94a3b8" width="1.5" opacity="0.5" -->
2610.0,420.0,0.50 2600.0,418.0,0.50 2594.0,412.0,0.50 2592.0,404.0,0.50 2596.0,396.0,0.50 2604.0,392.0,0.50 2610.0,388.0,0.50 2618.0,384.0,0.50 2628.0,382.0,0.50 2636.0,384.0,0.50 2642.0,390.0,0.50 2644.0,398.0,0.50 2646.0,404.0,0.50 2650.0,408.0,0.50 2652.0,414.0,0.50 2648.0,420.0,0.50 2638.0,422.0,0.50 2624.0,422.0,0.50 2610.0,420.0,0.50

<!--@draw id="cloud-dots" x="2614" y="424" z="4" tool="pen" color="#94a3b8" width="2" opacity="0.4" -->
2620.0,428.0,0.50 2620.0,429.0,0.50

<!--@draw id="cloud-dots-2" x="2624" y="432" z="4" tool="pen" color="#94a3b8" width="2" opacity="0.3" -->
2628.0,436.0,0.50 2628.0,437.0,0.50

<!--@draw id="squiggle-underline" x="2080" y="655" z="3" tool="pen" color="#6366f1" width="1.5" opacity="0.5" -->
2080.0,658.0,0.50 2110.0,654.0,0.50 2140.0,658.0,0.50 2170.0,654.0,0.50 2200.0,658.0,0.50 2230.0,654.0,0.50 2260.0,658.0,0.50

<!--@draw id="circle-highlight" x="1660" y="165" z="2" tool="pen" color="#6366f1" width="1" opacity="0.3" -->
1740.0,170.0,0.50 1770.0,172.0,0.50 1800.0,178.0,0.50 1818.0,190.0,0.50 1825.0,210.0,0.50 1820.0,230.0,0.50 1805.0,245.0,0.50 1780.0,252.0,0.50 1750.0,255.0,0.50 1720.0,252.0,0.50 1695.0,242.0,0.50 1678.0,225.0,0.50 1672.0,205.0,0.50 1675.0,185.0,0.50 1690.0,174.0,0.50 1715.0,170.0,0.50 1740.0,170.0,0.50

<!--@draw id="exclamation-1" x="2560" y="640" z="5" tool="pen" color="#ef4444" width="2" -->
2568.0,645.0,0.50 2568.0,665.0,0.50

<!--@draw id="exclamation-dot" x="2564" y="672" z="5" tool="pen" color="#ef4444" width="3" -->
2568.0,675.0,0.50 2568.0,676.0,0.50

<!--@draw id="heart" x="870" y="40" z="5" tool="pen" color="#ec4899" width="1.5" -->
880.0,52.0,0.50 876.0,46.0,0.50 870.0,44.0,0.50 866.0,46.0,0.50 864.0,52.0,0.50 866.0,58.0,0.50 872.0,64.0,0.50 880.0,70.0,0.50 888.0,64.0,0.50 894.0,58.0,0.50 896.0,52.0,0.50 894.0,46.0,0.50 890.0,44.0,0.50 884.0,46.0,0.50 880.0,52.0,0.50

<!--@draw id="infinity" x="2560" y="1000" z="4" tool="pen" color="#8b5cf6" width="1.5" opacity="0.4" -->
2580.0,1020.0,0.50 2572.0,1012.0,0.50 2568.0,1006.0,0.50 2570.0,1000.0,0.50 2576.0,998.0,0.50 2584.0,1002.0,0.50 2592.0,1012.0,0.50 2600.0,1022.0,0.50 2608.0,1026.0,0.50 2614.0,1024.0,0.50 2616.0,1018.0,0.50 2612.0,1012.0,0.50 2604.0,1006.0,0.50 2596.0,1006.0,0.50 2588.0,1012.0,0.50 2580.0,1020.0,0.50

<!--@draw id="zigzag-top" x="60" y="145" z="2" tool="pen" color="#e2e8f0" width="1" -->
60.0,150.0,0.50 90.0,145.0,0.50 120.0,150.0,0.50 150.0,145.0,0.50 180.0,150.0,0.50 210.0,145.0,0.50 240.0,150.0,0.50 270.0,145.0,0.50 300.0,150.0,0.50 330.0,145.0,0.50 360.0,150.0,0.50 390.0,145.0,0.50 420.0,150.0,0.50 450.0,145.0,0.50 480.0,150.0,0.50 510.0,145.0,0.50 540.0,150.0,0.50 570.0,145.0,0.50 600.0,150.0,0.50

<!--@draw id="dots-row" x="1400" y="900" z="3" tool="pen" color="#94a3b8" width="3" opacity="0.3" -->
1410.0,910.0,0.50 1410.0,911.0,0.50

<!--@draw id="dots-row-2" x="1430" y="900" z="3" tool="pen" color="#94a3b8" width="3" opacity="0.3" -->
1440.0,910.0,0.50 1440.0,911.0,0.50

<!--@draw id="dots-row-3" x="1460" y="900" z="3" tool="pen" color="#94a3b8" width="3" opacity="0.3" -->
1470.0,910.0,0.50 1470.0,911.0,0.50

<!--@draw id="shape-bg-1" x="1660" y="160" w="340" h="160" z="3" tool="shape" shape="rect" color="#6366f1" stroke="2" roughness="1.5" strokeStyle="dashed" -->

<!--@draw id="shape-ellipse-ideas" x="2060" y="120" w="500" h="520" z="2" tool="shape" shape="ellipse" color="#ec4899" stroke="1" roughness="2" opacity="0.3" -->

<!--@draw id="shape-diamond" x="1140" y="700" w="60" h="60" z="4" tool="shape" shape="diamond" color="#8b5cf6" stroke="2" roughness="1" fill="#ede9fe" -->

<!--@draw id="shape-diamond-2" x="1640" y="890" w="40" h="40" z="4" tool="shape" shape="diamond" color="#f59e0b" stroke="1.5" roughness="1" fill="#fef3c7" -->

<!--@draw id="shape-line" x="60" y="1320" w="900" h="0" z="2" tool="shape" shape="line" color="#e2e8f0" stroke="1" roughness="0.5" startPt="0.0,0.0" endPt="900.0,0.0" -->

<!--@draw id="shape-line-2" x="1400" y="1320" w="600" h="0" z="2" tool="shape" shape="line" color="#e2e8f0" stroke="1" roughness="0.5" startPt="0.0,0.0" endPt="600.0,0.0" -->

<!--@draw id="shape-arrow-1" x="1400" y="700" w="260" h="60" z="3" tool="shape" shape="arrow" color="#6366f1" stroke="2" roughness="1" startPt="0.0,60.0" endPt="260.0,0.0" -->

<!--@draw id="shape-rect-accent" x="1400" y="1340" w="280" h="200" z="2" tool="shape" shape="rect" color="#94a3b8" stroke="1" roughness="2" opacity="0.15" fill="#f1f5f9" -->

<!--@draw id="shape-ellipse-accent" x="1720" y="1360" w="200" h="160" z="2" tool="shape" shape="ellipse" color="#8b5cf6" stroke="1" roughness="2" opacity="0.15" fill="#f5f3ff" -->

<!--@draw id="shape-arrow-2" x="1400" y="860" w="160" h="40" z="3" tool="shape" shape="arrow" color="#94a3b8" stroke="1.5" roughness="1" startPt="0.0,20.0" endPt="160.0,20.0" -->

<!--@draw id="shape-line-vert" x="1380" y="170" w="0" h="520" z="1" tool="shape" shape="line" color="#e2e8f0" stroke="1" roughness="0.5" strokeStyle="dashed" startPt="0.0,0.0" endPt="0.0,520.0" -->

<!--@image id="img-1" x="60" y="1360" w="360" h="270" z="15" rotation="-1" src="https://picsum.photos/seed/spatial-plan/720/540" alt="Planning" -->

<!--@image id="img-2" x="460" y="1360" w="360" h="270" z="15" rotation="1" src="https://picsum.photos/seed/spatial-build/720/540" alt="Building" -->

<!--@image id="img-3" x="860" y="1360" w="360" h="270" z="15" src="https://picsum.photos/seed/spatial-ship/720/540" alt="Shipping" -->

<!--@text id="img-cap-1" x="60" y="1640" w="360" z="14" fontSize="14" fontFamily="sans-serif" color="#64748b" align="center" -->
Plan

<!--@text id="img-cap-2" x="460" y="1640" w="360" z="14" fontSize="14" fontFamily="sans-serif" color="#64748b" align="center" -->
Build

<!--@text id="img-cap-3" x="860" y="1640" w="360" z="14" fontSize="14" fontFamily="sans-serif" color="#64748b" align="center" -->
Ship

<!--@image id="gif-nyan" x="1400" y="1360" w="320" h="240" z="16" src="https://media.giphy.com/media/sIIhZliB2McAo/giphy.gif" alt="Nyan Cat" -->

<!--@image id="gif-doge" x="1760" y="1360" w="280" h="240" z="16" rotation="2" src="https://media.giphy.com/media/mCRJDo24UvJMA/giphy.gif" alt="Doge coding" -->

<!--@text id="gif-cap-1" x="1400" y="1610" w="320" z="14" fontSize="13" fontFamily="sans-serif" color="#64748b" align="center" -->
shipping features like

<!--@text id="gif-cap-2" x="1760" y="1610" w="280" z="14" fontSize="13" fontFamily="sans-serif" color="#64748b" align="center" -->
much code. very spatial. wow.

<!--@sticky id="img-note" x="2080" y="1360" w="180" h="120" z="16" color="#FFEDD5" rotation="3" -->
GIFs just work!

<!--@block id="footer" x="60" y="1720" w="700" h="auto" z="10" -->
*This is a test board for SpatialBoard. Every node type is represented — content blocks, text labels, sticky notes, shapes, drawings, images, and edges. Move things around, edit them, break stuff.*

<!--@edge id="e-s1-s2" from="sprint-1" to="sprint-2" style="solid" color="#6366f1" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-s2-s3" from="sprint-2" to="sprint-3" style="solid" color="#6366f1" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-vision-tech" from="vision" to="tech-stack" style="dashed" color="#94a3b8" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-tech-api" from="tech-stack" to="api-design" style="dotted" color="#94a3b8" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-api-data" from="api-design" to="data-model" style="dashed" color="#94a3b8" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-data-design" from="data-model" to="design-notes" style="dashed" color="#94a3b8" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-risks-mit" from="risks" to="mitigations" style="solid" color="#ef4444" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-s3-ideas" from="sprint-3" to="idea-1" style="dotted" color="#ec4899" arrowHead="arrow" label="next?" -->

<!--@edge id="e-idea1-idea3" from="idea-1" to="idea-3" style="dotted" color="#ec4899" -->

<!--@edge id="e-idea2-idea4" from="idea-2" to="idea-4" style="dotted" color="#ec4899" -->

<!--@edge id="e-remind1-remind3" from="remind-1" to="remind-3" style="solid" color="#f59e0b" -->

<!--@edge id="e-remind2-remind4" from="remind-2" to="remind-4" style="solid" color="#f59e0b" -->

<!--@edge id="e-metrics-risks" from="metrics" to="risks" style="dashed" color="#ef4444" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->
`, T = `<!--@meta canvas_w="4000" canvas_h="3000" grid="20" snap="false" -->

<!--@text id="title" x="60" y="40" w="800" z="50" fontSize="48" fontFamily="sans-serif" color="#1e1e2e" align="left" -->
Why Lobbying in the USA Is a Problem

<!--@text id="subtitle" x="60" y="110" w="700" z="49" fontSize="18" fontFamily="sans-serif" color="#94a3b8" align="left" -->
How money shapes policy — a spatial overview of influence in American politics

<!--@block id="overview" x="60" y="200" w="480" h="auto" z="30" -->
## The Problem

Lobbying in the US has grown into a **multi-billion dollar industry** that gives wealthy corporations and special interests outsized influence over legislation.

While lobbying is protected by the First Amendment (right to petition the government), critics argue the system has become:

1. *A pay-to-play system* where access equals influence
2. *A revolving door* between government and industry
3. *A barrier to reform* on issues with broad public support

<!--@block id="by-the-numbers" x="580" y="200" w="380" h="auto" z="28" -->
### By the numbers

| Metric | Value |
|--------|-------|
| Annual lobbying spend | ~$4 billion |
| Registered lobbyists | ~12,000 |
| Ratio: lobbyists to lawmakers | ~22 to 1 |
| Top spender (2023) | US Chamber of Commerce |
| ROI on lobbying | Up to 22,000% |

> Source: OpenSecrets.org

<!--@block id="dark-money" x="1000" y="200" w="380" h="auto" z="28" -->
### Dark Money & Super PACs

After *Citizens United v. FEC* (2010), the landscape changed dramatically:

- Corporations can spend **unlimited amounts** on political advocacy
- "Dark money" groups can influence elections **without disclosing donors**
- Super PACs spent over **$2 billion** in the 2020 election cycle
- The line between lobbying and campaign finance has blurred

<!--@block id="revolving-door" x="60" y="720" w="440" h="auto" z="25" -->
### The Revolving Door

Former lawmakers and staffers frequently become lobbyists, leveraging their connections and insider knowledge:

- **50%+** of former senators become lobbyists or advisors
- **42%** of former House members do the same
- Lobbyists who previously held government positions earn **significantly more** than those who didn't
- "Cooling off" periods (1–2 years) are widely seen as insufficient

This creates a pipeline where public service becomes a stepping stone to private profit.

<!--@block id="top-industries" x="540" y="720" w="380" h="auto" z="25" -->
### Top Lobbying Industries

| Industry | Annual Spend |
|----------|-------------|
| Pharmaceuticals | ~$370M |
| Insurance | ~$175M |
| Oil & Gas | ~$125M |
| Tech / Internet | ~$120M |
| Real Estate | ~$115M |
| Defense | ~$110M |

These industries spend heavily to shape regulations, tax policy, and government contracts in their favor.

<!--@block id="case-pharma" x="960" y="720" w="380" h="auto" z="25" -->
### Case Study: Pharma Lobbying

The pharmaceutical industry is the **top lobbying spender** year after year:

- Spent over **$370M annually** on lobbying
- Successfully blocked Medicare from negotiating drug prices for decades
- Americans pay **2–3x more** for prescription drugs than other developed nations
- The Inflation Reduction Act (2022) was the first law allowing *limited* price negotiation

This is a textbook example of lobbying overriding public interest.

<!--@block id="solutions" x="1380" y="720" w="380" h="auto" z="25" -->
### Proposed Solutions

Reform advocates push for:

1. **Strengthen disclosure** — require full transparency of lobbying contacts and spending
2. **Extend cooling-off periods** — 5+ years before former officials can lobby
3. **Public campaign financing** — reduce lawmakers' dependence on private donors
4. **Overturn Citizens United** — constitutional amendment to limit corporate spending
5. **Empower ethics offices** — give oversight bodies real enforcement power

<!--@text id="zone-problems" x="60" y="1220" w="400" z="40" fontSize="14" fontFamily="sans-serif" color="#ef4444" align="left" -->
Core structural problems

<!--@block id="problem-1" x="60" y="1260" w="380" h="auto" z="22" -->
### 1. Money = Access

Lobbying creates a two-tier system:
- **Wealthy interests** get face time with lawmakers, draft legislation, and shape debates
- **Ordinary citizens** are left with form letters and town halls
- Members of Congress spend **30–70% of their time fundraising**, making them dependent on donor relationships

<!--@block id="problem-2" x="480" y="1260" w="380" h="auto" z="22" -->
### 2. Policy Distortion

Lobbying can block or distort policies that have broad public support:
- **Gun control** — 90% of Americans support universal background checks, yet legislation repeatedly fails
- **Climate action** — fossil fuel lobbying has delayed emissions regulation for decades
- **Healthcare** — the US remains the only wealthy nation without universal coverage

<!--@block id="problem-3" x="900" y="1260" w="380" h="auto" z="22" -->
### 3. Regulatory Capture

When industries effectively control the agencies meant to regulate them:
- Industry lobbyists help **write the rules** they'll be governed by
- Agencies become staffed by former industry executives
- Enforcement becomes lax or symbolic
- The public interest takes a back seat to private profit

<!--@block id="global-compare" x="1320" y="1260" w="460" h="auto" z="22" -->
### How Other Democracies Handle It

| Country | Approach |
|---------|----------|
| Canada | Mandatory lobbyist registry, strict reporting |
| EU | Transparency Register, conditional access to Parliament |
| France | Strict lobbying rules since 2016, cap on gifts |
| UK | Lobbying Act 2014, public register |
| USA | Voluntary compliance culture, weak enforcement |

Most peer democracies have **stricter rules** and **stronger enforcement** than the US.

<!--@block id="quote-section" x="60" y="1700" w="500" h="auto" z="20" -->
### Notable Quotes

> "The banks own the place." — Sen. Dick Durbin, on the US Senate

> "Lobbying is the world's second oldest profession." — Bill Press

> "The liberty of a democracy is not safe if the people tolerate the growth of private power to a point where it becomes stronger than the democratic state itself." — Franklin D. Roosevelt

<!--@block id="what-you-can-do" x="600" y="1700" w="440" h="auto" z="20" -->
### What Citizens Can Do

- **Track lobbying data** at OpenSecrets.org and FollowTheMoney.org
- **Contact your representatives** — direct constituent pressure still matters
- **Support reform organizations** like RepresentUs, Issue One, and Common Cause
- **Vote on lobbying reform** ballot measures at the state level
- **Stay informed** — awareness is the first step to accountability

<!--@sticky id="fact-1" x="1820" y="200" w="220" h="180" z="30" color="#FEF3C7" rotation="-2" -->
For every $1 spent on lobbying, companies can receive up to $220 in tax breaks and government benefits. That's a 22,000% ROI.

<!--@sticky id="fact-2" x="2060" y="200" w="220" h="180" z="30" color="#FCE7F3" rotation="3" -->
In 2023, the top 10 lobbying firms alone brought in over $1 billion in revenue. Lobbying is big business.

<!--@sticky id="fact-3" x="1820" y="420" w="220" h="180" z="30" color="#DBEAFE" rotation="1" -->
The US has more lobbyists per capita than any other democracy. The next closest is the EU, with far stricter rules.

<!--@sticky id="fact-4" x="2060" y="420" w="220" h="180" z="30" color="#D1FAE5" rotation="-3" -->
A Princeton study found that average citizens have "near-zero" impact on policy, while economic elites and organized groups have substantial influence.

<!--@sticky id="fact-5" x="1940" y="640" w="220" h="180" z="30" color="#EDE9FE" rotation="2" -->
The NRA spent $5M+ on lobbying in 2023. Meanwhile, 90% of voters support universal background checks. The disconnect is stark.

<!--@text id="zone-facts" x="1850" y="160" w="400" z="40" fontSize="14" fontFamily="sans-serif" color="#f59e0b" align="center" -->
Key Facts

<!--@text id="big-number" x="2340" y="200" w="300" z="45" fontSize="72" fontFamily="sans-serif" color="#ef4444" align="center" -->
$4B

<!--@text id="big-label" x="2340" y="300" w="300" z="44" fontSize="16" fontFamily="sans-serif" color="#94a3b8" align="center" -->
spent on lobbying annually in the US

<!--@draw id="underline-title" x="60" y="42" z="2" tool="pen" color="#ef4444" width="3" -->
60.0,92.0,0.50 160.0,91.0,0.50 340.0,90.0,0.50 500.0,91.0,0.50 700.0,92.0,0.50 820.0,91.0,0.50

<!--@draw id="hl-overview" x="55" y="198" z="1" tool="highlighter" color="#ef4444" width="24" opacity="0.12" -->
55.0,208.0,0.50 200.0,208.0,0.50 400.0,208.0,0.50 540.0,208.0,0.50

<!--@draw id="wave-divider" x="60" y="1180" z="2" tool="pen" color="#ef4444" width="2" -->
60.0,1200.0,0.50 90.0,1190.0,0.50 120.0,1200.0,0.50 150.0,1210.0,0.50 180.0,1200.0,0.50 210.0,1190.0,0.50 240.0,1200.0,0.50 270.0,1210.0,0.50 300.0,1200.0,0.50

<!--@draw id="wave-divider-2" x="330" y="1180" z="2" tool="pen" color="#ef4444" width="2" -->
330.0,1200.0,0.50 360.0,1190.0,0.50 390.0,1200.0,0.50 420.0,1210.0,0.50 450.0,1200.0,0.50 480.0,1190.0,0.50 510.0,1200.0,0.50 540.0,1210.0,0.50 570.0,1200.0,0.50 600.0,1190.0,0.50

<!--@draw id="wave-divider-3" x="60" y="1660" z="2" tool="pen" color="#10b981" width="2" -->
60.0,1680.0,0.50 90.0,1670.0,0.50 120.0,1680.0,0.50 150.0,1690.0,0.50 180.0,1680.0,0.50 210.0,1670.0,0.50 240.0,1680.0,0.50 270.0,1690.0,0.50 300.0,1680.0,0.50

<!--@draw id="shape-bg-number" x="2320" y="180" w="340" h="160" z="3" tool="shape" shape="rect" color="#ef4444" stroke="2" roughness="1.5" strokeStyle="dashed" -->

<!--@draw id="shape-ellipse-facts" x="1800" y="140" w="520" h="720" z="2" tool="shape" shape="ellipse" color="#f59e0b" stroke="1" roughness="2" opacity="0.2" -->

<!--@draw id="shape-line-1" x="60" y="1660" w="1100" h="0" z="1" tool="shape" shape="line" color="#e2e8f0" stroke="1" roughness="0.5" startPt="0.0,0.0" endPt="1100.0,0.0" -->

<!--@draw id="circle-highlight" x="2320" y="185" z="2" tool="pen" color="#ef4444" width="1" opacity="0.3" -->
2400.0,190.0,0.50 2430.0,192.0,0.50 2460.0,198.0,0.50 2478.0,210.0,0.50 2485.0,230.0,0.50 2480.0,250.0,0.50 2465.0,265.0,0.50 2440.0,272.0,0.50 2410.0,275.0,0.50 2380.0,272.0,0.50 2355.0,262.0,0.50 2338.0,245.0,0.50 2332.0,225.0,0.50 2335.0,205.0,0.50 2350.0,194.0,0.50 2375.0,190.0,0.50 2400.0,190.0,0.50

<!--@edge id="e-overview-numbers" from="overview" to="by-the-numbers" style="dashed" color="#94a3b8" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-overview-revolving" from="overview" to="revolving-door" style="solid" color="#6366f1" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-revolving-industries" from="revolving-door" to="top-industries" style="dashed" color="#94a3b8" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-industries-pharma" from="top-industries" to="case-pharma" style="solid" color="#ef4444" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-dark-solutions" from="dark-money" to="solutions" style="dashed" color="#10b981" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" label="reform?" -->

<!--@edge id="e-p1-p2" from="problem-1" to="problem-2" style="solid" color="#ef4444" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-p2-p3" from="problem-2" to="problem-3" style="solid" color="#ef4444" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-numbers-dark" from="by-the-numbers" to="dark-money" style="dotted" color="#94a3b8" arrowHead="arrow" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-solutions-action" from="solutions" to="what-you-can-do" style="solid" color="#10b981" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-pharma-problems" from="case-pharma" to="problem-2" style="dotted" color="#ef4444" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-compare-solutions" from="global-compare" to="solutions" style="dashed" color="#94a3b8" sourceHandle="top" targetHandle="bottom" -->

<!--@block id="footer" x="60" y="2000" w="800" h="auto" z="10" -->
*This board presents documented concerns about lobbying in the United States. Data sourced from OpenSecrets.org, the Center for Responsive Politics, and peer-reviewed research. The goal is to inform civic awareness, not to advocate for any political party.*
`, A = `<!--@meta canvas_w="4000" canvas_h="3400" grid="20" snap="false" -->

<!--@text id="title" x="60" y="40" w="900" z="50" fontSize="48" fontFamily="sans-serif" color="#1e1e2e" align="left" -->
The Golden Age of Islam

<!--@text id="subtitle" x="60" y="110" w="800" z="49" fontSize="18" fontFamily="sans-serif" color="#94a3b8" align="left" -->
8th–14th Century — When the Islamic world led humanity in science, medicine, mathematics, and philosophy

<!--@block id="overview" x="60" y="200" w="520" h="auto" z="30" -->
## Overview

The Islamic Golden Age (roughly **750–1258 CE**) was a period of extraordinary cultural, economic, and scientific flourishing in the Islamic world.

Centered around the **Abbasid Caliphate** and its capital **Baghdad**, scholars of many faiths — Muslim, Christian, Jewish, Zoroastrian — worked together to:

- **Translate** the works of Greek, Persian, and Indian scholars
- **Advance** every field of knowledge from algebra to astronomy
- **Build** institutions like hospitals, universities, and libraries
- **Connect** civilizations through trade, diplomacy, and scholarship

> The House of Wisdom in Baghdad became the greatest intellectual center in the world.

<!--@block id="timeline" x="620" y="200" w="420" h="auto" z="28" -->
### Key Timeline

| Year | Event |
|------|-------|
| 750 | Abbasid Caliphate established |
| 762 | Baghdad founded as new capital |
| 830 | House of Wisdom established |
| 850 | Al-Khwarizmi's algebra treatise |
| 1000 | Ibn al-Haytham's Book of Optics |
| 1025 | Ibn Sina's Canon of Medicine |
| 1154 | Al-Idrisi's world map |
| 1258 | Mongol sack of Baghdad |

<!--@block id="mathematics" x="60" y="740" w="420" h="auto" z="25" -->
### Mathematics

Islamic mathematicians transformed the field:

- **Al-Khwarizmi** (780–850) — Father of algebra; the word "algorithm" comes from his name
- **Omar Khayyam** (1048–1131) — Solved cubic equations; reformed the Persian calendar
- **Al-Kindi** (801–873) — Pioneer of cryptanalysis and frequency analysis
- Introduced **Hindu-Arabic numerals** (0–9) to the world, replacing Roman numerals
- Developed **trigonometry** as an independent discipline

Without these contributions, modern computing would not exist.

<!--@block id="medicine" x="520" y="740" w="420" h="auto" z="25" -->
### Medicine & Health

Islamic physicians built the world's first systematic medical tradition:

- **Ibn Sina (Avicenna)** — *The Canon of Medicine* was used as a textbook in Europe for **600 years**
- **Al-Razi (Rhazes)** — Distinguished measles from smallpox; pioneered clinical observation
- **Al-Zahrawi** — Father of surgery; invented over **200 surgical instruments**
- Built the world's first **hospitals** (bimaristans) with separate wards, pharmacies, and medical schools
- Developed **clinical trials** and evidence-based treatment

<!--@block id="astronomy" x="980" y="740" w="420" h="auto" z="25" -->
### Astronomy

Islamic astronomers mapped the heavens with extraordinary precision:

- **Many star names** we use today are Arabic: Aldebaran, Betelgeuse, Rigel, Vega, Altair
- Built advanced **observatories** across the Islamic world
- **Al-Battani** — Refined measurements of the solar year to within 2 minutes of modern values
- **Al-Tusi** — Developed the "Tusi couple" mathematical model, later used by Copernicus
- Improved the **astrolabe** into a precision instrument for navigation and timekeeping

<!--@block id="optics" x="60" y="1280" w="420" h="auto" z="25" -->
### Optics & Physics

- **Ibn al-Haytham (Alhazen)** — *Book of Optics* (1011) is considered the **birth of the scientific method**
- Proved that vision works by light entering the eye (not rays leaving it)
- Conducted systematic **experiments** — arguably the first true experimental physicist
- His work influenced **Roger Bacon, Kepler, and Newton**
- Studied refraction, reflection, and the camera obscura

<!--@block id="philosophy" x="520" y="1280" w="420" h="auto" z="25" -->
### Philosophy & Translation

The Islamic world preserved and extended Greek philosophy:

- **The Translation Movement** — massive effort to translate Greek, Persian, Sanskrit, and Syriac texts into Arabic
- **Ibn Rushd (Averroes)** — His commentaries on Aristotle shaped European scholasticism
- **Al-Farabi** — "Second Teacher" after Aristotle; wrote on logic, politics, and music
- **Ibn Khaldun** — Founder of sociology and historiography; wrote *Muqaddimah*
- Without Islamic translators, much of **Plato, Aristotle, and Galen** would have been lost forever

<!--@block id="technology" x="980" y="1280" w="420" h="auto" z="25" -->
### Technology & Engineering

Innovation was driven by practical needs:

- **Windmills** — first invented in Persia (7th century)
- **Water clocks** and automata — al-Jazari built programmable machines
- **Paper manufacturing** — adopted from China, refined, and spread to Europe
- **Glassmaking** — advanced techniques for lenses and laboratory equipment
- **Steel production** — Damascus steel was legendary for its quality
- **Agricultural revolution** — introduced irrigation systems, crop rotation, and new crops (citrus, cotton, sugarcane) across the empire

<!--@block id="geography" x="60" y="1820" w="420" h="auto" z="22" -->
### Geography & Exploration

Islamic scholars created the most accurate maps of the medieval world:

- **Al-Idrisi** (1154) — Created the *Tabula Rogeriana*, the most advanced world map for 300 years
- **Ibn Battuta** — Traveled **75,000 miles** across Africa, Asia, and Europe (3x more than Marco Polo)
- **Ahmad ibn Majid** — Master navigator of the Indian Ocean; aided Vasco da Gama
- Developed the **magnetic compass** for maritime navigation
- Detailed geographic encyclopedias covering climate, trade routes, and cultures

<!--@block id="architecture" x="520" y="1820" w="420" h="auto" z="22" -->
### Art & Architecture

A legacy visible across three continents:

- **Alhambra** (Granada) — masterwork of Islamic geometric art
- **Great Mosque of Cordoba** — 856 columns in a "forest" of arches
- **Geometric patterns** — complex tessellations that anticipated mathematical concepts by centuries
- **Arabesque** — intricate decorative art combining geometry and flowing forms
- **Calligraphy** — elevated to a high art form with dozens of distinct scripts
- Innovations in **dome construction**, muqarnas vaulting, and minarets influenced architecture worldwide

<!--@block id="legacy" x="980" y="1820" w="420" h="auto" z="22" -->
### Lasting Legacy

The Golden Age shaped the modern world in ways we often overlook:

- **English words** from Arabic: algebra, algorithm, chemistry, zenith, nadir, tariff, magazine, cotton, lemon, orange
- **Universities** — Al-Qarawiyyin (859 CE, Fez) is the oldest continuously operating university
- The **scientific method** pioneered by Ibn al-Haytham became the foundation of modern science
- **Hindu-Arabic numerals** replaced Roman numerals and enabled modern mathematics
- **European Renaissance** was directly sparked by the rediscovery of classical works preserved and extended by Islamic scholars

<!--@text id="zone-scholars" x="1500" y="160" w="400" z="40" fontSize="14" fontFamily="sans-serif" color="#f59e0b" align="center" -->
Key Scholars

<!--@sticky id="scholar-1" x="1480" y="200" w="220" h="200" z="30" color="#FEF3C7" rotation="-2" -->
AL-KHWARIZMI (780–850)
Father of Algebra. His book "al-Kitab al-Mukhtasar" gave us the word "algebra." The word "algorithm" derives from his Latinized name.

<!--@sticky id="scholar-2" x="1720" y="200" w="220" h="200" z="30" color="#FCE7F3" rotation="3" -->
IBN SINA (980–1037)
Avicenna. His Canon of Medicine was the standard medical textbook in Europe and the Islamic world for over 600 years. Wrote on philosophy, astronomy, and logic too.

<!--@sticky id="scholar-3" x="1480" y="440" w="220" h="200" z="30" color="#DBEAFE" rotation="1" -->
IBN AL-HAYTHAM (965–1040)
Alhazen. Father of optics and pioneer of the scientific method. His Book of Optics challenged 1000 years of Greek optical theory with actual experiments.

<!--@sticky id="scholar-4" x="1720" y="440" w="220" h="200" z="30" color="#D1FAE5" rotation="-3" -->
AL-RAZI (854–925)
Rhazes. Greatest clinician of the medieval world. First to distinguish smallpox from measles. Wrote over 200 books on medicine, chemistry, and philosophy.

<!--@sticky id="scholar-5" x="1480" y="680" w="220" h="200" z="30" color="#EDE9FE" rotation="2" -->
IBN RUSHD (1126–1198)
Averroes. His commentaries on Aristotle were so influential in Europe that he was simply called "The Commentator." Shaped scholasticism and the European Enlightenment.

<!--@sticky id="scholar-6" x="1720" y="680" w="220" h="200" z="30" color="#FFEDD5" rotation="-1" -->
IBN KHALDUN (1332–1406)
Father of sociology, historiography, and economics. His Muqaddimah analyzed the rise and fall of civilizations centuries before any European thinker.

<!--@sticky id="scholar-7" x="1600" y="920" w="220" h="200" z="30" color="#FEF3C7" rotation="3" -->
AL-JAZARI (1136–1206)
Engineer and inventor. Built programmable automata, water clocks, and mechanical devices. His "Book of Knowledge of Ingenious Mechanical Devices" is a masterwork.

<!--@text id="big-number" x="2000" y="200" w="300" z="45" fontSize="72" fontFamily="sans-serif" color="#6366f1" align="center" -->
500+

<!--@text id="big-label" x="2000" y="300" w="300" z="44" fontSize="16" fontFamily="sans-serif" color="#94a3b8" align="center" -->
years of scientific leadership

<!--@text id="big-number-2" x="2000" y="420" w="300" z="45" fontSize="72" fontFamily="sans-serif" color="#10b981" align="center" -->
1000s

<!--@text id="big-label-2" x="2000" y="520" w="300" z="44" fontSize="16" fontFamily="sans-serif" color="#94a3b8" align="center" -->
of scholarly works produced

<!--@block id="house-of-wisdom" x="1480" y="1180" w="460" h="auto" z="28" -->
### The House of Wisdom (Bayt al-Hikma)

Founded in Baghdad around **830 CE** by Caliph al-Ma'mun, the House of Wisdom was the **greatest library and intellectual center** of the medieval world:

- Employed scholars of **all faiths** — Muslim, Christian, Jewish, Sabian, Zoroastrian
- Translated works from **Greek, Persian, Sanskrit, Syriac, and Latin**
- Housed hundreds of thousands of manuscripts
- Combined a **library, academy, and translation bureau**
- Destroyed when the Mongols sacked Baghdad in **1258**, reportedly turning the Tigris River **black with ink** from discarded manuscripts

<!--@block id="cordoba" x="1480" y="1720" w="460" h="auto" z="22" -->
### Al-Andalus (Islamic Spain)

A parallel center of learning flourished in Iberia:

- **Cordoba** — by the 10th century, the largest and most advanced city in Europe
- Its library held over **400,000 volumes** (more than all of France combined)
- **Interfaith scholarship** — Muslim, Jewish, and Christian scholars collaborated
- **Maimonides** (Jewish) and **Ibn Rushd** (Muslim) both worked in Cordoba
- The **Toledo School of Translators** transmitted Arabic knowledge into Latin, sparking the European Renaissance

<!--@draw id="underline-title" x="60" y="42" z="2" tool="pen" color="#6366f1" width="3" -->
60.0,92.0,0.50 160.0,91.0,0.50 340.0,90.0,0.50 500.0,91.0,0.50 700.0,92.0,0.50 860.0,91.0,0.50

<!--@draw id="hl-overview" x="55" y="198" z="1" tool="highlighter" color="#6366f1" width="24" opacity="0.12" -->
55.0,208.0,0.50 200.0,208.0,0.50 400.0,208.0,0.50 580.0,208.0,0.50

<!--@draw id="wave-divider-1" x="60" y="1230" z="2" tool="pen" color="#6366f1" width="2" -->
60.0,1250.0,0.50 90.0,1240.0,0.50 120.0,1250.0,0.50 150.0,1260.0,0.50 180.0,1250.0,0.50 210.0,1240.0,0.50 240.0,1250.0,0.50 270.0,1260.0,0.50 300.0,1250.0,0.50

<!--@draw id="wave-divider-1b" x="330" y="1230" z="2" tool="pen" color="#6366f1" width="2" -->
330.0,1250.0,0.50 360.0,1240.0,0.50 390.0,1250.0,0.50 420.0,1260.0,0.50 450.0,1250.0,0.50 480.0,1240.0,0.50 510.0,1250.0,0.50 540.0,1260.0,0.50 570.0,1250.0,0.50

<!--@draw id="wave-divider-2" x="60" y="1770" z="2" tool="pen" color="#10b981" width="2" -->
60.0,1790.0,0.50 90.0,1780.0,0.50 120.0,1790.0,0.50 150.0,1800.0,0.50 180.0,1790.0,0.50 210.0,1780.0,0.50 240.0,1790.0,0.50 270.0,1800.0,0.50 300.0,1790.0,0.50

<!--@draw id="wave-divider-2b" x="330" y="1770" z="2" tool="pen" color="#10b981" width="2" -->
330.0,1790.0,0.50 360.0,1780.0,0.50 390.0,1790.0,0.50 420.0,1800.0,0.50 450.0,1790.0,0.50 480.0,1780.0,0.50 510.0,1790.0,0.50 540.0,1800.0,0.50 570.0,1790.0,0.50

<!--@draw id="star-1" x="950" y="40" z="5" tool="pen" color="#f59e0b" width="1.5" -->
960.0,40.0,0.50 963.0,50.0,0.50 973.0,50.0,0.50 965.0,56.0,0.50 968.0,66.0,0.50 960.0,60.0,0.50 952.0,66.0,0.50 955.0,56.0,0.50 947.0,50.0,0.50 957.0,50.0,0.50 960.0,40.0,0.50

<!--@draw id="star-2" x="990" y="55" z="5" tool="pen" color="#f59e0b" width="1" -->
998.0,55.0,0.50 1000.0,61.0,0.50 1006.0,61.0,0.50 1001.0,65.0,0.50 1003.0,71.0,0.50 998.0,67.0,0.50 993.0,71.0,0.50 995.0,65.0,0.50 990.0,61.0,0.50 996.0,61.0,0.50 998.0,55.0,0.50

<!--@draw id="star-3" x="1040" y="35" z="5" tool="pen" color="#f59e0b" width="1" -->
1048.0,35.0,0.50 1050.0,41.0,0.50 1056.0,41.0,0.50 1051.0,45.0,0.50 1053.0,51.0,0.50 1048.0,47.0,0.50 1043.0,51.0,0.50 1045.0,45.0,0.50 1040.0,41.0,0.50 1046.0,41.0,0.50 1048.0,35.0,0.50

<!--@draw id="crescent" x="1080" y="50" z="5" tool="pen" color="#f59e0b" width="1.5" -->
1100.0,52.0,0.50 1095.0,56.0,0.50 1092.0,64.0,0.50 1092.0,74.0,0.50 1095.0,82.0,0.50 1100.0,86.0,0.50 1096.0,84.0,0.50 1090.0,78.0,0.50 1088.0,70.0,0.50 1088.0,62.0,0.50 1092.0,56.0,0.50 1096.0,52.0,0.50

<!--@draw id="shape-bg-number" x="1980" y="180" w="340" h="160" z="3" tool="shape" shape="rect" color="#6366f1" stroke="2" roughness="1.5" strokeStyle="dashed" -->

<!--@draw id="shape-bg-number-2" x="1980" y="400" w="340" h="160" z="3" tool="shape" shape="rect" color="#10b981" stroke="2" roughness="1.5" strokeStyle="dashed" -->

<!--@draw id="shape-ellipse-scholars" x="1460" y="140" w="520" h="1020" z="2" tool="shape" shape="ellipse" color="#f59e0b" stroke="1" roughness="2" opacity="0.15" -->

<!--@draw id="shape-diamond-1" x="1430" y="1160" w="40" h="40" z="4" tool="shape" shape="diamond" color="#6366f1" stroke="2" roughness="1" fill="#ede9fe" -->

<!--@draw id="shape-diamond-2" x="1960" y="1160" w="40" h="40" z="4" tool="shape" shape="diamond" color="#6366f1" stroke="2" roughness="1" fill="#ede9fe" -->

<!--@edge id="e-overview-timeline" from="overview" to="timeline" style="dashed" color="#94a3b8" animated="true" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-overview-math" from="overview" to="mathematics" style="solid" color="#6366f1" arrowHead="arrow" animated="true" sourceHandle="bottom" targetHandle="top" label="knowledge" -->

<!--@edge id="e-math-medicine" from="mathematics" to="medicine" style="solid" color="#6366f1" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-medicine-astronomy" from="medicine" to="astronomy" style="solid" color="#6366f1" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-math-optics" from="mathematics" to="optics" style="solid" color="#8b5cf6" arrowHead="arrow" animated="true" sourceHandle="bottom" targetHandle="top" label="foundations" -->

<!--@edge id="e-medicine-philosophy" from="medicine" to="philosophy" style="dashed" color="#ec4899" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" edgeType="bezier" -->

<!--@edge id="e-astronomy-tech" from="astronomy" to="technology" style="dashed" color="#10b981" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" edgeType="bezier" label="instruments" -->

<!--@edge id="e-optics-philosophy" from="optics" to="philosophy" style="solid" color="#ec4899" arrowHead="arrow" animated="true" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-philosophy-tech" from="philosophy" to="technology" style="dashed" color="#94a3b8" arrowHead="arrow" animated="true" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-optics-geography" from="optics" to="geography" style="dotted" color="#6366f1" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-tech-architecture" from="technology" to="architecture" style="dashed" color="#f59e0b" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" edgeType="bezier" label="craft" -->

<!--@edge id="e-geography-legacy" from="geography" to="legacy" style="solid" color="#10b981" arrowHead="arrow" animated="true" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-architecture-legacy" from="architecture" to="legacy" style="solid" color="#10b981" arrowHead="arrow" animated="true" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-timeline-house" from="timeline" to="house-of-wisdom" style="solid" color="#f59e0b" arrowHead="filled" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" edgeType="bezier" label="830 CE" -->

<!--@edge id="e-house-cordoba" from="house-of-wisdom" to="cordoba" style="dashed" color="#f59e0b" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" label="knowledge spreads" -->

<!--@edge id="e-legacy-cordoba" from="legacy" to="cordoba" style="dotted" color="#10b981" arrowHead="arrow" animated="true" sourceHandle="right" targetHandle="left" edgeType="bezier" -->

<!--@edge id="e-scholar1-math" from="scholar-1" to="mathematics" style="dotted" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-scholar2-medicine" from="scholar-2" to="medicine" style="dotted" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-scholar3-optics" from="scholar-3" to="optics" style="dotted" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-scholar5-philosophy" from="scholar-5" to="philosophy" style="dotted" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-scholar7-tech" from="scholar-7" to="technology" style="dotted" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" -->

<!--@block id="footer" x="60" y="2300" w="900" h="auto" z="10" -->
*This board celebrates the immense contributions of scholars during the Islamic Golden Age. These achievements belong to all of humanity — they were the work of people of many faiths and backgrounds who collaborated in pursuit of knowledge. Their legacy is woven into the fabric of modern science, medicine, mathematics, and philosophy.*
`, D = `<!--@meta canvas_w="6000" canvas_h="2600" grid="20" snap="false" -->

<!--@text id="title" x="60" y="40" w="1000" z="50" fontSize="42" fontFamily="sans-serif" color="#1e1e2e" align="left" -->
From Al-Khwarizmi to AI

<!--@text id="subtitle" x="60" y="100" w="800" z="49" fontSize="16" fontFamily="sans-serif" color="#94a3b8" align="left" -->
1200 years of ideas — how algorithms, automata, and logic became the modern computer

<!--@draw id="underline-title" x="60" y="42" z="2" tool="pen" color="#6366f1" width="3" -->
60.0,90.0,0.50 200.0,89.0,0.50 400.0,88.0,0.50 600.0,89.0,0.50 800.0,90.0,0.50

<!--@text id="era-1-label" x="60" y="150" w="300" z="45" fontSize="28" fontFamily="sans-serif" color="#f59e0b" align="left" -->
Islamic Foundations

<!--@text id="era-1-date" x="60" y="185" w="300" z="44" fontSize="13" fontFamily="sans-serif" color="#94a3b8" align="left" -->
8th – 13th century

<!--@image id="img-mosque" x="60" y="220" w="340" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Mustansiriya_University_CPT.jpg/1280px-Mustansiriya_University_CPT.jpg" alt="Mustansiriya University, Baghdad — one of the oldest universities" -->

<!--@text id="img-mosque-cap" x="60" y="448" w="340" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Mustansiriya University, Baghdad (1227)

<!--@block id="khwarizmi" x="60" y="500" w="340" h="auto" z="30" -->
### Al-Khwarizmi (780–850)
Father of **algebra**. His name gave us the word **"algorithm"** — the concept behind every computer program ever written. Introduced Hindu-Arabic numerals and zero to the world.

<!--@image id="img-astrolabe" x="440" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Astrolabe-Persian-18C.jpg/800px-Astrolabe-Persian-18C.jpg" alt="Persian astrolabe — precision computing instrument" -->

<!--@text id="img-astrolabe-cap" x="440" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Persian astrolabe — an analog computer

<!--@block id="jazari" x="440" y="500" w="280" h="auto" z="30" -->
### Al-Jazari (1136–1206)
Built **programmable automata** — mechanical musicians reprogrammed by changing pegs. Invented the camshaft. The world's first programmable machines.

<!--@block id="kindi" x="760" y="500" w="280" h="auto" z="30" -->
### Al-Kindi (801–873)
Invented **frequency analysis** — the first code-breaking algorithm. Used by Turing 1100 years later to crack Enigma. Foundation of modern cryptography.

<!--@sticky id="s-algo" x="760" y="220" w="200" h="160" z="30" color="#FEF3C7" rotation="-2" -->
The word ALGORITHM = Latin "Algoritmi" = Al-Khwarizmi's name. Every app, search engine, and AI runs on algorithms.

<!--@draw id="era-1-bg" x="40" y="140" w="1020" h="620" z="1" tool="shape" shape="rect" color="#f59e0b" stroke="1" roughness="2" opacity="0.07" fill="#fef3c7" -->

<!--@text id="era-2-label" x="1120" y="150" w="400" z="45" fontSize="28" fontFamily="sans-serif" color="#8b5cf6" align="left" -->
Mechanical Age

<!--@text id="era-2-date" x="1120" y="185" w="400" z="44" fontSize="13" fontFamily="sans-serif" color="#94a3b8" align="left" -->
15th – 17th century

<!--@image id="img-pascaline" x="1120" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Arts_et_Metiers_Pascaline_dsc03869.jpg/1280px-Arts_et_Metiers_Pascaline_dsc03869.jpg" alt="Pascal's Pascaline calculator" -->

<!--@text id="img-pascaline-cap" x="1120" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Pascaline (1642) — mechanical calculator

<!--@block id="pascal" x="1120" y="500" w="280" h="auto" z="25" -->
### Pascal & Leibniz
**Pascal** (1642) built the Pascaline calculator at age 19. **Leibniz** (1673) built one that could multiply — and invented **binary** (0s and 1s), the language of all computers.

<!--@image id="img-leibniz" x="1440" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Gottfried_Wilhelm_von_Leibniz.jpg/800px-Gottfried_Wilhelm_von_Leibniz.jpg" alt="Gottfried Wilhelm Leibniz" -->

<!--@text id="img-leibniz-cap" x="1440" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Leibniz — invented binary arithmetic

<!--@block id="translation" x="1440" y="500" w="280" h="auto" z="25" -->
### The Bridge
Islamic algebra reached Europe via the **Toledo translators**. **Fibonacci** (1202) learned Hindu-Arabic numerals from North African merchants. These tools made mechanical calculation possible.

<!--@sticky id="s-binary" x="1760" y="220" w="200" h="160" z="30" color="#EDE9FE" rotation="3" -->
Leibniz's BINARY (1679) + Boole's LOGIC (1854) + Shannon's CIRCUITS (1937) = the formula for every computer.

<!--@draw id="era-2-bg" x="1100" y="140" w="900" h="620" z="1" tool="shape" shape="rect" color="#8b5cf6" stroke="1" roughness="2" opacity="0.07" fill="#f5f3ff" -->

<!--@text id="era-3-label" x="2060" y="150" w="400" z="45" fontSize="28" fontFamily="sans-serif" color="#ec4899" align="left" -->
Programmable Machines

<!--@text id="era-3-date" x="2060" y="185" w="400" z="44" fontSize="13" fontFamily="sans-serif" color="#94a3b8" align="left" -->
19th century

<!--@image id="img-loom" x="2060" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Jacquard_loom_p1040320.jpg/800px-Jacquard_loom_p1040320.jpg" alt="Jacquard Loom with punch cards" -->

<!--@text id="img-loom-cap" x="2060" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Jacquard Loom (1804) — punch card programming

<!--@block id="jacquard" x="2060" y="500" w="280" h="auto" z="25" -->
### Jacquard Loom (1804)
First machine controlled by **punch cards**. The pattern (program) was separate from the machine (hardware). Directly inspired Babbage.

<!--@image id="img-ada" x="2380" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg" alt="Ada Lovelace — first computer programmer" -->

<!--@text id="img-ada-cap" x="2380" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Ada Lovelace — first programmer (1843)

<!--@block id="babbage" x="2380" y="500" w="280" h="auto" z="25" -->
### Babbage & Lovelace
**Babbage** designed the Analytical Engine — a general-purpose computer with CPU, memory, and punch card input. **Ada Lovelace** wrote the first program and foresaw computers creating music and art.

<!--@sticky id="s-ada" x="2700" y="220" w="200" h="160" z="30" color="#FCE7F3" rotation="-2" -->
Ada Lovelace: "The Analytical Engine weaves algebraic patterns, just as the Jacquard loom weaves flowers and leaves."

<!--@draw id="era-3-bg" x="2040" y="140" w="900" h="620" z="1" tool="shape" shape="rect" color="#ec4899" stroke="1" roughness="2" opacity="0.07" fill="#fce7f3" -->

<!--@text id="era-4-label" x="3000" y="150" w="400" z="45" fontSize="28" fontFamily="sans-serif" color="#10b981" align="left" -->
Electronic Computers

<!--@text id="era-4-date" x="3000" y="185" w="400" z="44" fontSize="13" fontFamily="sans-serif" color="#94a3b8" align="left" -->
1930s – 1960s

<!--@image id="img-turing" x="3000" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/800px-Alan_Turing_Aged_16.jpg" alt="Alan Turing" -->

<!--@text id="img-turing-cap" x="3000" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Alan Turing — father of computer science

<!--@block id="turing" x="3000" y="500" w="280" h="auto" z="25" -->
### Alan Turing (1936)
Invented the **Turing Machine** — proved a single universal machine could run any program. Cracked Nazi Enigma using **frequency analysis** (al-Kindi's invention, 1100 years earlier).

<!--@image id="img-eniac" x="3320" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Eniac.jpg/1280px-Eniac.jpg" alt="ENIAC — first general-purpose electronic computer" -->

<!--@text id="img-eniac-cap" x="3320" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
ENIAC (1945) — 30 tons, 18,000 vacuum tubes

<!--@block id="eniac" x="3320" y="500" w="280" h="auto" z="25" -->
### ENIAC & Transistors
**ENIAC** (1945) — first general-purpose electronic computer. **Transistor** (1947) — replaced vacuum tubes. **Integrated circuit** (1958) — put thousands of transistors on a chip. Moore's Law begins.

<!--@sticky id="s-turing" x="3640" y="220" w="200" h="160" z="30" color="#D1FAE5" rotation="2" -->
Turing's Enigma codebreaking used FREQUENCY ANALYSIS — invented by Al-Kindi in 9th century Baghdad. A direct 1100-year lineage.

<!--@draw id="era-4-bg" x="2980" y="140" w="900" h="620" z="1" tool="shape" shape="rect" color="#10b981" stroke="1" roughness="2" opacity="0.07" fill="#d1fae5" -->

<!--@text id="era-5-label" x="3940" y="150" w="400" z="45" fontSize="28" fontFamily="sans-serif" color="#3b82f6" align="left" -->
Digital Revolution

<!--@text id="era-5-date" x="3940" y="185" w="400" z="44" fontSize="13" fontFamily="sans-serif" color="#94a3b8" align="left" -->
1970s – today

<!--@image id="img-apple" x="3940" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Apple_II_typical_configuration_1977.png/1280px-Apple_II_typical_configuration_1977.png" alt="Apple II personal computer" -->

<!--@text id="img-apple-cap" x="3940" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Apple II (1977) — computing for everyone

<!--@block id="personal" x="3940" y="500" w="280" h="auto" z="25" -->
### PCs & Internet
**Apple II** (1977), **IBM PC** (1981), **Macintosh** (1984). Then the **World Wide Web** (1991) and **Google** (1998) connected billions. The **iPhone** (2007) put a supercomputer in every pocket.

<!--@image id="img-ai" x="4260" y="220" w="280" h="220" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Artificial_neural_network.jpg/800px-Artificial_neural_network.jpg" alt="Neural network diagram" -->

<!--@text id="img-ai-cap" x="4260" y="448" w="280" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Neural networks — machines that learn

<!--@block id="ai" x="4260" y="500" w="280" h="auto" z="25" -->
### Artificial Intelligence
**Deep learning** (2012+) and **LLMs** (2020+) — machines that learn, write, and reason. Built on the same foundations: al-Khwarizmi's algorithms, Leibniz's binary, Boole's logic, and Turing's universal machine.

<!--@sticky id="s-circle" x="4580" y="220" w="200" h="160" z="30" color="#DBEAFE" rotation="-3" -->
FULL CIRCLE: Modern AI runs ALGORITHMS on BINARY hardware using LOGIC gates. All three concepts trace directly to Islamic and Enlightenment scholars.

<!--@draw id="era-5-bg" x="3920" y="140" w="900" h="620" z="1" tool="shape" shape="rect" color="#3b82f6" stroke="1" roughness="2" opacity="0.07" fill="#dbeafe" -->

<!--@block id="lineage" x="1600" y="900" w="1800" h="auto" z="28" -->
### The Unbroken Thread — 1200 Years of Ideas

| Concept | Origin | Century | Modern Form |
|---------|--------|---------|-------------|
| Algorithm | Al-Khwarizmi | 9th | Every program ever written |
| Programmable machine | Al-Jazari | 13th | Stored-program computers |
| Cryptanalysis | Al-Kindi | 9th | Cybersecurity, encryption |
| Zero & positional numbers | India → Islamic scholars | 8th | Binary (0 and 1) |
| Binary arithmetic | Leibniz | 17th | Digital logic |
| Punch-card programming | Jacquard | 19th | Software |
| Universal computation | Turing | 20th | Every computer on Earth |
| Neural networks | McCulloch & Pitts | 20th | AI, deep learning |

<!--@image id="img-manuscript" x="60" y="900" w="360" h="260" z="15" rotation="-1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Khwarizmi_Amicable_Numbers.jpg/800px-Khwarizmi_Amicable_Numbers.jpg" alt="Page from Al-Khwarizmi's algebra manuscript" -->

<!--@text id="img-manuscript-cap" x="60" y="1168" w="360" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Page from Al-Khwarizmi's algebra treatise (9th century)

<!--@image id="img-jazari-device" x="460" y="900" w="340" h="260" z="15" rotation="1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Al-Jazari_-_A_Candle_Clock.jpg/800px-Al-Jazari_-_A_Candle_Clock.jpg" alt="Al-Jazari's candle clock automaton" -->

<!--@text id="img-jazari-cap" x="460" y="1168" w="340" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Al-Jazari's candle clock automaton (1206)

<!--@image id="img-babbage-engine" x="840" y="900" w="340" h="260" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Babbage_Difference_Engine_%28Being_utilridge%29.jpg/800px-Babbage_Difference_Engine_%28Being_utilridge%29.jpg" alt="Babbage's Difference Engine" -->

<!--@text id="img-babbage-cap" x="840" y="1168" w="340" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Babbage's Difference Engine (1822)

<!--@image id="img-chip" x="3600" y="900" w="360" h="260" z="15" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Silicon_chip_3d.png/1280px-Silicon_chip_3d.png" alt="Modern silicon chip" -->

<!--@text id="img-chip-cap" x="3600" y="1168" w="360" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Modern chip — billions of transistors

<!--@image id="img-server" x="4000" y="900" w="360" h="260" z="15" rotation="1" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Wikimedia_Foundation_Servers-8055_35.jpg/1280px-Wikimedia_Foundation_Servers-8055_35.jpg" alt="Modern data center servers" -->

<!--@text id="img-server-cap" x="4000" y="1168" w="360" z="14" fontSize="11" fontFamily="sans-serif" color="#64748b" align="center" -->
Modern data center — where AI lives

<!--@text id="big-number" x="4600" y="900" w="300" z="45" fontSize="72" fontFamily="sans-serif" color="#6366f1" align="center" -->
1200

<!--@text id="big-label" x="4600" y="1000" w="300" z="44" fontSize="14" fontFamily="sans-serif" color="#94a3b8" align="center" -->
years from algorithm to AI

<!--@draw id="shape-bg-number" x="4580" y="880" w="340" h="160" z="3" tool="shape" shape="rect" color="#6366f1" stroke="2" roughness="1.5" strokeStyle="dashed" -->

<!--@edge id="e-khw-jazari" from="khwarizmi" to="jazari" style="solid" color="#f59e0b" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-jazari-kindi" from="jazari" to="kindi" style="solid" color="#f59e0b" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-khw-pascal" from="khwarizmi" to="pascal" style="solid" color="#6366f1" arrowHead="filled" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="algebra → Europe" -->

<!--@edge id="e-jazari-jacquard" from="jazari" to="jacquard" style="dashed" color="#8b5cf6" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="automata" -->

<!--@edge id="e-pascal-translation" from="pascal" to="translation" style="solid" color="#8b5cf6" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-pascal-jacquard" from="pascal" to="jacquard" style="solid" color="#ec4899" arrowHead="filled" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="mechanisms" -->

<!--@edge id="e-jacquard-babbage" from="jacquard" to="babbage" style="solid" color="#ec4899" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" label="punch cards" -->

<!--@edge id="e-babbage-turing" from="babbage" to="turing" style="solid" color="#10b981" arrowHead="filled" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="universal machine" -->

<!--@edge id="e-kindi-turing" from="kindi" to="turing" style="dotted" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="freq. analysis → Enigma" -->

<!--@edge id="e-turing-eniac" from="turing" to="eniac" style="solid" color="#10b981" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" -->

<!--@edge id="e-eniac-personal" from="eniac" to="personal" style="solid" color="#3b82f6" arrowHead="filled" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="miniaturization" -->

<!--@edge id="e-personal-ai" from="personal" to="ai" style="solid" color="#3b82f6" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="smoothstep" label="data + compute" -->

<!--@edge id="e-khw-ai" from="khwarizmi" to="ai" style="dotted" color="#f59e0b" arrowHead="filled" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="1200 years of algorithms" -->

<!--@edge id="e-lineage-khw" from="lineage" to="khwarizmi" style="dotted" color="#94a3b8" animated="true" animatedDirection="reverse" sourceHandle="left" targetHandle="bottom" edgeType="bezier" -->

<!--@edge id="e-lineage-ai" from="lineage" to="ai" style="dotted" color="#94a3b8" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="bottom" edgeType="bezier" -->

<!--@block id="footer" x="1600" y="1280" w="1000" h="auto" z="10" -->
*This board traces the intellectual lineage of computing from 9th-century Baghdad to modern AI. History is never a straight line — countless contributors across cultures and centuries made this possible.*
`, C = `<!--@meta canvas_w="5200" canvas_h="3800" grid="20" snap="false" -->

<!--@text id="title" x="2100" y="1720" w="700" z="50" fontSize="44" fontFamily="sans-serif" color="#1e1e2e" align="center" -->
Programming Languages

<!--@text id="subtitle" x="2100" y="1790" w="700" z="49" fontSize="16" fontFamily="sans-serif" color="#94a3b8" align="center" -->
A Mindmap of the Language Universe

<!--@draw id="center-ring" x="2080" y="1700" w="740" h="180" z="2" tool="shape" shape="ellipse" color="#6366f1" stroke="2" roughness="1.5" opacity="0.18" fill="#ede9fe" -->

<!--@block id="center" x="2200" y="1850" w="500" h="auto" z="28" -->
Every language is a tool shaped by the problems it was born to solve. **700+** programming languages exist — about **30** are widely used in industry.

<!--@text id="stat-left" x="1400" y="1780" w="200" z="45" fontSize="56" fontFamily="sans-serif" color="#6366f1" align="center" -->
700+

<!--@text id="stat-left-label" x="1400" y="1850" w="200" z="44" fontSize="13" fontFamily="sans-serif" color="#94a3b8" align="center" -->
languages exist today

<!--@text id="stat-right" x="3300" y="1780" w="200" z="45" fontSize="56" fontFamily="sans-serif" color="#10b981" align="center" -->
~30

<!--@text id="stat-right-label" x="3300" y="1850" w="200" z="44" fontSize="13" fontFamily="sans-serif" color="#94a3b8" align="center" -->
widely used in industry

<!--@block id="systems" x="2200" y="480" w="420" h="auto" z="25" -->
### Systems & Low-Level

Languages built for **performance**, hardware access, and OS development. Close to the metal with manual or minimal memory management.

Powers operating systems, game engines, databases, and embedded devices.

<!--@text id="label-systems" x="2250" y="440" w="320" z="40" fontSize="11" fontFamily="sans-serif" color="#ef4444" align="center" -->
PERFORMANCE & CONTROL

<!--@draw id="bg-systems" x="1680" y="30" w="1500" h="400" z="1" tool="shape" shape="rect" color="#ef4444" stroke="1" roughness="2" opacity="0.06" fill="#fef2f2" -->

<!--@sticky id="lang-c" x="1900" y="80" w="200" h="160" z="30" color="#FEE2E2" rotation="-2" -->
C (1972)
The mother of modern languages. Still powers Linux, Windows, and billions of embedded devices.

<!--@sticky id="lang-rust" x="2140" y="60" w="200" h="160" z="30" color="#FEE2E2" rotation="2" -->
Rust (2015)
Memory safety without garbage collection. Loved for performance and correctness. Growing fast.

<!--@sticky id="lang-go" x="2380" y="80" w="200" h="160" z="30" color="#FEE2E2" rotation="-1" -->
Go (2009)
Google's answer to C++. Goroutines, simplicity, fast compilation. Born for cloud infrastructure.

<!--@sticky id="lang-cpp" x="2620" y="60" w="200" h="160" z="30" color="#FEE2E2" rotation="3" -->
C++ (1985)
C with classes and much more. Game engines, browsers, databases. 40+ years and still evolving.

<!--@sticky id="lang-asm" x="2860" y="100" w="200" h="140" z="30" color="#FEE2E2" rotation="-3" -->
Assembly
Human-readable machine code. Maximum control, maximum responsibility.

<!--@block id="functional" x="300" y="1000" w="420" h="auto" z="25" -->
### Functional

Based on **mathematical functions** and immutability. Emphasizes composition, pure functions, and higher-order functions.

Strong in concurrent programming, formal reasoning, and elegant abstractions.

<!--@text id="label-functional" x="350" y="960" w="320" z="40" fontSize="11" fontFamily="sans-serif" color="#8b5cf6" align="center" -->
PURITY & COMPOSITION

<!--@draw id="bg-functional" x="30" y="400" w="830" h="870" z="1" tool="shape" shape="rect" color="#8b5cf6" stroke="1" roughness="2" opacity="0.06" fill="#f5f3ff" -->

<!--@sticky id="lang-haskell" x="60" y="520" w="210" h="170" z="30" color="#EDE9FE" rotation="2" -->
Haskell (1990)
Pure functional. Lazy evaluation, type classes, monads. Where theory meets practice.

<!--@sticky id="lang-lisp" x="310" y="500" w="210" h="170" z="30" color="#EDE9FE" rotation="-2" -->
Lisp (1958)
The second-oldest language. Homoiconic — "code is data, data is code." Spawned an entire family.

<!--@sticky id="lang-erlang" x="560" y="540" w="210" h="170" z="30" color="#EDE9FE" rotation="1" -->
Erlang (1986)
Built for telecom. Fault-tolerant, distributed. Powers WhatsApp and Discord via Elixir.

<!--@sticky id="lang-ocaml" x="100" y="740" w="210" h="160" z="30" color="#EDE9FE" rotation="-1" -->
OCaml
ML family. Powerful type inference, pattern matching. Used in finance and formal verification.

<!--@sticky id="lang-clojure" x="400" y="760" w="210" h="160" z="30" color="#EDE9FE" rotation="3" -->
Clojure (2007)
Modern Lisp on the JVM. Immutable data structures and REPL-driven development.

<!--@block id="oop" x="4100" y="1000" w="420" h="auto" z="25" -->
### Object-Oriented

Organizes code around **objects** with state and behavior. Encapsulation, inheritance, and polymorphism.

The dominant paradigm in enterprise software for decades.

<!--@text id="label-oop" x="4150" y="960" w="320" z="40" fontSize="11" fontFamily="sans-serif" color="#3b82f6" align="center" -->
ENCAPSULATION & INHERITANCE

<!--@draw id="bg-oop" x="3960" y="400" w="840" h="870" z="1" tool="shape" shape="rect" color="#3b82f6" stroke="1" roughness="2" opacity="0.06" fill="#eff6ff" -->

<!--@sticky id="lang-java" x="4060" y="520" w="210" h="170" z="30" color="#DBEAFE" rotation="-2" -->
Java (1995)
Write once, run anywhere. Enterprise workhorse with a massive ecosystem and community.

<!--@sticky id="lang-csharp" x="4310" y="500" w="210" h="170" z="30" color="#DBEAFE" rotation="2" -->
C# (2000)
Microsoft's elegant evolution. Powers Unity games and .NET enterprise applications.

<!--@sticky id="lang-smalltalk" x="4560" y="540" w="210" h="170" z="30" color="#DBEAFE" rotation="-1" -->
Smalltalk (1972)
The original OOP language. Everything is an object. Inspired Ruby and modern UI patterns.

<!--@sticky id="lang-swift" x="4120" y="740" w="210" h="160" z="30" color="#DBEAFE" rotation="3" -->
Swift (2014)
Apple's modern successor to Obj-C. Safe, fast, expressive. Powers iOS development.

<!--@sticky id="lang-kotlin" x="4420" y="760" w="210" h="160" z="30" color="#DBEAFE" rotation="-3" -->
Kotlin (2011)
JetBrains' modern JVM language. Android's preferred language. Java interop, less boilerplate.

<!--@block id="scripting" x="4100" y="2700" w="420" h="auto" z="25" -->
### Scripting & Dynamic

**Dynamic typing**, rapid prototyping, and interpreted execution. The glue that holds software together.

Automation, web backends, data pipelines, and rapid iteration.

<!--@text id="label-scripting" x="4150" y="2660" w="320" z="40" fontSize="11" fontFamily="sans-serif" color="#10b981" align="center" -->
FLEXIBILITY & SPEED

<!--@draw id="bg-scripting" x="3960" y="2630" w="840" h="940" z="1" tool="shape" shape="rect" color="#10b981" stroke="1" roughness="2" opacity="0.06" fill="#ecfdf5" -->

<!--@sticky id="lang-python" x="4060" y="3100" w="210" h="170" z="30" color="#D1FAE5" rotation="2" -->
Python (1991)
Readable, versatile, everywhere. #1 in AI/ML, scripting, and education.

<!--@sticky id="lang-js" x="4310" y="3080" w="210" h="170" z="30" color="#D1FAE5" rotation="-2" -->
JavaScript (1995)
The language of the web. Event-driven, prototype-based. You can't escape it.

<!--@sticky id="lang-ruby" x="4560" y="3120" w="210" h="170" z="30" color="#D1FAE5" rotation="1" -->
Ruby (1995)
Designed for programmer happiness. Rails changed web development forever.

<!--@sticky id="lang-perl" x="4160" y="3320" w="200" h="150" z="30" color="#D1FAE5" rotation="-3" -->
Perl (1987)
The duct tape of the internet. Regex wizardry. "More than one way to do it."

<!--@sticky id="lang-lua" x="4420" y="3340" w="200" h="150" z="30" color="#D1FAE5" rotation="2" -->
Lua (1993)
Tiny, embeddable scripting. Powers game mods (Roblox, WoW) and embedded systems.

<!--@block id="data" x="300" y="2700" w="420" h="auto" z="25" -->
### Data & Scientific

Designed for **data analysis**, statistics, and scientific computing. Query languages, matrix operations, and visualization.

Critical in research, engineering, and machine learning.

<!--@text id="label-data" x="350" y="2660" w="320" z="40" fontSize="11" fontFamily="sans-serif" color="#f59e0b" align="center" -->
ANALYSIS & COMPUTATION

<!--@draw id="bg-data" x="30" y="2630" w="830" h="940" z="1" tool="shape" shape="rect" color="#f59e0b" stroke="1" roughness="2" opacity="0.06" fill="#fffbeb" -->

<!--@sticky id="lang-sql" x="60" y="3100" w="210" h="170" z="30" color="#FEF3C7" rotation="-1" -->
SQL (1974)
The universal language of data. Declarative queries. Every app talks to a database.

<!--@sticky id="lang-r" x="310" y="3080" w="210" h="170" z="30" color="#FEF3C7" rotation="2" -->
R (1993)
Statistician's language. Unmatched for data visualization and statistical analysis.

<!--@sticky id="lang-julia" x="560" y="3120" w="210" h="170" z="30" color="#FEF3C7" rotation="-2" -->
Julia (2012)
Fast as C, easy as Python. Scientific computing without the two-language problem.

<!--@sticky id="lang-matlab" x="200" y="3320" w="210" h="150" z="30" color="#FEF3C7" rotation="3" -->
MATLAB
Matrix Laboratory. Engineering and academia's workhorse for numerical computing.

<!--@block id="web" x="2200" y="3100" w="420" h="auto" z="25" -->
### Web Technologies

Languages and tools for the **browser and web platform**. Client-side and server-side development.

The web is the universal platform — everything runs on it now.

<!--@text id="label-web" x="2250" y="3060" w="320" z="40" fontSize="11" fontFamily="sans-serif" color="#ec4899" align="center" -->
THE UNIVERSAL PLATFORM

<!--@draw id="bg-web" x="1780" y="3030" w="1260" h="680" z="1" tool="shape" shape="rect" color="#ec4899" stroke="1" roughness="2" opacity="0.06" fill="#fdf2f8" -->

<!--@sticky id="lang-ts" x="1900" y="3420" w="200" h="160" z="30" color="#FCE7F3" rotation="2" -->
TypeScript (2012)
JavaScript with types. Microsoft's gift to large-scale web development.

<!--@sticky id="lang-php" x="2140" y="3440" w="200" h="160" z="30" color="#FCE7F3" rotation="-1" -->
PHP (1995)
Powers 77% of the web (WordPress). Humble origins, massive real-world impact.

<!--@sticky id="lang-wasm" x="2380" y="3420" w="200" h="160" z="30" color="#FCE7F3" rotation="3" -->
WebAssembly (2017)
Run C/Rust/Go in the browser at near-native speed. The web's new compile target.

<!--@sticky id="lang-html" x="2620" y="3450" w="200" h="160" z="30" color="#FCE7F3" rotation="-2" -->
HTML & CSS
Not "programming" languages per se — but the foundation of every web page since 1991.

<!--@block id="history" x="1600" y="2200" w="500" h="auto" z="20" -->
### Timeline of Landmarks

| Decade | Milestone Languages |
|--------|---------------------|
| 1950s | Fortran, Lisp, COBOL |
| 1970s | C, Smalltalk, SQL, Prolog |
| 1980s | C++, Erlang, Perl |
| 1990s | Python, Java, JavaScript, Ruby, Haskell |
| 2000s | C#, Scala, Clojure |
| 2010s | Rust, Go, TypeScript, Kotlin, Swift |

<!--@edge id="e-center-systems" from="center" to="systems" style="solid" color="#ef4444" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" edgeType="bezier" -->

<!--@edge id="e-center-functional" from="center" to="functional" style="solid" color="#8b5cf6" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" edgeType="bezier" -->

<!--@edge id="e-center-oop" from="center" to="oop" style="solid" color="#3b82f6" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" -->

<!--@edge id="e-center-scripting" from="center" to="scripting" style="solid" color="#10b981" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" -->

<!--@edge id="e-center-data" from="center" to="data" style="solid" color="#f59e0b" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" edgeType="bezier" -->

<!--@edge id="e-center-web" from="center" to="web" style="solid" color="#ec4899" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" edgeType="bezier" -->

<!--@edge id="e-sys-c" from="systems" to="lang-c" style="dashed" color="#ef4444" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-sys-rust" from="systems" to="lang-rust" style="dashed" color="#ef4444" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-sys-go" from="systems" to="lang-go" style="dashed" color="#ef4444" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-sys-cpp" from="systems" to="lang-cpp" style="dashed" color="#ef4444" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-sys-asm" from="systems" to="lang-asm" style="dashed" color="#ef4444" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-fn-haskell" from="functional" to="lang-haskell" style="dashed" color="#8b5cf6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-fn-lisp" from="functional" to="lang-lisp" style="dashed" color="#8b5cf6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-fn-erlang" from="functional" to="lang-erlang" style="dashed" color="#8b5cf6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-fn-ocaml" from="functional" to="lang-ocaml" style="dashed" color="#8b5cf6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-fn-clojure" from="functional" to="lang-clojure" style="dashed" color="#8b5cf6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-oop-java" from="oop" to="lang-java" style="dashed" color="#3b82f6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-oop-csharp" from="oop" to="lang-csharp" style="dashed" color="#3b82f6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-oop-smalltalk" from="oop" to="lang-smalltalk" style="dashed" color="#3b82f6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="top" targetHandle="bottom" -->

<!--@edge id="e-oop-swift" from="oop" to="lang-swift" style="dashed" color="#3b82f6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-oop-kotlin" from="oop" to="lang-kotlin" style="dashed" color="#3b82f6" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" -->

<!--@edge id="e-scr-python" from="scripting" to="lang-python" style="dashed" color="#10b981" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-scr-js" from="scripting" to="lang-js" style="dashed" color="#10b981" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-scr-ruby" from="scripting" to="lang-ruby" style="dashed" color="#10b981" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-scr-perl" from="scripting" to="lang-perl" style="dashed" color="#10b981" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-scr-lua" from="scripting" to="lang-lua" style="dashed" color="#10b981" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-dat-sql" from="data" to="lang-sql" style="dashed" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-dat-r" from="data" to="lang-r" style="dashed" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-dat-julia" from="data" to="lang-julia" style="dashed" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-dat-matlab" from="data" to="lang-matlab" style="dashed" color="#f59e0b" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-web-ts" from="web" to="lang-ts" style="dashed" color="#ec4899" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-web-php" from="web" to="lang-php" style="dashed" color="#ec4899" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-web-wasm" from="web" to="lang-wasm" style="dashed" color="#ec4899" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-web-html" from="web" to="lang-html" style="dashed" color="#ec4899" arrowHead="dot" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-cross-python-data" from="lang-python" to="data" style="dotted" color="#94a3b8" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" edgeType="bezier" label="also data/ML" -->

<!--@edge id="e-cross-js-web" from="lang-js" to="web" style="dotted" color="#94a3b8" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="left" targetHandle="right" edgeType="bezier" label="also web" -->

<!--@edge id="e-cross-cpp-oop" from="lang-cpp" to="oop" style="dotted" color="#94a3b8" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="right" targetHandle="left" edgeType="bezier" label="multi-paradigm" -->

<!--@edge id="e-cross-rust-wasm" from="lang-rust" to="lang-wasm" style="dotted" color="#94a3b8" arrowHead="arrow" animated="true" animatedDirection="forward" sourceHandle="bottom" targetHandle="top" edgeType="bezier" label="compiles to" -->

<!--@block id="footer" x="1800" y="2600" w="500" h="auto" z="10" -->
*The best programmers don't worship a single language — they pick the right tool for the job.*
`, H = "```", I = `<!--@meta canvas_w="6000" canvas_h="5500" grid="20" snap="false" -->

<!--@text id="title" x="80" y="50" w="900" z="60" fontSize="56" fontFamily="sans-serif" color="#0c4a6e" align="left" -->
The Deep Ocean

<!--@text id="subtitle" x="80" y="130" w="900" z="59" fontSize="20" fontFamily="sans-serif" color="#0ea5e9" align="left" -->
A journey from sunlight to the abyss — 11,000 meters into the unknown

<!--@draw id="underline-title" x="80" y="52" z="2" tool="pen" color="#0ea5e9" width="3" -->
80.0,108.0,0.50 200.0,107.0,0.50 400.0,106.0,0.50 600.0,107.0,0.50 780.0,108.0,0.50

<!--@draw id="wave-top-1" x="80" y="155" z="2" tool="pen" color="#38bdf8" width="2" opacity="0.5" -->
80.0,165.0,0.50 120.0,158.0,0.50 160.0,165.0,0.50 200.0,172.0,0.50 240.0,165.0,0.50 280.0,158.0,0.50 320.0,165.0,0.50 360.0,172.0,0.50 400.0,165.0,0.50 440.0,158.0,0.50 480.0,165.0,0.50 520.0,172.0,0.50 560.0,165.0,0.50 600.0,158.0,0.50 640.0,165.0,0.50 680.0,172.0,0.50 720.0,165.0,0.50 760.0,158.0,0.50 800.0,165.0,0.50 840.0,172.0,0.50 880.0,165.0,0.50

<!--@draw id="wave-top-2" x="80" y="168" z="2" tool="pen" color="#7dd3fc" width="1.5" opacity="0.3" -->
80.0,178.0,0.50 130.0,172.0,0.50 180.0,178.0,0.50 230.0,184.0,0.50 280.0,178.0,0.50 330.0,172.0,0.50 380.0,178.0,0.50 430.0,184.0,0.50 480.0,178.0,0.50 530.0,172.0,0.50 580.0,178.0,0.50 630.0,184.0,0.50 680.0,178.0,0.50 730.0,172.0,0.50 780.0,178.0,0.50 830.0,184.0,0.50 880.0,178.0,0.50

<!-- ═══════════════════════════════════════════════════ -->
<!-- BIG STATS (top right)                              -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="stat-depth" x="1100" y="50" w="260" z="55" fontSize="64" fontFamily="sans-serif" color="#0369a1" align="center" -->
10,994m

<!--@text id="stat-depth-label" x="1100" y="130" w="260" z="54" fontSize="14" fontFamily="sans-serif" color="#0ea5e9" align="center" -->
deepest point on Earth

<!--@text id="stat-pressure" x="1400" y="50" w="260" z="55" fontSize="64" fontFamily="sans-serif" color="#7c3aed" align="center" -->
1,086

<!--@text id="stat-pressure-label" x="1400" y="130" w="260" z="54" fontSize="14" fontFamily="sans-serif" color="#8b5cf6" align="center" -->
atmospheres of pressure

<!--@text id="stat-species" x="1700" y="50" w="260" z="55" fontSize="64" fontFamily="sans-serif" color="#059669" align="center" -->
~240k

<!--@text id="stat-species-label" x="1700" y="130" w="260" z="54" fontSize="14" fontFamily="sans-serif" color="#10b981" align="center" -->
known marine species

<!--@text id="stat-explored" x="2000" y="50" w="260" z="55" fontSize="64" fontFamily="sans-serif" color="#dc2626" align="center" -->
5%

<!--@text id="stat-explored-label" x="2000" y="130" w="260" z="54" fontSize="14" fontFamily="sans-serif" color="#ef4444" align="center" -->
of the ocean explored

<!--@draw id="shape-stats-bg" x="1080" y="35" w="1200" h="130" z="1" tool="shape" shape="rect" color="#0ea5e9" stroke="1" roughness="1.5" opacity="0.08" fill="#e0f2fe" -->

<!-- ═══════════════════════════════════════════════════ -->
<!-- ZONE 1: SUNLIGHT ZONE (Epipelagic)                 -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@frame id="frame-sunlight" x="60" y="210" w="1160" h="520" z="1" label="SUNLIGHT ZONE (Epipelagic)" backgroundColor="#f0f9ff" borderColor="#38bdf8" borderWidth="2" borderStyle="solid" opacity="0.6" -->

<!--@text id="zone1-depth" x="80" y="250" w="300" z="45" fontSize="36" fontFamily="sans-serif" color="#0284c7" align="left" -->
0 — 200m

<!--@text id="zone1-aka" x="80" y="295" w="400" z="44" fontSize="14" fontFamily="sans-serif" color="#38bdf8" align="left" -->
Where sunlight penetrates — home to 90% of marine life

<!--@block id="zone1-info" x="80" y="330" w="420" h="auto" z="30" -->
### The Sunlit World

The top 200 meters receive enough sunlight for **photosynthesis**. This is where the ocean's food chain begins.

- **Temperature:** 15–30°C
- **Light:** Full spectrum, dimming with depth
- **Pressure:** 1–20 atm
- **Key process:** Phytoplankton produce 50% of Earth's oxygen

<!--@sticky id="s-dolphin" x="540" y="250" w="200" h="150" z="35" color="#DBEAFE" rotation="-2" -->
**Bottlenose Dolphin**
Speed: 35 km/h
Intelligence rivals primates. Uses echolocation to hunt.

<!--@sticky id="s-turtle" x="760" y="250" w="200" h="150" z="35" color="#D1FAE5" rotation="3" -->
**Sea Turtle**
Can hold breath 5+ hours.
Navigates using Earth's magnetic field.

<!--@sticky id="s-coral" x="540" y="420" w="200" h="150" z="35" color="#FCE7F3" rotation="1" -->
**Coral Reefs**
Cover < 1% of ocean floor but support 25% of all marine species!

<!--@sticky id="s-jellyfish" x="760" y="420" w="200" h="150" z="35" color="#EDE9FE" rotation="-3" -->
**Moon Jellyfish**
95% water. No brain, no blood, no heart — still thriving for 500M years.

<!--@sticky id="s-greatwhite" x="980" y="250" w="200" h="180" z="35" color="#FEE2E2" rotation="2" -->
**Great White Shark**
Can detect one drop of blood in 25 gallons of water. Electroreception senses heartbeats.

<!--@sticky id="s-bluwhale" x="980" y="450" w="200" h="150" z="35" color="#DBEAFE" rotation="-1" -->
**Blue Whale**
Largest animal ever lived. Heart is the size of a VW Beetle.

<!-- ═══════════════════════════════════════════════════ -->
<!-- ZONE 2: TWILIGHT ZONE (Mesopelagic)                -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@frame id="frame-twilight" x="60" y="780" w="1160" h="520" z="1" label="TWILIGHT ZONE (Mesopelagic)" backgroundColor="#eff6ff" borderColor="#6366f1" borderWidth="2" borderStyle="solid" opacity="0.6" -->

<!--@text id="zone2-depth" x="80" y="820" w="300" z="45" fontSize="36" fontFamily="sans-serif" color="#4f46e5" align="left" -->
200 — 1,000m

<!--@text id="zone2-aka" x="80" y="865" w="400" z="44" fontSize="14" fontFamily="sans-serif" color="#6366f1" align="left" -->
The dim zone — where bioluminescence begins

<!--@block id="zone2-info" x="80" y="900" w="420" h="auto" z="30" -->
### The Twilight World

Sunlight fades to near-nothing. Animals here have evolved **massive eyes** and the ability to produce their own light.

- **Temperature:** 5–15°C
- **Light:** Faint blue glow, then darkness
- **Pressure:** 20–100 atm
- **Key fact:** Largest animal migration on Earth happens here daily

<!--@sticky id="s-lanternfish" x="540" y="820" w="200" h="150" z="35" color="#EDE9FE" rotation="-2" -->
**Lanternfish**
Most abundant vertebrate on Earth. Billions migrate vertically every night to feed.

<!--@sticky id="s-hatchetfish" x="760" y="820" w="200" h="150" z="35" color="#DBEAFE" rotation="3" -->
**Hatchetfish**
Flat, silver body with light-producing organs on belly — counter-illumination camouflage!

<!--@sticky id="s-swordfish" x="540" y="990" w="200" h="150" z="35" color="#D1FAE5" rotation="1" -->
**Swordfish**
Can heat its eyes and brain by 15°C to hunt in the cold twilight zone.

<!--@sticky id="s-squid" x="760" y="990" w="200" h="150" z="35" color="#FCE7F3" rotation="-1" -->
**Firefly Squid**
Entire body covered in photophores. Creates dazzling light displays.

<!--@sticky id="s-giantsquid" x="980" y="820" w="200" h="180" z="35" color="#FEF3C7" rotation="2" -->
**Giant Squid**
Eyes the size of dinner plates (27cm). Can reach 13m long. Rarely seen alive.

<!--@sticky id="s-oarfish" x="980" y="1020" w="200" h="150" z="35" color="#FEE2E2" rotation="-3" -->
**Giant Oarfish**
Up to 11m long. Likely the origin of "sea serpent" legends.

<!-- ═══════════════════════════════════════════════════ -->
<!-- ZONE 3: MIDNIGHT ZONE (Bathypelagic)               -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@frame id="frame-midnight" x="60" y="1350" w="1160" h="520" z="1" label="MIDNIGHT ZONE (Bathypelagic)" backgroundColor="#eef2ff" borderColor="#312e81" borderWidth="2" borderStyle="solid" opacity="0.6" -->

<!--@text id="zone3-depth" x="80" y="1390" w="300" z="45" fontSize="36" fontFamily="sans-serif" color="#312e81" align="left" -->
1,000 — 4,000m

<!--@text id="zone3-aka" x="80" y="1435" w="400" z="44" fontSize="14" fontFamily="sans-serif" color="#4338ca" align="left" -->
Absolute darkness. Only bioluminescence lights the way.

<!--@block id="zone3-info" x="80" y="1470" w="420" h="auto" z="30" -->
### The Midnight World

Zero sunlight. Pitch black. Creatures here are masters of **bioluminescence** — 90% of animals in this zone produce light.

- **Temperature:** 2–4°C (near freezing)
- **Light:** None — total darkness
- **Pressure:** 100–400 atm
- **Key fact:** Rains "marine snow" — dead organic matter from above

<!--@sticky id="s-anglerfish" x="540" y="1390" w="200" h="150" z="35" color="#EDE9FE" rotation="-2" -->
**Anglerfish**
Glowing lure attracts prey in pitch black. Males permanently fuse to females.

<!--@sticky id="s-vampire" x="760" y="1390" w="200" h="150" z="35" color="#FEE2E2" rotation="3" -->
**Vampire Squid**
Not actually a vampire — eats marine snow. Can turn inside out to reveal spines!

<!--@sticky id="s-isopod" x="540" y="1560" w="200" h="150" z="35" color="#FEF3C7" rotation="1" -->
**Giant Isopod**
Terrifying 50cm roly-poly. Can survive 5+ years without food.

<!--@sticky id="s-gulpereel" x="760" y="1560" w="200" h="150" z="35" color="#DBEAFE" rotation="-1" -->
**Gulper Eel**
Mouth is larger than its body. Hinged jaw unhinges to swallow prey whole.

<!--@sticky id="s-barreleye" x="980" y="1390" w="200" h="180" z="35" color="#D1FAE5" rotation="2" -->
**Barreleye Fish**
Transparent head! Tubular eyes look upward through its see-through skull to spot silhouettes.

<!--@sticky id="s-blackswallower" x="980" y="1590" w="200" h="150" z="35" color="#FCE7F3" rotation="-3" -->
**Black Swallower**
Can eat fish 10x its own mass. Stomach stretches to hold prey double its length.

<!-- ═══════════════════════════════════════════════════ -->
<!-- ZONE 4: ABYSSAL ZONE (Abyssopelagic)              -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@frame id="frame-abyssal" x="60" y="1920" w="1160" h="520" z="1" label="ABYSSAL ZONE (Abyssopelagic)" backgroundColor="#f5f3ff" borderColor="#581c87" borderWidth="2" borderStyle="solid" opacity="0.6" -->

<!--@text id="zone4-depth" x="80" y="1960" w="300" z="45" fontSize="36" fontFamily="sans-serif" color="#581c87" align="left" -->
4,000 — 6,000m

<!--@text id="zone4-aka" x="80" y="2005" w="400" z="44" fontSize="14" fontFamily="sans-serif" color="#7c3aed" align="left" -->
The abyss — crushing pressure, near-freezing water

<!--@block id="zone4-info" x="80" y="2040" w="420" h="auto" z="30" -->
### The Abyssal Plains

Vast, flat, featureless plains that cover **65% of Earth's surface**. Life here depends entirely on food falling from above.

- **Temperature:** 1–2°C
- **Light:** None
- **Pressure:** 400–600 atm
- **Key fact:** Hydrothermal vents create oases of life in the darkness

<!--@sticky id="s-tubeworm" x="540" y="1960" w="200" h="150" z="35" color="#FEE2E2" rotation="-2" -->
**Giant Tube Worms**
2m tall. No mouth, no stomach. Bacteria inside them convert chemicals to energy.

<!--@sticky id="s-yeti" x="760" y="1960" w="200" h="150" z="35" color="#DBEAFE" rotation="3" -->
**Yeti Crab**
Hairy arms farm bacteria for food. Lives near hydrothermal vents at 400°C!

<!--@sticky id="s-dumbo" x="540" y="2130" w="200" h="150" z="35" color="#EDE9FE" rotation="1" -->
**Dumbo Octopus**
Ear-like fins for swimming. Deepest-living octopus. Swallows prey whole.

<!--@sticky id="s-tripod" x="760" y="2130" w="200" h="150" z="35" color="#FEF3C7" rotation="-1" -->
**Tripod Fish**
Stands on elongated fins like stilts, facing the current, waiting for food to drift by.

<!--@sticky id="s-vents" x="980" y="1960" w="200" h="180" z="35" color="#FCE7F3" rotation="2" -->
**Hydrothermal Vents**
400°C superheated water. Entire ecosystems powered by chemosynthesis — life without sunlight!

<!--@sticky id="s-hagfish" x="980" y="2160" w="200" h="150" z="35" color="#D1FAE5" rotation="-3" -->
**Hagfish**
Produces buckets of slime to clog predators' gills. 300M years old — older than dinosaurs.

<!-- ═══════════════════════════════════════════════════ -->
<!-- ZONE 5: HADAL ZONE (Hadalpelagic)                  -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@frame id="frame-hadal" x="60" y="2490" w="1160" h="520" z="1" label="HADAL ZONE (Hadalpelagic)" backgroundColor="#faf5ff" borderColor="#3b0764" borderWidth="2" borderStyle="solid" opacity="0.6" -->

<!--@text id="zone5-depth" x="80" y="2530" w="300" z="45" fontSize="36" fontFamily="sans-serif" color="#3b0764" align="left" -->
6,000 — 11,000m

<!--@text id="zone5-aka" x="80" y="2575" w="400" z="44" fontSize="14" fontFamily="sans-serif" color="#581c87" align="left" -->
The Hadal Trenches — named after Hades, god of the underworld

<!--@block id="zone5-info" x="80" y="2610" w="420" h="auto" z="30" -->
### The Hadal Trenches

Only 46 places on Earth are this deep — ocean trenches formed by tectonic plates colliding. Pressure would crush a human instantly.

- **Temperature:** 1–4°C
- **Light:** None
- **Pressure:** 600–1,100 atm (8 tons per square inch)
- **Key fact:** Plastic bags have been found at the bottom of the Mariana Trench

<!--@sticky id="s-snailfish" x="540" y="2530" w="200" h="150" z="35" color="#EDE9FE" rotation="-2" -->
**Mariana Snailfish**
Deepest-living fish ever found (8,178m). Translucent, no scales, looks like a tadpole.

<!--@sticky id="s-amphipod" x="760" y="2530" w="200" h="150" z="35" color="#DBEAFE" rotation="3" -->
**Supergiant Amphipod**
34cm "shrimp." Contains compounds that may help treat Alzheimer's.

<!--@sticky id="s-xenophyophore" x="540" y="2700" w="200" h="150" z="35" color="#FEF3C7" rotation="1" -->
**Xenophyophores**
Single-celled organisms the size of softballs. Build shells from sand and debris.

<!--@sticky id="s-deepsea-cucumber" x="760" y="2700" w="200" h="150" z="35" color="#D1FAE5" rotation="-1" -->
**Sea Cucumbers**
Make up 90% of life at the deepest depths. The vacuum cleaners of the abyss.

<!--@sticky id="s-challenger" x="980" y="2530" w="200" h="180" z="35" color="#FEE2E2" rotation="2" -->
**Challenger Deep**
10,994m — deepest point on Earth. Only 27 people have been here (vs 600+ in space!).

<!--@sticky id="s-foraminifera" x="980" y="2730" w="200" h="150" z="35" color="#FCE7F3" rotation="-3" -->
**Foraminifera**
Tiny shelled organisms that carpet the trench floor. Thrive under impossible pressure.

<!-- ═══════════════════════════════════════════════════ -->
<!-- RIGHT SIDE: EXPLORATION VEHICLES                   -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="vehicles-header" x="1340" y="210" w="500" z="50" fontSize="28" fontFamily="sans-serif" color="#0369a1" align="left" -->
Exploration Vehicles

<!--@draw id="hl-vehicles" x="1335" y="208" z="1" tool="highlighter" color="#0ea5e9" width="24" opacity="0.12" -->
1335.0,238.0,0.50 1500.0,238.0,0.50 1700.0,238.0,0.50 1820.0,238.0,0.50

<!--@block id="vehicle-trieste" x="1340" y="270" w="380" h="auto" z="28" -->
### Bathyscaphe Trieste (1960)

First crewed descent to the **Challenger Deep**. Reached 10,916m.

- **Crew:** Jacques Piccard & Don Walsh
- **Duration:** 20 minutes on the bottom
- **Hull:** 12.7cm thick steel sphere
- **Achievement:** Proved life exists at maximum depth

> "The bottom appeared light and clear, a waste of snuff-colored ooze."

<!--@block id="vehicle-alvin" x="1340" y="640" w="380" h="auto" z="28" -->
### DSV Alvin (1964–present)

The most famous deep-sea submersible. Over **5,000 dives** completed.

- **Max depth:** 6,500m
- **Discoveries:** Titanic wreck, hydrothermal vents, new species
- **Crew:** 1 pilot + 2 scientists
- **Fun fact:** Once sank with the hatch open — was recovered a year later, still operational

<!--@block id="vehicle-deepsea" x="1340" y="980" w="380" h="auto" z="28" -->
### Deepsea Challenger (2012)

James Cameron's solo dive to the bottom of the Mariana Trench — **10,908m**.

- **Crew:** James Cameron (solo!)
- **Duration:** 3 hours on the bottom
- **Design:** Vertical torpedo shape
- **Collected:** 68 new species of bacteria

> "It's a very lunar, desolate place. Very isolated."

<!--@block id="vehicle-limiting" x="1340" y="1340" w="380" h="auto" z="28" -->
### DSV Limiting Factor (2019)

Victor Vescovo's **Five Deeps Expedition** — dove to the deepest point of all 5 oceans.

- **Max depth:** 10,928m (new record)
- **Material:** Titanium pressure hull
- **Dives:** Completed 39 dives below 6,000m
- **Discovery:** Plastic pollution at every depth

<!--@block id="vehicle-nereus" x="1340" y="1680" w="380" h="auto" z="28" -->
### HROV Nereus (2009–2014)

Robotic hybrid vehicle that could operate autonomously or via tether.

- **Max depth:** 10,902m
- **Type:** Hybrid ROV/AUV
- **Fate:** Imploded at 9,990m in 2014 (lost to the abyss)
- **Legacy:** Proved robots could explore the deepest trenches

<!-- ═══════════════════════════════════════════════════ -->
<!-- RIGHT SIDE: BIOLUMINESCENCE                        -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="bio-header" x="1800" y="210" w="500" z="50" fontSize="28" fontFamily="sans-serif" color="#059669" align="left" -->
Bioluminescence

<!--@draw id="hl-bio" x="1795" y="208" z="1" tool="highlighter" color="#10b981" width="24" opacity="0.12" -->
1795.0,238.0,0.50 1950.0,238.0,0.50 2100.0,238.0,0.50 2280.0,238.0,0.50

<!--@block id="bio-info" x="1800" y="270" w="460" h="auto" z="28" -->
### Living Light

76% of deep-sea creatures produce their own light through **bioluminescence** — a chemical reaction between luciferin and oxygen.

**Uses of bioluminescence:**
- **Hunting:** Anglerfish lure prey with glowing bait
- **Defense:** Jellyfish flash to startle predators
- **Camouflage:** Counter-illumination matches surface light
- **Communication:** Firefly squid flash mating signals
- **Warning:** "Burglar alarm" flashes attract larger predators to eat your attacker

<!--@block id="bio-chemistry" x="1800" y="620" w="460" h="auto" z="28" -->
### The Chemistry

${H}
Luciferin + O₂ → Oxyluciferin + LIGHT
        (enzyme: luciferase)
${H}

Different species produce **different colors**:
- **Blue/green** (480nm) — most common, travels farthest in water
- **Red** (700nm) — rare, invisible to most deep-sea eyes
  - The **dragonfish** uses red light as a secret headlight!
- **Yellow** — unique to a few jellyfish species

<!--@sticky id="s-bio-fact1" x="1800" y="900" w="220" h="140" z="35" color="#D1FAE5" rotation="-2" -->
If you could see ALL bioluminescence at once, the deep ocean would look like a galaxy of stars.

<!--@sticky id="s-bio-fact2" x="2040" y="900" w="220" h="140" z="35" color="#DBEAFE" rotation="3" -->
Some deep-sea animals can glow for hours. Others produce single, brilliant flashes lasting milliseconds.

<!-- ═══════════════════════════════════════════════════ -->
<!-- RIGHT SIDE: FAMOUS EXPEDITIONS TIMELINE            -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="expeditions-header" x="1800" y="1100" w="500" z="50" fontSize="28" fontFamily="sans-serif" color="#b45309" align="left" -->
Famous Expeditions

<!--@draw id="hl-expeditions" x="1795" y="1098" z="1" tool="highlighter" color="#f59e0b" width="24" opacity="0.12" -->
1795.0,1128.0,0.50 1950.0,1128.0,0.50 2100.0,1128.0,0.50 2280.0,1128.0,0.50

<!--@block id="exp-timeline" x="1800" y="1160" w="460" h="auto" z="28" -->
### Timeline of Discovery

| Year | Expedition | Achievement |
|------|-----------|-------------|
| 1872 | HMS Challenger | First systematic deep-sea study |
| 1930 | Beebe & Barton | First deep dive in a bathysphere (923m) |
| 1960 | Trieste | First humans to the Challenger Deep |
| 1977 | Galápagos Rift | Discovery of hydrothermal vents |
| 1985 | Ballard | Discovery of RMS Titanic (3,800m) |
| 2012 | Cameron | Solo dive to Challenger Deep |
| 2019 | Vescovo | Five Deeps — all 5 ocean floors |
| 2020 | Caladan | 10+ people visit Challenger Deep |

<!--@block id="exp-challenger-ship" x="1800" y="1540" w="460" h="auto" z="28" -->
### HMS Challenger (1872–1876)

The voyage that **founded oceanography**. A converted Royal Navy warship sailed 127,600 km across every ocean.

**Discoveries:**
- 4,700+ new species catalogued
- First measurement of the Mariana Trench
- Mapped ocean temperatures, currents, and chemistry
- Published **50 volumes** of findings over 23 years
- Named the **Challenger Deep** after this ship

<!-- ═══════════════════════════════════════════════════ -->
<!-- MIND-BLOWING FACTS (scattered)                     -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="facts-header" x="2380" y="210" w="400" z="50" fontSize="28" fontFamily="sans-serif" color="#dc2626" align="left" -->
Mind-Blowing Facts

<!--@draw id="hl-facts" x="2375" y="208" z="1" tool="highlighter" color="#ef4444" width="24" opacity="0.12" -->
2375.0,238.0,0.50 2520.0,238.0,0.50 2660.0,238.0,0.50 2780.0,238.0,0.50

<!--@sticky id="f-mt-everest" x="2380" y="270" w="240" h="170" z="35" color="#FEF3C7" rotation="-2" -->
If Mt. Everest were placed in the Mariana Trench, there'd still be 2km of water above it.

<!--@sticky id="f-sound" x="2640" y="270" w="240" h="170" z="35" color="#FCE7F3" rotation="3" -->
Sound travels 4.5x faster in water than air. A whale's call can be heard 16,000 km away.

<!--@sticky id="f-pressure" x="2380" y="470" w="240" h="170" z="35" color="#DBEAFE" rotation="1" -->
At the bottom of the Mariana Trench, pressure is like balancing 50 jumbo jets on your body.

<!--@sticky id="f-waterfalls" x="2640" y="470" w="240" h="170" z="35" color="#D1FAE5" rotation="-3" -->
The largest waterfall on Earth is underwater — the Denmark Strait cataract drops 3,505m.

<!--@sticky id="f-rivers" x="2380" y="670" w="240" h="170" z="35" color="#EDE9FE" rotation="2" -->
There are rivers and lakes at the bottom of the ocean — dense brine pools with their own shorelines and waves.

<!--@sticky id="f-oxygen" x="2640" y="670" w="240" h="170" z="35" color="#FEE2E2" rotation="-2" -->
The ocean produces over 50% of the world's oxygen. Every second breath you take comes from the sea.

<!--@sticky id="f-gold" x="2380" y="870" w="240" h="170" z="35" color="#FEF3C7" rotation="-1" -->
There are ~20 million tons of gold dissolved in seawater. Worth ~$770 trillion at today's prices.

<!--@sticky id="f-plastic" x="2640" y="870" w="240" h="170" z="35" color="#FCE7F3" rotation="3" -->
By 2050, there may be more plastic in the ocean (by weight) than fish. Microplastics found at 10,994m.

<!--@sticky id="f-dark" x="2380" y="1070" w="240" h="170" z="35" color="#DBEAFE" rotation="2" -->
Below 1,000m, the ocean is in perpetual darkness. More humans have walked on the Moon than visited the deep ocean.

<!--@sticky id="f-volcano" x="2640" y="1070" w="240" h="170" z="35" color="#D1FAE5" rotation="-1" -->
There are 75,000+ volcanoes on the ocean floor. 80% of all eruptions happen underwater and we never see them.

<!--@sticky id="f-lifeforms" x="2380" y="1270" w="240" h="170" z="35" color="#EDE9FE" rotation="-3" -->
Scientists estimate we've only discovered 1/3 of all ocean species. The rest? Waiting in the deep.

<!--@sticky id="f-immortal" x="2640" y="1270" w="240" h="170" z="35" color="#FEE2E2" rotation="1" -->
The "immortal jellyfish" (Turritopsis dohrnii) can revert to a juvenile state — theoretically living forever.

<!-- ═══════════════════════════════════════════════════ -->
<!-- OCEAN FLOOR MAP / FEATURES                         -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="features-header" x="1340" y="2040" w="500" z="50" fontSize="28" fontFamily="sans-serif" color="#0369a1" align="left" -->
Ocean Floor Features

<!--@draw id="hl-features" x="1335" y="2038" z="1" tool="highlighter" color="#0ea5e9" width="24" opacity="0.12" -->
1335.0,2068.0,0.50 1500.0,2068.0,0.50 1700.0,2068.0,0.50 1820.0,2068.0,0.50

<!--@block id="feat-ridges" x="1340" y="2100" w="340" h="auto" z="28" -->
### Mid-Ocean Ridges

The longest mountain chain on Earth — **65,000 km** winding through every ocean.

- Formed by tectonic plates spreading apart
- New ocean floor is born here
- The Mid-Atlantic Ridge is growing 2.5cm/year
- Iceland sits on top of one — visible at Thingvellir

<!--@block id="feat-trenches" x="1700" y="2100" w="340" h="auto" z="28" -->
### Ocean Trenches

The deepest scars on Earth's surface, formed when one tectonic plate dives beneath another.

| Trench | Depth | Ocean |
|--------|-------|-------|
| Mariana | 10,994m | Pacific |
| Tonga | 10,882m | Pacific |
| Kuril-Kamchatka | 10,542m | Pacific |
| Philippine | 10,540m | Pacific |
| Kermadec | 10,047m | Pacific |

<!--@block id="feat-vents" x="2060" y="2100" w="340" h="auto" z="28" -->
### Hydrothermal Vents

Underwater geysers that spew **superheated, mineral-rich water** from Earth's interior.

- **Black smokers:** 400°C water, rich in iron sulfide
- **White smokers:** Cooler (300°C), lighter minerals
- **Lost City:** Alkaline vents, potential origin of life
- Support entire ecosystems with **zero sunlight**
- May be where life on Earth first began ~4 billion years ago

<!--@block id="feat-abyssal" x="1340" y="2500" w="340" h="auto" z="28" -->
### Abyssal Plains

The flattest places on Earth. Vast, featureless muddy plains covering **65% of Earth's surface** — larger than all continents combined.

- Covered in fine sediment (marine snow)
- Incredibly flat — elevation varies by < 1m over km
- Contains **manganese nodules** worth trillions
- Home to sparse but fascinating life

<!--@block id="feat-seamounts" x="1700" y="2500" w="340" h="auto" z="28" -->
### Seamounts

Underwater mountains that don't reach the surface. There are an estimated **100,000+ seamounts** in the world's oceans.

- Act as oases of biodiversity
- Create upwelling currents that bring nutrients up
- Many are extinct volcanoes
- Only ~0.1% have been surveyed
- Harbor unique species found nowhere else

<!--@block id="feat-brine" x="2060" y="2500" w="340" h="auto" z="28" -->
### Brine Pools

Lakes at the bottom of the ocean! Super-salty water so dense it settles into depressions on the sea floor.

- Have their own **shorelines and waves**
- Salt concentration 3–8x normal seawater
- Toxic to most creatures (called "pools of death")
- Some host extremophile bacteria
- Found in the Gulf of Mexico & Mediterranean

<!-- ═══════════════════════════════════════════════════ -->
<!-- OCEAN CONSERVATION                                 -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="conservation-header" x="2380" y="1520" w="500" z="50" fontSize="28" fontFamily="sans-serif" color="#059669" align="left" -->
Why It Matters

<!--@draw id="hl-conservation" x="2375" y="1518" z="1" tool="highlighter" color="#10b981" width="24" opacity="0.12" -->
2375.0,1548.0,0.50 2520.0,1548.0,0.50 2660.0,1548.0,0.50 2780.0,1548.0,0.50

<!--@block id="conservation-info" x="2380" y="1580" w="500" h="auto" z="28" -->
### The Ocean Needs Us

The deep ocean isn't just a curiosity — it's critical to life on Earth.

**Climate regulation:**
- Absorbs **30% of CO₂** produced by humans
- Stores **50x more carbon** than the atmosphere
- The thermohaline circulation regulates global climate

**Medical discoveries:**
- Deep-sea organisms produce compounds used in cancer drugs
- Cone snail venom → pain medication (Ziconotide)
- Deep-sea sponges → antiviral and antibacterial compounds
- Enzymes from extremophiles → PCR testing (yes, COVID tests!)

**Threats:**
- Deep-sea mining could destroy vent ecosystems
- Bottom trawling devastates abyssal habitats
- Ocean acidification dissolving calcium carbonate shells
- Warming water disrupting the thermohaline circulation
- Plastic pollution reaches the deepest trenches

<!--@block id="conservation-quote" x="2380" y="2060" w="500" h="auto" z="28" rotation="1" -->
> "We know more about the surface of the Moon and Mars than we do about the deep sea floor."
>
> — **Dr. Sylvia Earle**, oceanographer

> "The sea, once it casts its spell, holds one in its net of wonder forever."
>
> — **Jacques Cousteau**

<!--@sticky id="s-action" x="2380" y="2300" w="240" h="170" z="35" color="#D1FAE5" rotation="-2" -->
Less than 8% of the ocean is protected. Scientists advocate for protecting at least 30% by 2030.

<!--@sticky id="s-action2" x="2640" y="2300" w="240" h="170" z="35" color="#DBEAFE" rotation="2" -->
Every piece of plastic you don't use is one less piece that could end up 11km deep.

<!-- ═══════════════════════════════════════════════════ -->
<!-- DEPTH COMPARISON (fun visual)                      -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@text id="compare-header" x="60" y="3100" w="600" z="50" fontSize="28" fontFamily="sans-serif" color="#0369a1" align="left" -->
How Deep Is Deep? (Depth Comparison)

<!--@draw id="hl-compare" x="55" y="3098" z="1" tool="highlighter" color="#0ea5e9" width="24" opacity="0.12" -->
55.0,3128.0,0.50 200.0,3128.0,0.50 400.0,3128.0,0.50 600.0,3128.0,0.50

<!--@block id="compare-table" x="60" y="3170" w="700" h="auto" z="28" -->
### From sky to sea floor

| Depth/Height | What's There | Notes |
|-------------|-------------|-------|
| +8,849m | Mt. Everest summit | Highest point on land |
| +10,000m | Cruising altitude (planes) | Commercial jets fly here |
| 0m | Sea level | **--- THE SURFACE ---** |
| -40m | Recreational scuba limit | Most divers stop here |
| -100m | Light starts dimming | Blue light only |
| -200m | **Sunlight zone ends** | Photosynthesis impossible below |
| -332m | Deepest scuba dive (Ahmed Gabr) | Don't try this |
| -500m | Blue whale max dive | Deepest-diving mammal |
| -1,000m | **Twilight zone ends** | Total darkness below |
| -2,000m | Sperm whale max dive | Hunting giant squid |
| -3,800m | RMS Titanic wreck | 3 hours to sink here |
| -4,000m | **Midnight zone ends** | Average ocean depth |
| -6,000m | **Abyssal zone ends** | Start of the trenches |
| -8,178m | Deepest fish (Mariana snailfish) | Life finds a way |
| -8,849m | Everest inverted would end here | Still 2km to go! |
| -10,994m | **Challenger Deep** | Bottom of the world |

<!--@block id="compare-visual" x="800" y="3170" w="400" h="auto" z="28" -->
### The Scale Problem

If Earth were a basketball, the ocean's average depth would be thinner than a sheet of paper.

Yet within that thin film of water:
- Lives the **largest ecosystem** on Earth
- Contains **97% of all habitable space** on the planet
- Holds enough water to fill **352 quintillion** gallon jugs
- Harbors more life forms than all terrestrial ecosystems combined

The deep ocean is Earth's **last frontier** — more alien than outer space, closer than Mars, and teeming with life we've never imagined.

<!-- ═══════════════════════════════════════════════════ -->
<!-- DECORATIVE ELEMENTS                                -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@draw id="fish-1" x="950" y="56" z="6" tool="pen" color="#0ea5e9" width="2" -->
965.0,65.0,0.50 972.0,60.0,0.50 982.0,58.0,0.50 992.0,60.0,0.50 998.0,65.0,0.50 992.0,70.0,0.50 982.0,72.0,0.50 972.0,70.0,0.50 965.0,65.0,0.50 958.0,58.0,0.50 955.0,65.0,0.50 958.0,72.0,0.50

<!--@draw id="fish-2" x="1010" y="70" z="6" tool="pen" color="#38bdf8" width="1.5" -->
1020.0,78.0,0.50 1025.0,74.0,0.50 1032.0,73.0,0.50 1039.0,75.0,0.50 1043.0,78.0,0.50 1039.0,82.0,0.50 1032.0,83.0,0.50 1025.0,82.0,0.50 1020.0,78.0,0.50 1015.0,73.0,0.50 1013.0,78.0,0.50 1015.0,83.0,0.50

<!--@draw id="bubbles-1" x="1060" y="40" z="5" tool="pen" color="#7dd3fc" width="1" opacity="0.5" -->
1065.0,65.0,0.50 1063.0,62.0,0.50 1062.0,58.0,0.50 1063.0,55.0,0.50 1066.0,54.0,0.50 1068.0,55.0,0.50 1069.0,58.0,0.50 1068.0,62.0,0.50 1065.0,65.0,0.50

<!--@draw id="bubbles-2" x="1068" y="40" z="5" tool="pen" color="#7dd3fc" width="1" opacity="0.4" -->
1075.0,52.0,0.50 1073.0,50.0,0.50 1073.0,47.0,0.50 1075.0,45.0,0.50 1077.0,47.0,0.50 1077.0,50.0,0.50 1075.0,52.0,0.50

<!--@draw id="bubbles-3" x="1072" y="36" z="5" tool="pen" color="#7dd3fc" width="1" opacity="0.3" -->
1078.0,42.0,0.50 1077.0,40.0,0.50 1078.0,38.0,0.50 1080.0,40.0,0.50 1078.0,42.0,0.50

<!--@draw id="anchor" x="2340" y="50" z="5" tool="pen" color="#64748b" width="2" -->
2360.0,55.0,0.50 2360.0,90.0,0.50 2345.0,100.0,0.50 2340.0,95.0,0.50 2345.0,90.0,0.50 2360.0,90.0,0.50 2375.0,90.0,0.50 2380.0,95.0,0.50 2375.0,100.0,0.50 2360.0,90.0,0.50

<!--@draw id="anchor-ring" x="2354" y="44" z="5" tool="pen" color="#64748b" width="1.5" -->
2360.0,44.0,0.50 2364.0,46.0,0.50 2366.0,50.0,0.50 2364.0,54.0,0.50 2360.0,55.0,0.50 2356.0,54.0,0.50 2354.0,50.0,0.50 2356.0,46.0,0.50 2360.0,44.0,0.50

<!--@draw id="seaweed-1" x="2300" y="155" z="4" tool="pen" color="#059669" width="1.5" opacity="0.5" -->
2310.0,195.0,0.50 2308.0,185.0,0.50 2312.0,175.0,0.50 2308.0,165.0,0.50 2312.0,155.0,0.50

<!--@draw id="seaweed-2" x="2320" y="155" z="4" tool="pen" color="#10b981" width="1.5" opacity="0.5" -->
2328.0,195.0,0.50 2330.0,185.0,0.50 2326.0,175.0,0.50 2330.0,168.0,0.50 2326.0,160.0,0.50

<!--@draw id="seaweed-3" x="2290" y="160" z="4" tool="pen" color="#34d399" width="1" opacity="0.4" -->
2296.0,195.0,0.50 2294.0,188.0,0.50 2298.0,180.0,0.50 2294.0,172.0,0.50 2298.0,165.0,0.50

<!--@draw id="jellyfish-doodle" x="2850" y="80" z="6" tool="pen" color="#a855f7" width="1.5" opacity="0.6" -->
2860.0,80.0,0.50 2855.0,85.0,0.50 2852.0,92.0,0.50 2854.0,100.0,0.50 2860.0,104.0,0.50 2866.0,100.0,0.50 2868.0,92.0,0.50 2865.0,85.0,0.50 2860.0,80.0,0.50

<!--@draw id="jellyfish-tentacles" x="2850" y="104" z="6" tool="pen" color="#a855f7" width="1" opacity="0.4" -->
2854.0,104.0,0.50 2852.0,112.0,0.50 2854.0,120.0,0.50 2852.0,128.0,0.50

<!--@draw id="jellyfish-tentacles2" x="2858" y="104" z="6" tool="pen" color="#c084fc" width="1" opacity="0.4" -->
2860.0,104.0,0.50 2860.0,115.0,0.50 2858.0,122.0,0.50 2860.0,130.0,0.50

<!--@draw id="jellyfish-tentacles3" x="2862" y="104" z="6" tool="pen" color="#a855f7" width="1" opacity="0.4" -->
2866.0,104.0,0.50 2868.0,112.0,0.50 2866.0,120.0,0.50 2868.0,128.0,0.50

<!--@draw id="submarine" x="2800" y="1480" z="6" tool="pen" color="#64748b" width="2" -->
2810.0,1500.0,0.50 2820.0,1494.0,0.50 2835.0,1490.0,0.50 2855.0,1488.0,0.50 2870.0,1490.0,0.50 2880.0,1496.0,0.50 2885.0,1500.0,0.50 2880.0,1506.0,0.50 2870.0,1510.0,0.50 2855.0,1512.0,0.50 2835.0,1510.0,0.50 2820.0,1506.0,0.50 2810.0,1500.0,0.50

<!--@draw id="submarine-tower" x="2848" y="1478" z="6" tool="pen" color="#64748b" width="1.5" -->
2850.0,1490.0,0.50 2850.0,1482.0,0.50 2860.0,1482.0,0.50 2860.0,1490.0,0.50

<!--@draw id="submarine-periscope" x="2854" y="1472" z="6" tool="pen" color="#64748b" width="1" -->
2856.0,1482.0,0.50 2856.0,1474.0,0.50 2860.0,1474.0,0.50

<!--@draw id="sub-bubbles1" x="2888" y="1492" z="5" tool="pen" color="#7dd3fc" width="1" opacity="0.4" -->
2892.0,1498.0,0.50 2890.0,1496.0,0.50 2890.0,1494.0,0.50 2892.0,1492.0,0.50 2894.0,1494.0,0.50 2894.0,1496.0,0.50 2892.0,1498.0,0.50

<!--@draw id="sub-bubbles2" x="2898" y="1488" z="5" tool="pen" color="#7dd3fc" width="1" opacity="0.3" -->
2902.0,1492.0,0.50 2901.0,1490.0,0.50 2902.0,1488.0,0.50 2904.0,1490.0,0.50 2902.0,1492.0,0.50

<!-- Decorative shapes -->

<!--@draw id="shape-zone-arrow" x="80" y="735" w="40" h="40" z="3" tool="shape" shape="arrow" color="#6366f1" stroke="2" roughness="1" startPt="20.0,0.0" endPt="20.0,40.0" -->

<!--@draw id="shape-zone-arrow2" x="80" y="1305" w="40" h="40" z="3" tool="shape" shape="arrow" color="#4338ca" stroke="2" roughness="1" startPt="20.0,0.0" endPt="20.0,40.0" -->

<!--@draw id="shape-zone-arrow3" x="80" y="1875" w="40" h="40" z="3" tool="shape" shape="arrow" color="#581c87" stroke="2" roughness="1" startPt="20.0,0.0" endPt="20.0,40.0" -->

<!--@draw id="shape-zone-arrow4" x="80" y="2445" w="40" h="40" z="3" tool="shape" shape="arrow" color="#3b0764" stroke="2" roughness="1" startPt="20.0,0.0" endPt="20.0,40.0" -->

<!--@draw id="shape-ellipse-bio" x="1780" y="250" w="500" h="810" z="0" tool="shape" shape="ellipse" color="#10b981" stroke="1" roughness="2" opacity="0.08" fill="#d1fae5" -->

<!--@draw id="shape-ellipse-facts" x="2360" y="250" w="540" h="1230" z="0" tool="shape" shape="ellipse" color="#ef4444" stroke="1" roughness="2" opacity="0.06" fill="#fee2e2" -->

<!--@draw id="shape-rect-vehicles" x="1320" y="250" w="420" h="1780" z="0" tool="shape" shape="rect" color="#0ea5e9" stroke="1" roughness="1.5" opacity="0.06" strokeStyle="dashed" -->

<!--@draw id="shape-diamond-1" x="1260" y="200" w="50" h="50" z="4" tool="shape" shape="diamond" color="#0ea5e9" stroke="2" roughness="1" fill="#e0f2fe" -->

<!--@draw id="shape-diamond-2" x="2330" y="1500" w="40" h="40" z="4" tool="shape" shape="diamond" color="#f59e0b" stroke="1.5" roughness="1" fill="#fef3c7" -->

<!--@draw id="shape-diamond-3" x="2880" y="260" w="35" h="35" z="4" tool="shape" shape="diamond" color="#a855f7" stroke="1.5" roughness="1" fill="#ede9fe" -->

<!-- Horizontal divider lines -->

<!--@draw id="shape-line-div1" x="60" y="3060" w="2840" h="0" z="2" tool="shape" shape="line" color="#e2e8f0" stroke="1" roughness="0.5" startPt="0.0,0.0" endPt="2840.0,0.0" -->

<!-- ═══════════════════════════════════════════════════ -->
<!-- EDGES / CONNECTIONS                                -->
<!-- ═══════════════════════════════════════════════════ -->

<!-- Zone-to-zone flow -->
<!--@edge id="e-z1-z2" from="frame-sunlight" to="frame-twilight" style="solid" color="#4f46e5" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-z2-z3" from="frame-twilight" to="frame-midnight" style="solid" color="#312e81" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-z3-z4" from="frame-midnight" to="frame-abyssal" style="solid" color="#581c87" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-z4-z5" from="frame-abyssal" to="frame-hadal" style="solid" color="#3b0764" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!-- Creature connections (food chain) -->
<!--@edge id="e-food-1" from="s-dolphin" to="s-lanternfish" style="dashed" color="#0ea5e9" arrowHead="arrow" label="hunts" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-food-2" from="s-greatwhite" to="s-turtle" style="dashed" color="#ef4444" arrowHead="arrow" label="preys on" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-food-3" from="s-giantsquid" to="s-anglerfish" style="dotted" color="#8b5cf6" label="coexists" sourceHandle="bottom" targetHandle="top" -->

<!--@edge id="e-food-4" from="s-vents" to="s-tubeworm" style="solid" color="#f59e0b" arrowHead="arrow" label="sustains" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-food-5" from="s-vents" to="s-yeti" style="solid" color="#f59e0b" arrowHead="arrow" label="sustains" sourceHandle="left" targetHandle="right" -->

<!-- Vehicle to zone connections -->
<!--@edge id="e-v-alvin" from="vehicle-alvin" to="frame-abyssal" style="dotted" color="#0369a1" arrowHead="arrow" label="dives to" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-v-trieste" from="vehicle-trieste" to="s-challenger" style="dotted" color="#0369a1" arrowHead="arrow" label="reached" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-v-deepsea" from="vehicle-deepsea" to="frame-hadal" style="dotted" color="#0369a1" arrowHead="arrow" label="explored" sourceHandle="left" targetHandle="right" -->

<!-- Bio connections -->
<!--@edge id="e-bio-angler" from="bio-info" to="s-anglerfish" style="dashed" color="#10b981" arrowHead="arrow" label="example" sourceHandle="left" targetHandle="right" -->

<!--@edge id="e-bio-squid" from="bio-info" to="s-squid" style="dashed" color="#10b981" label="example" sourceHandle="left" targetHandle="right" -->

<!-- Conservation links -->
<!--@edge id="e-cons-plastic" from="f-plastic" to="s-action2" style="solid" color="#dc2626" arrowHead="arrow" sourceHandle="bottom" targetHandle="top" -->

<!-- Expedition to vehicle -->
<!--@edge id="e-exp-trieste" from="exp-timeline" to="vehicle-trieste" style="dashed" color="#b45309" sourceHandle="left" targetHandle="right" -->

<!-- ═══════════════════════════════════════════════════ -->
<!-- FOOTER                                             -->
<!-- ═══════════════════════════════════════════════════ -->

<!--@block id="footer" x="60" y="3700" w="900" h="auto" z="10" -->
*This board explores the deep ocean — from sunlit coral reefs to the crushing darkness of the Mariana Trench. Every sticky note is a creature, every frame is a depth zone, and every connection tells a story. Dive in.*

<!--@text id="footer-credit" x="60" y="3780" w="900" z="9" fontSize="12" fontFamily="sans-serif" color="#94a3b8" align="left" -->
Built with SpatialBoard — where knowledge becomes spatial
`;
async function P(o) {
  console.log("Starting Benchmark...");
  const l = 1e4, a = 1e3, i = 5e3;
  o.fromJSON({ nodes: [] }), await new Promise((t) => setTimeout(t, 100)), console.time(`Insert ${l} nodes`);
  const s = [];
  for (let t = 0; t < l; t++)
    s.push({
      id: S(),
      type: "shape",
      x: Math.random() * i - i / 2,
      y: Math.random() * i - i / 2,
      w: 100,
      h: 100,
      z: t,
      data: {
        shape: "rect",
        color: "#000000",
        stroke: "#000000",
        strokeWidth: 2,
        roughness: 1
      }
    });
  const z = performance.now();
  o.addNodes ? o.addNodes(s) : s.forEach((t) => o.addNode(t));
  const h = performance.now();
  console.timeEnd(`Insert ${l} nodes`), console.log(`Insert took ${(h - z).toFixed(2)}ms`), console.time(`Query ${a} times (Large Rect)`);
  const d = { x: -1e3, y: -1e3, w: 2e3, h: 2e3 };
  let x = 0;
  const m = performance.now();
  for (let t = 0; t < a; t++) {
    const f = t * 1, w = o.getNodesInRect({
      x: d.x + f,
      y: d.y + f,
      w: d.w,
      h: d.h
    });
    x += w.length;
  }
  const c = performance.now();
  console.timeEnd(`Query ${a} times (Large Rect)`), console.log(`Query (Large) took ${(c - m).toFixed(2)}ms. Avg: ${((c - m) / a).toFixed(3)}ms`), console.log(`Total nodes found in queries: ${x}`), console.time(`Query ${a} times (Small Rect)`);
  const g = performance.now();
  for (let t = 0; t < a; t++) {
    const f = Math.random() * i - i / 2, w = Math.random() * i - i / 2;
    o.getNodesInRect({ x: f, y: w, w: 10, h: 10 });
  }
  const k = performance.now();
  console.timeEnd(`Query ${a} times (Small Rect)`), console.log(`Query (Small) took ${(k - g).toFixed(2)}ms. Avg: ${((k - g) / a).toFixed(3)}ms`), console.time(`HitTest ${a} times`);
  const y = performance.now();
  for (let t = 0; t < a; t++) {
    const f = Math.random() * i - i / 2, w = Math.random() * i - i / 2;
    o.hitTest(f, w);
  }
  const u = performance.now();
  console.timeEnd(`HitTest ${a} times`), console.log(`HitTest took ${(u - y).toFixed(2)}ms. Avg: ${((u - y) / a).toFixed(3)}ms`);
  const e = `Benchmark Complete!\\nCheck console for details.\\n\\nInsert: ${(h - z).toFixed(0)}ms\\nQuery (Large): avg ${((c - m) / a).toFixed(3)}ms\\nHitTest: avg ${((u - y) / a).toFixed(3)}ms`;
  typeof alert < "u" ? alert(e) : (console.log("---------------------------------------------------"), console.log(e.replace(/\\n/g, `
`)), console.log("---------------------------------------------------"));
}
const n = {
  padding: "4px 10px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 11
};
function O({ engine: o, extraBoards: l }) {
  const [a, i] = b(""), [s, z] = b(!1), [h, d] = b(""), [x, m] = b(!1), [c, g] = b(!1);
  E(() => {
    const e = () => {
      o.toSBD().then(i);
    };
    return o.on("change", e), e(), () => o.off("change", e);
  }, [o]);
  const k = () => {
    navigator.clipboard.writeText(a), m(!0), setTimeout(() => m(!1), 1500);
  }, y = () => {
    h.trim() && o.fromSBD(h).then(() => d(""));
  }, u = async () => {
    g(!0);
    try {
      await P(o);
    } catch (e) {
      console.error(e), alert("Benchmark failed: " + e);
    } finally {
      g(!1);
    }
  };
  return /* @__PURE__ */ p(
    "div",
    {
      style: {
        position: "absolute",
        bottom: 0,
        left: 48,
        right: 0,
        maxHeight: s ? 300 : 32,
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
        /* @__PURE__ */ p(
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
            onClick: () => z(!s),
            children: [
              /* @__PURE__ */ p("span", { children: [
                s ? "▼" : "▲",
                " SBD Output"
              ] }),
              /* @__PURE__ */ p("span", { style: { color: "#888", fontSize: 10 }, children: [
                o.getAllNodes().length,
                " nodes"
              ] }),
              /* @__PURE__ */ r("div", { style: { flex: 1 } }),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), u();
                  },
                  style: { ...n, background: c ? "#f59e0b" : "#ef4444" },
                  disabled: c,
                  children: c ? "Running..." : "Run Benchmark"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), k();
                  },
                  style: n,
                  children: x ? "Copied!" : "Copy SBD"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), o.fromSBD(F);
                  },
                  style: { ...n, background: "#8b5cf6" },
                  children: "Load Test"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), o.fromSBD(T);
                  },
                  style: { ...n, background: "#ef4444" },
                  children: "Load Lobbying"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), o.fromSBD(A);
                  },
                  style: { ...n, background: "#f59e0b" },
                  children: "Load Golden Age"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), o.fromSBD(D);
                  },
                  style: { ...n, background: "#10b981" },
                  children: "Load Computers"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), o.fromSBD(C);
                  },
                  style: { ...n, background: "#6366f1" },
                  children: "Load Languages"
                }
              ),
              /* @__PURE__ */ r(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation(), o.fromSBD(I);
                  },
                  style: { ...n, background: "#0ea5e9" },
                  children: "Load Deep Ocean"
                }
              ),
              l == null ? void 0 : l.map((e) => /* @__PURE__ */ r(
                "button",
                {
                  onClick: (t) => {
                    t.stopPropagation(), e.load(o);
                  },
                  style: { ...n, background: e.color },
                  children: e.label
                },
                e.label
              ))
            ]
          }
        ),
        s && /* @__PURE__ */ p(
          "div",
          {
            style: {
              display: "flex",
              gap: 12,
              padding: "0 12px 12px",
              height: 250
            },
            children: [
              /* @__PURE__ */ r(
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
                  children: a
                }
              ),
              /* @__PURE__ */ p(
                "div",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8
                  },
                  children: [
                    /* @__PURE__ */ r(
                      "textarea",
                      {
                        value: h,
                        onChange: (e) => d(e.target.value),
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
                    /* @__PURE__ */ r("button", { onClick: y, style: n, children: "Load SBD" })
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
  O as default
};
