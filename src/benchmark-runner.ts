
import { SpatialEngine } from "./engine/SpatialEngine";
import { runBenchmark } from "./performance-test";

// Runs headless under Node 19+: the engine touches no DOM globals here and
// nanoid's crypto dependency is satisfied by globalThis.crypto.

async function main() {
    console.log("Initializing Engine...");
    const engine = new SpatialEngine();

    // Create a mock measuredHeights object since we don't have DOM
    const measuredHeights: Record<string, number> = {};

    console.log("Running Benchmark...");
    try {
        await runBenchmark(engine);
        console.log("Done.");
    } catch (e) {
        console.error("Benchmark Failed:", e);
        process.exit(1);
    }
}

main();
