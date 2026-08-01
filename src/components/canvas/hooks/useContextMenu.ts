import { useState, useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { SpatialEngine } from "../../../engine/SpatialEngine";
import type { SpatialNode } from "../../../engine/types";
import type { ContextMenuSection } from "../../overlays/ContextMenu";
import { SB_ALIGN_MENU_ICONS } from "../../overlays/context-menu-align-icons";
import { getClosestEdgeHit } from "../../../engine/edge-geometry";
import { pasteFromSystemClipboard, copyToSystemClipboard } from "../canvas-clipboard";
import { exportBoard } from "../../../export/canvas-export";
import type { SpatialBoardLocalization } from "../../contexts/LocalizationContext";

/**
 * Right-click / long-press context-menu builder + state. `buildContextMenuSections`
 * is a pure(ish) section builder that mutates selection then returns the menu model;
 * it and `setContextMenu` are exposed so the still-in-component pointer code can call
 * them (a later stage moves that code). Pure extraction from SpatialCanvas.
 */
export function useContextMenu({
  engine,
  labels,
  measuredHeights,
  viewportZoom,
  altClickRef,
  setGridActive,
  setSmartGuidesActive,
  setPersonalLibPrompt,
}: {
  engine: SpatialEngine;
  labels: SpatialBoardLocalization;
  measuredHeights: Record<string, number>;
  viewportZoom: number;
  altClickRef: React.MutableRefObject<{ x: number; y: number; index: number }>;
  setGridActive: Dispatch<SetStateAction<boolean>>;
  setSmartGuidesActive: Dispatch<SetStateAction<boolean>>;
  setPersonalLibPrompt: Dispatch<
    SetStateAction<{ nodes: SpatialNode[]; groupParent: Map<string, string> } | null>
  >;
}) {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    sections: ContextMenuSection[];
  } | null>(null);

  const buildContextMenuSections = useCallback(
    (screenX: number, screenY: number, altKey: boolean): ContextMenuSection[] => {
      const { x: cx, y: cy } = engine.screenToCanvas(screenX, screenY);

      // Alt+right-click: cycle through overlapping nodes (same as Alt+click)
      if (altKey) {
        const allHits = engine.hitTestAll(cx, cy, measuredHeights);
        if (allHits.length > 0) {
          const prev = altClickRef.current;
          const dist = Math.abs(cx - prev.x) + Math.abs(cy - prev.y);
          let nextIndex = 0;
          if (dist < 5) {
            nextIndex = (prev.index + 1) % allHits.length;
          }
          altClickRef.current = { x: cx, y: cy, index: nextIndex };
          engine.select(allHits[nextIndex].id);
        } else {
          engine.deselectAll();
        }
      } else {
        // Check if right-click is within any already-selected node's bounds
        let clickedSelected = false;
        // Edges have zero stored bounds, so the AABB loop below can never
        // match a selected edge — walk the edge paths (engine.hitTest skips
        // edges by design) and check whether the press landed on one that is
        // already selected.
        const edgePick = getClosestEdgeHit(
          engine.nodes,
          cx,
          cy,
          engine.viewport.zoom,
          measuredHeights,
        );
        if (edgePick && engine.selection.has(edgePick.node.id)) clickedSelected = true;
        for (const id of engine.selection) {
          const n = engine.getNode(id);
          if (!n) continue;
          const h = n.h === "auto" ? 100 : (n.h as number);
          if (cx >= n.x && cx <= n.x + n.w && cy >= n.y && cy <= n.y + h) {
            clickedSelected = true;
            break;
          }
        }

        // Also check if inside the multi-selection bounding box
        if (!clickedSelected && engine.selection.size >= 2) {
          let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
          for (const id of engine.selection) {
            const n = engine.getNode(id);
            if (!n || n.type === "edge") continue;
            const h = n.h === "auto" ? 100 : (n.h as number);
            minX = Math.min(minX, n.x);
            minY = Math.min(minY, n.y);
            maxX = Math.max(maxX, n.x + n.w);
            maxY = Math.max(maxY, n.y + h);
          }
          if (
            minX !== Infinity &&
            cx >= minX && cx <= maxX &&
            cy >= minY && cy <= maxY
          ) {
            clickedSelected = true;
          }
        }

        // Only change selection if right-click is outside selected nodes AND outside selection box
        if (!clickedSelected) {
          const hit = engine.hitTest(cx, cy, measuredHeights);
          if (hit) {
            engine.select(hit.id);
          } else if (edgePick) {
            // Right-clicking an unselected edge targets the menu at it.
            engine.select(edgePick.node.id);
          } else {
            engine.deselectAll();
          }
        }
      }

      const selIds = Array.from(engine.selection);
      const hasSel = selIds.length > 0;

      const sections: ContextMenuSection[] = [];

      // Clipboard section
      sections.push({
        items: [
          {
            label: labels.actionCut,
            shortcut: "Mod+X",
            disabled: !hasSel,
            action: () => {
              engine.cutSelected();
              copyToSystemClipboard(engine);
            },
          },
          {
            label: labels.actionCopy,
            shortcut: "Mod+C",
            disabled: !hasSel,
            action: () => {
              engine.copySelected();
              copyToSystemClipboard(engine);
            },
          },
          {
            label: labels.actionPaste,
            shortcut: "Mod+V",
            disabled: false,
            action: () => {
              pasteFromSystemClipboard(engine, cx, cy);
            },
          },
        ],
      });

      // Duplicate section
      sections.push({
        items: [
          {
            label: labels.actionDuplicate,
            shortcut: "Mod+D",
            disabled: !hasSel,
            action: () => engine.duplicateSelected(),
          },
        ],
      });

      const arrangeableCount = selIds.filter((id) => {
        const n = engine.getNode(id);
        return !!n && n.type !== "edge" && !n.locked;
      }).length;
      if (arrangeableCount >= 2) {
        sections.push({
          items: [
            {
              label: labels.actionArrangeSelection,
              action: () =>
                engine.arrangeSelectedNodes(measuredHeights, viewportZoom),
            },
          ],
        });
        sections.push({
          items: [
            {
              kind: "header",
              label: labels.alignMenuHorizontal,
              action: () => {},
            },
            {
              label: labels.alignLeft,
              icon: SB_ALIGN_MENU_ICONS.alignHLeft,
              action: () =>
                engine.alignSelectedNodes("left", measuredHeights),
            },
            {
              label: labels.alignCenterHorizontal,
              icon: SB_ALIGN_MENU_ICONS.alignHCenter,
              action: () =>
                engine.alignSelectedNodes("centerH", measuredHeights),
            },
            {
              label: labels.alignRight,
              icon: SB_ALIGN_MENU_ICONS.alignHRight,
              action: () =>
                engine.alignSelectedNodes("right", measuredHeights),
            },
            {
              label: labels.alignDistributeHorizontal,
              icon: SB_ALIGN_MENU_ICONS.distributeH,
              action: () =>
                engine.distributeSelectedNodes(
                  "horizontal",
                  measuredHeights,
                ),
            },
            {
              kind: "header",
              label: labels.alignMenuVertical,
              action: () => {},
            },
            {
              label: labels.alignTop,
              icon: SB_ALIGN_MENU_ICONS.alignVTop,
              action: () =>
                engine.alignSelectedNodes("top", measuredHeights),
            },
            {
              label: labels.alignCenterVertical,
              icon: SB_ALIGN_MENU_ICONS.alignVCenter,
              action: () =>
                engine.alignSelectedNodes("centerV", measuredHeights),
            },
            {
              label: labels.alignBottom,
              icon: SB_ALIGN_MENU_ICONS.alignVBottom,
              action: () =>
                engine.alignSelectedNodes("bottom", measuredHeights),
            },
            {
              label: labels.alignDistributeVertical,
              icon: SB_ALIGN_MENU_ICONS.distributeV,
              action: () =>
                engine.distributeSelectedNodes("vertical", measuredHeights),
            },
          ],
        });
      }

      // Add to Personal Library
      if (hasSel) {
        sections.push({
          items: [
            {
              label: labels.actionAddToPersonalLibrary,
              action: () => {
                const selectedNodes = selIds
                  .map((id) => engine.getNode(id))
                  .filter((n): n is SpatialNode => !!n)
                  .map((n) => structuredClone(n));
                const groupIds = new Set(
                  selectedNodes.map((n) => n.groupId).filter(Boolean) as string[],
                );
                const relevantGroupParent = new Map<string, string>();
                for (const [child, parent] of engine.groupParent) {
                  if (groupIds.has(child)) relevantGroupParent.set(child, parent);
                }
                setPersonalLibPrompt({
                  nodes: selectedNodes,
                  groupParent: relevantGroupParent,
                });
              },
            },
          ],
        });
      }

      // Grouping section
      if (selIds.length >= 2 || (hasSel && engine.selectionHasGroup())) {
        const items: ContextMenuSection["items"] = [];
        if (selIds.length >= 2) {
          items.push({
            label: labels.actionGroupSelection,
            shortcut: "Mod+G",
            action: () => engine.groupSelected(),
          });
        }
        if (engine.selectionHasGroup()) {
          items.push({
            label: labels.actionUngroupSelection,
            shortcut: "Mod+Shift+G",
            action: () => engine.ungroupSelected(),
          });
        }
        sections.push({ items });
      }

      // Flip section (draw/shape nodes)
      if (hasSel) {
        const allFlippable = selIds.every((id) => {
          const n = engine.getNode(id);
          return n && (n.type === "draw" || n.type === "shape");
        });
        if (allFlippable) {
          sections.push({
            items: [
              {
                label: labels.actionFlipHorizontal,
                shortcut: "Shift+H",
                action: () => engine.flipSelectedHorizontal(),
              },
              {
                label: labels.actionFlipVertical,
                shortcut: "Shift+V",
                action: () => engine.flipSelectedVertical(),
              },
            ],
          });
        }
      }

      // Z-ordering section
      if (hasSel) {
        sections.push({
          items: [
            {
              label: labels.actionBringForward,
              shortcut: "Mod+]",
              action: () => engine.bringForward(selIds),
            },
            {
              label: labels.actionSendBackward,
              shortcut: "Mod+[",
              action: () => engine.sendBackward(selIds),
            },
            {
              label: labels.actionBringToFront,
              shortcut: "Mod+Alt+]",
              action: () => engine.bringToFront(selIds),
            },
            {
              label: labels.actionSendToBack,
              shortcut: "Mod+Alt+[",
              action: () => engine.sendToBack(selIds),
            },
          ],
        });
      }

      // Lock / Unlock section
      if (hasSel) {
        const anyLocked = selIds.some((id) => engine.getNode(id)?.locked);
        const anyUnlocked = selIds.some((id) => !engine.getNode(id)?.locked);
        const items: ContextMenuSection["items"] = [];
        if (anyUnlocked) {
          items.push({
            label: labels.actionLock,
            action: () => {
              for (const id of selIds) engine.updateNode(id, { locked: true });
            },
          });
        }
        if (anyLocked) {
          items.push({
            label: labels.actionUnlock,
            action: () => {
              for (const id of selIds) engine.updateNode(id, { locked: undefined });
            },
          });
        }
        sections.push({ items });
      }

      // Delete section — hidden when nothing in the selection is user-deletable
      // (deletable === false marks protected nodes, e.g. workflow Start/End).
      const anyDeletable = selIds.some((id) => {
        const n = engine.getNode(id);
        return !!n && !n.locked && n.deletable !== false;
      });
      if (hasSel && anyDeletable) {
        sections.push({
          items: [
            {
              label: labels.actionDelete,
              shortcut: "Delete",
              danger: true,
              action: () => engine.deleteSelected(),
            },
          ],
        });
      }

      // Grid section
      const gridSizes = [10, 20, 40, 80];
      sections.push({
        items: [
          {
            label: labels.actionToggleGrid,
            checked: engine.snapToGrid,
            action: () => {
              engine.toggleSnapToGrid();
              setGridActive(engine.snapToGrid);
            },
          },
          {
            label: labels.actionSmartGuides,
            checked: engine.smartGuides,
            action: () => {
              engine.toggleSmartGuides();
              setSmartGuidesActive(engine.smartGuides);
            },
          },
          ...gridSizes.map((size) => ({
            label: `${size}px`,
            checked: engine.gridSize === size,
            action: () => {
              engine.setGridSize(size);
            },
          })),
        ],
      });

      // Frame export section — shown when the right-clicked point hits a frame
      // (border/label — frame interiors pass hits through to children) OR when
      // the current selection is exactly one frame.
      const frameHit = engine.hitTest(cx, cy, measuredHeights);
      let exportFrameId: string | null =
        frameHit && frameHit.type === "frame" ? frameHit.id : null;
      if (!exportFrameId && engine.selection.size === 1) {
        const sel = engine.getNode([...engine.selection][0]);
        if (sel && sel.type === "frame") exportFrameId = sel.id;
      }
      if (exportFrameId) {
        const frameId = exportFrameId;
        sections.push({
          items: [
            {
              label: labels.actionExportFrameAsPng,
              action: () => exportBoard(engine, { format: "png", frameId }),
            },
            {
              label: labels.actionExportFrameAsSvg,
              action: () => exportBoard(engine, { format: "svg", frameId }),
            },
          ],
        });
      }

      // Export section (always shown)
      sections.push({
        items: [
          {
            label: labels.actionExportAsPng,
            action: () => exportBoard(engine, { format: "png" }),
          },
          {
            label: labels.actionExportAsSvg,
            action: () => exportBoard(engine, { format: "svg" }),
          },
        ],
      });

      return sections;
    },
    [engine, labels, measuredHeights, viewportZoom]
  );

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (engine.presentationMode) return;
      const sections = buildContextMenuSections(e.clientX, e.clientY, e.altKey);
      setContextMenu({ x: e.clientX, y: e.clientY, sections });
    },
    [engine, buildContextMenuSections]
  );

  return { contextMenu, setContextMenu, buildContextMenuSections, handleContextMenu };
}
