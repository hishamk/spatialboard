import * as Y from "yjs";
import type { SpatialNode } from "spatialboard";
import { recordToYMap, toRecord } from "./collab/binding";

/**
 * The starter board both peers open with.
 *
 * Every record has a fixed, readable id so the traffic panel can name what an
 * update touched ("s-a{x,y}", "e-1") and so every peer, in every tab, starts
 * from byte-identical content. Records are plain JSON: no `undefined` values.
 *
 * The things a visitor is asked to drag (the two stickies and the rectangle)
 * sit in the left column. The top right holds only the note, because that is
 * where the board's inspector opens on a selection; the bottom right stays
 * empty for the minimap.
 */
export const SEED_NODES: readonly SpatialNode[] = [
  {
    id: "frame",
    type: "frame",
    x: 40,
    y: 530,
    w: 300,
    h: 230,
    z: 1,
    data: { label: "Concurrent edits" },
  },
  {
    id: "title",
    type: "text",
    x: 60,
    y: 40,
    w: 480,
    h: 56,
    z: 2,
    data: {
      text: "One board, two peers",
      fontSize: 28,
      fontFamily: "sans-serif",
      color: "#1e1e2e",
      align: "left",
      opacity: 1,
    },
  },
  {
    id: "s-a",
    type: "sticky",
    x: 60,
    y: 120,
    w: 240,
    h: 140,
    z: 3,
    data: {
      text: "Drag me on either board. The other peer follows once the message arrives.",
      color: "#FEF3C7",
      fontSize: 14,
      opacity: 1,
    },
  },
  {
    id: "s-b",
    type: "sticky",
    x: 60,
    y: 330,
    w: 240,
    h: 140,
    z: 4,
    data: {
      text: "Take a peer offline, change both boards, then bring it back online.",
      color: "#BBF7D0",
      fontSize: 14,
      opacity: 1,
    },
  },
  {
    id: "e-1",
    type: "edge",
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    z: 5,
    data: {
      fromId: "s-a",
      toId: "s-b",
      style: "solid",
      color: "#1e1e2e",
      strokeWidth: 2,
      arrowHead: "arrow",
      arrowTail: "none",
      edgeType: "bezier",
    },
  },
  {
    id: "rect",
    type: "shape",
    x: 70,
    y: 590,
    w: 240,
    h: 140,
    z: 6,
    data: {
      shape: "rect",
      stroke: "#1e1e2e",
      strokeWidth: 2,
      fill: "#BFDBFE",
      fillStyle: "solid",
      roughness: 1,
      opacity: 1,
      label: "Move me on one side, recolor me on the other",
      labelFontSize: 14,
    },
  },
  {
    id: "note",
    type: "text",
    x: 390,
    y: 128,
    w: 250,
    h: 130,
    z: 7,
    data: {
      text:
        "Edits to different fields of one node both survive the merge. Edits to the same field settle on one winner, the same on both peers.",
      fontSize: 15,
      fontFamily: "sans-serif",
      color: "#1e1e2e",
      align: "left",
      opacity: 1,
    },
  },
];

let seedUpdate: Uint8Array | null = null;

/**
 * The seed as one Yjs update, identical in every tab.
 *
 * It is written by a scratch doc whose client id is fixed before any write,
 * so the update's structs are the same bytes everywhere. A peer that already
 * holds the seed treats a second copy as a no-op: a reloaded tab neither
 * duplicates seeded nodes nor reverts edits other tabs made to them.
 * (Seeding each peer from its own random client id would instead create
 * competing maps under the same keys.)
 */
export function buildSeedUpdate(): Uint8Array {
  if (seedUpdate) return seedUpdate;
  const scratch = new Y.Doc();
  scratch.clientID = 1;
  const nodes = scratch.getMap<Y.Map<unknown>>("nodes");
  scratch.transact(() => {
    for (const node of SEED_NODES) nodes.set(node.id, recordToYMap(toRecord(node)));
  });
  seedUpdate = Y.encodeStateAsUpdate(scratch);
  scratch.destroy();
  return seedUpdate;
}
