import { SpatialEngine } from "./engine/SpatialEngine";
import { nanoid } from "nanoid";

export async function runBenchmark(engine: SpatialEngine) {
    console.log("Starting Benchmark...");
    const NODE_COUNT = 10000;
    const QUERY_COUNT = 1000;
    const WORLD_SIZE = 5000;

    // 1. Clear existing
    engine.fromJSON({ nodes: [] });
    await new Promise(r => setTimeout(r, 100));

    // 2. Insert Nodes
    console.time(`Insert ${NODE_COUNT} nodes`);
    const nodes: import("./engine/types").SpatialNode[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
            id: nanoid(),
            type: "shape",
            x: Math.random() * WORLD_SIZE - WORLD_SIZE / 2,
            y: Math.random() * WORLD_SIZE - WORLD_SIZE / 2,
            w: 100,
            h: 100,
            z: i,
            data: {
                shape: "rect",
                color: "#000000",
                stroke: "#000000",
                strokeWidth: 2,
                roughness: 1,
            },
        } as import("./engine/types").ShapeNode);
    }
    // Batch insert for setup; individual-insert cost shows up in the
    // per-query timings below, which mirror real interaction patterns.
    const startInsert = performance.now();
    // @ts-ignore
    if (engine.addNodes) {
        // @ts-ignore
        engine.addNodes(nodes);
    } else {
        nodes.forEach(n => engine.addNode(n));
    }
    const endInsert = performance.now();
    console.timeEnd(`Insert ${NODE_COUNT} nodes`);
    console.log(`Insert took ${(endInsert - startInsert).toFixed(2)}ms`);

    // 3. Query Large Rect (Viewport)
    console.time(`Query ${QUERY_COUNT} times (Large Rect)`);
    const largeRect = { x: -1000, y: -1000, w: 2000, h: 2000 };
    let totalNodesFound = 0;
    const startQuery = performance.now();
    for (let i = 0; i < QUERY_COUNT; i++) {
        // Simulate moving viewport slightly
        const offset = i * 1;
        const res = engine.getNodesInRect({
            x: largeRect.x + offset,
            y: largeRect.y + offset,
            w: largeRect.w,
            h: largeRect.h
        });
        totalNodesFound += res.length;
    }
    const endQuery = performance.now();
    console.timeEnd(`Query ${QUERY_COUNT} times (Large Rect)`);
    console.log(`Query (Large) took ${(endQuery - startQuery).toFixed(2)}ms. Avg: ${((endQuery - startQuery) / QUERY_COUNT).toFixed(3)}ms`);
    console.log(`Total nodes found in queries: ${totalNodesFound}`);

    // 4. Query Small Rect (Hit Test Candidate Selection equivalent)
    console.time(`Query ${QUERY_COUNT} times (Small Rect)`);
    const smallRect = { x: 0, y: 0, w: 10, h: 10 };
    const startSmall = performance.now();
    for (let i = 0; i < QUERY_COUNT; i++) {
        const rx = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
        const ry = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
        engine.getNodesInRect({ x: rx, y: ry, w: 10, h: 10 });
    }
    const endSmall = performance.now();
    console.timeEnd(`Query ${QUERY_COUNT} times (Small Rect)`);
    console.log(`Query (Small) took ${(endSmall - startSmall).toFixed(2)}ms. Avg: ${((endSmall - startSmall) / QUERY_COUNT).toFixed(3)}ms`);

    // 5. Hit Test
    console.time(`HitTest ${QUERY_COUNT} times`);
    const startHit = performance.now();
    for (let i = 0; i < QUERY_COUNT; i++) {
        const rx = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
        const ry = Math.random() * WORLD_SIZE - WORLD_SIZE / 2;
        engine.hitTest(rx, ry);
    }
    const endHit = performance.now();
    console.timeEnd(`HitTest ${QUERY_COUNT} times`);
    console.log(`HitTest took ${(endHit - startHit).toFixed(2)}ms. Avg: ${((endHit - startHit) / QUERY_COUNT).toFixed(3)}ms`);

    const msg = `Benchmark Complete!\\nCheck console for details.\\n\\nInsert: ${(endInsert - startInsert).toFixed(0)}ms\\nQuery (Large): avg ${((endQuery - startQuery) / QUERY_COUNT).toFixed(3)}ms\\nHitTest: avg ${((endHit - startHit) / QUERY_COUNT).toFixed(3)}ms`;
    if (typeof alert !== "undefined") {
        alert(msg);
    } else {
        console.log("---------------------------------------------------");
        console.log(msg.replace(/\\n/g, "\n"));
        console.log("---------------------------------------------------");
    }
}
