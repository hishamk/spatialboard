import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ImageNode } from "../engine/types";
import type { SpatialEngine } from "../engine/SpatialEngine";
import type { HandlePosition } from "./SVGLayer";
import { getRotatedCursor } from "../interactions/resize-cursors";

const MIN_CROP = 0.05; // Minimum crop fraction (5%)

const CROP_HANDLES: {
  pos: string;
  edges: string[];
  cx: number;
  cy: number;
  cursor: string;
}[] = [
  { pos: "nw", edges: ["left", "top"], cx: 0, cy: 0, cursor: "nwse-resize" },
  { pos: "n", edges: ["top"], cx: 0.5, cy: 0, cursor: "ns-resize" },
  { pos: "ne", edges: ["right", "top"], cx: 1, cy: 0, cursor: "nesw-resize" },
  { pos: "e", edges: ["right"], cx: 1, cy: 0.5, cursor: "ew-resize" },
  { pos: "se", edges: ["right", "bottom"], cx: 1, cy: 1, cursor: "nwse-resize" },
  { pos: "s", edges: ["bottom"], cx: 0.5, cy: 1, cursor: "ns-resize" },
  { pos: "sw", edges: ["left", "bottom"], cx: 0, cy: 1, cursor: "nesw-resize" },
  { pos: "w", edges: ["left"], cx: 0, cy: 0.5, cursor: "ew-resize" },
];

interface ImageBlockProps {
  node: ImageNode;
  isSelected: boolean;
  engine: SpatialEngine;
  interactive: boolean;
  zoom: number;
  onResizeHandleDown?: (
    nodeId: string,
    handle: HandlePosition,
    e: React.PointerEvent<HTMLElement>
  ) => void;
  cropping?: boolean;
  onCropStart?: () => void;
  onCropEnd?: () => void;
}

function ImageBlock({
  node,
  isSelected,
  engine,
  interactive,
  zoom,
  onResizeHandleDown,
  cropping,
  onCropStart,
  onCropEnd,
}: ImageBlockProps) {
  const h = node.h as number;
  const crop = node.data.crop;
  const croppingRef = useRef(false);
  croppingRef.current = !!cropping;

  // ── Natural image dimensions (for crop overlay positioning) ──
  const imgRef = useRef<HTMLImageElement>(null);
  const [natSize, setNatSize] = useState<{ w: number; h: number } | null>(null);
  const handleImgLoad = useCallback(() => {
    if (imgRef.current && imgRef.current.naturalWidth > 0)
      setNatSize({ w: imgRef.current.naturalWidth, h: imgRef.current.naturalHeight });
  }, []);
  // Also check on mount / src change (handles cached images where onLoad may not re-fire)
  useEffect(() => {
    if (imgRef.current && imgRef.current.naturalWidth > 0) {
      setNatSize({ w: imgRef.current.naturalWidth, h: imgRef.current.naturalHeight });
    }
  }, [node.data.src]);

  // ── Crop mode local state ──
  const [cropRect, setCropRect] = useState({ x: 0, y: 0, w: 1, h: 1 });
  useEffect(() => {
    if (cropping) {
      setCropRect(crop ?? { x: 0, y: 0, w: 1, h: 1 });
      // Ensure natSize is populated when crop mode starts
      if (!natSize && imgRef.current && imgRef.current.naturalWidth > 0) {
        setNatSize({ w: imgRef.current.naturalWidth, h: imgRef.current.naturalHeight });
      }
    }
  }, [cropping]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Contain-fit rectangle (image rendered area within the container) ──
  const fitRect = useMemo(() => {
    if (!natSize) return null;
    const imgAsp = natSize.w / natSize.h;
    const contAsp = node.w / h;
    let rw: number, rh: number;
    if (imgAsp > contAsp) {
      rw = node.w;
      rh = node.w / imgAsp;
    } else {
      rh = h;
      rw = h * imgAsp;
    }
    return { x: (node.w - rw) / 2, y: (h - rh) / 2, w: rw, h: rh };
  }, [natSize, node.w, h]);



  // ── Apply / cancel crop ──
  const applyCrop = useCallback(() => {
    const isFullImage =
      cropRect.x < 0.001 &&
      cropRect.y < 0.001 &&
      cropRect.w > 0.999 &&
      cropRect.h > 0.999;
    engine.updateNodeWithHistory(node.id, {
      data: {
        ...node.data,
        crop: isFullImage
          ? undefined
          : { x: cropRect.x, y: cropRect.y, w: cropRect.w, h: cropRect.h },
      },
    } as Partial<ImageNode>);
    onCropEnd?.();
  }, [engine, node, cropRect, onCropEnd]);

  const cancelCrop = useCallback(() => {
    onCropEnd?.();
  }, [onCropEnd]);

  // ── Keyboard: Enter = apply, Escape = cancel ──
  useEffect(() => {
    if (!cropping) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        applyCrop();
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key === "Escape") {
        cancelCrop();
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [cropping, applyCrop, cancelCrop]);

  // ── Crop handle drag ──
  const handleCropHandleDown = useCallback(
    (edges: string[], e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!fitRect) return;
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      const sx = e.clientX,
        sy = e.clientY;
      const start = { ...cropRect };

      const onMove = (me: PointerEvent) => {
        const dxF = (me.clientX - sx) / zoom / fitRect.w;
        const dyF = (me.clientY - sy) / zoom / fitRect.h;
        const nc = { ...start };
        const right = start.x + start.w;
        const bottom = start.y + start.h;
        if (edges.includes("left")) {
          const nx = Math.max(0, Math.min(right - MIN_CROP, start.x + dxF));
          nc.x = nx;
          nc.w = right - nx;
        }
        if (edges.includes("right")) {
          nc.w = Math.max(
            MIN_CROP,
            Math.min(1 - start.x, start.w + dxF)
          );
        }
        if (edges.includes("top")) {
          const ny = Math.max(0, Math.min(bottom - MIN_CROP, start.y + dyF));
          nc.y = ny;
          nc.h = bottom - ny;
        }
        if (edges.includes("bottom")) {
          nc.h = Math.max(
            MIN_CROP,
            Math.min(1 - start.y, start.h + dyF)
          );
        }
        setCropRect(nc);
      };
      const onUp = () => {
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [cropRect, fitRect, zoom]
  );

  // ── Whole crop area drag ──
  const handleCropAreaDrag = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!fitRect) return;
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      const sx = e.clientX,
        sy = e.clientY;
      const start = { ...cropRect };

      const onMove = (me: PointerEvent) => {
        const dxF = (me.clientX - sx) / zoom / fitRect.w;
        const dyF = (me.clientY - sy) / zoom / fitRect.h;
        setCropRect({
          ...start,
          x: Math.max(0, Math.min(1 - start.w, start.x + dxF)),
          y: Math.max(0, Math.min(1 - start.h, start.y + dyF)),
        });
      };
      const onUp = () => {
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [cropRect, fitRect, zoom]
  );

  // ── Node drag handler (skip when cropping) ──
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (croppingRef.current) return;
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      if (e.altKey) return;
      if (!engine.selection.has(node.id) && engine.selection.size > 0) {
        const { x: cx, y: cy } = engine.screenToCanvas(
          e.clientX,
          e.clientY
        );
        for (const selId of engine.selection) {
          const selNode = engine.getNode(selId);
          if (!selNode) continue;
          const sh =
            selNode.h === "auto" ? 100 : (selNode.h as number);
          if (
            cx >= selNode.x &&
            cx <= selNode.x + selNode.w &&
            cy >= selNode.y &&
            cy <= selNode.y + sh
          ) {
            return;
          }
        }
      }

      e.stopPropagation();
      e.preventDefault();

      if (e.shiftKey) {
        engine.toggleSelect(node.id);
      } else if (!engine.selection.has(node.id)) {
        engine.select(node.id);
      }

      const startX = e.clientX;
      const startY = e.clientY;
      const draggedIds = Array.from(engine.selection);
      const origPositions = draggedIds.map((id) => {
        const n = engine.getNode(id)!;
        return { id, x: n.x, y: n.y };
      });
      let didMove = false;
      let rafId: number | null = null;
      let lastClientX = startX;
      let lastClientY = startY;
      let lastModKey = false;

      const applyMove = () => {
        rafId = null;
        const dx = (lastClientX - startX) / engine.viewport.zoom;
        const dy = (lastClientY - startY) / engine.viewport.zoom;
        const { finalDx, finalDy } = engine.computeDragSnap(
          origPositions,
          draggedIds,
          dx,
          dy,
          lastModKey
        );
        const updates = origPositions.map((orig) => ({
          id: orig.id,
          patch: { x: orig.x + finalDx, y: orig.y + finalDy },
        }));
        engine.updateMany(updates);
      };

      const onMove = (me: PointerEvent) => {
        const dx = (me.clientX - startX) / engine.viewport.zoom;
        const dy = (me.clientY - startY) / engine.viewport.zoom;
        if (!didMove) {
          if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            didMove = true;
            engine.pushHistorySnapshot();
          } else {
            return;
          }
        }
        lastClientX = me.clientX;
        lastClientY = me.clientY;
        lastModKey = me.metaKey || me.ctrlKey;
        if (rafId === null) {
          rafId = requestAnimationFrame(applyMove);
        }
      };
      const onUp = () => {
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          applyMove();
        }
        engine.clearAlignGuides();
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id]
  );

  // ── Resize + rotation handles ──
  const HANDLE_POSITIONS: {
    pos: HandlePosition;
    cx: number;
    cy: number;
  }[] = [
    { pos: "nw", cx: 0, cy: 0 },
    { pos: "n", cx: 0.5, cy: 0 },
    { pos: "ne", cx: 1, cy: 0 },
    { pos: "e", cx: 1, cy: 0.5 },
    { pos: "se", cx: 1, cy: 1 },
    { pos: "s", cx: 0.5, cy: 1 },
    { pos: "sw", cx: 0, cy: 1 },
    { pos: "w", cx: 0, cy: 0.5 },
  ];
  const handleSize = 8 / zoom;
  const half = handleSize / 2;
  const rotateGap = 25 / zoom;
  const showHandles = isSelected && onResizeHandleDown && !cropping;

  const handleRotatePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const ownerDoc = (e.currentTarget as HTMLElement).ownerDocument;
      e.stopPropagation();
      e.preventDefault();
      const centerX = node.x + node.w / 2;
      const centerY = node.y + h / 2;
      const initialRotation = node.rotation || 0;
      const { x: startCx, y: startCy } = engine.screenToCanvas(
        e.clientX,
        e.clientY
      );
      const startAngle = Math.atan2(startCy - centerY, startCx - centerX);
      engine.pushHistorySnapshot();

      const onMove = (me: PointerEvent) => {
        const { x: cx, y: cy } = engine.screenToCanvas(
          me.clientX,
          me.clientY
        );
        const currentAngle = Math.atan2(cy - centerY, cx - centerX);
        let rotation =
          initialRotation + (currentAngle - startAngle) * (180 / Math.PI);
        if (
          (me.shiftKey || engine.snapToGrid) &&
          !(me.metaKey || me.ctrlKey)
        ) {
          rotation = Math.round(rotation / 15) * 15;
        }
        engine.updateNode(node.id, { rotation });
      };
      const onUp = () => {
        ownerDoc.removeEventListener("pointermove", onMove);
        ownerDoc.removeEventListener("pointerup", onUp);
      };
      ownerDoc.addEventListener("pointermove", onMove);
      ownerDoc.addEventListener("pointerup", onUp);
    },
    [engine, node.id, node.x, node.y, node.w, h, node.rotation]
  );

  // ── Crop overlay pixel positions ──
  const cropPx =
    cropping && fitRect
      ? {
          left: fitRect.x + cropRect.x * fitRect.w,
          top: fitRect.y + cropRect.y * fitRect.h,
          width: cropRect.w * fitRect.w,
          height: cropRect.h * fitRect.h,
        }
      : null;

  // ── Image style: apply object-view-box for non-destructive crop ──
  const flipTransform = cropping
    ? undefined
    : [node.data.flipH ? "scaleX(-1)" : "", node.data.flipV ? "scaleY(-1)" : ""]
        .filter(Boolean)
        .join(" ") || undefined;

  const imgStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
    opacity: node.data.opacity ?? 1,
    transform: flipTransform,
  };

  // Apply crop via object-view-box when NOT in crop mode
  if (!cropping && crop) {
    const top = crop.y * 100;
    const right = (1 - crop.x - crop.w) * 100;
    const bottom = (1 - crop.y - crop.h) * 100;
    const left = crop.x * 100;
    (imgStyle as Record<string, unknown>).objectViewBox =
      `inset(${top}% ${right}% ${bottom}% ${left}%)`;
  }

  const cropHandleSize = 8 / zoom;
  const cropHalf = cropHandleSize / 2;

  return (
    <div
      onPointerDown={handlePointerDown}
      onDoubleClick={
        !cropping && interactive
          ? (e) => {
              e.stopPropagation();
              onCropStart?.();
            }
          : undefined
      }
      style={{
        position: "absolute",
        left: node.x + node.w / 2,
        top: node.y + h / 2,
        width: node.w,
        height: h,
        marginLeft: -node.w / 2,
        marginTop: -h / 2,
        zIndex: node.z,
        border: isSelected ? `2px dashed #3b82f6` : "none",
        borderRadius: 6,
        overflow: "visible",
        pointerEvents: interactive ? "auto" : "none",
        cursor: cropping ? "default" : "move",
        transform: node.rotation
          ? `rotate(${node.rotation}deg)`
          : undefined,
        transformOrigin: "center center",
        boxSizing: "border-box",
      }}
    >
      {/* Inner image container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          borderRadius: 4,
          border: node.data.borderColor
            ? `${node.data.borderWidth ?? 1}px ${node.data.borderStyle ?? "solid"} ${node.data.borderColor}`
            : "none",
          boxSizing: "border-box",
        }}
      >
        <img
          ref={imgRef}
          src={node.data.src}
          alt={node.data.alt ?? ""}
          onLoad={handleImgLoad}
          style={imgStyle}
          draggable={false}
        />

        {/* Crop mode: dark overlay with cutout */}
        {cropping && cropPx && (
          <div
            onPointerDown={handleCropAreaDrag}
            style={{
              position: "absolute",
              left: cropPx.left,
              top: cropPx.top,
              width: cropPx.width,
              height: cropPx.height,
              boxShadow: `0 0 0 ${Math.max(node.w, h) * 2}px rgba(0,0,0,0.45)`,
              border: `${1.5 / zoom}px dashed rgba(255,255,255,0.8)`,
              boxSizing: "border-box",
              cursor: "move",
              zIndex: 10,
            }}
          />
        )}
      </div>

      {/* Crop handles (outside overflow:hidden so they aren't clipped) */}
      {cropping &&
        cropPx &&
        CROP_HANDLES.map(({ pos, edges, cx, cy, cursor }) => (
          <div
            key={pos}
            onPointerDown={(e) => handleCropHandleDown(edges, e)}
            style={{
              position: "absolute",
              left: cropPx.left + cx * cropPx.width - cropHalf,
              top: cropPx.top + cy * cropPx.height - cropHalf,
              width: cropHandleSize,
              height: cropHandleSize,
              background: "white",
              border: `${1.5 / zoom}px solid #3b82f6`,
              borderRadius: 2,
              cursor,
              zIndex: 11,
            }}
          />
        ))}

      {/* Rotation line + handle (hide during crop) */}
      {isSelected && !cropping && (
        <>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: -rotateGap,
              width: 1,
              height: rotateGap,
              background: "#3b82f6",
              marginLeft: -0.5,
              pointerEvents: "none",
            }}
          />
          <div
            onPointerDown={handleRotatePointerDown}
            style={{
              position: "absolute",
              left: "50%",
              top: -(rotateGap + handleSize / 2),
              width: handleSize,
              height: handleSize,
              marginLeft: -handleSize / 2,
              borderRadius: "50%",
              background: "white",
              border: "1.5px solid #3b82f6",
              cursor: "grab",
            }}
          />
        </>
      )}

      {/* Resize handles (hide during crop) */}
      {showHandles &&
        HANDLE_POSITIONS.map(({ pos, cx, cy }) => (
          <div
            key={pos}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandleDown?.(node.id, pos, e);
            }}
            style={{
              position: "absolute",
              left: `calc(${cx * 100}% - ${half}px)`,
              top: `calc(${cy * 100}% - ${half}px)`,
              width: handleSize,
              height: handleSize,
              background: "white",
              border: "1.5px solid #3b82f6",
              borderRadius: 2,
              cursor: getRotatedCursor(pos, node.rotation || 0),
            }}
          />
        ))}
    </div>
  );
}

export default memo(ImageBlock);
