import { memo, useCallback, useSyncExternalStore } from "react";
import type { SpatialNode } from "../../engine/types";
import type { NodeCallbacks } from "../../nodes/registry";
import { nodeTypeHasPorts } from "../../nodes/registry";
import RegistryNodeWrapper from "./RegistryNodeWrapper";
import type { NodeItemCtx } from "./node-item-context";

/* ------------------------------------------------------------------ */
/*  NodeItem — one DOM-layer node, subscribed to its own engine state  */
/* ------------------------------------------------------------------ */

const NodeItem = memo(function NodeItem({
  id,
  staticNode,
  ephemeral,
  isEraserMarked,
  shouldBop,
  ctx,
}: {
  id: string;
  /** Render-list snapshot; used only when `ephemeral` (overlay nodes). */
  staticNode: SpatialNode;
  /** Overlay nodes (`overlayNodes` prop) live outside the engine. */
  ephemeral: boolean;
  isEraserMarked: boolean;
  shouldBop: boolean;
  ctx: NodeItemCtx;
}) {
  const { engine } = ctx;
  const subscribe = useCallback(
    (cb: () => void) => {
      engine.on("change", cb);
      return () => engine.off("change", cb);
    },
    [engine],
  );
  // `updateNode`/`updateMany` replace node objects immutably, so this
  // snapshot's identity changes exactly when THIS node changes — React
  // bails out for every other NodeItem on the same `change` event.
  const liveNode = useSyncExternalStore(subscribe, () => engine.getNode(id));
  const node = ephemeral ? (liveNode ?? staticNode) : liveNode;
  if (!node) return null;

  const bopSeed = node.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const bopDelay = -((bopSeed % 240) / 100);
  let el: React.ReactNode;

  if (ctx.registry) {
    const def = ctx.registry.get(node.type);
    if (def && def.component) {
      const Component = def.component;
      const isSelected = ctx.selection.has(node.id) && ctx.mode !== "edge";
      // AND `!engine.readOnly` so every Block already
      // gating inline edit affordances on `interactive` (Text /
      // Sticky / Image / YouTube / Content / etc.) hides them
      // for viewers automatically — no per-block change needed.
      const isInteractive = !engine.readOnly && (ctx.mode === "select" || ctx.mode === "text" || ctx.mode === "note" || ctx.mode === "sticky" || ctx.mode === "table");
      const componentEl = (
        <Component
          key={def.handlesOwnLayout ? node.id : undefined}
          node={node}
          data={node.data}
          isSelected={isSelected}
          multiSelected={
            ctx.selection.size > 1 &&
            isSelected &&
            !engine.selectionIsSingleGroup()
          }
          engine={engine}
          interactive={isInteractive}
          zoom={ctx.zoom}
          editing={ctx.editingNodeId === node.id}
          cropping={ctx.croppingImageId === node.id}
          editClickPos={ctx.editingNodeId === node.id ? ctx.editClickRef.current : null}
          callbacks={{
            onMeasuredHeight: ctx.handleMeasuredHeight,
            // drop resize-handle starts in readOnly. The
            // canvas selection-frame is hidden in that mode but a
            // node-internal resize handle (if any) shouldn't fire
            // either.
            onResizeHandleDown: engine.readOnly
              ? undefined
              : (ctx.handleResizeHandleDown as NodeCallbacks["onResizeHandleDown"]),
            onEditStart: (id: string) => {
              // never enter inline edit mode in readOnly
              // even if a misbehaving node fires onEditStart.
              if (engine.readOnly) return;
              const n = engine.getNode(id);
              if (!n) return;
              if (n.type === "text") ctx.setEditingTextId(id);
              else if (n.type === "sticky") ctx.setEditingStickyId(id);
              else if (n.type === "frame") ctx.setEditingFrameLabelId(id);
              else if (n.type === "shape") ctx.setEditingShapeLabelId(id);
              else if (n.type === "image") ctx.setCroppingImageId(id);
              else if (n.type === "youtube") ctx.setEditingYouTubeId(id);
              else if (n.type === "table") ctx.setEditingTableId(id);
            },
            onEditEnd: () => {
              if (node.type === "text") {
                ctx.setEditingTextId((cur) => {
                  if (cur !== node.id) return cur;
                  // A stop that reaches here is a REAL commit — TextNodeBlock
                  // self-heals passive focus steals without calling onStopEdit.
                  // End the session and release the creation lock so the
                  // focus watchdog stands down immediately.
                  if (ctx.textEditLockRef.current?.id === cur) {
                    ctx.textEditLockRef.current = null;
                  }
                  return null;
                });
              } else if (node.type === "sticky") {
                ctx.setEditingStickyId((cur) => (cur === node.id ? null : cur));
              } else if (node.type === "frame") {
                ctx.setEditingFrameLabelId((cur) => (cur === node.id ? null : cur));
              } else if (node.type === "shape") {
                ctx.setEditingShapeLabelId((cur) => (cur === node.id ? null : cur));
              } else if (node.type === "image") {
                ctx.setCroppingImageId((cur) => (cur === node.id ? null : cur));
              } else if (node.type === "youtube") {
                ctx.setEditingYouTubeId((cur) => (cur === node.id ? null : cur));
              } else if (node.type === "table") {
                ctx.setEditingTableId((cur) => (cur === node.id ? null : cur));
              }
            },
          }}
          portValues={ctx.dataFlow && nodeTypeHasPorts(def) && ctx.dataFlowVersion >= 0 ? ctx.dataFlow.getAllPortValues(node.id) : undefined}
          updateData={(patch: Record<string, unknown>) => {
            const k = ctx.getCoalesceKey();
            engine.updateNodeWithHistoryCoalesced(
              node.id,
              {
                data: { ...(node.data as Record<string, unknown>), ...patch },
              },
              `${k}:ctx.registry:${node.id}`,
            );
          }}
        />
      );
      // Built-in types handle their own layout; custom nodes get a positioning wrapper
      if (def.handlesOwnLayout) {
        el = componentEl;
      } else {
        el = (
          <RegistryNodeWrapper
            key={node.id}
            node={node}
            isInteractive={isInteractive}
            isSelected={isSelected && ctx.selection.size === 1 && engine.gestureKind !== "move"}
            selectionInNode={!!def.selectionInNode}
            selectionRadius={def.selectionRadius}
            zoom={ctx.zoom}
            measuredH={ctx.measuredHeights[node.id]}
            onMeasuredHeight={ctx.handleMeasuredHeight}
            observeElement={ctx.observeElement}
            unobserveElement={ctx.unobserveElement}
            isContainer={def.isContainer}
          >
            {componentEl}
          </RegistryNodeWrapper>
        );
      }
    }
  }

  if (isEraserMarked || shouldBop) {
    return (
      <div
        key={node.id}
        style={{
          opacity: isEraserMarked ? 0.25 : undefined,
          filter: isEraserMarked ? "saturate(0)" : undefined,
          animation: shouldBop ? "sb-node-bop 3.4s ease-in-out infinite" : undefined,
          animationDelay: shouldBop ? `${bopDelay}s` : undefined,
          transformOrigin: "center center",
          willChange: shouldBop ? "transform" : undefined,
        }}
      >
        {el}
      </div>
    );
  }
  return el;
});

export default NodeItem;
