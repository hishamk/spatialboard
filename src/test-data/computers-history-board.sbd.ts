/**
 * Test board — From Al-Khwarizmi to AI: Tracing the Lineage of Computing.
 * Horizontal landscape layout with images, animated connections, and concise text.
 */

export const COMPUTERS_HISTORY_SBD = `<!--@meta canvas_w="6000" canvas_h="2600" grid="20" snap="false" -->

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
`;
