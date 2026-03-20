/** Viewport size; prefers Visual Viewport API when available. */
export function getViewportSize(win: Window): { vw: number; vh: number } {
  const vv = win.visualViewport;
  return {
    vw: vv?.width ?? win.innerWidth,
    vh: vv?.height ?? win.innerHeight,
  };
}

const DEFAULT_MARGIN = 8;

/**
 * Context menu / point popup: anchor is the intended top-left (e.g. cursor).
 * Prefers opening down and to the right; flips up or left when there is not enough room.
 */
export function fitAnchorPopupPosition(
  anchorX: number,
  anchorY: number,
  width: number,
  height: number,
  win: Window,
  margin = DEFAULT_MARGIN,
): { left: number; top: number } {
  const { vw, vh } = getViewportSize(win);

  let left = anchorX;
  if (left + width + margin > vw) {
    left = anchorX - width;
  }
  left = Math.max(margin, Math.min(left, vw - width - margin));

  let top = anchorY;
  const fitsInViewport = height + margin * 2 <= vh;
  if (fitsInViewport) {
    if (top + height + margin > vh) {
      const above = anchorY - height;
      const spaceAbove = anchorY - margin;
      if (spaceAbove >= height) {
        top = above;
      } else {
        top = vh - height - margin;
      }
    }
    if (top < margin) top = margin;
  } else {
    top = margin;
  }

  const maxTop = Math.max(margin, vh - height - margin);
  top = Math.max(margin, Math.min(top, maxTop));

  return { left, top };
}

/**
 * Toolbar strip popover: opens to the right of the trigger by default; flips to the left
 * if needed. Vertically aligns with trigger top, then shifts up so the panel stays on-screen.
 */
export function fitSidePopoverPosition(
  trigger: Pick<DOMRect, "left" | "right" | "top" | "bottom">,
  panelWidth: number,
  panelHeight: number,
  win: Window,
  options?: { gap?: number; margin?: number },
): { left: number; top: number } {
  const gap = options?.gap ?? 8;
  const margin = options?.margin ?? DEFAULT_MARGIN;
  const { vw, vh } = getViewportSize(win);

  let left = trigger.right + gap;
  if (left + panelWidth + margin > vw) {
    left = trigger.left - panelWidth - gap;
  }
  if (left < margin) left = margin;
  left = Math.max(margin, Math.min(left, vw - panelWidth - margin));

  let top = trigger.top;
  if (top + panelHeight + margin > vh) {
    top = vh - panelHeight - margin;
  }
  if (top < margin) top = margin;

  const maxTop = Math.max(margin, vh - panelHeight - margin);
  top = Math.max(margin, Math.min(top, maxTop));

  return { left, top };
}
