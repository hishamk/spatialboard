import type { SpatialNode } from "./types";

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

/**
 * Compute the axis-aligned bounding box of a node, expanding for rotation.
 * When a node is rotated, its screen footprint is larger than (x,y,w,h).
 */
function nodeAABB(node: SpatialNode, h: number): Rect {
    if (!node.rotation) return { x: node.x, y: node.y, w: node.w, h };
    const cx = node.x + node.w / 2;
    const cy = node.y + h / 2;
    const halfW = node.w / 2;
    const halfH = h / 2;
    const rad = (node.rotation * Math.PI) / 180;
    const absCos = Math.abs(Math.cos(rad));
    const absSin = Math.abs(Math.sin(rad));
    const aabbHalfW = halfW * absCos + halfH * absSin;
    const aabbHalfH = halfW * absSin + halfH * absCos;
    return {
        x: cx - aabbHalfW,
        y: cy - aabbHalfH,
        w: aabbHalfW * 2,
        h: aabbHalfH * 2,
    };
}

export class QuadTree {
    // Max number of objects per node before splitting
    private static readonly MAX_OBJECTS = 10;
    // Max depth of the tree
    private static readonly MAX_LEVELS = 8; // Increased depth for potentially large boards

    private level: number;
    private bounds: Rect;
    private objects: SpatialNode[];
    private nodes: QuadTree[];
    /** Shared across all levels — maps node ID → measured height for auto-height nodes */
    private heightMap: Map<string, number>;

    constructor(bounds: Rect, level = 0, heightMap?: Map<string, number>) {
        this.bounds = bounds;
        this.level = level;
        this.objects = [];
        this.nodes = [];
        this.heightMap = heightMap ?? new Map();
    }

    /** Resolve the effective height for a node (uses measured height for auto-height nodes) */
    private resolveH(node: SpatialNode): number {
        if (typeof node.h === "number") return node.h;
        return this.heightMap.get(node.id) ?? 100;
    }

    /** Store a measured height for an auto-height node */
    setMeasuredHeight(nodeId: string, height: number): void {
        this.heightMap.set(nodeId, height);
    }

    /** Drop the measured height of a deleted node. NOT called from `remove()`:
     * geometry updates go remove+insert, and the interim resolve must still
     * see the height. Callers prune only on true node deletion. */
    removeMeasuredHeight(nodeId: string): void {
        this.heightMap.delete(nodeId);
    }

    /** Drop measured heights for ids no longer on the board. The map is shared
     * across all levels and deliberately survives `clear()` (rebuilds must keep
     * heights for still-live nodes), so rebuilds sweep it against live ids. */
    pruneMeasuredHeights(liveIds: { has(id: string): boolean }): void {
        for (const id of this.heightMap.keys()) {
            if (!liveIds.has(id)) this.heightMap.delete(id);
        }
    }

    // Clear the quadtree
    clear(): void {
        this.objects = [];
        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].clear();
        }
        this.nodes = [];
    }

    // Split the node into 4 subnodes
    private split(): void {
        const subWidth = this.bounds.w / 2;
        const subHeight = this.bounds.h / 2;
        const x = this.bounds.x;
        const y = this.bounds.y;

        this.nodes[0] = new QuadTree({ x: x + subWidth, y: y, w: subWidth, h: subHeight }, this.level + 1, this.heightMap);
        this.nodes[1] = new QuadTree({ x: x, y: y, w: subWidth, h: subHeight }, this.level + 1, this.heightMap);
        this.nodes[2] = new QuadTree({ x: x, y: y + subHeight, w: subWidth, h: subHeight }, this.level + 1, this.heightMap);
        this.nodes[3] = new QuadTree({ x: x + subWidth, y: y + subHeight, w: subWidth, h: subHeight }, this.level + 1, this.heightMap);
    }

    // Determine which quadrant the object belongs to
    private getIndex(rect: Rect): number {
        let index = -1;
        const verticalMidpoint = this.bounds.x + (this.bounds.w / 2);
        const horizontalMidpoint = this.bounds.y + (this.bounds.h / 2);

        const topQuadrant = (rect.y < horizontalMidpoint && rect.y + rect.h < horizontalMidpoint);
        const bottomQuadrant = (rect.y > horizontalMidpoint);

        if (rect.x < verticalMidpoint && rect.x + rect.w < verticalMidpoint) {
            if (topQuadrant) {
                index = 1;
            } else if (bottomQuadrant) {
                index = 2;
            }
        } else if (rect.x > verticalMidpoint) {
            if (topQuadrant) {
                index = 0;
            } else if (bottomQuadrant) {
                index = 3;
            }
        }

        return index;
    }

    // Insert the object into the quadtree
    insert(node: SpatialNode, h?: number): void {
        const height = h ?? this.resolveH(node);
        if (h != null && node.h === "auto") {
            this.heightMap.set(node.id, h);
        }
        const rect = nodeAABB(node, height);

        if (this.nodes.length) {
            const index = this.getIndex(rect);

            if (index !== -1) {
                this.nodes[index].insert(node, height);
                return;
            }
        }

        this.objects.push(node);

        if (this.objects.length > QuadTree.MAX_OBJECTS && this.level < QuadTree.MAX_LEVELS) {
            if (!this.nodes.length) {
                this.split();
            }

            let i = 0;
            while (i < this.objects.length) {
                const obj = this.objects[i];
                const objH = this.resolveH(obj);
                const objRect = nodeAABB(obj, objH);
                const index = this.getIndex(objRect);

                if (index !== -1) {
                    this.nodes[index].insert(obj, objH);
                    this.objects.splice(i, 1);
                } else {
                    i++;
                }
            }
        }
    }

    // Remove an object. Requires the node (with its coordinates) to find it efficiently.
    remove(node: SpatialNode): boolean {
        // 1. Check local objects
        const idx = this.objects.findIndex(n => n.id === node.id);
        if (idx !== -1) {
            this.objects.splice(idx, 1);
            return true;
        }

        // 2. If has child nodes, try to find in the specific quadrant
        if (this.nodes.length) {
            const h = this.resolveH(node);
            const index = this.getIndex(nodeAABB(node, h));
            if (index !== -1) {
                if (this.nodes[index].remove(node)) return true;
            }
            // Fallback: search all children (node may have been inserted with a different height)
            for (let i = 0; i < this.nodes.length; i++) {
                if (i !== index && this.nodes[i].remove(node)) return true;
            }
        }

        return false;
    }

    // Return all objects that could collide with the given rect
    retrieve(returnObjects: SpatialNode[], rect: Rect): SpatialNode[] {
        const index = this.getIndex(rect);

        // Add objects at this level that intersect the query rect
        for (const obj of this.objects) {
            const h = this.resolveH(obj);
            const aabb = nodeAABB(obj, h);
            if (
                aabb.x < rect.x + rect.w &&
                aabb.x + aabb.w > rect.x &&
                aabb.y < rect.y + rect.h &&
                aabb.y + aabb.h > rect.y
            ) {
                returnObjects.push(obj);
            }
        }

        // Recurse into children
        if (this.nodes.length) {
            if (index !== -1) {
                this.nodes[index].retrieve(returnObjects, rect);
            } else {
                for (const subnode of this.nodes) {
                    if (
                        subnode.bounds.x < rect.x + rect.w &&
                        subnode.bounds.x + subnode.bounds.w > rect.x &&
                        subnode.bounds.y < rect.y + rect.h &&
                        subnode.bounds.y + subnode.bounds.h > rect.y
                    ) {
                        subnode.retrieve(returnObjects, rect);
                    }
                }
            }
        }

        return returnObjects;
    }
}
