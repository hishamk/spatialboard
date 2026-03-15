import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { useMultiSelection } from "./useMultiSelection";
import { PROPERTIES_WIDTH, TOOL_STRIP_WIDTH } from "./styles";
import { useSBTheme } from "./ThemeContext";
import PropertiesContent from "./PropertiesContent";

interface FloatingPropertiesProps {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
}

export default function FloatingProperties({ engine, registry }: FloatingPropertiesProps) {
  const theme = useSBTheme();
  const { target, commonProps } = useMultiSelection(engine);
  const visible = target.kind !== "none";

  const [isMobile, setIsMobile] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getContainerSize = useCallback(() => {
    const container = panelRef.current?.offsetParent as HTMLElement | null;
    if (container) return { width: container.clientWidth, height: container.clientHeight };
    const win = panelRef.current?.ownerDocument.defaultView ?? window;
    return { width: win.innerWidth, height: win.innerHeight };
  }, []);

  const getDefaultPosition = useCallback(() => {
    const { width } = getContainerSize();
    return { x: width - PROPERTIES_WIDTH - 16, y: 12 };
  }, [getContainerSize]);

  const panelPos = position ?? getDefaultPosition();

  // After mount, re-evaluate default position with correct container dimensions
  // (panelRef.current is null during the first render, so getDefaultPosition uses the window fallback)
  const hasSetInitial = useRef(false);
  useLayoutEffect(() => {
    if (!hasSetInitial.current && panelRef.current && !position) {
      hasSetInitial.current = true;
      const container = panelRef.current.offsetParent as HTMLElement | null;
      if (container) {
        setPosition({ x: container.clientWidth - PROPERTIES_WIDTH - 16, y: 12 });
      }
    }
  });

  // Detect narrow containers for bottom-sheet layout
  useEffect(() => {
    const container = panelRef.current?.offsetParent as HTMLElement | null ?? panelRef.current?.ownerDocument.body;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? container.clientWidth;
      setIsMobile(width < 600);
    });
    ro.observe(container);
    setIsMobile(container.clientWidth < 600);
    return () => ro.disconnect();
  }, []);

  const handleDragPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      setIsDragging(true);
      const left = position ? position.x : getDefaultPosition().x;
      const top = position ? position.y : getDefaultPosition().y;
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startLeft: left,
        startTop: top,
      };
      // Explicit capture routes all subsequent pointermove/pointerup to this
      // element, enabling React's onPointerMove/onPointerUp below to fire
      // reliably on touch (not just desktop).
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [position, getDefaultPosition]
  );

  const handleDragPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      e.stopPropagation();
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const { width: cw, height: ch } = getContainerSize();
      const newX = Math.max(
        TOOL_STRIP_WIDTH,
        Math.min(cw - PROPERTIES_WIDTH - 8, dragRef.current.startLeft + dx)
      );
      const newY = Math.max(
        8,
        Math.min(ch - 100, dragRef.current.startTop + dy)
      );
      setPosition({ x: newX, y: newY });
    },
    [getContainerSize]
  );

  const handleDragPointerUp = useCallback(() => {
    dragRef.current = null;
    setIsDragging(false);
  }, []);

  if (!visible) return null;

  // On narrow screens (mobile/tablet), render a bottom sheet
  if (isMobile) {
    return (
      <div
        ref={panelRef}
        data-sb-props-panel
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45vh",
          minHeight: 200,
          background: theme.panelBg,
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          color: theme.text,
          fontSize: 12,
        }}
      >
        {/* Drag pill */}
        <div
          style={{
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: theme.border,
            }}
          />
        </div>
        <div
          style={{
            overflowY: "auto",
            padding: "0 16px 24px",
            flex: 1,
            touchAction: "pan-y",
          }}
        >
          <PropertiesContent
            engine={engine}
            registry={registry}
            target={target}
            commonProps={commonProps}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      data-sb-props-panel
      style={{
        position: "absolute",
        left: panelPos.x,
        top: panelPos.y,
        width: PROPERTIES_WIDTH,
        background: theme.panelBg,
        borderRadius: theme.panelBorderRadius,
        padding: "0 0 12px",
        display: "flex",
        flexDirection: "column",
        zIndex: 99,
        color: theme.text,
        fontSize: 11,
        maxHeight: "calc(100% - 40px)",
        boxShadow: theme.panelShadow,
      }}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerMove={handleDragPointerMove}
      onPointerUp={handleDragPointerUp}
      onPointerCancel={handleDragPointerUp}
    >
      {/* Drag handle */}
      <div
        onPointerDown={handleDragPointerDown}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          padding: "8px 16px",
          userSelect: "none",
          touchAction: "none",
          display: "flex",
          alignItems: "center",
          gap: 6,
          borderBottom: `1px solid ${theme.border}`,
          color: theme.textMuted,
          fontSize: 10,
          flexShrink: 0,
        }}
      >
        <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>Inspector</span>
      </div>

      {/* Scrollable content */}
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          touchAction: "pan-y",
        }}
      >
        <PropertiesContent
          engine={engine}
          registry={registry}
          target={target}
          commonProps={commonProps}
        />
      </div>
    </div>
  );
}
