/**
 * Test board — Programming Languages Mindmap.
 * Radial layout with 6 paradigm branches, ~30 language sticky notes, and cross-paradigm links.
 */

export const COMPUTER_LANGUAGES_SBD = `<!--@meta canvas_w="5200" canvas_h="3800" grid="20" snap="false" -->

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
`;
