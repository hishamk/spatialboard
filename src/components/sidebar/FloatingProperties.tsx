import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import type { SpatialEngine } from "../../engine/SpatialEngine";
import type { NodeTypeRegistry } from "../../nodes/registry";
import { useMultiSelection } from "./useMultiSelection";
import { PROPERTIES_WIDTH, TOOL_STRIP_WIDTH, COMPACT_BREAKPOINT, MOBILE_TOOLBAR_CLEARANCE, TOUCH_PROPS_VARS } from "./styles";
import { useSBTheme, SB_UI_FONT } from "./ThemeContext";
import PropertiesContent, { getHeaderLabel } from "./PropertiesContent";
import { useSBI18n } from "../contexts/LocalizationContext";

interface FloatingPropertiesProps {
  engine: SpatialEngine;
  registry?: NodeTypeRegistry;
  /** When false, a popped-out inspector hides (its host panel is backgrounded). */
  hostActive?: boolean;
  /** Compact layout (board container < COMPACT_BREAKPOINT) — renders the
   *  bottom-sheet variant. When omitted, falls back to self-measuring. */
  compact?: boolean;
}

export default function FloatingProperties({ engine, registry, hostActive, compact }: FloatingPropertiesProps) {
  const theme = useSBTheme();
  const { isRTL, labels } = useSBI18n();
  const { target, commonProps } = useMultiSelection(engine);
  const visible = target.kind !== "none";

  const [isMobileMeasured, setIsMobileMeasured] = useState(false);
  const isMobile = compact ?? isMobileMeasured;
  // Mobile: the sheet is ON-DEMAND (opened from the sliders trigger) — it
  // never auto-opens on selection. Deselecting closes it again.
  const [sheetOpen, setSheetOpen] = useState(false);
  useEffect(() => {
    if (!visible) setSheetOpen(false);
  }, [visible]);

  // With the host-provided `compact` prop the measuring observer (below) may
  // never see a mounted panel — seed the auto-hide default from it directly.
  useEffect(() => {
    if (compact && !autoHideInitializedRef.current) {
      autoHideInitializedRef.current = true;
      setAutoHideEnabled(true);
    }
  }, [compact]);
  const [canvasInteracting, setCanvasInteracting] = useState(false);
  const [autoHideEnabled, setAutoHideEnabled] = useState(false);
  const interactionClearTimerRef = useRef<number | null>(null);
  const autoHideInitializedRef = useRef(false);

  const isTouchDevice = useCallback(() => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  const computeCompactScreen = useCallback(
    (width: number) => {
      // Treat touch devices (iPad/tablets) as compact at larger widths because
      // Safari often reports desktop-like layout widths.
      const compactBreakpoint = isTouchDevice() ? 1366 : 1024;
      return width <= compactBreakpoint;
    },
    [isTouchDevice]
  );

  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  // Pop-out: portal the inspector to document.body (position: fixed) so it can
  // float outside the canvas panel. Docking back resets to the default corner.
  const [poppedOut, setPoppedOut] = useState(false);

  const getContainerSize = useCallback(() => {
    const container = panelRef.current?.offsetParent as HTMLElement | null;
    if (container) return { width: container.clientWidth, height: container.clientHeight };
    const win = panelRef.current?.ownerDocument.defaultView ?? window;
    return { width: win.innerWidth, height: win.innerHeight };
  }, []);

  const getDefaultPosition = useCallback(() => {
    const { width } = getContainerSize();
    if (isRTL) return { x: TOOL_STRIP_WIDTH + 16, y: 12 };
    return { x: width - PROPERTIES_WIDTH - 16, y: 12 };
  }, [getContainerSize, isRTL]);

  const panelPos = position ?? getDefaultPosition();

  // After mount, re-evaluate default position with correct container dimensions
  // (panelRef.current is null during the first render, so getDefaultPosition uses the window fallback)
  const hasSetInitial = useRef(false);
  useLayoutEffect(() => {
    if (!hasSetInitial.current && panelRef.current && !position) {
      hasSetInitial.current = true;
      const container = panelRef.current.offsetParent as HTMLElement | null;
      if (container) {
        setPosition(
          isRTL
            ? { x: TOOL_STRIP_WIDTH + 16, y: 12 }
            : { x: container.clientWidth - PROPERTIES_WIDTH - 16, y: 12 }
        );
      }
    }
  }, [position, isRTL]);

  // Detect narrow containers for bottom-sheet layout
  useEffect(() => {
    const container = panelRef.current?.offsetParent as HTMLElement | null ?? panelRef.current?.ownerDocument.body;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? container.clientWidth;
      setIsMobileMeasured(width < COMPACT_BREAKPOINT);
      const compactScreen = computeCompactScreen(width);
      if (!autoHideInitializedRef.current) {
        setAutoHideEnabled(compactScreen);
        autoHideInitializedRef.current = true;
      }
    });
    ro.observe(container);
    setIsMobileMeasured(container.clientWidth < COMPACT_BREAKPOINT);
    const initialCompact = computeCompactScreen(container.clientWidth);
    if (!autoHideInitializedRef.current) {
      setAutoHideEnabled(initialCompact);
      autoHideInitializedRef.current = true;
    }
    return () => ro.disconnect();
    // `visible` re-attaches the observer once the panel actually mounts —
    // before the first selection panelRef.current is null (fallback path only).
  }, [computeCompactScreen, poppedOut, visible]);

  // On compact screens (iPad + smaller), auto-hide inspector while user is actively
  // interacting with the canvas (draw/select/drag/edit), then restore shortly after.
  useEffect(() => {
    const doc = panelRef.current?.ownerDocument ?? document;

    const clearInteractionSoon = () => {
      if (interactionClearTimerRef.current !== null) {
        window.clearTimeout(interactionClearTimerRef.current);
      }
      interactionClearTimerRef.current = window.setTimeout(() => {
        setCanvasInteracting(false);
        interactionClearTimerRef.current = null;
      }, 200);
    };

    const markInteracting = () => {
      if (interactionClearTimerRef.current !== null) {
        window.clearTimeout(interactionClearTimerRef.current);
        interactionClearTimerRef.current = null;
      }
      setCanvasInteracting(true);
    };

    const inCanvas = (target: EventTarget | null): boolean => {
      return !!(target instanceof Element && target.closest("[data-sb-canvas]"));
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.button === 2) return; // keep inspector visible for desktop context menu
      if (inCanvas(e.target)) markInteracting();
    };
    const onPointerUp = () => clearInteractionSoon();
    const onPointerCancel = () => clearInteractionSoon();
    const onFocusIn = (e: FocusEvent) => {
      if (inCanvas(e.target)) markInteracting();
    };
    const onFocusOut = () => clearInteractionSoon();
    const onCanvasInteraction = (e: Event) => {
      const active = (e as CustomEvent<{ active?: boolean }>).detail?.active;
      if (active) markInteracting();
      else clearInteractionSoon();
    };

    doc.addEventListener("pointerdown", onPointerDown, true);
    doc.addEventListener("pointerup", onPointerUp, true);
    doc.addEventListener("pointercancel", onPointerCancel, true);
    doc.addEventListener("focusin", onFocusIn, true);
    doc.addEventListener("focusout", onFocusOut, true);
    doc.addEventListener("sb:canvas-interaction", onCanvasInteraction as EventListener);

    return () => {
      doc.removeEventListener("pointerdown", onPointerDown, true);
      doc.removeEventListener("pointerup", onPointerUp, true);
      doc.removeEventListener("pointercancel", onPointerCancel, true);
      doc.removeEventListener("focusin", onFocusIn, true);
      doc.removeEventListener("focusout", onFocusOut, true);
      doc.removeEventListener("sb:canvas-interaction", onCanvasInteraction as EventListener);
      if (interactionClearTimerRef.current !== null) {
        window.clearTimeout(interactionClearTimerRef.current);
        interactionClearTimerRef.current = null;
      }
    };
  }, []);

  const handleDragPointerDown = useCallback(
    (e: React.PointerEvent, dragSurface?: HTMLElement) => {
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
      (dragSurface ?? (e.currentTarget as HTMLElement)).setPointerCapture(e.pointerId);
    },
    [position, getDefaultPosition]
  );

  const isInteractiveInspectorTarget = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    return !!target.closest(
      'input, textarea, select, button, label, a, [role="button"], [contenteditable="true"], [data-no-panel-drag]'
    );
  }, []);

  const handlePanelPointerDownCapture = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isMobile) return;
      if (e.button !== 0) return;
      if (isInteractiveInspectorTarget(e.target)) return;
      e.stopPropagation();
      handleDragPointerDown(e, e.currentTarget);
    },
    [isMobile, isInteractiveInspectorTarget, handleDragPointerDown]
  );

  const handleDragPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      e.stopPropagation();
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const { width: cw, height: ch } = getContainerSize();
      // Popped out: fixed to the viewport — full-window bounds, no tool-strip inset.
      const minX = poppedOut ? 8 : isRTL ? 8 : TOOL_STRIP_WIDTH;
      const maxX = poppedOut
        ? cw - PROPERTIES_WIDTH - 8
        : isRTL
          ? cw - PROPERTIES_WIDTH - TOOL_STRIP_WIDTH - 8
          : cw - PROPERTIES_WIDTH - 8;
      const newX = Math.max(
        minX,
        Math.min(maxX, dragRef.current.startLeft + dx)
      );
      const newY = Math.max(
        8,
        Math.min(ch - 100, dragRef.current.startTop + dy)
      );
      setPosition({ x: newX, y: newY });
    },
    [getContainerSize, isRTL, poppedOut]
  );

  const handleDragPointerUp = useCallback(() => {
    dragRef.current = null;
    setIsDragging(false);
  }, []);

  const handlePopOut = useCallback(() => {
    // Keep the panel visually in place: fixed positioning uses viewport
    // coords, so seed them from the current on-screen rect.
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) setPosition({ x: rect.left, y: rect.top });
    setPoppedOut(true);
  }, []);

  const handleDockIn = useCallback(() => {
    setPoppedOut(false);
    // Back to the default docked corner (recomputed by the layout effect).
    setPosition(null);
    hasSetInitial.current = false;
  }, []);

  const shouldHideForInteraction = autoHideEnabled && canvasInteracting;
  // Keep inspector fill fully theme-compliant (no canvas bleed-through).
  const panelBg = theme.panelBg;

  if (!visible) return null;

  // On narrow screens: ON-DEMAND properties (the Excalidraw pattern). Nothing
  // auto-opens while working with a node — a small sliders trigger sits above
  // the tool row whenever there IS a target (selection or active tool), and
  // the sheet only opens when tapped. Deselecting unmounts everything.
  if (isMobile) {
    const chromeBottom = `calc(${MOBILE_TOOLBAR_CLEARANCE}px + env(safe-area-inset-bottom, 0px))`;
    return (
      <>
        {sheetOpen && (
          <div
            ref={panelRef}
            data-sb-props-panel
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              // Floats ABOVE the mobile tool row (not over it) so switching
              // tools stays possible while the sheet is open.
              position: "absolute",
              bottom: chromeBottom,
              left: 6,
              right: 6,
              maxHeight: "min(52vh, 460px)",
              background: panelBg,
              borderRadius: 12,
              boxShadow: "0 -4px 24px rgba(0,0,0,0.25)",
              // Above the compact BottomBar pills (10000) — menus open above this.
              zIndex: 10010,
              display: "flex",
              flexDirection: "column",
              color: theme.text,
              fontSize: 12,
              backdropFilter: "blur(8px) saturate(120%)",
              WebkitBackdropFilter: "blur(8px) saturate(120%)",
              opacity: shouldHideForInteraction ? 0 : 1,
              transform: shouldHideForInteraction ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 140ms ease, transform 160ms ease",
              pointerEvents: shouldHideForInteraction ? "none" : "auto",
            }}
          >
            <div
              style={{
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                padding: "0 6px 0 12px",
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: theme.text,
                  letterSpacing: "0.02em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                }}
              >
                {getHeaderLabel(target, labels)}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    color: theme.textMuted,
                    fontSize: 11,
                    userSelect: "none",
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <span>{labels.autoHide}</span>
                  <input
                    type="checkbox"
                    checked={autoHideEnabled}
                    onChange={(e) => setAutoHideEnabled(e.target.checked)}
                    style={{ accentColor: theme.accentColor }}
                  />
                </label>
                <button
                  type="button"
                  aria-label={labels.close ?? "Close"}
                  onClick={() => setSheetOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 34,
                    height: 34,
                    padding: 0,
                    border: "none",
                    borderRadius: 8,
                    background: "transparent",
                    color: theme.textMuted,
                    cursor: "pointer",
                    touchAction: "manipulation",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </span>
            </div>
            <div
              style={{
                overflowY: "auto",
                padding: "12px 14px 14px",
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 13,
                touchAction: "pan-y",
                overscrollBehavior: "contain",
                ...TOUCH_PROPS_VARS,
              }}
            >
              <PropertiesContent
                engine={engine}
                registry={registry}
                target={target}
                commonProps={commonProps}
                mobileLayout
              />
            </div>
          </div>
        )}
        {/* Sliders trigger — start-aligned beside the compact BottomBar */}
        <button
          type="button"
          data-sb-props-trigger
          title={labels.inspectorTitle}
          aria-label={labels.inspectorTitle}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => setSheetOpen((v) => !v)}
          style={{
            position: "absolute",
            bottom: chromeBottom,
            [isRTL ? "right" : "left"]: 4,
            width: 42,
            height: 42,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            border: `1px solid ${theme.border}`,
            borderRadius: theme.panelBorderRadius,
            background: sheetOpen ? theme.controlBgActive : panelBg,
            color: theme.text,
            boxShadow: theme.panelShadow,
            cursor: "pointer",
            touchAction: "manipulation",
            zIndex: 10000,
            opacity: shouldHideForInteraction ? 0 : 1,
            transition: "opacity 140ms ease",
            pointerEvents: shouldHideForInteraction ? "none" : "auto",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 7h16" />
            <path d="M4 12h16" />
            <path d="M4 17h16" />
            <circle cx="9" cy="7" r="2.2" fill={panelBg} />
            <circle cx="15" cy="12" r="2.2" fill={panelBg} />
            <circle cx="7" cy="17" r="2.2" fill={panelBg} />
          </svg>
        </button>
      </>
    );
  }

  const desktopPanel = (
    <div
      ref={panelRef}
      data-sb-props-panel
      style={{
        position: poppedOut ? "fixed" : "absolute",
        left: panelPos.x,
        top: panelPos.y,
        width: PROPERTIES_WIDTH,
          background: panelBg,
        borderRadius: theme.panelBorderRadius,
        padding: "0 0 12px",
        display: "flex",
        flexDirection: "column",
        zIndex: poppedOut ? 9990 : 99,
        color: theme.text,
        fontSize: 11,
        fontFamily: theme.uiFontFamily ?? SB_UI_FONT,
        maxHeight: poppedOut ? "calc(100vh - 40px)" : "calc(100% - 40px)",
        boxShadow: theme.panelShadow,
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        opacity: shouldHideForInteraction ? 0 : 1,
        transform: shouldHideForInteraction ? "translateY(-4px) scale(0.995)" : "translateY(0) scale(1)",
        transformOrigin: isRTL ? "top left" : "top right",
        transition: "opacity 140ms ease, transform 160ms ease",
        pointerEvents: shouldHideForInteraction ? "none" : "auto",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onPointerDownCapture={handlePanelPointerDownCapture}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerMove={handleDragPointerMove}
      onPointerUp={handleDragPointerUp}
      onPointerCancel={handleDragPointerUp}
    >
      {/* Drag handle */}
      <div
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          padding: "8px 16px",
          userSelect: "none",
          touchAction: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.border}`,
          color: theme.textMuted,
          fontSize: 10,
          flexShrink: 0,
        }}
      >
        <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>{labels.inspectorTitle}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <label
          data-no-panel-drag
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            color: theme.textMuted,
            fontSize: 10,
            userSelect: "none",
            cursor: "default",
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <span>{labels.autoHide}</span>
          <input
            type="checkbox"
            checked={autoHideEnabled}
            onChange={(e) => setAutoHideEnabled(e.target.checked)}
            style={{ accentColor: theme.accentColor }}
          />
        </label>
        <button
          type="button"
          data-no-panel-drag
          title={poppedOut ? labels.dockIn : labels.popOut}
          aria-label={poppedOut ? labels.dockIn : labels.popOut}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={poppedOut ? handleDockIn : handlePopOut}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 20,
            height: 20,
            padding: 0,
            border: "none",
            borderRadius: 5,
            background: "transparent",
            color: theme.textMuted,
            cursor: "pointer",
          }}
        >
          {poppedOut ? (
            /* dock back: arrow into a corner box */
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 1.5h5a1 1 0 0 1 1 1v5" />
              <rect x="1.5" y="4.5" width="6" height="6" rx="1" />
            </svg>
          ) : (
            /* pop out: box + outward arrow */
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 1.5H2.5a1 1 0 0 0-1 1V9.5a1 1 0 0 0 1 1H9.5a1 1 0 0 0 1-1V7" />
              <path d="M7.5 1.5h3v3" />
              <path d="M10.5 1.5 6 6" />
            </svg>
          )}
        </button>
        </span>
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

  // Popped out: escape the canvas panel entirely via a body portal. When the
  // host panel isn't the active one, keep it mounted (position/state survive)
  // but hidden — a floating inspector over unrelated content is just noise.
  if (poppedOut && hostActive === false) {
    return createPortal(<div style={{ display: "none" }}>{desktopPanel}</div>, document.body);
  }
  return poppedOut ? createPortal(desktopPanel, document.body) : desktopPanel;
}
