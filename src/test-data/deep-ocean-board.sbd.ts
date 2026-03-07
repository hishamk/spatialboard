/**
 * The Deep Ocean — an epic exploration from sunlit surface to the crushing
 * depths of the Mariana Trench. Packed with creatures, vehicles, mind-blowing
 * facts, bioluminescence, and famous expeditions.
 */

const CB = "```";

export const DEEP_OCEAN_SBD = `<!--@meta canvas_w="6000" canvas_h="5500" grid="20" snap="false" -->

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

${CB}
Luciferin + O₂ → Oxyluciferin + LIGHT
        (enzyme: luciferase)
${CB}

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
