# Example — Collaboration (Yjs)

Two peers on one page, kept in sync with [Yjs](https://yjs.dev). Each peer is a
full host: its own `SpatialEngine`, its own `Y.Doc` and its own y-protocols
`Awareness`. The two are joined by a simulated network with a one-way latency
slider and a per-peer online switch; a third switch extends the same network to
other open tabs over `BroadcastChannel`. The traffic panel lists every message
each peer sends and receives, its size, and what it did to the other board.

[Live](https://spatialboard.hishamkhalifa.com/collab/).

Unlike the other examples, **nothing is saved**: each tab's documents live in
memory. A reload starts from the seed (and, with tab sync on, merges back
whatever the other open tabs hold). Reset works the same way: it resets this
tab only, and with tab sync on the other tabs merge their state back in.

## Run it

```bash
# from the spatialboard repo root
npm install
npm run dev:collab
```

## The host pattern in five steps

The binding is [`src/collab/binding.ts`](src/collab/binding.ts), framework-free
and the file to copy.

1. **Collab mode.** `engine.setCollabMode(true)` suspends the engine's local
   snapshot history: undoing a whole-board snapshot would revert other peers'
   edits.
2. **Out: `change` drives a diffed sync.** Every local edit ends in a `change`
   event. One microtask later a single `doc.transact(…, localOrigin)` compares
   the board with the document and writes only what differs. One user action
   becomes one transaction, one wire message and one undo step. You do not
   need the granular `node:*` events to decide what to write: many edits
   (drags, paste, z-order, grouping, cascaded edge deletes) never emit them,
   and the diff catches everything.
3. **Gestures.** During a drag, resize or rotate, `change` fires once per
   frame. While `engine.gestureActive`, the binding writes just
   `engine.gestureIds` and their edges, so the other peer sees the drag live.
   `gesture:end` runs the full diffed sync.
4. **In: guarded remote ops, and never trust a peer's record.**
   `nodes.observeDeep` applies every transaction the binding did not write (a
   peer's update, an undo or redo, the seed) with `addRemoteNode` /
   `applyRemoteNodeUpdate` / `deleteRemoteNode`, then calls
   `engine.notifyChange()` once. A flag makes the binding's own `change` handler
   ignore that echo. Before a record reaches the engine it is validated
   ([`src/collab/validate.ts`](src/collab/validate.ts)): the record's shape
   (geometry within bounds, a `data` object whose fields, when present, have
   the types that node type's renderer reads) and the values this example
   has seen crash or freeze a renderer. One of those is size: a sketchy
   (hachure or cross-hatch) filled record wider or taller than 100,000 units
   takes seconds to draw, so it is refused. A record that fails, or has a type
   the example does not know, is refused: it stays in the document, is
   counted under `refused` in the pane header, and is never deleted by this
   peer's write-back. The engine checks only edge endpoints, and one bad
   value (a sticky whose text is an object) can take the whole page down.
   The validator covers this example's toolbar types plus the seed's and is
   not a guarantee against every hostile value: **a host exposed to untrusted
   peers must validate the data of every node type it accepts, and guard its
   rendering.**
5. **Undo.** A `Y.UndoManager` tracks only `localOrigin`, and its steps follow
   user actions (`stopCapturing()` marks the boundaries). A gesture, a text
   edit session (or an inspector field being typed into) and an agent action
   each hold one step open across every write they make; whether a write
   belongs to one is decided when its batch starts, so the last move of a drag,
   flushed as the gesture ends, still lands in the drag's step. Any other
   single edit is a step of its own. After a text session or an agent action
   ends, the next edit starts a new step. So a drag is one step, a typed
   sentence is one step and a create is one step. `engine.setCollabUndoHandler(...)` points the board's
   own undo/redo buttons and Cmd/Ctrl+Z at it, and
   `engine.notifyHistoryChange()` refreshes the buttons after each undo or redo
   and whenever the stacks change. Undo reverts this peer's own change on every
   board: it puts back the fields this peer changed, even if a peer has written
   the same field since, and leaves fields only the other peer touched alone.
   Undoing a delete restores the node as it was when it was deleted. Redo is
   the mirror image: after an undo that overwrote a peer's later value, redo
   brings back the peer's value, not this peer's edit.

## Engine events → Yjs

The document is `doc.getMap("nodes")`: one nested `Y.Map` per node, keyed by id.
Its keys are the node's top-level fields, `data` is one JSON value, and
`undefined` is never stored (the key is deleted instead). Edits to different
fields of one node from two peers both survive; edits to the same field settle
on one winner, the same on every peer. Because `data` is a single value, two
concurrent edits inside it (one peer's text, the other's colour) count as the
same field: one of them wins whole. Splitting `data` into its own nested map,
or the text into a `Y.Text`, is the next step if you need both to survive.

| Engine event | Written at the next flush |
|---|---|
| `change` while idle (every create, delete, move, edit, paste, z-order, group…) | diffed sync of the whole board: write each node whose object changed, field by field; delete records the board no longer has, except refused and waiting ids |
| `change` during a gesture | `gestureIds` and their connected edges, diffed |
| `gesture:start` | undo boundary |
| `gesture:end` | diffed sync of the whole board, which closes the drag's undo step |
| `node:create`, `node:delete`, `node:move`, … | nothing extra; the binding records their names only to label messages in the traffic panel |

The diffed sync is cheap: the engine replaces a node object whenever it
changes it, so an unchanged node costs one identity check.

An edge whose endpoint is not on this board is held, not deleted: it is
hidden, counted under `waiting` in the pane header, and shows again the
moment the endpoint arrives (a late message, an undo or redo of the node's
delete). The binding never deletes a record it did not delete locally,
because from here "not on this board" cannot tell deleted from not received
yet. Orphaned edges (one peer deleted the node while the other, offline,
connected an edge to it) therefore stay in the document, hidden on every
board.

## Presence

Each peer's awareness state is `{ user, cursor, gesture, selection }`; the
cursor is in canvas coordinates, so it lands on the same spot of the other
board whatever its pan and zoom. Local changes are sent at most every 50 ms;
a gesture ending and a selection change go out at once. Every awareness
message carries the whole state, which is why a long live stroke shows up in
the traffic panel as a growing byte count.

| Engine event | Rendered on the other board by |
|---|---|
| `edge:progress` | `RemoteEdgeCreationPreview` (library) |
| `rectDrag:progress` | `RemoteRectDragPreview` (library, not wrapped in `<svg>`) |
| `eraser:progress` | `RemoteEraserPreview` (library) |
| `selection` | `RemoteSelectionPreview` (library) |
| `draw:progress` | `LiveStroke` ([`src/ui/livePreviews.tsx`](src/ui/livePreviews.tsx)) |
| `shape:progress` | `LiveShape` (same file; rough paths seeded like the committed shape) |
| `laser:progress` | `LaserTrail` (same file) |

`<SpatialBoard>` has no overlay slot, so
[`RemotePresenceLayer`](src/ui/RemotePresenceLayer.tsx) is an absolutely
positioned sibling whose inner wrapper follows `engine.viewport` and
`engine.containerOffset`. `draw:progress` and `shape:progress` carry `seed`, the
id the committed node will get: a finished stroke's preview stays up until that
node exists on the board (or a second passes), so it never flashes twice.

## Pitfalls the code handles

- **Diff before you write.** `Y.Map.set` always creates a new item, even for an
  equal value. Writing every field on a full sync floods the wire, and an undo
  would then revert fields a peer changed in the meantime.
- **`applyRemoteNodeUpdate` merges.** It merges shallowly, and merges `data` into
  the old data, so a key the peer removed would linger. Send removed keys as
  `undefined`.
- **Respect refused and waiting ids.** `addRemoteNode` refuses an edge without
  endpoints and remembers its id, the binding refuses records that fail
  validation, and edges wait for missing endpoints. A full sync that deletes
  records the board lacks must skip all three, or one peer's bad or early
  record gets deleted for everyone. (Experiments → Inject a malformed edge
  shows it.)
- **Remote ops don't maintain frame membership.** `addRemoteNode` and
  `applyRemoteNodeUpdate` leave the engine's frame contents alone, so a frame
  would move without what is inside it. Call `updateFrameMembership(ids)`
  after applying (`rebuildFrameChildren()` when a frame changed or anything
  was deleted). Do the same after your own writes: a local frame drag only
  re-parents the nodes it moved, so without it the peer that moved or
  deleted a frame and the peers that received it disagree about what is
  inside.
- **Skip your own origin, nothing else.** Undo/redo and the seed are not local
  engine writes; they must flow into the engine through the inbound path, or
  undo changes the document but not the board.
- **A deterministic seed.** The starter board is one Yjs update written by a
  scratch doc with a fixed client id, so every tab applies identical bytes and
  a second copy is a no-op. Seeding each peer with its own writes would create
  competing maps under the same keys.
- **Concurrent drags of one node** show last-writer-wins jitter until one peer
  lets go; inbound changes are always applied, even mid-gesture, because
  deferring them would let the gesture's final sync write stale fields back.

## Known limits

- **Frames of equal area overlapping the same node.** The engine assigns a
  node to its smallest containing frame and breaks a tie by the order nodes
  were added, which can differ between peers. Each peer may then carry the
  node with a different frame.
- **Changing a frame's type from code.** A host that turns a frame into
  another node type with `updateNode` leaves stale frame contents on its own
  board until the next frame change; peers that receive it are fine.
- **An edit and an undo in the same tick, from code.** A programmatic edit
  to an edge, followed by an undo in the same tick that moves one of its
  endpoints, can be recorded as already sent. Pointer and keyboard input
  always land in separate tasks, so this needs code to reach.

## The network

[`src/net/network.ts`](src/net/network.ts) is a broadcast bus with a delay: a
message goes to every other online peer, or to one addressed peer. Messages are
framed exactly as y-websocket frames them (y-protocols `sync` and `awareness`),
so the byte counts are real wire sizes. An offline peer neither sends nor
receives and nothing is queued for it. Reconnecting broadcasts a sync step 1
(its state vector); each peer answers with a step 2 holding what the newcomer
lacks, plus its own step 1, and the newcomer answers in kind. Nothing is
replayed; the CRDT works out the difference.

## Files

| File | |
|---|---|
| `src/collab/binding.ts` | engine ⇄ `Y.Doc` |
| `src/collab/validate.ts` | checks for records that arrive from peers |
| `src/collab/undo.ts` | `Y.UndoManager` behind the board's undo |
| `src/collab/presence.ts` | engine gesture events and the pointer → awareness |
| `src/collab/protocol.ts` | y-protocols framing |
| `src/net/network.ts`, `src/net/tabBridge.ts` | the simulated network and the tab bridge |
| `src/peer.ts` | one peer: engine, doc, awareness, endpoint |
| `src/seed.ts` | the deterministic seed update |
| `src/traffic/store.ts`, `src/ui/TrafficPanel.tsx` | the traffic log and panel |
| `src/ui/RemotePresenceLayer.tsx`, `src/ui/livePreviews.tsx` | remote cursors and previews |
