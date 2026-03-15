export interface PerfSnapshot {
  enabled: boolean;
  fps: number;
  frameMsP50: number;
  frameMsP95: number;
  cullingMsP50: number;
  cullingMsP95: number;
  hitTestMsP50: number;
  hitTestMsP95: number;
  edgeHitMsP50: number;
  edgeHitMsP95: number;
  hitTestCallsPerSec: number;
  edgeHitCallsPerSec: number;
  visibleNodes: number;
  totalNodes: number;
  visibleEdges: number;
  totalEdges: number;
  virtualizationActive: boolean;
  seedVisibleNodes: number;
  nodesAddedByAdjacency: number;
  nodesAddedByEdgeEndpoints: number;
  edgesAddedByAdjacency: number;
  edgesAddedByCrossing: number;
  lastUpdatedAt: number;
}

type Listener = () => void;

const MAX_SAMPLES = 180;

function pushRolling(arr: number[], value: number): void {
  arr.push(value);
  if (arr.length > MAX_SAMPLES) arr.shift();
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * p)));
  return sorted[idx];
}

class SpatialPerfStore {
  private enabled = false;
  private listeners = new Set<Listener>();
  private lastTick = 0;
  private lastRatesTs = 0;

  private frameMs: number[] = [];
  private cullingMs: number[] = [];
  private hitTestMs: number[] = [];
  private edgeHitMs: number[] = [];

  private pendingCullingMs = 0;
  private pendingHitTestMs = 0;
  private pendingEdgeHitMs = 0;
  private pendingHitTestCalls = 0;
  private pendingEdgeHitCalls = 0;

  private hitTestCallsPerSec = 0;
  private edgeHitCallsPerSec = 0;

  private visibleNodes = 0;
  private totalNodes = 0;
  private visibleEdges = 0;
  private totalEdges = 0;
  private virtualizationActive = false;
  private seedVisibleNodes = 0;
  private nodesAddedByAdjacency = 0;
  private nodesAddedByEdgeEndpoints = 0;
  private edgesAddedByAdjacency = 0;
  private edgesAddedByCrossing = 0;

  private lastPublishedAt = 0;

  isEnabled(): boolean {
    return this.enabled;
  }

  setEnabled(next: boolean): void {
    if (this.enabled === next) return;
    this.enabled = next;
    if (!next) {
      this.lastTick = 0;
      this.lastRatesTs = 0;
      this.pendingCullingMs = 0;
      this.pendingHitTestMs = 0;
      this.pendingEdgeHitMs = 0;
      this.pendingHitTestCalls = 0;
      this.pendingEdgeHitCalls = 0;
      this.hitTestCallsPerSec = 0;
      this.edgeHitCallsPerSec = 0;
    }
    this.emit();
  }

  subscribe(cb: Listener): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  recordCulling(durationMs: number): void {
    if (!this.enabled) return;
    this.pendingCullingMs += durationMs;
  }

  recordHitTest(durationMs: number): void {
    if (!this.enabled) return;
    this.pendingHitTestMs += durationMs;
    this.pendingHitTestCalls += 1;
  }

  recordEdgeHit(durationMs: number): void {
    if (!this.enabled) return;
    this.pendingEdgeHitMs += durationMs;
    this.pendingEdgeHitCalls += 1;
  }

  setVisibilityCounts(data: {
    visibleNodes: number;
    totalNodes: number;
    visibleEdges: number;
    totalEdges: number;
    virtualizationActive?: boolean;
    seedVisibleNodes?: number;
    nodesAddedByAdjacency?: number;
    nodesAddedByEdgeEndpoints?: number;
    edgesAddedByAdjacency?: number;
    edgesAddedByCrossing?: number;
  }): void {
    if (!this.enabled) return;
    this.visibleNodes = data.visibleNodes;
    this.totalNodes = data.totalNodes;
    this.visibleEdges = data.visibleEdges;
    this.totalEdges = data.totalEdges;
    this.virtualizationActive = data.virtualizationActive ?? false;
    this.seedVisibleNodes = data.seedVisibleNodes ?? 0;
    this.nodesAddedByAdjacency = data.nodesAddedByAdjacency ?? 0;
    this.nodesAddedByEdgeEndpoints = data.nodesAddedByEdgeEndpoints ?? 0;
    this.edgesAddedByAdjacency = data.edgesAddedByAdjacency ?? 0;
    this.edgesAddedByCrossing = data.edgesAddedByCrossing ?? 0;
  }

  tick(now = performance.now()): void {
    if (!this.enabled) return;
    if (this.lastTick > 0) {
      const frame = now - this.lastTick;
      pushRolling(this.frameMs, frame);
    }
    this.lastTick = now;

    pushRolling(this.cullingMs, this.pendingCullingMs);
    pushRolling(this.hitTestMs, this.pendingHitTestMs);
    pushRolling(this.edgeHitMs, this.pendingEdgeHitMs);
    this.pendingCullingMs = 0;
    this.pendingHitTestMs = 0;
    this.pendingEdgeHitMs = 0;

    if (this.lastRatesTs === 0) this.lastRatesTs = now;
    const dt = now - this.lastRatesTs;
    if (dt >= 250) {
      const factor = 1000 / dt;
      this.hitTestCallsPerSec = this.pendingHitTestCalls * factor;
      this.edgeHitCallsPerSec = this.pendingEdgeHitCalls * factor;
      this.pendingHitTestCalls = 0;
      this.pendingEdgeHitCalls = 0;
      this.lastRatesTs = now;
    }

    // Avoid excessive React churn for subscribers.
    if (now - this.lastPublishedAt >= 150) {
      this.lastPublishedAt = now;
      this.emit();
    }
  }

  getSnapshot(): PerfSnapshot {
    const fps = this.frameMs.length
      ? 1000 / (this.frameMs.reduce((a, b) => a + b, 0) / this.frameMs.length)
      : 0;
    return {
      enabled: this.enabled,
      fps,
      frameMsP50: percentile(this.frameMs, 0.5),
      frameMsP95: percentile(this.frameMs, 0.95),
      cullingMsP50: percentile(this.cullingMs, 0.5),
      cullingMsP95: percentile(this.cullingMs, 0.95),
      hitTestMsP50: percentile(this.hitTestMs, 0.5),
      hitTestMsP95: percentile(this.hitTestMs, 0.95),
      edgeHitMsP50: percentile(this.edgeHitMs, 0.5),
      edgeHitMsP95: percentile(this.edgeHitMs, 0.95),
      hitTestCallsPerSec: this.hitTestCallsPerSec,
      edgeHitCallsPerSec: this.edgeHitCallsPerSec,
      visibleNodes: this.visibleNodes,
      totalNodes: this.totalNodes,
      visibleEdges: this.visibleEdges,
      totalEdges: this.totalEdges,
      virtualizationActive: this.virtualizationActive,
      seedVisibleNodes: this.seedVisibleNodes,
      nodesAddedByAdjacency: this.nodesAddedByAdjacency,
      nodesAddedByEdgeEndpoints: this.nodesAddedByEdgeEndpoints,
      edgesAddedByAdjacency: this.edgesAddedByAdjacency,
      edgesAddedByCrossing: this.edgesAddedByCrossing,
      lastUpdatedAt: this.lastPublishedAt,
    };
  }

  private emit(): void {
    for (const cb of this.listeners) cb();
  }
}

export const spatialPerf = new SpatialPerfStore();
