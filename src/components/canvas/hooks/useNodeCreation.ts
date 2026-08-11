import { useCallback } from "react";
import type { Dispatch, RefObject, SetStateAction } from "react";
import { nanoid } from "nanoid";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { ShapeNode, TextNode } from "../../../engine/types";
import { isPointInShapeNode } from "../../../engine/spatial-index";
import { DEFAULT_FONT } from "../../../fonts";

/**
 * Node/text/block creation for SpatialCanvas — `createBlockNote`,
 * `createTextNodeAndEdit` (with its external-editable blur helper + retry-focus
 * logic), and the `handleDoubleClick` dispatcher. The editing setters/refs
 * these three write are the identities returned by `useInlineEditing`, passed
 * in so creation can drive inline edit mode.
 */
export function useNodeCreation({
  engine,
  measuredHeights,
  containerRef,
  setEditingTextId,
  setEditingStickyId,
  setEditingFrameLabelId,
  setEditingShapeLabelId,
  editClickRef,
  newlyCreatedTextRef,
  textEditLockRef,
  newlyCreatedBlockNoteIdRef,
}: {
  engine: SpatialEngine;
  measuredHeights: Record<string, number>;
  containerRef: RefObject<HTMLDivElement>;
  setEditingTextId: Dispatch<SetStateAction<string | null>>;
  setEditingStickyId: Dispatch<SetStateAction<string | null>>;
  setEditingFrameLabelId: Dispatch<SetStateAction<string | null>>;
  setEditingShapeLabelId: Dispatch<SetStateAction<string | null>>;
  editClickRef: React.MutableRefObject<{ clientX: number; clientY: number } | null>;
  newlyCreatedTextRef: React.MutableRefObject<string | null>;
  textEditLockRef: React.MutableRefObject<{ id: string; until: number } | null>;
  newlyCreatedBlockNoteIdRef: React.MutableRefObject<string | null>;
}) {
  const createBlockNote = useCallback(
    (x: number, y: number, w: number, h: number | "auto" = "auto") => {
      const id = nanoid(10);
      // Set ref BEFORE addNode so it's in place when BlockNoteBlock first renders
      newlyCreatedBlockNoteIdRef.current = id;
      engine.addNode({
        id,
        type: "blocknote",
        x,
        y,
        w,
        h,
        z: engine.nextZ(),
        data: { blocks: [], borderColor: "#1e1e2e" },
      });
    },
    [engine]
  );

  // Create a TextNode in the engine and immediately enter editing mode.
  // Used by both the text tool and double-click-on-canvas flows.
  const createTextNodeAndEdit = useCallback(
    (x: number, y: number, w: number) => {
      // If editors outside canvas currently own focus/state (TipTap/BlockNote),
      // aggressively blur all external editables so key events don't leak cross-panel.
      const blurExternalEditables = () => {
        const root = containerRef.current;
        const rootDoc = root?.ownerDocument ?? document;
        const editables = Array.from(
          rootDoc.querySelectorAll<HTMLElement>('input, textarea, [contenteditable="true"]')
        );
        for (const el of editables) {
          if (root?.contains(el)) continue;
          try {
            el.blur();
          } catch {
            /* ignore */
          }
        }
      };
      blurExternalEditables();

      const id = nanoid(10);
      engine.addNode({
        id,
        type: "text",
        x,
        y,
        w,
        h: "auto",
        z: engine.nextZ(),
        data: {
          text: "",
          fontSize: engine.activeTool.fontSize ?? 20,
          fontFamily: engine.activeTool.fontFamily ?? DEFAULT_FONT,
          color: engine.activeTool.color,
          align: engine.activeTool.textAlign ?? "left",
          opacity: engine.activeTool.opacity,
        },
      } as TextNode);
      engine.select(id);
      newlyCreatedTextRef.current = id;
      textEditLockRef.current = { id, until: performance.now() + 1500 };
      setEditingTextId(id);

      // Force-focus the freshly mounted contentEditable, then WATCH it for the
      // lock window: one-shot side effects of a first selection (the inspector's
      // initial mount, font loads) can steal focus right after it lands —
      // re-assert until the lock expires so the brand-new edit session survives.
      // CRUCIAL: focus alone is not enough for a contentEditable — typing
      // inserts at the document SELECTION, and a focus steal drags the caret
      // out with it. Re-place the caret whenever it has left the editable.
      const focusEditable = (attempt = 0) => {
        const root = containerRef.current;
        if (!root) return;
        const lock = textEditLockRef.current;
        const lockActive = lock?.id === id && performance.now() < lock.until;
        const editable = root.querySelector(
          `[data-node-id="${id}"] [contenteditable="true"]`
        ) as HTMLElement | null;
        if (editable) {
          const doc = root.ownerDocument;
          const ae = doc.activeElement;
          if (ae !== editable) {
            // Only reclaim focus that fell to NOWHERE (body) — that's the
            // signature of a passive steal. Focus on any real element means
            // the user moved on deliberately: stop watching, let editing end.
            if (ae && ae !== doc.body && ae !== root) {
              if (lock?.id === id) textEditLockRef.current = null;
              return;
            }
            // Re-run external blur right before focus in case another panel reclaimed focus.
            blurExternalEditables();
            editable.focus();
          }
          const sel = doc.getSelection();
          if (sel && (sel.rangeCount === 0 || !editable.contains(sel.anchorNode))) {
            const range = doc.createRange();
            range.selectNodeContents(editable);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
          }
          if (lockActive) {
            requestAnimationFrame(() => focusEditable(attempt + 1));
          } else if (lock?.id === id) {
            textEditLockRef.current = null;
          }
          return;
        }
        if (attempt < 12 || lockActive) {
          requestAnimationFrame(() => focusEditable(attempt + 1));
        }
      };
      requestAnimationFrame(() => focusEditable(0));
    },
    [engine]
  );

  // Double-click on draw/shape: collapse to single selection; text: enter edit mode
  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if (engine.presentationMode) return;
      if (engine.mode !== "select") return;
      const { x: cx, y: cy } = engine.screenToCanvas(e.clientX, e.clientY);
      const allHits = engine.hitTestAll(cx, cy, measuredHeights);
      const hit = allHits.find((n) => !engine.isContainerType(n.type)) ?? allHits[0] ?? null;

      // Double-click a grouped node → drill down one level at a time
      if (hit?.groupId) {
        // Build chain from innermost to outermost group
        const chain: string[] = [];
        let gid: string | undefined = hit.groupId;
        while (gid) {
          chain.push(gid);
          gid = engine.groupParent.get(gid);
        }
        // chain = [innermost, ..., outermost]

        if (!engine.activeGroupId) {
          // Not in any group — enter the outermost
          engine.enterGroup(chain[chain.length - 1]);
          engine.select(hit.id);
          return;
        }

        const activeIdx = chain.indexOf(engine.activeGroupId);
        if (activeIdx > 0) {
          // Currently in an ancestor group — enter one level deeper
          engine.enterGroup(chain[activeIdx - 1]);
          engine.select(hit.id);
          return;
        }
        // activeIdx === 0 means we're in the node's direct group → fall through to edit mode
        // activeIdx === -1 means node is not in active group hierarchy — shouldn't normally happen
      }

      // Inside the group (or ungrouped node): proceed with edit-mode logic
      if (hit && hit.type === "text") {
        engine.select(hit.id);
        editClickRef.current = { clientX: e.clientX, clientY: e.clientY };
        setEditingTextId(hit.id);
        return;
      }
      if (hit && hit.type === "sticky") {
        engine.select(hit.id);
        setEditingStickyId(hit.id);
        return;
      }
      if (hit && hit.type === "frame") {
        engine.select(hit.id);
        setEditingFrameLabelId(hit.id);
        return;
      }
      if (hit && hit.type === "shape") {
        const shapeData = (hit as ShapeNode).data;
        const isLinear = shapeData.shape === "line" || shapeData.shape === "arrow";
        engine.select(hit.id);
        if (!isLinear) setEditingShapeLabelId(hit.id);
        return;
      }
      if (hit && hit.type === "draw") {
        engine.select(hit.id);
        return;
      }

      // Double-click inside an unfilled shape → enter label editing
      // (normal hit test only hits the stroke; here we check the interior)
      if (!hit || hit.type === "draw") {
        const allNodes = engine.getAllNodes();
        const interiorShape = allNodes
          .filter((n): n is ShapeNode => n.type === "shape")
          .sort((a, b) => b.z - a.z)
          .find((n) => {
            const isLinear = n.data.shape === "line" || n.data.shape === "arrow";
            return !isLinear && isPointInShapeNode(n, cx, cy, engine.viewport.zoom, true);
          });
        if (interiorShape) {
          engine.select(interiorShape.id);
          setEditingShapeLabelId(interiorShape.id);
          return;
        }
      }

      // Double-click empty canvas in select mode → create text node and enter edit mode
      if (!hit) {
        engine.deselectAll();
        createTextNodeAndEdit(cx, cy, 300);
      }
    },
    [engine, measuredHeights, createTextNodeAndEdit]
  );

  return { createBlockNote, createTextNodeAndEdit, handleDoubleClick };
}
