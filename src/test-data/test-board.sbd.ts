/**
 * Comprehensive test board — exercises every serializable node type.
 * Layout: a product planning workspace with zones.
 */

const CB = "```";

export const TEST_SBD = `<!--@meta canvas_w="4000" canvas_h="3000" grid="20" snap="false" -->

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

${CB}typescript
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
${CB}

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
`;
